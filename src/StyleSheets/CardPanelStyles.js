import { StyleSheet } from 'react-native';

export const CardPanelStyles = StyleSheet.create({
	container: {
		height: '80vh',
		width: '20vw',
		display: 'flex',
		flexDirection: 'column',
	},

	background: {
		height: '100%',
	},
	panel: {
		flex: 1,
		// backgroundColor: 'gray',
		flexDirection: 'column',
		padding: 10,
	},
	image: {
		flex: 1,
	},
	title: {
		flex: 1,
		color: 'antiquewhite',
	},
});
