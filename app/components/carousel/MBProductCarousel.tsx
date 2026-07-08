import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated, Dimensions, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { MBProgressDot } from './MBProgressDot';
import { Icons } from '../../common/constants/Icons';
import { setTabSwipeLocked } from '../../common/navigation/tabSwipeLock';
import MBTagWithLabel from '../../components/tags/MBTagWithLabel';
import { PrimaryColors } from '../../common/colors/Colors';
import MBPlayPauseBtn from '../buttons/MBPlayPauseBtn';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_WIDTH = SCREEN_WIDTH;
const CAROUSEL_HEIGHT = 360;
const DEFAULT_AUTOPLAY_DURATION = 5000;

export interface MBProductCarouselItem {
  id: string;
  imageUri: string;
}

interface MBProductCarouselProps {
  items?: MBProductCarouselItem[];
  title?: string;
  subtitle?: string;
  autoPlayDuration?: number;
}

const DEFAULT_ITEMS: MBProductCarouselItem[] = [
  {
    id: 'default-1',
    imageUri: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'default-2',
    imageUri: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'default-3',
    imageUri: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function MBProductCarousel({
  items, title, subtitle, autoPlayDuration = DEFAULT_AUTOPLAY_DURATION,
}: MBProductCarouselProps) {
  const carouselItems = useMemo(() => {
    const source = items && items.length > 0 ? items : DEFAULT_ITEMS;
    return source.slice(0, 5);
  }, [items]);

  const flatListRef = useRef<FlatList<MBProductCarouselItem>>(null);
  const timerProgress = useRef(new Animated.Value(0)).current;
  const autoPlayRef = useRef<Animated.CompositeAnimation | null>(null);
  const pausedProgressRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoomedImageUri, setZoomedImageUri] = useState<string | null>(null);

  const stopTimer = useCallback(() => {
    autoPlayRef.current?.stop();
    autoPlayRef.current = null;
  }, []);

  const goToIndex = useCallback((index: number, animated = true) => {
    if (carouselItems.length === 0) return;
    const nextIndex = ((index % carouselItems.length) + carouselItems.length) % carouselItems.length;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated });
    setActiveIndex(nextIndex);
    pausedProgressRef.current = 0;
    timerProgress.setValue(0);
  }, [carouselItems.length, timerProgress]);

  const goToNext = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex]);

  const startTimer = useCallback((resumeFromPause: boolean) => {
    if (!isPlaying || carouselItems.length <= 1) return;

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
      if (finished && isPlaying) {
        pausedProgressRef.current = 0;
        goToNext();
      }
    });
  }, [autoPlayDuration, carouselItems.length, goToNext, isPlaying, stopTimer, timerProgress]);

  useEffect(() => {
    if (!isPlaying || carouselItems.length <= 1) {
      stopTimer();
      return;
    }

    const shouldResume = pausedProgressRef.current > 0 && pausedProgressRef.current < 1;
    startTimer(shouldResume);

    return () => {
      stopTimer();
    };
  }, [activeIndex, carouselItems.length, isPlaying, startTimer, stopTimer]);

  useEffect(() => {
    return () => {
      setTabSwipeLocked(false);
    };
  }, []);

  useEffect(() => {
    if (activeIndex >= carouselItems.length && carouselItems.length > 0) {
      setActiveIndex(0);
      flatListRef.current?.scrollToIndex({ index: 0, animated: false });
    }
  }, [activeIndex, carouselItems.length]);

  const togglePlayPause = () => {
    if (isPlaying) {
      timerProgress.stopAnimation((value) => {
        pausedProgressRef.current = value;
      });
      stopTimer();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
  };

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SLIDE_WIDTH);
    const nextIndex = Math.max(0, Math.min(index, carouselItems.length - 1));

    setActiveIndex(nextIndex);
    pausedProgressRef.current = 0;
    timerProgress.setValue(0);
    if (isPlaying && carouselItems.length > 1) {
      startTimer(false);
    }

    setTabSwipeLocked(false);
  };

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

  const getItemLayout = (_: unknown, index: number) => ({
    length: SLIDE_WIDTH,
    offset: SLIDE_WIDTH * index,
    index,
  });

  if (carouselItems.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper}>
        <FlatList
          ref={flatListRef}
          data={carouselItems}
          horizontal
          pagingEnabled
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          getItemLayout={getItemLayout}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.slide}
              onPress={() => setZoomedImageUri(item.imageUri)}
            >
              <Image source={{ uri: item.imageUri }} style={styles.image} resizeMode="cover" />
              <View style={styles.overlay} />
            </TouchableOpacity>
          )}
        />

        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <MBPlayPauseBtn isPlaying={isPlaying} onPress={togglePlayPause} />

        <View style={styles.tagsContainer}>
          <MBTagWithLabel label="Novo" />
          <MBTagWithLabel label="Oferta" />
        </View>
      </View>

      <View style={styles.bulletsContainer}>
        {carouselItems.map((item, index) => (
          <MBProgressDot
            key={item.id}
            active={index === activeIndex}
            progress={timerProgress}
            onPress={() => goToIndex(index)}
          />
        ))}
      </View>

      <Modal
        visible={Boolean(zoomedImageUri)}
        animationType="fade"
        transparent
        onRequestClose={() => setZoomedImageUri(null)}
      >
        <View style={styles.zoomBackdrop}>
          <TouchableOpacity
            style={styles.zoomCloseButton}
            onPress={() => setZoomedImageUri(null)}
          >
            <Icons.xMarkCircleSolid color="#FFFFFF" width={34} height={34} />
          </TouchableOpacity>
          <Image
            source={{ uri: zoomedImageUri || undefined }}
            style={styles.zoomedImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
  },
  sliderWrapper: {
    width: '100%',
    height: CAROUSEL_HEIGHT,
    // borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: PrimaryColors.primaryLight,
  },
  slide: {
    width: SLIDE_WIDTH,
    height: CAROUSEL_HEIGHT,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textWrapper: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 90,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#F1F1F1',
    fontSize: 13,
    fontWeight: '500',
  },
  bulletsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    minHeight: 16,
    gap: 6,
  },
  zoomBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  zoomedImage: {
    width: '100%',
    height: '84%',
  },
  zoomCloseButton: {
    position: 'absolute',
    top: 52,
    right: 16,
    zIndex: 2,
  },
  tagsContainer: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
    flexDirection: 'row',
    gap: 8,
  },
});