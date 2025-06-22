import { _decorator, Component, Node, UITransform, Sprite, CCBoolean, Vec2, Input, input, __private, EventMouse, EventKeyboard, CCInteger, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Orc')


export class Orc extends Component {
    @property({ type: CCInteger })
    private speed = 5;
    @property ani: Animation = null!;
    @property isWalking: boolean = false;

    //Not shown in the inspector
    private speedPrivate: number = 50;

    onLoad() {
        //Mouse event; when a node is clicked
        this.node.on(Input.EventType.MOUSE_DOWN, this.onClickDowm, this);
        this.node.on(Input.EventType.MOUSE_UP, this.onClickDowm, this);

        //Mouse click event
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

        //Keyboard event
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyUp(event: EventKeyboard) {
        console.log("Key release");
        this.isWalking = false;

    }

    onKeyDown(event: EventKeyboard) {
        console.log("Key pressed down");
        this.isWalking = true;
    }

    onClickDowm() {
        console.log("Sprite clicked");

    }

    onClickUp() {
        console.log("Sprite click released");
    }

    onMouseDown() {
        console.log("Mouse Down");
    }

    onMouseUp() {
        console.log("Mouse Up");
    }

    start() {
        // To modify the position of the node
        // this.node.setPosition(-520, this.node.getPosition().y);
        // To modify the content size of the node
        // this.getComponent(UITransform).setContentSize(this.getComponent(UITransform).contentSize.width * 0.15, this.getComponent(UITransform).contentSize.height * 0.15);
        this.ani = this.getComponent(Animation);
    }

    update(deltaTime: number) {
        if (this.isWalking) {
            this.ani.crossFade('walking', 0.1);
            this.Movewent(deltaTime);
        }
        else {
            this.ani.crossFade('idle', 0.1);
        }
    }

    private Movewent(deltaTime: number) {
        this.node.setPosition(this.node.getPosition().x += this.speed * deltaTime, this.node.getPosition().y);
    }
}

