<template>
  <view class="b-tabbar-item" @click="clickNavTabbar">
    <image v-if="path !== item.pagePath" class="b-tabbar-item__icon" :src="'/' + item.iconPath" />
    <image
      v-if="path === item.pagePath"
      class="b-tabbar-item__icon"
      :src="'/' + item.selectedIconPath"
    />
    <view class="b-tabbar-item__text" :class="{ active: path === item.pagePath }">
      {{ item.text }}
    </view>
  </view>
</template>

<script setup lang="ts">
defineOptions({
  name: 'b-tabbar-item',
})

interface TabbarItemProps {
  name: string
  pagePath: string
  iconPath: string
  selectedIconPath: string
  text: string
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    item: TabbarItemProps
    path: string
  }>(),
  {
    item: () => ({}) as TabbarItemProps,
    path: '',
  },
)

function clickNavTabbar() {
  if (props.path === props.item.pagePath) return
  uni.switchTab({
    url: '/' + props.item.pagePath,
  })
}
</script>

<style lang="scss" scoped>
.b-tabbar-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100rpx;
  .b-tabbar-item__icon {
    width: 45rpx;
    height: 45rpx;
  }
  .b-tabbar-item__text {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #a6aab2;
  }
  .active {
    color: $uni-color-primary;
  }
}
</style>
