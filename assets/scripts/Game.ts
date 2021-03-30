// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({
        type: cc.Prefab
    })
    private starPrefab: cc.Prefab = null;

    @property({
        type: cc.Node
    })
    private player: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property
    private maxStarDuration: number = 0;
    @property
    private minStarDuration: number = 0;

    @property({ 
        type: cc.Node,
    })
    private ground: cc.Node = null;

    @property({
      type: cc.Label
    })
    private scoreLabel: cc.Label = null

    @property({
      type: cc.AudioClip
    })
    private starCollectAudio: cc.AudioClip = null;

    private groundY: number;
    private score: number = 0;

    private timer: number;
    private starDuration: number;
    private isGameover: boolean = false;
    start () {

    }

    onLoad() {
      this.score = 0;
      this.timer = 0;
      this.starDuration = 0; 
      this.isGameover = false;
      this.groundY = this.ground.y + this.ground.height / 2;
      this.spawnNewStar();
    }

    private spawnNewStar(): void {
      const star = cc.instantiate(this.starPrefab);
      this.node.addChild(star);
      star.setPosition(this.getStarPosition());
      this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
      this.timer = 0;
      star.getComponent("Star").game = this;
    }

    private getStarPosition(): cc.Vec2 {
      let randY = this.groundY + Math.random() * this.player.getComponent("Player").jumpHeight + 50;
      let randX = (Math.random() - 0.5) * this.node.width;
      return cc.v2(randX, randY);
    }

    private onGainScore(): void {
      this.score += 1;
      this.scoreLabel.string = "Score: " + this.score;
      cc.audioEngine.playEffect(this.starCollectAudio, false);
    }

    update (dt) {
      if (this.timer > this.starDuration && !this.isGameover) {
        this.onGameover();
        this.isGameover = true;
        return;
      }
      this.timer += dt;
    }

    private onGameover(): void {
      this.player.stopAllActions();
      cc.director.loadScene("game");
    }

}
