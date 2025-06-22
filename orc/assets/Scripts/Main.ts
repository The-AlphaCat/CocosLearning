import { __private, _decorator, Button, Component, Node,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property({ type: Button })
    play: Button = null;

    onLoad() {
        this.play.node.on(Button.EventType.CLICK, this.onPlayClick, this);
    }
    onPlayClick() {
        director.loadScene('scene');
    }

    start() {

    }

    update(deltaTime: number) {

    }
}

