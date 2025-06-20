import { _decorator, Component, input, Input, EventKeyboard, KeyCode, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property({ type: Number })
    moveSpeed: number = 200;

    @property({ type: Number })
    jumpForce: number = 1200;

    @property({ type: Number })
    sprintMultiplier: number = 1.5;

    @property private isGrounded: boolean = false;
    @property private isSprinting: boolean = false;
    private rb: RigidBody2D | null = null;
    private moveDir: number = 0;

    onLoad() {
        this.rb = this.getComponent(RigidBody2D);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onBeginContact() {
        this.isGrounded = true;
    }

    onEndContact() {
        this.isGrounded = false;
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === KeyCode.KEY_A) this.moveDir = -1;
        else if (event.keyCode === KeyCode.KEY_D) this.moveDir = 1;
        else if (event.keyCode === KeyCode.SHIFT_LEFT) this.isSprinting = true;
        else if (event.keyCode === KeyCode.SPACE && this.isGrounded && this.rb) {
            this.rb.applyLinearImpulseToCenter(new Vec2(0, this.jumpForce), true);
            this.isGrounded = false;
        }
    }

    onKeyUp(event: EventKeyboard) {
        if ((event.keyCode === KeyCode.KEY_A && this.moveDir === -1) ||
            (event.keyCode === KeyCode.KEY_D && this.moveDir === 1)) {
            this.moveDir = 0;
        }
        if (event.keyCode === KeyCode.SHIFT_LEFT) this.isSprinting = false;
    }

    update(dt: number) {
        if (this.rb) {
            const speed = this.isSprinting ? this.moveSpeed * this.sprintMultiplier : this.moveSpeed;
            const velocity = this.rb.linearVelocity;
            velocity.x = this.moveDir * speed;
            this.rb.linearVelocity = velocity;
        }
    }
}
