import { _decorator, Component, Node, input, Input, EventMouse, Color, UITransform, Graphics, Vec3, tween, __private } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Target')
export class Target extends Component {
    private spawnTime: number = 0;
    private lifeTime: number = 3;

    private graphics: Graphics = null; 

    onLoad() {
        this.spawnTime = performance.now() / 1000;
        tween(this.node)
            .repeatForever(
                tween().to(0.5, { scale: new Vec3(1.1, 1.1, 1.1) }).to(0.5, { scale: new Vec3(1.0, 1.0, 1.0) })
            )
            .start();
        this.node.on(Input.EventType.MOUSE_DOWN, this.onClickDowm, this);
    }
    onClickDowm() {
        this.node.emit('target-clicked');
        this.node.destroy();
    }

    onDestroy() {
    }

    update(dt: number) {
        if ((performance.now() / 1000) - this.spawnTime > this.lifeTime) {
            this.node.emit('target-missed');
            this.node.destroy(); 
        }
    }

 
}