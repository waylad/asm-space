export interface IEnemyConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  shipCode: string;
  rateOfFire: number;
  frame?: string | number;
  player: Phaser.GameObjects.Container
}
