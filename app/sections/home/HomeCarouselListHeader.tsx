import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated, Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import type { ComponentType } from 'react';
import MainNavigation from '../../common/navigation/MainNavigation';
import { setTabSwipeLocked } from '../../common/navigation/tabSwipeLock';
import ProductDetailView from '../../views/productdetail/ProductDetailView';
import { MBProgressDot } from '../../components/carousel/MBProgressDot';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDE_PEEK_PERCENT = 0.1;
const CARD_WIDTH = SCREEN_WIDTH * (1 - SIDE_PEEK_PERCENT * 2);
const CARD_HEIGHT = 160;
const CARD_GAP = 8;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;
const DEFAULT_AUTOPLAY_DURATION = 4500;

type CarouselTargetView = ComponentType<any>;

export interface HomeCarouselItem {
  id: string;
  title: string;
  imageUri: string;
  targetView?: CarouselTargetView;
  targetParams?: Record<string, unknown>;
}

interface HomeCarouselListHeaderProps {
  items?: HomeCarouselItem[];
  autoPlayDuration?: number;
  onPressItem?: (item: HomeCarouselItem) => void;
}

type VirtualCarouselItem = HomeCarouselItem & {
  virtualKey: string;
};

const DEFAULT_ITEMS: HomeCarouselItem[] = [
  {
    id: 'hero-1',
    title: 'Plantas para renovar sua sala',
    imageUri:
      'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1600&auto=format&fit=crop',
    targetView: ProductDetailView,
    targetParams: { productId: '1' },
  },
  {
    id: 'hero-2',
    title: 'Semana verde com ate 40% off',
    imageUri:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1600&auto=format&fit=crop',
    targetView: ProductDetailView,
    targetParams: { productId: '2' },
  },
  {
    id: 'hero-3',
    title: 'Terrarios artesanais em destaque',
    imageUri:
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1600&auto=format&fit=crop',
    targetView: ProductDetailView,
    targetParams: { productId: '3' },
  },
];

