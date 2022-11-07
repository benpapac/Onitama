import { expect } from 'chai';



describe(' the AI', ()=>{

    let game = new Game();
    let piece = game.currentPlayer.pieces.find(piece => piece.name === 'pking');

    game = game.chooseCard('boar');
    game = game.choosePiece(piece);
    game = game.createThreats();
    game = game.chooseSquare([1,2]);
    game = game.movePiece();
    game = game.startNewTurn();


    expect('1) should create a copy of the current game',(done)=>{
        ai.miniMax(game);
    });
});