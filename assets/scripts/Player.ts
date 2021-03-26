// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    jumpHeight: number = 0;

    // Main character's jump duration
    @property
    jumpDuration: number = 0;

    // Maximal movement speed
    @property
    maxMoveSpeed: number = 0;
    
    // Acceleration
    @property
    accel: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onLoad() {
      console.log("Player on load");
      const jumpAction = this.runJumpAction();
      cc.tween(this.node).then(jumpAction).start();
    }

    start () {
      
    }

    runJumpAction() {
      const jumpUp = cc.tween().by(this.jumpDuration, {y: this.jumpHeight}, {easing: "sineOut"});
      const jumpDown = cc.tween().by(this.jumpDuration, {y: - this.jumpHeight}, {easing: "sineIn"});
      const tween = cc.tween().sequence(jumpUp, jumpDown);
      return cc.tween().repeatForever(tween);
    }



    // update (dt) {}
}
