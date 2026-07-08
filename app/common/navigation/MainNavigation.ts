import {
  CommonActions,
  NavigationAction,
  ParamListBase,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import type { ComponentType } from 'react';
import { RootStackParamList } from '../../navigation/types';

type RouteName = keyof RootStackParamList | string;
type RouteParams = Record<string, unknown> | undefined;
type RouteComponent = ComponentType<any>;
type RouteTarget = RouteName | RouteComponent;

type RootNavigationParamList = RootStackParamList & ParamListBase;

export const navigationRef = createNavigationContainerRef<RootNavigationParamList>();

const pendingActions: NavigationAction[] = [];
const routeNameByComponent = new Map<RouteComponent, string>();

export function registerNavigationTarget(routeName: RouteName, component: RouteComponent) {
  routeNameByComponent.set(component, String(routeName));
}

function resolveRouteName(target: RouteTarget) {
  if (typeof target === 'string') return target;

  const routeName = routeNameByComponent.get(target);
  if (routeName) return routeName;

  const componentName = target.displayName || target.name || 'UnknownComponent';
  throw new Error(
    `MainNavigation target not registered for component "${componentName}". Register it with registerNavigationTarget("RouteName", Component).`,
  );
}

function dispatchOrQueue(action: NavigationAction) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
    return;
  }

  pendingActions.push(action);
}

export function setMainNavigationReady() {
  if (!navigationRef.isReady()) return;

  while (pendingActions.length > 0) {
    const action = pendingActions.shift();
    if (action) {
      navigationRef.dispatch(action);
    }
  }
}

export function isMainNavigationReady() {
  return navigationRef.isReady();
}

export function navigate(target: RouteTarget, params?: RouteParams) {
  const routeName = resolveRouteName(target);
  dispatchOrQueue(
    CommonActions.navigate({
      name: String(routeName),
      params,
    }),
  );
}

export function push(target: RouteTarget, params?: RouteParams) {
  const routeName = resolveRouteName(target);
  dispatchOrQueue(StackActions.push(String(routeName), params));
}

export function replace(target: RouteTarget, params?: RouteParams) {
  const routeName = resolveRouteName(target);
  dispatchOrQueue(StackActions.replace(String(routeName), params));
}

export function pop(count = 1) {
  dispatchOrQueue(StackActions.pop(count));
}

export function popToTop() {
  dispatchOrQueue(StackActions.popToTop());
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetTo(target: RouteTarget, params?: RouteParams) {
  const routeName = resolveRouteName(target);
  dispatchOrQueue(
    CommonActions.reset({
      index: 0,
      routes: [{ name: String(routeName), params }],
    }),
  );
}

export function currentRouteName() {
  return navigationRef.getCurrentRoute()?.name;
}

const MainNavigation = {
  registerNavigationTarget,
  navigate,
  push,
  replace,
  pop,
  popToTop,
  goBack,
  resetTo,
  currentRouteName,
  isReady: isMainNavigationReady,
};

export default MainNavigation;
