import { StyleSheet } from "react-native"
export const BoardStyles = StyleSheet.create({
	board: {
		flex: 1,
		width: '80vh',
		height: '80vh',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
        transform: "rotate(90deg)",
		// padding: "1em",
	},
	square: {
		width: '16vh',
		height: '16vh',
		border: 'solid 1px black',
	},
});