export default function HomeCarouselListHeader({
  items,
  autoPlayDuration = DEFAULT_AUTOPLAY_DURATION,
  onPressItem,
}: HomeCarouselListHeaderProps) {
  const sourceItems = useMemo(() => {
    const baseItems = items && items.length > 0 ? items : DEFAULT_ITEMS;
    return baseItems.slice(0, 8);
  }, [items]);

  const listData = useMemo<VirtualCarouselItem[]>(() => {
    if (sourceItems.length <= 1) {
      return sourceItems.map((item, index) => ({
        ...item,
        virtualKey: `${item.id}-${index}`,
      }));
    }

    const repeated = [...sourceItems, ...sourceItems, ...sourceItems];
    return repeated.map((item, index) => ({
      ...item,
      virtualKey: `${item.id}-${index}`,
    }));
  }, [sourceItems]);

  const loopLength = sourceItems.length;
  const middleStartIndex = loopLength > 1 ? loopLength : 0;

  const flatListRef = useRef<FlatList<VirtualCarouselItem>>(null);
  const timerProgress = useRef(new Animated.Value(0)).current;
  const autoPlayRef = useRef<Animated.CompositeAnimation | null>(null);
  const pausedProgressRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [virtualIndex, setVirtualIndex] = useState(middleStartIndex);

  const stopTimer = useCallback(() => {
    autoPlayRef.current?.stop();
    autoPlayRef.current = null;
  }, []);

  const syncActiveFromVirtual = useCallback(
    (nextVirtualIndex: number) => {
      if (loopLength === 0) return;
      const nextActive = ((nextVirtualIndex % loopLength) + loopLength) % loopLength;
      setActiveIndex(nextActive);
    },
    [loopLength],
  );

  const goToVirtualIndex = useCallback(
    (nextVirtualIndex: number, animated = true) => {
      if (listData.length === 0) return;

      flatListRef.current?.scrollToOffset({
        offset: nextVirtualIndex * SNAP_INTERVAL,
        animated,
      });
      setVirtualIndex(nextVirtualIndex);
      syncActiveFromVirtual(nextVirtualIndex);

      pausedProgressRef.current = 0;
      timerProgress.setValue(0);
    },
    [listData.length, syncActiveFromVirtual, timerProgress],
  );

  const goToLogicalIndex = useCallback(
    (index: number, animated = true) => {
      if (loopLength === 0) return;
      const normalizedIndex = ((index % loopLength) + loopLength) % loopLength;
      const targetVirtualIndex = loopLength > 1 ? loopLength + normalizedIndex : normalizedIndex;
      goToVirtualIndex(targetVirtualIndex, animated);
    },
    [goToVirtualIndex, loopLength],
  );

  const normalizeVirtualIndex = useCallback(
    (index: number) => {
      if (loopLength <= 1) return index;

      if (index < loopLength) {
        return index + loopLength;
      }
      if (index >= loopLength * 2) {
        return index - loopLength;
      }

      return index;
    },
    [loopLength],
  );

  const startTimer = useCallback(
    (resumeFromPause: boolean) => {
      if (loopLength <= 1) return;

      stopTimer();
      const fromProgress = resumeFromPause ? pausedProgressRef.current : 0;
      const duration = resumeFromPause
        ? Math.max(100, Math.round(autoPlayDuration * (1 - fromProgress)))
        : autoPlayDuration;

      timerProgress.setValue(fromProgress);
      autoPlayRef.current = Animated.timing(timerProgress, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      });

      autoPlayRef.current.start(({ finished }) => {
        if (!finished) return;
        goToVirtualIndex(virtualIndex + 1);
      });
    },
    [autoPlayDuration, goToVirtualIndex, loopLength, stopTimer, timerProgress, virtualIndex],
  );

  useEffect(() => {
    setActiveIndex(0);
    setVirtualIndex(middleStartIndex);
    timerProgress.setValue(0);
    pausedProgressRef.current = 0;

    if (listData.length === 0) return;

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: middleStartIndex * SNAP_INTERVAL,
        animated: false,
      });
    });
  }, [listData.length, middleStartIndex, timerProgress]);

  useEffect(() => {
    if (loopLength <= 1) {
      stopTimer();
      return;
    }

    const shouldResume = pausedProgressRef.current > 0 && pausedProgressRef.current < 1;
    startTimer(shouldResume);

    return () => {
      stopTimer();
    };
  }, [activeIndex, loopLength, startTimer, stopTimer]);

  useEffect(() => {
    return () => {
      setTabSwipeLocked(false);
      stopTimer();
    };
  }, [stopTimer]);

  const handleScrollBeginDrag = () => {
    setTabSwipeLocked(true);
    timerProgress.stopAnimation((value) => {
      pausedProgressRef.current = value;
    });
    stopTimer();
  };

  const handleScrollEndDrag = () => {
    setTabSwipeLocked(false);
  };

  const handleMomentumScrollEnd = (event: any) => {
    const rawIndex = Math.round(event.nativeEvent.contentOffset.x / SNAP_INTERVAL);
    const normalizedIndex = normalizeVirtualIndex(rawIndex);

    if (normalizedIndex !== rawIndex) {
      flatListRef.current?.scrollToOffset({
        offset: normalizedIndex * SNAP_INTERVAL,
        animated: false,
      });
    }

    setVirtualIndex(normalizedIndex);
    syncActiveFromVirtual(normalizedIndex);
    pausedProgressRef.current = 0;
    timerProgress.setValue(0);
    setTabSwipeLocked(false);

    if (loopLength > 1) {
      startTimer(false);
    }
  };

  const getItemLayout = (_: unknown, index: number) => ({
    length: SNAP_INTERVAL,
    offset: SNAP_INTERVAL * index,
    index,
  });

  const handlePressItem = (item: HomeCarouselItem) => {
    if (onPressItem) {
      onPressItem(item);
      return;
    }

    if (item.targetView) {
      MainNavigation.push(item.targetView, item.targetParams);
    }
  };

  if (sourceItems.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={listData}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.virtualKey}
        getItemLayout={getItemLayout}
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        contentContainerStyle={styles.listContentContainer}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.92}
            style={styles.cardPressable}
            onPress={() => handlePressItem(item)}
          >
            <ImageBackground source={{ uri: item.imageUri }} style={styles.cardImage} imageStyle={styles.cardImageInner}>
              <View style={styles.overlay} />
              <View style={styles.textWrapper}>
                <Text numberOfLines={2} style={styles.title}>
                  {item.title}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

      <View style={styles.bulletsContainer}>
        {sourceItems.map((item, index) => (
          <MBProgressDot
            key={item.id}
            active={index === activeIndex}
            progress={timerProgress}
            onPress={() => goToLogicalIndex(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 8,
  },
  listContentContainer: {
    paddingHorizontal: SCREEN_WIDTH * SIDE_PEEK_PERCENT,
  },
  cardPressable: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: CARD_GAP,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#D8D8D8',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardImageInner: {
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
  },
  textWrapper: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'SNPro-Bold',
  },
  bulletsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 16,
    gap: 6,
  },
});