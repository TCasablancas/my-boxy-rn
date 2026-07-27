import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Modal, PanResponder, Pressable, Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Icons } from '../../common/icons/Icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

interface MBMainBottomsheetProps {
  title?: string;
  description?: string;
  headerImage?: React.ReactNode;
  visible?: boolean;
  content: React.ReactNode;
  contentBgNull?: boolean;
  onClose?: () => void;
  headerAlign?: 'center' | 'left';
  actionButton?: React.ReactNode;
  closeButton?: boolean;
}

export default function MBMainBottomsheet({ 
  title, 
  description, 
  headerImage,
  visible = false, 
  content, 
  contentBgNull,
  onClose, 
  headerAlign = 'center', 
  actionButton,
  closeButton
}: MBMainBottomsheetProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const isClosingRef = useRef(false);
  const [sheetHeight, setSheetHeight] = useState(0);

  useEffect(() => {
    if (!visible) {
      isClosingRef.current = false;
      translateY.setValue(0);
    }
  }, [translateY, visible]);

  const closeBottomsheet = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    const closeDistance = Math.max(sheetHeight + 80, 260);
    Animated.timing(translateY, {
      toValue: closeDistance,
      duration: 180,
      useNativeDriver: true,
    }).start(() => { onClose?.() });
  }, [onClose, sheetHeight, translateY]);

  const panResponder = useMemo(
    () => PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => (
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && gestureState.dy > 2
      ),
      onPanResponderGrant: () => {
        translateY.stopAnimation();
      },
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(Math.max(0, gestureState.dy));
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = Math.max(90, sheetHeight * 0.25);
        const shouldClose = gestureState.dy > threshold || gestureState.vy > 1.2;

        if (shouldClose) {
          closeBottomsheet();
          return;
        }

        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 7,
          tension: 80,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 7,
          tension: 80,
        }).start();
      },
    }),
    [closeBottomsheet, sheetHeight, translateY],
  );

  if (!visible) {
    return null;
  }

  return (
      <Modal 
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeBottomsheet}
      >
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.75)" />
          <View style={styles.container}>
            <Pressable style={styles.backdrop} onPress={closeBottomsheet} />
            <View style={styles.sheetHost}>
              <Animated.View
                style={[styles.content, { transform: [{ translateY }] }]}
                onLayout={(event) => {
                  setSheetHeight(event.nativeEvent.layout.height);
                }}
                {...panResponder.panHandlers}
              >
                {closeButton && (
                  <Pressable style={[styles.closeBtn]} onPress={closeBottomsheet}>
                    <Icons.xMarkCircleSolid width={24} height={24} color={NeutralColors.textSecondary} />
                  </Pressable>
                )}
                <Pressable onPress={() => {}} style={{ width: '100%', alignItems: 'center' }}>
                  <View style={styles.handleCap} />
                  {headerImage && <View style={styles.headerImage}>{headerImage}</View>}
                  {title && 
                    <Text style={[styles.title, { textAlign: headerAlign }]}>{title}</Text>}
                  {description && 
                    <Text style={[styles.description, { textAlign: headerAlign }]}>{description}</Text>}
                  <View style={[
                    styles.contentBox,
                    { backgroundColor: contentBgNull ? 'transparent' : NeutralColors.systemBackground || NeutralColors.systemBackground }
                  ]}>
                    {content}
                  </View>
                  {actionButton && <View style={styles.actionButton}>{actionButton}</View>}
                </Pressable>
              </Animated.View>
            </View>
          </View>
        </SafeAreaProvider>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    height: '100%',
    width: '100%',
  },
  sheetHost: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    bottom: Platform.OS === 'ios' ? 20 : 0,
  },
  contentBox: {
    alignSelf: 'stretch',
    padding: 8,
    borderRadius: 16,
    marginTop: 16,
    alignItems: 'stretch',
  },
  closeBtn: {
    position: 'absolute',
    top: 32,
    right: 16,
    zIndex: 10,
  },
  handleCap: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: NeutralColors.border,
  },
  title: {
    width: '100%',
    fontFamily: 'SNPro-Bold',
    letterSpacing: -0.5,
    fontSize: 22,
    marginTop: 16,
    paddingHorizontal: 16,
    color: PrimaryColors.primaryDark,
  },
  description: {
    width: '100%',
    fontFamily: 'SNPro-Light',
    fontSize: 16,
    color: NeutralColors.textPlaceholder,
    paddingHorizontal: 16,
    lineHeight: 19,
    marginTop: 8,
  },
  headerImage: {
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
});