<template>
  <div class="home">
    <!-- <div class="plane"></div> -->
    <canvas id="atom" ref="atom"></canvas>
    <!-- <div class="bg-box">
      <img src="../images/bg.png" id="img"/>
      <div class="bg"></div>
    </div> -->
  </div>
</template>

<script>
  // import img from '../images/bg.png'
  export default {
    data () {
      return {

      }
    },
    mounted () {
      setTimeout(() => {
        var canvas = document.getElementById('atom')
  			var context = canvas.getContext('2d')

        var img = document.getElementById('img')
        context.drawImage(img, 10, 10, 300, 300)
      })
    },
    methods: {
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
  .plane {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
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
      height: 30rem;
      background: url(../images/bg.png) repeat-y;
      background-size: 100% auto;
      position: absolute;
      top: -6.9rem;
      left: 0;
      z-index: 1;
      animation: move 5s linear infinite;
      @keyframes move {
        0 {top: -6.9rem}
        100% {top: 0}
      }
    }
  }
}
</style>
