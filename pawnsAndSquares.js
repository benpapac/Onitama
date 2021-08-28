const pawnsList = {
	pinkPawnA: document.querySelector(`#${pawnNamesArray[0]}`),
	pinkPawnB: document.querySelector(`#${pawnNamesArray[1]}`),
	pinkPawnSage: document.querySelector(`#${pawnNamesArray[2]}`),
	pinkPawnD: document.querySelector(`#${pawnNamesArray[3]}`),
	pinkPawnE: document.querySelector(`#${pawnNamesArray[4]}`),

	bluePawnA: document.querySelector(`#${pawnNamesArray[5]}`),
	bluePawnB: document.querySelector(`#${pawnNamesArray[6]}`),
	bluePawnSage: document.querySelector(`#${pawnNamesArray[7]}`),
	bluePawnD: document.querySelector(`#${pawnNamesArray[8]}`),
	bluePawnE: document.querySelector(`#${pawnNamesArray[9]}`),
};


function doPawnsMatch(newPawnColor) {
	if (newPawnColor !== thisPawn.dataset.color) {
		return (pawnsMatch = false);
	} else {
		return (pawnsMatch = true);
	}
}
