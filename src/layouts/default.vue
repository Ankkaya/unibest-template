<template>
  <wd-config-provider :themeVars="themeVars">
    <b-layout v-bind="{ meta, navbar }">
      <slot />
    </b-layout>
    <!-- 授权弹窗 -->
    <b-auth-modal />
    <!-- 分享弹窗 -->
    <b-share-modal />
    <wd-toast />
    <wd-message-box />
    <wd-notify />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { getCurrPageInfo } from '@/utils'

const { meta, navbar } = getCurrPageInfo()

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
</script>
