import { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Pressable, Animated } from 'react-native';

interface MBCategoryBtnProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  isSelected?: boolean;
  activeBorderColor?: string;
}

export default function MBCategoryBtn({
  icon,
  title,
  onPress,
  isSelected = false,
  activeBorderColor = '#2BAE66',
}: MBCategoryBtnProps) {
  const borderAnimation = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(borderAnimation, {
      toValue: isSelected ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [borderAnimation, isSelected]);

  const animatedBorderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#DADADA', activeBorderColor],
  });

  return(
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.categoryBtnWrapper, { borderColor: animatedBorderColor }]}>
        <View style={styles.categoryBtnIcon}>
          {icon}
        </View>
        <Text style={styles.categoryBtnText}>{title}</Text>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  categoryBtnWrapper: {
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 60,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
  },
  categoryBtnIcon: {
    flex: 1,
    width: 40,
    height: 40,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBtnText: {
    flex: 1,
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});