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
		flex: 1,
		margin: '1em',
		flexDirection: 'column',
		padding: 10,
	},
	drawPile: {
		width: '20vh',
		height: '20vh',
	},
	image: {
		flex: 1,
		resizeMode: 'contain',
		backgroundImage: 'url(https://i.imgur.com/MM6wckg.jpg)',
	},

	rule: {
		height: '100%',
		width: '100%',
		paddingTop: '35%',
		position: 'absolute',
		zIndex: 1,
		fontSize: '20px',
		color: 'black',
		textAlign: 'center',
		backgroundColor: 'rgba(255,255,255,0.4)',
	},
	title: {
		flex: 1,
		color: 'antiquewhite',
	},
});

export default CardPanelStyles;
