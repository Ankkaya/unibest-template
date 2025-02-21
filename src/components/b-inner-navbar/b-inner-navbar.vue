<template>
  <b-fixed
    :alway="alway"
    :bgStyles="bgStyles"
    :val="val"
    :index="zIndex"
    :noNav="noNav"
    :opacity="opacity"
    :placeholder="placeholder"
  >
    <b-status-bar></b-status-bar>
    <view class="b-inner-navbar">
      <view class="navbar" :style="[{ height: navbarHeight + 'px' }]">
        <view class="icon-box flex items-center" v-if="showLeftButton">
          <view
            class="icon-button icon-button--left flex justify-center items-center"
            @tap="tapLeftFn"
          >
            <view v-if="hasHistory()" class="i-carbon-chevron-left text-[32rpx] text-[#000]"></view>
            <view v-else class="i-carbon-home text-[32rpx] text-[#000]"></view>
          </view>
          <view class="line"></view>
          <view
            class="icon-button icon-button--right flex justify-center items-center"
            @tap="tapRightFn"
          >
            <wd-icon name="view-list" size="32rpx" color="#000"></wd-icon>
          </view>
        </view>

        <slot>
          <view class="title">{{ title }}</view>
        </slot>

        <!-- #ifdef MP -->
        <view :style="[state.capsuleStyle]"></view>
        <!-- #endif -->
      </view>
    </view>
  </b-fixed>
</template>

<script lang="ts" setup>
import { getNavbar, getCapsule } from '@/utils/platform'
import { hasHistory } from '@/utils'

/**
 * @description 导航栏
 * @param {Type} alway - 是否常驻
 * @param {Type} bgStyle - 背景样式
 * @param {Type} val - 顶部高度
 * @param {Type} zIndex - 层级
 * @param {Type} noNav - 是否显示导航栏
 * @param {Type} opacity - 是否透明
 * @param {Type} placeholder - 是否占位
 * @param {boolean} showLeftButton - 是否显示左侧按钮
 */

interface Props {
  alway?: boolean
  bgStyles?: object
  val?: number
  zIndex?: number
  noNav?: boolean
  opacity?: boolean
  placeholder?: boolean
  title?: string
  showLeftButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alway: true,
  bgStyles: () => ({}),
  val: 0,
  zIndex: 100,
  noNav: true,
  opacity: false,
  placeholder: false,
  title: '',
  showLeftButton: true,
})

const emits = defineEmits(['tapLeft', 'tapRight'])

const tapLeftFn = () => {
  uni.navigateBack()
}
const tapRightFn = () => {}

const state = ref({
  capsuleStyle: {},
})

const navbarHeight = getNavbar()

onBeforeMount(() => {
  state.value.capsuleStyle = {
    width: getCapsule().width + 'px',
    height: getCapsule().height + 'px',
  }
})
</script>

<style lang="scss" scoped>
.b-inner-navbar {
  width: 100%;
  background-color: transparent;
  .navbar {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon-box {
      width: 134rpx;
      height: 56rpx;
      margin-left: 8rpx;
      background: #fff;
      border-radius: 30rpx;
      box-shadow:
        0px 0px 4rpx rgba(51, 51, 51, 0.08),
        0 4rpx 6rpx 2rpx rgba(102, 102, 102, 0.12);
      .line {
        width: 2rpx;
        height: 24rpx;
        background: #e5e5e7;
      }
      .icon-button {
        width: 67rpx;
        height: 56rpx;
        &--left:hover {
          background: rgba(0, 0, 0, 0.16);
          border-radius: 30rpx 0px 0px 30rpx;
        }
        &--right:hover {
          background: rgba(0, 0, 0, 0.16);
          border-radius: 0px 30rpx 30rpx 0px;
        }
      }
    }
    .title {
      position: absolute;
      left: 50%;
      text-overflow: ellipsis;
      transform: translateX(-50%);
    }
  }
}
</style>
