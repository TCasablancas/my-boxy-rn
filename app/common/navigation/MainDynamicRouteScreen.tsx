import { Text, View } from 'react-native';
import { resolveDynamicNavigationComponent } from './MainNavigation';

type DynamicRouteParams = {
  __componentKey?: string;
  __componentParams?: Record<string, unknown>;
};

interface MainDynamicRouteScreenProps {
  route?: {
    params?: DynamicRouteParams;
  };
}

export default function MainDynamicRouteScreen({ route }: MainDynamicRouteScreenProps) {
  const componentKey = route?.params?.__componentKey;
  const componentParams = route?.params?.__componentParams;
  const TargetComponent = resolveDynamicNavigationComponent(componentKey);

  if (!TargetComponent) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ textAlign: 'center' }}>
          Nao foi possivel abrir esta tela. Verifique o componente informado na navegacao.
        </Text>
      </View>
    );
  }

  return <TargetComponent {...(componentParams ?? {})} />;
}