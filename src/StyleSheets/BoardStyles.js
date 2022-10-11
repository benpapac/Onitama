import { StyleSheet } from 'react-native';
export const BoardStyles = StyleSheet.create({
	table: {
		height: '70vh',
		width: '100vw',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignContent: 'space-evenly',
	},
	board: {
		width: '80vh',
		height: '80vh',

		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		// transform: "rotate(90deg)",
		// padding: "1em",
	},

	background: {
		width: '16vh',
		height: '16vh',
		resizeMode: 'cover',
	},
	square: {
		width: '16vh',
		height: '16vh',
		border: 'solid 1px black',
		// backgroundColor: 'brown',
		backgroundImage: 'https://imgur.com/wESlb39',
	},

	glowSquare: {
		width: '16vh',
		height: '16vh',
		border: 'solid 1px black',

		backgroundColor: 'rgba(205,205,205,0.7)',
	},

	pawn: {
		height: '100%',
		width: '100%',
	},
});