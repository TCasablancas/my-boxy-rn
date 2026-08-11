/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import SplashView from './app/pages/splash/SplashView';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => SplashView);
