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
  import imgData from '../images/p03-1.png'
  export default {
    data () {
      return {
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
          h: 0
        }
      }
    },
    mounted () {
      setTimeout(() => {
        this.initScreenSize()
        this.planeInit()
      })
      var canvas = document.getElementById('atom')
			var context = canvas.getContext('2d')

      var img = new Image()
      img.src = imgData
      img.onload = () => {
        context.drawImage(img, 0, 0, 200, 30)
      }
    },
    methods: {
      initScreenSize () {
        let air = this.$refs.plane
        this.screen = {
          w: document.body.clientWidth,
          h: document.body.clientHeight
        }
        this.plane = {
          w: air.clientWidth,
          h: air.clientHeight,
          x: this.screen.w  / 2,
          y: this.screen.h - 150
        }
      },
      planeInit () {
        this.$refs.plane.addEventListener('touchstart', (e) => {
          this.touch.status = true
        })
        document.addEventListener('touchmove', (e) => {
          if (!this.touch.status) return
          let left = e.touches[0].clientX, right = e.touches[0].clientY
          if (this.screen.w < left || left < 0 || this.screen.h < right || right < 0) return
          this.plane.x = left
          this.plane.y = right
        })
        this.$refs.plane.addEventListener('touchend', (e) => {
          this.touch.status = false
        })
      },
      configEvent (status) {

      }
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
