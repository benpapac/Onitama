import { StyleSheet } from 'react-native';

const WinScreenStyles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(200,133,88,0.6)',
		borderRadius: '3em',
		border: 'solic black 1px',
		padding: '2vh',
		zIndex: '1',
		position: 'fixed',
	},
	headline: {
		fontSize: '20px',
		height: '100%',
		width: '80vw',
		textAlign: 'center',
		color: 'rgba(245,213,200,1)',
	},
});

export default WinScreenStyles;
