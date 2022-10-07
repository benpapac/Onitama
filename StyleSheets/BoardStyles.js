import { StyleSheet } from "react-native"
export const BoardStyles = StyleSheet.create({
    board: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "1em",
    },
    square: {
        width: '160px',
        height: '160px',
    }
})