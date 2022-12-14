import { Enemy } from '../objects/enemy'
import { Bullet } from '../objects/bullet'
import { Ship } from '../objects/ship'
import { Level, state } from '../const/state'
import { Drop } from '../objects/drop'
import { levels } from '../const/levels.json'
import { HealthBar } from '../objects/healthBar'

export class Game extends Phaser.Scene {
  private player: Ship
  private enemy: Enemy
  private sparkEmitter0: Phaser.GameObjects.Particles.ParticleEmitter
  private sparkEmitter1: Phaser.GameObjects.Particles.ParticleEmitter
  private drops: Drop[] = []
  private healthBar: HealthBar

  constructor() {
    super({
      key: 'Game',
    })
  }

  preload(): void {}

  create(): void {
    const currentLevel: Level = levels[state.currentLevelIndex] as Level

    this.player = new Ship({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2,
      shipCode: state.currentShip.shipCode,
    })

    this.enemy = new Enemy({
      scene: this,
      x: this.getRandomSpawnPostion(this.sys.canvas.width),
      y: this.getRandomSpawnPostion(this.sys.canvas.height),
      shipCode: currentLevel.enemyCode,
      brain: currentLevel.brain,
      speed: currentLevel.speed,
      rateOfFire: currentLevel.rateOfFire,
      player: this.player
    })
  
    this.add.tileSprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      this.sys.canvas.width,
      this.sys.canvas.height,
      levels[state.currentLevelIndex].background,
    )


    // Sparks
    this.sparkEmitter0 = this.add.particles('spark0').createEmitter({
      x: 400,
      y: 300,
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      blendMode: 'SCREEN',
      active: false,
      lifespan: 600,
      gravityY: 800,
    })

