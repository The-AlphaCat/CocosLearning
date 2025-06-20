import { _decorator, Component, EventMouse, Node, systemEvent, SystemEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private startJump: boolean = false;
    private jumpStep: number = 0;
    private curJumpTime: number = 0;
    private JumpTime: number = 0.1;
    private curPos = new

    start() {
        systemEvent.on(SystemEventType.MOUSE_UP, this.onMouseUp, this);;
    }
    onMouseUp(event: EventMouse) {

}

    update(deltaTime: number) {
        
    }
}

