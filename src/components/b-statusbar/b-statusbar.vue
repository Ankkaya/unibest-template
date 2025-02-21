<template>
  <view :style="{ height: statusBarHeight + 'px', background: backgroundColorStatusBar }"></view>
</template>

<script lang="ts" setup>
import { getStatusBarHeight } from '@/utils/platform'

defineOptions({
  name: 'b-statusbar',
})

withDefaults(
  defineProps<{
    backgroundColorStatusBar?: string
  }>(),
  {
    backgroundColorStatusBar: 'transparent',
  },
)

const statusBarHeight = getStatusBarHeight()
</script>
