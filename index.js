import { AppRegistry } from 'react-native';
import App from './App';
import TestApp from './test/test.App';

// AppRegistry.registerComponent('App', () => App);
AppRegistry.registerComponent('TestApp', () => TestApp);

// AppRegistry.runApplication('App', {
// 	rootTag: document.getElementById('root '),
// });

AppRegistry.runApplication('TestApp', {
	rootTag: document.getElementById('root'),
});
