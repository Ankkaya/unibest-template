<template>
  <view class="b-fixed">
    <view
      class="b-fixed-box"
      :id="`fixed-${uuid}`"
      :class="[{ fixed: state.fixed }]"
      :style="[
        {
          left: sticky ? 'auto' : '0px',
          top: state.fixed && !bottom ? (noNav ? val : val + navBarHeight) + 'px' : 'auto',
          bottom: insetHeight,
          zIndex: index + zIndex.navbar,
        },
        !alway ? { opacity: state.opacityVal } : '',
      ]"
    >
      <view
        class="b-fixed-content"
        @tap="tapContentFn"
        :style="[{ zIndex: index + zIndex.navbar }]"
      >
        <slot></slot>

        <view
          v-if="safeAreaInsets.bottom && bottom && isInset"
          class="inset-bottom"
          :style="[{ height: safeAreaInsets.bottom + 'px' }]"
        ></view>
      </view>
      <view class="b-fixed-bottom" v-if="bottom"></view>
      <view
        class="b-fixed-bg"
        :style="[
          {
            zIndex: index + zIndex.navbar - 1,
          },
          bgStyles,
          opacity ? { opacity: state.opacityVal } : '',
        ]"
      ></view>
    </view>

    <view
      v-if="sticky ? state.fixed : placeholder && state.fixed"
      class=""
      :style="[{ height: state.content?.height + 'px', width: width + 'px' }]"
    ></view>
  </view>
</template>

<script lang="ts" setup>
import zIndex from '@/config/zIndex'
import { getNavbar } from '@/utils/platform'
import { guid } from '@/utils/common'

interface Props {
  sticky: boolean
  bottom: boolean
  noNav: boolean
  val: number
  isInset: boolean
  index: number
  alway: boolean
  hasToTop: boolean
  bgStyles: object
  opacity: boolean
  width: number
  placeholder: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sticky: false,
  bottom: false,
  noNav: false,
  val: 0,
  isInset: true,
  index: 0,
  alway: true,
  hasToTop: false,
  bgStyles: () => ({}),
  opacity: false,
  width: 0,
  placeholder: false,
})

const vm = getCurrentInstance()
const { safeAreaInsets, windowHeight } = uni.getSystemInfoSync()
const uuid = guid()
const state = ref<{
  content: any
  fixed: boolean
  scrollTop: number
  opacityVal: number
}>({
  content: {},
  fixed: true,
  scrollTop: 0,
  opacityVal: 0,
})

const navBarHeight = getNavbar()
const insetHeight = computed(() => {
  if (state.value.fixed && props.bottom) {
    if (props.isInset) {
      return props.val + 'px'
    } else {
      return props.val + safeAreaInsets.bottom + 'px'
    }
  } else {
    return 'auto'
  }
})

function tapContentFn() {
  if (props.hasToTop) {
    uni.pageScrollTo({
      scrollTop: state.value.content?.top,
      duration: 100,
    })
  }
}

function computedQuery() {
  uni
    .createSelectorQuery()
    .in(vm)
    .select(`#fixed-${uuid}`)
    .boundingClientRect((data) => {
      if (data) {
        state.value.content = data
        if (props.sticky) {
          setFixed(state.value.scrollTop)
        }
      }
    })
    .exec()
}

function setFixed(value: number) {
  if (props.bottom) {
    state.value.fixed =
      value >= state.value.content?.bottom - windowHeight + state.value.content?.height + props.val
  } else {
    state.value.fixed = value >= state.value.content?.top - (props.val + navBarHeight)
  }
}

onMounted(async () => {
  await nextTick()
  computedQuery()
})

onPageScroll((e) => {
  const top = e.scrollTop
  state.value.scrollTop = top
  state.value.opacityVal = top > navBarHeight ? 1 : top * 0.01
})
</script>

<style lang="scss" scoped>
.b-fixed {
  .b-fixed-box {
    width: 100%;
    .b-fixed-content {
      position: relative;
      .inset-bottom {
        background: #fff;
      }
    }
    .b-fixed-bg {
      position: absolute;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
}
</style>
