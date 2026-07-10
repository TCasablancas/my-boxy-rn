import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { spacing, typography } from '../../common/constants/Typgraphy';

interface MBStepperHeaderProps {
  steps: string[]; // rótulos de cada etapa, ex: ['Nome e Usuário', 'Contato', 'Documento', 'Endereço']
  currentIndex: number; // índice da etapa atual (0-based)
}

export const MBStepperHeader: React.FC<MBStepperHeaderProps> = ({ steps, currentIndex }) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const labelOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const progressRatio = steps.length > 1
      ? currentIndex / (steps.length - 1)
      : 1;

    Animated.timing(progressAnim, {
      toValue: progressRatio,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    labelOpacity.setValue(0);
    Animated.timing(labelOpacity, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [currentIndex, labelOpacity, progressAnim, steps.length]);

  const progressWidth = Animated.multiply(progressAnim, trackWidth);

  return (
    <View style={styles.container}>
      <View
        style={styles.track}
        onLayout={(event) => {
          setTrackWidth(event.nativeEvent.layout.width);
        }}
      >
        <Animated.View style={[styles.progress, { width: progressWidth }]} />
      </View>

      <Animated.Text style={[styles.stepLabelCurrent, { opacity: labelOpacity }]}>
        {steps[currentIndex]}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  track: { 
    height: 8,
    borderRadius: 999,
    backgroundColor: NeutralColors.backgroundAlt,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: PrimaryColors.primary,
  },
  stepLabelCurrent: {
    ...typography.caption,
    textAlign: 'left',
    color: NeutralColors.textPlaceholder,
    fontWeight: '400',
  },
});
