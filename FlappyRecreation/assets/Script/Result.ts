import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {
    @property({
        type: Label,
    })
    public score: Label;
    @property({
        type: Label,
    })
    public highScore: Label;
    @property({
        type: Label,
    })
    public tryAgain: Label;

    maxScore: number = 0;
    currentScore: number;

    updateScore(num: number) {
        this.score.string = ('' + this.currentScore);
    }

    resetScore() {
        this.updateScore(0);
        this.hideResults();
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.maxScore = Math.max(this.currentScore, this.maxScore);
        this.highScore.string = ('High Score' + this.maxScore);
        this.tryAgain.node.active = true;
    }

    hideResults() {
        this.highScore.node.active = false;
        this.tryAgain.node.active = false;
    }

}

