import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  ...args: T extends unknown
    ? undefined extends RootStackParamList[T]
      ? [name: T, params?: RootStackParamList[T]]
      : [name: T, params: RootStackParamList[T]]
    : never
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}