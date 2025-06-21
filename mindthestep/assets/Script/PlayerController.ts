import { _decorator, Animation, animation, Component, EventMouse, Node, systemEvent, SystemEventType, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private startJump: boolean = false;
    private jumpStep: number = 0;
    private curJumpTime: number = 0;
    private jumpTime: number = 0.1;
    private curJumpSpeed: number = 0;
    private curPos = new Vec3();
    private targetPos = new Vec3();
    private deltaPos = new Vec3();
    private isMoving: boolean = false;

    @property({
        type: Animation
    })
    cocosAnim: Animation | null = null;

    start() {
        systemEvent.on(SystemEventType.MOUSE_UP, this.onMouseUp, this);;
    }

    onMouseUp(event: EventMouse) {
        if (event.getButton() === 0){
            this.jumpByStep(1);
        }
        else if (event.getButton()==2) {
            this.jumpByStep(2);
        }
    }

    jumpByStep(step: number) {
        if (this.isMoving) return;
        this.startJump = true;
        this.jumpStep = step;
        this.curJumpTime = this.jumpStep / this.jumpTime;
        this.node.getPosition(this.curPos);
        Vec3.add(this.targetPos, this.curPos, new Vec3(step, 0, 0));

        if (this.cocosAnim) {
            this.cocosAnim.play('cocos_anim_jump');
        }
    }



    update(deltaTime: number) {
        if (this.startJump) {
            this.curJumpTime += deltaTime;
            if (this.curJumpTime > this.jumpTime) {
                this.node.setPosition(this.targetPos);
                this.startJump = false;
                this.onOnceJump();
            }
            else {
                this.node.getPosition(this.curPos);
                this.deltaPos.x = this.curJumpSpeed * deltaTime;
                this.node.setPosition(this.curPos);
            }
        }
        
    }
    onOnceJump() {
        this.isMoving = false;
    }
}

