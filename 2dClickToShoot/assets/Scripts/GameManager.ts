import { _decorator, Component, Node, Collider2D, PhysicsSystem2D,SystemEvent, input, Input, Vec2, Vec3, Camera, EventMouse, Label, Prefab, instantiate, randomRange, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    crosshair: Node = null;
    @property(Camera)
    mainCamera: Camera = null; 
    @property(Prefab)
    targetPrefab: Prefab = null;
    @property(Label)
    hitsLabel: Label = null; 
    @property(Label)
    missesLabel: Label = null; 

    private hits: number = 0;
    private misses: number = 0;
    private isZoomed: boolean = false;
    private defaultCameraZoom: number = 1.0;
    private zoomedCameraZoom: number = 1.5; 
    private targetSpawnInterval: number = 1;
    private lastTargetSpawnTime: number = 0;
    private activeTargets: Node[] = [];

    onLoad() {

        this.updateScoreLabels();
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
       // input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);

    }

    onDestroy() {

        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        
    }
    start() {
        document.body.style.cursor = 'none';
        this.crosshair.setSiblingIndex(10);
        this.lastTargetSpawnTime = performance.now() / 1000;
    }

    update(dt: number) {
        if ((performance.now() / 1000) - this.lastTargetSpawnTime > this.targetSpawnInterval) {
            this.spawnTarget();
            this.lastTargetSpawnTime = performance.now() / 1000; // Reset spawn timer
        }
    }
      
    onMouseMove(event: EventMouse) {
      
        const mouseScreenPos = event.getLocation();

        const worldPos = new Vec3();
        this.mainCamera.screenToWorld(new Vec3(mouseScreenPos.x, mouseScreenPos.y,0), worldPos);
        this.crosshair.setWorldPosition(worldPos.x, worldPos.y, 0);
    }
    
    onMouseDown(event: EventMouse) {
        
    }

    updateScoreLabels() {
        if (this.hitsLabel) {
            this.hitsLabel.string = `HITS:${this.hits}`;
        }
        if (this.missesLabel) {
            this.missesLabel.string = `MISS:${this.misses}`;
        }
    }

    spawnTarget() {
        if (!this.targetPrefab) {
            console.warn("Target Prefab is not assigned in GameManager!");
            return;
        }

        const newTargetNode = instantiate(this.targetPrefab);
        this.node.addChild(newTargetNode);

        const canvasWidth = 480;//this.node.getComponent(UITransform).contentSize.width;
        const canvasHeight = 640;//this.node.getComponent(UITransform).contentSize.height;

        const margin = 50; 
        const randomX = randomRange(-canvasWidth / 2 + margin, canvasWidth / 2 - margin);
        const randomY = randomRange(-canvasHeight / 2 + margin, canvasHeight / 2 - margin);

        newTargetNode.setPosition(randomX, randomY);

        newTargetNode.on('target-hit', this.onTargetHit, this);
        newTargetNode.on('target-missed', this.onTargetMissed, this);
    }

    
    onTargetHit() {
        this.hits++;
        this.updateScoreLabels();
    }

    onTargetMissed() {
        this.misses++;
        this.updateScoreLabels();
    }

    
}