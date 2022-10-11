import { StyleSheet, Dimensions } from 'react-native';

let ScreenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
	background: {
		height: '100%',
		width: '100%',
		zIndex: '-1',
		position: 'absolute',
		top: '0',
	},
	container: {
		height: '100vh',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)',
		// backgroundColor: 'darkgrey',
	},
	header: {
		marginVertical: '5vh',
		// padding: 20,
	},
	title: {
		fontWeight: 'bold',
		fontSize: '3rem',
		color: 'rgba(245,213,200,1)',
		marginVertical: '1em',
		textAlign: 'center',
	},
	text: {
		lineHeight: '1.5em',
		fontSize: '1.125rem',
		marginVertical: '1em',
		textAlign: 'center',
	},
	link: {
		color: '#1B95E0',
	},
	code: {
		fontFamily: 'monospace, monospace',
	},

	button: {
		width: '10vw',
		height: '6vw',
	},
});
