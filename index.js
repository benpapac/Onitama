import { AppRegistry } from 'react-native';
import App from './App';
import Context from 'Utils/context';


AppRegistry.registerComponent('App', () => App);


AppRegistry.runApplication('App', {
	rootTag: document.getElementById('root '),
});
