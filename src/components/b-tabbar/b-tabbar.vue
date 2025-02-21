<template>
  <view id="b-tabbar" class="b-tabbar">
    <b-tabbar-item
      v-for="item in tabBar.list"
      :key="item.text"
      :path="path"
      :item="item"
    ></b-tabbar-item>
  </view>
</template>

<script lang="ts" setup>
import { tabBar } from '@/pages.json'
import { deepMerge, addStyle } from '@/utils/common'

defineOptions({
  name: 'b-tabbar',
})

const props = withDefaults(
  defineProps<{
    customStyle?: Record<string, any>
    path: string
  }>(),
  {
    customStyle: () => ({}),
    path: '',
  },
)

const tabbarStyle = computed(() => {
  const style = {}
  return deepMerge(style, addStyle(props.customStyle))
})
</script>

<style lang="scss" scoped>
.b-tabbar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #f5f6f7;
}
</style>
