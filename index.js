/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './assets/styles/theme/default';
import {Provider as PaperProvider} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import App from './src/App/App';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
      <PaperProvider
        settings={{
          icon: props => <Feather {...props} />,
        }}>
        <App />
      </PaperProvider>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
