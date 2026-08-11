import React, { useMemo } from 'react';
import {
  BackdropBlur,
  Blur,
  BlurMask,
  Canvas,
  Fill,
  Group,
  Path,
  rect,
  rrect,
  Skia,
} from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';

export const MBBlurredCard = ({ 
  width, height, child
}: { width: number; height: number; child: React.ReactNode }) => {

  const { width: WindowWidth, height: WindowHeight } = Dimensions.get('window');

  const clipPath = useMemo(() => {
    const skPath = Skia.Path.Make();
    const x = WindowWidth / 2 - 150;
    const y = WindowHeight / 2 - 100;
    const r = 20;
    skPath.addRRect(rrect(rect(x, y, width, height), r, r));
    return skPath;
  }, []);

  return (
    <Group>
      <Path path={clipPath} color={'rgba(255, 255, 255, 0.1)'} />
      <Path
        path={clipPath}
        style={'stroke'}
        strokeWidth={2}
        opacity={0.5}
        color={'rgba(255, 255, 255, 0.2)'}
      />
      {child}
      <BlurMask blur={0} />
      <BackdropBlur blur={200} clip={clipPath} />
    </Group>
  );
};