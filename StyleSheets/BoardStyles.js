import { StyleSheet } from 'react-native';
export const BoardStyles = StyleSheet.create({
	table: {
		flexDirection: 'row',
	},
	board: {
		marginLeft: '10vw',
		marginRight: '10vw',
		width: '70vh',
		height: '80vh',

		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		// transform: "rotate(90deg)",
		// padding: "1em",
	},
	square: {
		width: '16vh',
		height: '16vh',
		border: 'solid 1px black',
		backgroundColor: 'brown',
	},

	glowSquare: {
		width: '16vh',
		height: '16vh',
		border: 'solid 1px black',

		backgroundColor: 'rgba(205,205,205,0.7)',
	},

	pawn: {
		height: "100%",
		width: "100%",
	}
});
