import { _decorator, Canvas, CCFloat, Component, Node, UITransform, Vec3, } from 'cc';
const { ccclass, property } = _decorator;


import { GameManager } from './GameManager';
@ccclass('Ground')
export class Ground extends Component {
    @property({ type: Canvas }) canvas: Canvas;
    @property({ type: Node }) public ground1: Node;
    @property({ type: Node }) public ground2: Node;
    @property({ type: Node }) public ground3: Node;

    @property({ type: Node }) public backGround1: Node;
    @property({ type: Node }) public backGround2: Node;

    @property({ type: CCFloat }) groundWidth1: number;
    @property({ type: CCFloat }) groundWidth2: number;
    @property({ type: CCFloat }) groundWidth3: number;
    @property({ type: CCFloat }) canvasWidth: number;

    @property({ type: CCFloat }) backGroundWidth1: number;
    @property({ type: CCFloat }) backGroundWidth2: number;

    private tempGroundLocation1 = new Vec3;
    private tempGroundLocation2 = new Vec3;
    private tempGroundLocation3 = new Vec3;

    public gameManager = new GameManager;
    private gameSpeed: number;

    onLoad() {
        this.startUp();
    }

    startUp() {

        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.tempGroundLocation1.x = 0;
        this.tempGroundLocation2.x = this.groundWidth1;
        this.tempGroundLocation3.x = this.groundWidth2 + this.groundWidth2;

        this.ground1.setPosition(this.tempGroundLocation1);
        this.ground2.setPosition(this.tempGroundLocation2);
        this.ground3.setPosition(this.tempGroundLocation3);

        this.backGroundWidth1 = this.backGround1.getComponent(UITransform).width;
        this.backGroundWidth2 = this.backGround2.getComponent(UITransform).width;

    }


    update(deltaTime: number) {
        this.gameSpeed = this.gameManager.groundSpeed;
        this.Moveground(deltaTime);
        this.MoveBackground(deltaTime);
        this.ResetGround(deltaTime);
    }

    ResetGround(deltaTime: number) {
        if (this.ground1.position.x <= (0 - this.groundWidth1)) {
            this.ground1.position = new Vec3(this.canvas.getComponent(UITransform).contentSize.width, this.ground1.position.z);
        }
        if (this.ground2.position.x <= (0 - this.groundWidth2)) {
            this.ground2.position = new Vec3(this.canvas.getComponent(UITransform).contentSize.width, this.ground2.position.y, this.ground2.position.z);
        }
        if (this.ground3.position.x <= (0 - this.groundWidth3)) {
            this.ground3.position = new Vec3(this.canvas.getComponent(UITransform).contentSize.width, this.ground3.position.y, this.ground3.position.z);
        }
    }

    private Moveground(deltaTime: number) {
        this.ground1.position = new Vec3(this.ground1.position.x - this.gameSpeed * deltaTime, this.ground1.position.y, this.ground1.position.z);
        this.ground2.position = new Vec3(this.ground2.position.x - this.gameSpeed * deltaTime, this.ground2.position.y, this.ground2.position.z);
        this.ground3.position = new Vec3(this.ground3.position.x - this.gameSpeed * deltaTime, this.ground3.position.y, this.ground3.position.z);
    }

    private MoveBackground(deltaTime: number) {
        this.backGround1.position = new Vec3(this.backGround1.position.x - (this.gameSpeed / 2 * deltaTime), this.backGround1.position.y, this.backGround1.position.z);
        this.backGround2.position = new Vec3(this.backGround2.position.x - (this.gameSpeed / 2 * deltaTime), this.backGround2.position.y, this.backGround2.position.z);

    }

    ResetBackGround(deltaTime: number) {
        if (this.backGround1.position.x <= (0 - this.backGroundWidth1)) {
            this.backGround1.position = new Vec3(this.canvas.getComponent(UITransform).contentSize.width, this.ground1.position.z);
        }

    }
}

