<template>
  <div class="home">
    <div class="control">
      <div class="plane" ref="plane" :style="`
        top: ${mine.plane.y}px;
        left: ${mine.plane.x}px;
        width: ${mine.plane.remw}rem;
        height: ${mine.plane.remh}rem;
        transform: translate3d(-${mine.plane.remw / 2}rem, -${mine.plane.remh / 2}rem, 0);
        background-image: url(${mine.plane.img});
      `"></div>
    </div>
    <canvas id="atom" ref="atom"></canvas>
    <div class="bg-box">
      <div class="bg"></div>
    </div>
  </div>
</template>

<script>

  import initMineImageSourceFunc from './mine_conf.js'
  import initEnemyImageSourceFunc from './enemy_conf.js'
  import EnemyConfig from './enemy_conf.js'
  import homeFunc from './home_func.js'
  export default {
    data () {
      return {
        /*
          context: null // canvas 执行上下文
          timer: null // 执行动画的对象

        */
        setting: {
          refreshCanvasTime: 30,

        },
        screen: {
          w: 0,
          h: 0
        },
        mine: {
          plane: { // 飞机属性
            img: null,
            w: 0,
            h: 0,
            x: 0,
            y: 0,
          },
          bullet: {}, // 子弹属性
          bullets: [] // 子弹集合
        },
        touch: {
          status: false
        },
        enemy: {
          planes: [],
          bullets: []
        },
        enemy_plane: {},
        enemy_bullet: [],
        plane: {

        }
      }
    },
    mounted () {
      setTimeout(() => {
        this.initScreenSize()
        this.initVariables()
        this.planeInit()
      })
    },
    methods: {
      async initVariables () { // 初始化资源
        this.MineConfig = await initMineImageSourceFunc() // 初始化 自己 相关图片资源及配置
        this.EnemyConfig = await initEnemyImageSourceFunc() // 初始化 敌人 相关图片资源及配置

        let mineInfo = homeFunc.update_mine_config(this.MineConfig)
        this.mine.plane = mineInfo.plane
        this.mine.bullet = mineInfo.bullet


        this.animation()
      },
      initScreenSize () {
        this.screen = {
          w: screen.availWidth,
          h: screen.availHeight
        }
        let canvas = document.getElementById('atom')
        this.context = canvas.getContext('2d')
        canvas.width = this.screen.w
  			canvas.height = this.screen.h
      },
      planeInit () {
        this.$refs.plane.addEventListener('touchstart', (e) => {
          e.stopPropagation()
          e.preventDefault()
          this.touch.status = true
        })
        document.addEventListener('touchmove', (e) => {
          e.stopPropagation()
          if (!this.touch.status) return
          let left = e.touches[0].clientX, right = e.touches[0].clientY
          if (this.screen.w < left || left < 0 || this.screen.h < right || right < 0) return
          this.mine.plane.x = left
          this.mine.plane.y = right
        })
        this.$refs.plane.addEventListener('touchend', (e) => {
          e.stopPropagation()
          e.preventDefault()
          this.touch.status = false
        })
      },
      animation () {
        let me = this
        setInterval(() => {
          if (me.mine.plane.hp > 0) {
            me.addMineBullet()
          }
  			}, me.mine.bullet.time)

        setInterval(() => {
          me.addEnemyPlane()
  			}, 1000)

        me.timer = setInterval(() => {
  				me.calculateBullet()
  			}, this.setting.refreshCanvasTime)
      },
      addMineBullet () {
        this.mine.bullets.push({
          ...this.mine.bullet,
          w: this.mine.bullet.w,
          h: this.mine.bullet.h,
          x: this.mine.plane.x - (this.mine.bullet.w / 2), // 已经去除了飞机的视觉偏移量,
          y: this.mine.plane.y,
          v: this.mine.bullet.v
        })
      },
      addEnemyPlane () {
        let me = this
        let enemyInfo = homeFunc.update_enemy_config(this.EnemyConfig, 1 + parseInt(Math.random() * 3))
        let timer = setInterval(() => {
          me.addEnemyBullet(timer, enemyInfo.bullet)
        }, enemyInfo.plane.shootSpeed)

        this.enemy.planes[timer] = enemyInfo.plane
        this.enemy.bullets.push(enemyInfo.bullet)
      },
      addEnemyBullet (k, bullet) {
        let plane = this.enemy.planes[k]
        this.enemy.bullets.push({
          w: bullet.w,
          h: bullet.h,
          x: plane.x + (plane.w / 2) - (bullet.w / 2),
          y: plane.y + plane.h,
          v: bullet.v,
          img: bullet.img
        })
      },
      calculateBullet () {
        let me = this

        // 更新自己的子弹
        let bullets = []
        me.mine.bullets.forEach(item => {
          item.y = item.y + item.v
          if (item.y > -(me.mine.bullet.h)) bullets.push(item)
        })
        me.mine.bullets = bullets

        // 更新敌人的飞机
        let planes = {}
        for (let k in me.enemy.planes) {
          let item = me.enemy.planes[k]
          item.y = item.y + item.v
          if (item.y < this.screen.h && item.hp > 0) planes[k] = item
          else clearInterval(k) // 溢出屏幕或者被打死
        }
        me.enemy.planes = planes

        // 更新敌人的子弹
        let enemyBullets = []
        me.enemy.bullets.forEach(item => {
          item.y = item.y + item.v
          if (item.y < this.screen.h) enemyBullets.push(item)
        })
        me.enemy.bullets = enemyBullets


        me.paintFunc()
      },
      paintFunc () {
        let me = this
        me.context.clearRect(0, 0, this.screen.w, this.screen.h)
        // 渲染 本机子弹
        me.mine.bullets.forEach(item => {
          me.context.drawImage(
            item.img,
            item.x,
            item.y,
            item.w,
            item.h
          )
        })
        // 渲染 敌机
        for (let k in me.enemy.planes) {
          let item = me.enemy.planes[k]
          me.context.drawImage(
            item.img,
            item.x,
            item.y,
            item.w,
            item.h
          )
        }
        // 渲染 敌机 子弹
        me.enemy.bullets.forEach(item => {
          me.context.drawImage(
            item.img,
            item.x,
            item.y,
            item.w,
            item.h
          )
        })

      },

    }
  }
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .control {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    .plane {
      position: fixed;
      width: 1.1rem;
      height: 1.2rem;
      transform: translate3d(-0.55rem, -0.6rem, 0);
      // background: url(../images/mine/plane.png) no-repeat center center;

      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% auto;
    }
  }
  #atom {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 155, 0);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .bg-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .bg {
      width: 100%;
      height: 25rem;
      background: url(../images/bg3_0.jpg) repeat-y;
      background-size: 100% auto;
      position: absolute;
      top: -10.45rem;
      left: 0;
      z-index: 1;
      animation: move 10s linear infinite;
      @keyframes move {
        0 {top: -10.45rem}
        100% {top: 0}
      }
    }
  }
}
</style>
