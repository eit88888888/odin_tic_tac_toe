const gameObj = {
    gameboard: ['', '', '', '', '', '', '', '', ''],
    game: {
      winCombination: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
      currentPlayer: "X"
    },
     gameEnded: false,

    displayBoard: function() {
      this.gameboard.forEach((cell, index) => {
        const cellDiv = document.querySelector(`[data-cell-index="${index}"]`);
        if (cellDiv) {
          cellDiv.textContent = cell;
        }
      });
    },

    makeMove: function(position) {
      if (this.gameEnded) {
        return;
      }

      if (this.gameboard[position] === '') {
        this.gameboard[position] = this.game.currentPlayer;

        if (this.checkWin()) {
          document.querySelector('p').textContent = `${this.game.currentPlayer} wins!`;
          this.displayBoard();
          this.gameEnded = true;
          return true;
        }

        if (this.gameboard.every(cell => cell !== '')) {
          document.querySelector('p').textContent = 'Draw';
          this.displayBoard();
          this.gameEnded = true;
          return true; 
        }

        this.game.currentPlayer = this.game.currentPlayer === "X" ? "O" : "X";
        this.displayBoard();
        return false;
      } else {
        document.querySelector('p').textContent = 'Already taken, try again!';
      }
    },

    checkWin: function() {
      return this.game.winCombination.some(comb => {
        const [a, b, c] = comb;
        return this.gameboard[a] && this.gameboard[a] === this.gameboard[b] && this.gameboard[a] === this.gameboard[c];
      });
    },

    resetGame: function() {
      this.gameboard.fill('');
      this.game.currentPlayer = "X";
      this.gameEnded = false;
      this.displayBoard();
      document.querySelector('p').textContent = '';
    },

    initialize: function() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.addEventListener('click', () => {
          const position = cell.getAttribute('data-cell-index');
          if (!this.makeMove(position)) {
            return;
          }
        });
      });

      document.querySelector('.start-btn').addEventListener('click', () => this.resetGame());
      this.displayBoard();
    }
}

gameObj.initialize();
