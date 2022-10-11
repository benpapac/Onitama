import { StyleSheet } from 'react-native';

export const CardPanelStyles = StyleSheet.create({
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
		flex: 2,
		height: '100px',
		width: '200px',
	},
	title: {
		flex: 1,
	},
});
