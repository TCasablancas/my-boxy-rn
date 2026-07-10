import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Modal, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icons } from '../../common/constants/Icons';

interface MBMainBottomsheetProps {
  title?: string;
  description?: string;
  headerImage?: React.ReactNode;
  visible?: boolean;
  content: React.ReactNode;
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
                <Icons.xMark />
              </Pressable>
            )}
            <View style={styles.handleCap} />
              {headerImage && <View style={styles.headerImage}>{headerImage}</View>}
              {title && 
                <Text style={[styles.title, { textAlign: headerAlign }]}>{title}</Text>}
              {description && 
                <Text style={[styles.description, { textAlign: headerAlign }]}>{description}</Text>}
            <View style={styles.contentBox}>{content}</View>
            {actionButton && <View style={styles.actionButton}>{actionButton}</View>}
            
          </Animated.View>
        </View>
      </View>
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
    paddingHorizontal: 16,
    paddingBottom: 24,
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  contentBox: {
    alignSelf: 'stretch',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginTop: 16,
    alignItems: 'stretch',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  handleCap: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  title: {
    width: '100%',
    fontFamily: 'SNPro-Regular',
    fontSize: 20,
    marginTop: 16,
    textAlign: 'left',
  },
  description: {
    width: '100%',
    fontFamily: 'SNPro-Light',
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
    marginTop: 4,
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