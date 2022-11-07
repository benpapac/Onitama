import { StyleSheet } from 'react-native';

const CardPanelStyles = StyleSheet.create({
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
		flex: 2,
		// backgroundColor: 'gray',
		flexDirection: 'column',
		padding: 10,
	},
	drawPile: {
		width: '20vh',
		height: '20vh',
	},
	image: {
		flex: 1,
	},
	title: {
		flex: 1,
		color: 'antiquewhite',
	},
});

export default CardPanelStyles;
