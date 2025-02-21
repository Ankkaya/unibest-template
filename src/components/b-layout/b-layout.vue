<template>
  <view class="b-layout">
    <div class="b-main" :style="[customMainStyle]">
      <b-navbar v-if="navbar.type === 'default'" v-bind="navbar"></b-navbar>

      <view class="b-body">
        <b-inner-navbar v-if="navbar.type === 'custom'" v-bind="navbar"></b-inner-navbar>

        <view
          v-if="navbar.type === 'default' || navbar.type === 'custom'"
          :style="[{ paddingTop: navbarHeight + statusBarHeight + 'px' }]"
        ></view>
        <slot></slot>
        <b-tabbar v-if="meta.tabbar" :path="meta.tabbar"></b-tabbar>
      </view>
    </div>
  </view>
</template>

<script lang="ts" setup>
import { getNavbar, getStatusBarHeight } from '@/utils/platform'
const props = defineProps<{
  meta: any
  navbar: any
}>()

const navbarHeight = getNavbar()
const statusBarHeight = getStatusBarHeight()

const customMainStyle = computed(() => {
  return {
    background: `${props.meta.backgroundColor || '#fff'} ${props.meta.backgroundImg ? 'url(' + props.meta.backgroundImg + ')' : ''} no-repeat top center / 100% auto`,
  }
})
</script>

<style lang="scss" scoped>
.b-layout {
  position: relative;
  z-index: 2;
  display: flex;
  width: 100%;
  height: 100vh;
  .b-main {
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    .b-body {
      position: relative;
      z-index: 1;
      width: 100%;
    }
  }
}
</style>
