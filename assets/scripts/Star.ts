// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    private pickRadius: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private game: any;
    start () {

    }

    private getDistWithPlayer(): number {
      const playerPosition: cc.Vec3 = this.game.player.getPosition();
      const dist = this.node.position.sub(playerPosition).mag();
      return dist;
    }

    private onPicked(): void {
      this.game.spawnNewStar();
      this.game.onGainScore();
      this.node.destroy();
    }

    update (dt) {
      if (this.getDistWithPlayer() < this.pickRadius) {
        this.onPicked();
      }

      const opacityRatio = 1 - this.game.timer/this.game.starDuration;
      const minOpacity = 50;
      this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
}
