import { _decorator, Component, Node, CCInteger, CCFloat, CCString, Vec2, Vec3, Quat, Color, CCBoolean, Enum } from 'cc';
const { ccclass, property } = _decorator;

//Enum constructor
enum Select {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}
Enum(Select)

@ccclass('Decotators')
export class Decotators extends Component { // Created as a detailed reference for decorators in Cocos Creator
    //Node
    @property({
        type: Node,
        tooltip: "This is a Node property"
    })
    nodeA: Node = null;

    //Integer; import from CCImport
    @property({
        type: CCInteger,
        tooltip: "This is an Integer property"
    })
    integerA: Number = 100;

    //Floats; import from CCFloat
    @property({
        type: CCFloat,
        tooltip: "This is a Float property"
    })
    floatA: Number = 0.5;

    //Integers and floats with range sliders and step values
    @property({
        type: CCInteger,
        tooltip: "Adjust the values through the slider in step of 10",
        min: 0,
        max: 1000,
        step: 10,
        slide: true
    })
    integerX: Number = 100;

    //Floats; import from CCFloat
    @property({
        type: CCFloat,
        tooltip: "Adjust the values through the slider step of 0.1",
        min: 0,
        max: 10,
        step: 0.1,
        slide: true
    })
    floatX: Number = 0.5;

    //String; import from CCString
    @property({
        type: CCString,
        tooltip: "This is a Text property"
    })
    stringA: string = "Enter a text";

    //Vector 2; import from Vec2
    @property({
        type: Vec2,
        tooltip: "This is a Vector 2 property"
    })
    vector2D_A: Vec2 = new Vec2(0, 0);

    //Vector 3; import from Vec3
    @property({
        type: Vec3,
        tooltip: "This is a Vector 3 property"
    })
    vector3D_A: Vec3 = new Vec3(0, 0, 0);

    //Quaternion; import from Quat
    @property({
        type: Quat,
        tooltip: "This is a Quaternion property"
    })
    quat_A: Quat = null;

    //Colour; import from Color
    @property({
        type: Color,
        tooltip: "Pick a colour"
    })
    color_A: Color = null;

    //Boolean; import from CCBoolean
    @property({
        type: CCBoolean,
        tooltip: "This is a Boolean property"
    })
    isBoolean: boolean = true;

    //Enum; import from Enum; Constructor is above the class
    @property({
        type: Select,
        tooltip: "This is an Enum property",
        displayName: "Select a number"
    })
    dropDownEnum: Select = null;

    //Grouping properties with specofic display order
    @property({
        group: { name: "Group Example", displayOrder:1 },
        type: Node,
        tooltip: "This is under a group of Nodes"
    })
    node1: Node = null;

    @property({
        group: { name: "Group Example", displayOrder: 2 },
        type: Node,
        tooltip: "This is under a group of Nodes"
    })
    node2: Node = null;

    @property({
        group: { name: "Group Example", displayOrder: 2 },
        type: Node,
        tooltip: "This is under a group of Nodes"
    })
    node3: Node = null;


}

