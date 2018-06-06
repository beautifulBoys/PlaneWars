<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
* {
  font-family: "微软雅黑";
  user-select: none;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
