<script setup lang="ts">
import {screenshot} from '@/util'
const clickScreenshot = ()=>{
 let dom = document.querySelector('body')
  screenshot(dom,'.u_item')
}
</script>

<template>
  <main id="Screenshot">
    <div class="box1" draggable></div>
<!--    <img src="../assets/hand.svg" alt="" draggable>-->
    <button @click="clickScreenshot" draggable>截图</button>
    <div class="u">
    <div class="u_item" v-for="item in 20" :key="item">{{item}}</div>
    </div>
  </main>
</template>


<style lang="scss" scoped>
.box1{
  height: 100px;
  width: 100px;
  background-color: #fff;
}
.u{
  display: flex;
  flex-wrap:wrap;
  .u_item{

    width: 60px;
    height: 80px;
  }
}
</style>
