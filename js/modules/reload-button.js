
import gameReload from"./reload-game.js"

let reloadButton = function() {
    const gameOver = document.createElement('button');
            gameOver.innerHTML = 'Game Over';
            gameOver.className = 'btn btn-outline-danger';
            gameOver.onclick = gameReload;
            document.body.append(gameOver);
            clearInterval(game);
};

export default reloadButton;
export default gameReload;