/*
 * @Author: 菲鸽
 * @Date: 2024-03-28 19:13:55
 * @Last Modified by: 菲鸽
 * @Last Modified time: 2024-03-28 19:24:55
 */
export const platform = __UNI_PLATFORM__
export const isH5 = __UNI_PLATFORM__ === 'h5'
export const isApp = __UNI_PLATFORM__ === 'app'
export const isMp = __UNI_PLATFORM__.startsWith('mp-')
export const isMpWeixin = __UNI_PLATFORM__.startsWith('mp-weixin')
export const isMpAplipay = __UNI_PLATFORM__.startsWith('mp-alipay')
export const isMpToutiao = __UNI_PLATFORM__.startsWith('mp-toutiao')

const PLATFORM = {
  platform,
  isH5,
  isApp,
  isMp,
  isMpWeixin,
  isMpAplipay,
  isMpToutiao,
}
export default PLATFORM

/**
 * 设备信息获取、导航栏计算等工具函数
 *
 * 主要导出内容：
 * - 设备信息对象（包含屏幕尺寸、安全区域等）
 * - 导航栏高度计算工具函数
 * - 胶囊按钮信息获取函数
 */

export const device = uni.getSystemInfoSync()

export const getNavbar = () => {
  const capsule = getCapsule()
  const navigationBarHeight = (capsule.top - device.statusBarHeight) * 2 + capsule.height
  return navigationBarHeight
}

export const getStatusBarHeight = () => {
  return device.statusBarHeight
}

export const getSafeAreaInset = () => {
  return device.safeAreaInsets
}

export const getCapsule = () => {
  // #ifdef MP
  let capsule = uni.getMenuButtonBoundingClientRect()
  if (!capsule) {
    capsule = {
      bottom: 56,
      height: 32,
      left: 278,
      right: 365,
      top: 24,
      width: 87,
    }
  }
  return capsule
  // #endif
}
