import {
  CommonActions,
  NavigationState,
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

type DynamicRoutePayload = {
  __componentKey: string;
  __componentParams?: RouteParams;
};

type ResolvedTarget = {
  routeName: string;
  params?: RouteParams;
};

type RootNavigationParamList = RootStackParamList & ParamListBase;

export const DYNAMIC_COMPONENT_ROUTE_NAME = '__MainNavigationDynamicRoute__';

export const navigationRef = createNavigationContainerRef<RootNavigationParamList>();

const pendingActions: NavigationAction[] = [];
const routeNameByComponent = new Map<RouteComponent, string>();
const dynamicKeyByComponent = new Map<RouteComponent, string>();
const componentByDynamicKey = new Map<string, RouteComponent>();

export function registerNavigationTarget(routeName: RouteName, component: RouteComponent) {
  routeNameByComponent.set(component, String(routeName));
}

function resolveDynamicComponentKey(component: RouteComponent) {
  const existingKey = dynamicKeyByComponent.get(component);
  if (existingKey) {
    return existingKey;
  }

  const componentName = component.displayName || component.name || 'AnonymousScreen';
  const nextKey = `${componentName}-${componentByDynamicKey.size + 1}`;

  dynamicKeyByComponent.set(component, nextKey);
  componentByDynamicKey.set(nextKey, component);

  return nextKey;
}

function findRouteNameInState(state: NavigationState | undefined, routeName: string): boolean {
  if (!state) {
    return false;
  }

  if (state.routeNames.includes(routeName)) {
    return true;
  }

  for (const route of state.routes) {
    const nestedState = route.state as NavigationState | undefined;
    if (nestedState && findRouteNameInState(nestedState, routeName)) {
      return true;
    }
  }

  return false;
}

function isKnownRouteName(routeName: string) {
  if (routeName === DYNAMIC_COMPONENT_ROUTE_NAME) {
    return true;
  }

  if (!navigationRef.isReady()) {
    return true;
  }

  const rootState = navigationRef.getRootState();
  return findRouteNameInState(rootState as NavigationState | undefined, routeName);
}

function resolveTarget(target: RouteTarget, params?: RouteParams): ResolvedTarget {
  if (typeof target === 'string') {
    const routeName = target.trim();

    if (!routeName) {
      console.warn('MainNavigation ignorou uma navegacao com rota vazia.');
      return {
        routeName: 'MainTabs',
        params: undefined,
      };
    }

    return {
      routeName,
      params,
    };
  }

  const routeName = routeNameByComponent.get(target);
  if (routeName) {
    return {
      routeName,
      params,
    };
  }

  const dynamicKey = resolveDynamicComponentKey(target);

  return {
    routeName: DYNAMIC_COMPONENT_ROUTE_NAME,
    params: {
      __componentKey: dynamicKey,
      __componentParams: params,
    } as DynamicRoutePayload,
  };
}

function assertKnownRouteName(routeName: string) {
  if (isKnownRouteName(routeName)) {
    return true;
  }

  console.warn(
    `MainNavigation ignorou a rota "${routeName}" porque ela nao existe no navegador atual. Use a View importada ou registre a rota no RootStack.`,
  );

  return false;
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
  const resolved = resolveTarget(target, params);
  if (!assertKnownRouteName(resolved.routeName)) {
    return;
  }

  dispatchOrQueue(
    CommonActions.navigate({
      name: resolved.routeName,
      params: resolved.params,
    }),
  );
}

export function push(target: RouteTarget, params?: RouteParams) {
  const resolved = resolveTarget(target, params);
  if (!assertKnownRouteName(resolved.routeName)) {
    return;
  }

  dispatchOrQueue(StackActions.push(resolved.routeName, resolved.params));
}

export function replace(target: RouteTarget, params?: RouteParams) {
  const resolved = resolveTarget(target, params);
  if (!assertKnownRouteName(resolved.routeName)) {
    return;
  }

  dispatchOrQueue(StackActions.replace(resolved.routeName, resolved.params));
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
  const resolved = resolveTarget(target, params);
  if (!assertKnownRouteName(resolved.routeName)) {
    return;
  }

  dispatchOrQueue(
    CommonActions.reset({
      index: 0,
      routes: [{ name: resolved.routeName, params: resolved.params }],
    }),
  );
}

export function resolveDynamicNavigationComponent(componentKey?: string) {
  if (!componentKey) {
    return undefined;
  }

  return componentByDynamicKey.get(componentKey);
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
