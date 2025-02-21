<template>
  <view
    class="b-navbar"
    :class="{
      'b-navbar--fixed': fixed,
      'b-navbar--shadow': shadow,
      'b-navbar--border': border,
    }"
  >
    <view class="b-navbar-container">
      <view class="fixed-bg" :class="[opacity ? '' : opacityBgUi]"></view>
      <b-statusbar v-if="statusBar" :backgroundColorStatusBar="backgroundColor" />
      <view
        :style="{
          color: themeColor,
          height: navbarHeight,
          background: backgroundColor,
        }"
        class="b-navbar-content"
      >
        <view
          class="b-navbar-content--left"
          :style="{ width: leftIconWidth }"
          v-if="showLeftButton"
        >
          <view class="icon-box flex items-center" v-if="showLeftButton">
            <view
              class="icon-button icon-button--left flex justify-center items-center"
              @tap="tapLeftFn"
            >
              <view
                v-if="hasHistory()"
                class="i-carbon-chevron-left text-[32rpx] text-[#000]"
              ></view>
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
          <view class="title-left leading-[18px]" v-if="titleAlign === 'left' && title.length">
            <text>{{ title }}</text>
          </view>
        </view>
        <view
          v-if="tools === 'search'"
          class="flex items-center"
          :style="{ width: `calc(100% - ${capsuleWidth})` }"
        >
          <view class="flex items-center min-w-[120rpx] w-[120rpx]" @click="clickChooseArea">
            <view class="line-clamp-1">测试文字</view>
            <wd-icon name="caret-down-small" size="22px"></wd-icon>
          </view>
          <view @click="searchInputFocus">
            <wd-search :placeholder-left="true" :hide-cancel="true" disabled />
          </view>
        </view>
        <view v-else class="page-navbar-content--center" @tap="tapTitleFn">
          <view
            v-if="tools === 'title' && titleAlign === 'center' && title.length"
            class="title-center"
          >
            <text :style="{ color: themeColor, fontSize: '36rpx' }" class="line-clamp-1">
              {{ title }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getNavbar, getCapsule } from '@/utils/platform'
import { hasHistory } from '@/utils'

interface Props {
  fixed?: boolean
  shadow?: boolean
  border?: boolean
  opacity?: boolean | string
  opacityBgUi?: string
  statusBar?: boolean | string
  tools?: string
  titleAlign?: string
  title?: string
  height?: number
  color?: string
  backgroundColor?: string
  leftWidth?: string | number
  showLeftButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  shadow: false,
  border: false,
  opacity: false,
  opacityBgUi: '#fff',
  statusBar: true,
  tools: 'title',
  titleAlign: 'center',
  title: '',
  color: '',
  height: getNavbar(),
  backgroundColor: '#fff',
  leftWidth: 60,
  showLeftButton: true,
})

const emit = defineEmits(['tapLeft', 'tapRight', 'tapTitle'])

const capsuleWidth = computed(() => getCapsule().width + 'px')

function tapLeftFn() {
  emit('tapLeft')
  uni.navigateBack()
}

function tapRightFn() {
  emit('tapRight')
}

function getVal(val) {
  return typeof val === 'number' ? val + 'px' : val
}

function tapTitleFn() {}

function searchInputFocus() {
  // 隐藏键盘弹出
  uni.hideKeyboard()
  uni.navigateTo({
    url: '/pages/general/search',
  })
}

const themeColor = computed(() => {
  return props.color || '#333'
})

const navbarHeight = computed(() => {
  return getVal(props.height)
})
const leftIconWidth = computed(() => {
  return getVal(props.leftWidth)
})

function clickChooseArea() {
  uni.navigateTo({
    url: '/pages/general/chooseArea',
  })
}
</script>

<style lang="scss" scoped>
/* stylelint-disable */
.b-navbar {
  .b-navbar-container {
    position: relative;
    background-color: transparent;
    .fixed-bg {
      position: absolute;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .b-navbar-content {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      position: relative;
      z-index: 2;
      padding: 0 10px;
      font-size: 12px;
      overflow: hidden;
      .page-navbar-content--left {
        width: 120rpx;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        justify-content: flex-start;
        align-items: center;
        /* #ifdef H5 */
        cursor: pointer;
        /* #endif */
        .icon-box {
          width: 134rpx;
          height: 56rpx;
          margin-left: 8rpx;
          background: #fff;
          border-radius: 30rpx;
          border: 1px solid #fff;
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
        .title-left {
          /* #ifdef APP-PLUS */
          font-size: 34rpx;
          /* #endif */
          /* #ifndef APP-PLUS */
          font-size: 14px;
          /* #endif */
        }
      }
      .b-navbar-content--center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        .title-center {
          overflow: hidden;
          font-size: 12px;
        }
      }
    }
  }
}
.b-navbar--fixed {
  position: fixed;
  /* #ifdef H5 */
  right: var(--window-right);
  left: var(--window-left);
  /* #endif */
  /* #ifndef H5 */
  right: 0;
  left: 0;
  /* #endif */
  z-index: 999;
}
.b-navbar--shadow {
  box-shadow: 0 1px 6px #ccc;
}
.b-navbar--border {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #eee;
}
</style>
