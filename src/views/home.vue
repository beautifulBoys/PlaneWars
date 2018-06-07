<template>
  <div class="home">
    <div class="control">
      <div class="plane" ref="plane" :style="`top: ${plane.y}px; left: ${plane.x}px`"></div>
    </div>
    <canvas id="atom" ref="atom"></canvas>
    <div class="bg-box">
      <div class="bg"></div>
    </div>
  </div>
</template>

<script>

  import {
    img_bullet,
    img_plane
  } from './images.js'

  export default {
    data () {
      return {
        /*
          images: {}, // 用到的图片资源 {bullet: null, ..., bullet: null}
          context: null // canvas 执行上下文
          timer: null // 执行动画的对象
          bullets: [] // 子弹容器

        */
        setting: {
          refreshCanvasTime: 30,

        },
        bullet: {
          remw: 0.2, // 实际大小（rem）
          remh: 0.35, // 实际大小（rem）
          w: 0,
          h: 0,
          v: 10,
          time: 200,
          hurt: 10
        },
        screen: {
          w: 0,
          h: 0
        },
        touch: {
          status: false
        },
        plane: {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          damage: 0, // 伤害
          hp: 200, // 血量
          lv: 1, // 等级

        }
      }
    },
    mounted () {
      setTimeout(() => {
      this.initScreenSize()
        this.initVariables()
        this.initImageSource()
        this.planeInit()
      })

      // var img = new Image()
      // img.src = imgData
      // img.onload = () => {
      //   context.drawImage(img, 0, 0, 200, 30)
      // }
    },
    methods: {
      initVariables () {
        this.images = {}, // 用到的图片资源 {bullet: null, ..., bullet: null}
        this.bullets = [] // 子弹容器

        this.bullet = {
          ...this.bullet,
          w: window.fontSize * this.bullet.remw,
          h: window.fontSize * this.bullet.remh
        }

        let air = this.$refs.plane
        this.plane = {
          ...this.plane,
          w: air.clientWidth,
          h: air.clientHeight,
          x: this.screen.w  / 2,
          y: this.screen.h - 150
        }
        this.animation()
      },
      initImageSource () {
        let arr = [
          {name: 'bullet', imgUrl: img_bullet},
          {name: 'plane', imgUrl: img_plane}
        ]
        arr.forEach((item, index) => {
          let img = new Image()
          img.src = item.imgUrl
          img.onload = () => {
            this.images[item.name] = img
          }
        })
        // var img = new Image()
        // img.src = img_bullet
        // img.onload = () => {
        //   this.images.bullet = img
        //   context.drawImage(img, 0, 0, 200, 30)
        // }
      },
      initScreenSize () {
        this.screen = {
          w: document.body.clientWidth,
          h: document.body.clientHeight
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
          this.plane.x = left
          this.plane.y = right
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
          if (me.plane.hp > 0) {
            me.bullets.push({
              w: me.bullet.w,
              h: me.bullet.h,
              x: me.plane.x,
              y: me.plane.y,
              v: me.bullet.v
            })
          }
  			}, me.bullet.time)

        me.timer = setInterval(() => {
  				me.calculateBullet()
  			}, this.setting.refreshCanvasTime)
      },
      calculateBullet () {
        let me = this
        let list = []
        me.bullets.forEach(item => {
          item.y = item.y - item.v
          if (item.y > -(me.bullet.h)) list.push(item)
        })
        me.bullets = list
        me.paintFunc()
      },
      paintFunc () {
        let me = this
        me.context.clearRect(0, 0, this.screen.w, this.screen.h)
        me.bullets.forEach(item => {
          me.context.drawImage(
            me.images.bullet,
            item.x - (this.bullet.w / 2),
            item.y - (this.bullet.h / 2),
            me.bullet.w,
            me.bullet.h
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
      background: url(../images/plane.png) no-repeat center center;
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
