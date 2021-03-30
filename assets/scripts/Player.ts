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
  
    @property({
      type: cc.AudioClip
    })
    private jumpAudio: cc.AudioClip = null;

    private xSpeed: number = 0;

    private accLeft: boolean = false;
    private accRight: boolean = false;

    // Horizontal velocity
    // onLoad () {}

    onLoad() {
      console.log("Player on load");
      const jumpAction = this.runJumpAction();
      cc.tween(this.node).then(jumpAction).start();

      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      
    }
    
    start () {
      
    }

    update (dt) {
      if (this.accLeft) {
        this.xSpeed -= this.accel * dt;
      } 

      if (this.accRight) {
        this.xSpeed += this.accel * dt; 
      }

      if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
        this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
      }
      this.node.x += this.xSpeed * dt;
    }
    
    runJumpAction() {
      const jumpUp = cc.tween().by(this.jumpDuration, {y: this.jumpHeight}, {easing: "sineOut"});
      const jumpDown = cc.tween().by(this.jumpDuration, {y: - this.jumpHeight}, {easing: "sineIn"});
      const tween = cc.tween().sequence(jumpUp, jumpDown).call(this.onJumpfinished.bind(this));
      // return tween;
      return cc.tween().repeatForever(tween);
    }

    onKeyDown(event): void {
      switch (event.keyCode) {
        case cc.macro.KEY.a:
            this.accLeft = true;
          break;
        case cc.macro.KEY.d:
            this.accRight = true;
          break;
      }
    }

    onKeyUp(event): void {
      switch (event.keyCode) {
        case cc.macro.KEY.a:
            this.accLeft = false;        
          break;
        case cc.macro.KEY.d:
            this.accRight = false;
          break;
      }
    }

    private onJumpfinished(): void {
      cc.audioEngine.playEffect(this.jumpAudio, false);
    }

    onDestroy(): void {
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

}
