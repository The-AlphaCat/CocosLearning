import { __private, _decorator, CCInteger, Component, director, EventKeyboard, input, Input, KeyCode, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Result } from './Result';
@ccclass('GameManager')
export class GameManager extends Component {
    @property({
        type: Ground,
    })
    public ground: Ground;
    @property({
        type: Result,
    })
    public result: Result;

    @property({
        type: CCInteger,
    })
    public groundSpeed: number = 50;
    @property({
        type: CCInteger,
    })
    public pipeSpeed: number = 20;

    onLoad() {
    }

    initListeners() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
                break;
            case KeyCode.KEY_D:
                this.result.addScore();
                break;
            case KeyCode.KEY_R:
                this.resetGame();
                break;
            default:
                break;
        }
    }

    startGame() {
    }

    gameOver() {
        this.result.showResults();
        director.pause();
    }

    resetGame() {

    }
}

