import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Modal, PanResponder, Pressable, Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Icons } from '../../../common/icons/Icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import styles from './styles';

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

  const panResponder = useMemo(() => PanResponder.create({
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
        animationType="slide" transparent={true} visible={visible} onRequestClose={closeBottomsheet}
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
                  {title && <Text style={[styles.title, { textAlign: headerAlign }]}>{title}</Text>}
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