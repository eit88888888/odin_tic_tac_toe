const gameObj = {
    gameboard: ['', '', '', '', '', '', '', '', ''],
    game: {
      winCombination: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [2, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
      currentPlayer: "X"
    },
    player1: {},
    player2: {},

    displayBoard: function() {
      console.log(this.gameboard.slice(0, 3));
      console.log(this.gameboard.slice(3, 6));
      console.log(this.gameboard.slice(6, 9));
    },

    makeMove: function(position) {
      if (this.gameboard[position] === '') {
        this.gameboard[position] = this.game.currentPlayer;

      if (this.checkWin()) {
        console.log(`${this.game.currentPlayer} wins`);
        this.displayBoard();
        return true;
      }

      this.game.currentPlayer = this.game.currentPlayer === "X" ? "O" : "X";
      return false;
      
      
     } else {
        console.log("Already taken, try again!");
      }
    },

    checkWin: function() {
      return this.game.winCombination.some(comb => {
        const [a, b, c] = comb;
        return this.gameboard[a] && this.gameboard[a] === this.gameboard[b] && this.gameboard[a] === this.gameboard[c];
      });
    },

    playGame: function() {
      let moves = 0;
      while (moves < 9) {
        this.displayBoard();
        // const promtPosition = prompt(`Player ${this.game.currentPlayer}, enter 0-8:`);
        if (this.makeMove(promtPosition)) {
          return;
        }
        moves++
      }
      console.log('Draw');
      this.displayBoard();
    }
}

gameObj.playGame();