import Gameboard from "./Gameboard";

class Player{
    constructor(){
        this.gameboard = new Gameboard;
    }
    attack(enemyGameboard,[row,col]){
        enemyGameboard.receiveAttack([row,col])
    }
}

export default Player