    this.sparkEmitter1 = this.add.particles('spark1').createEmitter({
      x: 400,
      y: 300,
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.3, end: 0 },
      blendMode: 'SCREEN',
      active: false,
      lifespan: 300,
      gravityY: 800,
    })

    let buttonMap = this.add.image(550, this.sys.canvas.height - 100, 'buttonMap')
    buttonMap.setInteractive({ cursor: 'pointer' })
    buttonMap.on('pointerover', () => buttonMap.setTexture('buttonMapHover'))
    buttonMap.on('pointerout', () => buttonMap.setTexture('buttonMap'))
    buttonMap.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.enemy.destroy()
      this.drops.forEach((drop) => drop.destroy())
      this.drops = []
      this.scene.start('Map')
    })

    let buttonInventory = this.add.image(400, this.sys.canvas.height - 100, 'buttonInventory')
    buttonInventory.setInteractive({ cursor: 'pointer' })
    buttonInventory.on('pointerover', () => buttonInventory.setTexture('buttonInventoryHover'))
    buttonInventory.on('pointerout', () => buttonInventory.setTexture('buttonInventory'))
    buttonInventory.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.enemy.destroy()
      this.drops.forEach((drop) => drop.destroy())
      this.drops = []
      this.scene.start('Inventory')
    })

    let buttonShop = this.add.image(250, this.sys.canvas.height - 100, 'buttonShop')
    buttonShop.setInteractive({ cursor: 'pointer' })
    buttonShop.on('pointerover', () => buttonShop.setTexture('buttonShopHover'))
    buttonShop.on('pointerout', () => buttonShop.setTexture('buttonShop'))
    buttonShop.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.enemy.destroy()
      this.drops.forEach((drop) => drop.destroy())
      this.drops = []
      this.scene.start('Shop')
    })

    let buttonBack = this.add.image(100, this.sys.canvas.height - 100, 'buttonBack')
    buttonBack.setInteractive({ cursor: 'pointer' })
    buttonBack.on('pointerover', () => buttonBack.setTexture('buttonBackHover'))
    buttonBack.on('pointerout', () => buttonBack.setTexture('buttonBack'))
    buttonBack.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.enemy.destroy()
      this.drops.forEach((drop) => drop.destroy())
      this.drops = []
      this.scene.start('SelectShip')
    })

    this.healthBar = new HealthBar({ scene: this, x: 100, y: 100 })
  }

  damage(amount: number): void {
    if (this.healthBar.decrease(amount)) {
      this.enemy.destroy()
      this.drops.forEach((drop) => drop.destroy())
      this.drops = []
      this.player.setActive(false)
      this.scene.start('GameOver')
    }
  }

  update(time: number, delta: number): void {
    this.player.update(time, delta)

    // check collision between enemys and ship's bullets
    for (let bullet of this.player.getBullets()) {
      if (
        bullet.getBody() &&
        this.enemy.getBody() &&
        Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBody(), this.enemy.getBody())
      ) {
        bullet.setActive(false)
        this.enemy.setActive(false)

        // Sparks
        this.sparkEmitter0.active = true
        this.sparkEmitter1.active = true
        this.sparkEmitter0.setPosition(bullet.getBody().x, bullet.getBody().y)
        this.sparkEmitter1.setPosition(bullet.getBody().x, bullet.getBody().y)
        //@ts-ignore
        this.sparkEmitter0.explode()
        //@ts-ignore
        this.sparkEmitter1.explode()

        // Explosions
        const explosionConfig = {
          key: 'explosionAnim',
          frames: 'explosion',
          frameRate: 20,
          repeat: 0,
        }
        this.anims.create(explosionConfig)
        this.sound.add('explodeSound').play()
        const anim = this.add.sprite(bullet.getBody().x, bullet.getBody().y, 'explosion')
        anim.setDepth(3)
        anim.play('explosionAnim', false)

        // Drop item
        this.drops.push(
          new Drop({
            scene: this,
            x: bullet.getBody().x,
            y: bullet.getBody().y,
            texture: this.getRandomItem(),
          }),
        )
      }
    }
    this.enemy.update()

    // check collision between ship and enemy's bullets
    for (let bullet of this.enemy.getBullets()) {
      if (
        this.player.getBody() &&
        bullet.getBody() &&
        Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBody(), this.player.getBody())
      ) {
        bullet.setActive(false)

        // Sparks
        this.sparkEmitter0.active = true
        this.sparkEmitter1.active = true
        this.sparkEmitter0.setPosition(bullet.getBody().x, bullet.getBody().y)
        this.sparkEmitter1.setPosition(bullet.getBody().x, bullet.getBody().y)
        //@ts-ignore
        this.sparkEmitter0.explode()
        //@ts-ignore
        this.sparkEmitter1.explode()

        this.damage(1)
      }
    }

    // check collision between enemy and ship
    if (
      this.enemy.getBody() &&
      this.player.getBody() &&
      Phaser.Geom.Intersects.RectangleToRectangle(this.enemy.getBody(), this.player.getBody())
    ) {
      // this.damage(1)
    }

    // check collision between droped item and ship
    for (let i = 0; i < this.drops.length; i++) {
      if (
        this.player.getBody() &&
        this.drops[i].getBody() &&
        Phaser.Geom.Intersects.RectangleToRectangle(this.drops[i].getBody(), this.player.getBody())
      ) {
        state.inventory.push(this.drops[i].texture.key)
        this.drops[i].destroy()
        this.drops.splice(i, 1)
      }
    }

    if (!this.enemy.active) {
      this.enemy.destroy()
      // this.spawnEnemy()
    }
  }

  private getRandomItem() {
    const items = [
      'itemCabin0',
      'itemCabin1',
      'itemCabin2',
      'itemCabin3',
      'itemWeapon0',
      'itemWeapon1',
      'itemWeapon2',
      'itemWeapon3',
      'itemWing0',
      'itemWing1',
      'itemWing2',
      'itemWing3',
      'itemEngine0',
      'itemEngine1',
      'itemEngine2',
      'itemEngine3',
    ]
    const random = Phaser.Math.RND.between(0, items.length - 1)
    return items[random]
  }

  private getRandomEnemy(): string {
    let cabin = Phaser.Math.RND.between(0, 3)
    let wing = Phaser.Math.RND.between(0, 3)
    let weapon = Phaser.Math.RND.between(0, 3)
    let engine = Phaser.Math.RND.between(0, 3)

    return `${cabin}${wing}${weapon}${engine}`
  }

  private getRandomSpawnPostion(aScreenSize: number): number {
    let rndPos = Phaser.Math.RND.between(0, aScreenSize)

    while (rndPos > aScreenSize / 3 && rndPos < (aScreenSize * 2) / 3) {
      rndPos = Phaser.Math.RND.between(0, aScreenSize)
    }

    return rndPos
  }
}
