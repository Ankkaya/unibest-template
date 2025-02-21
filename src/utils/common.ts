// 自定义深拷贝（完整版）
function deepCopy(target, map = new WeakMap()) {
  if (target.constructor === Date) {
    return new Date(target)
  }
  if (target.constructor === RegExp) {
    return new RegExp(target)
  }
  const allDesc = Object.getOwnPropertyDescriptors(target)
  const cloneObj = Object.create(Object.getPrototypeOf(target), allDesc)
  map.set(target, cloneObj)

  for (const key of Reflect.ownKeys(target)) {
    cloneObj[key] =
      typeof target[key] === 'object' && target[key] !== 'function' && target[key] !== null
        ? deepCopy(target[key], map)
        : target[key]
  }

  return cloneObj
}

// 对象深度合并
function deepMerge(target = {}, source = {}) {
  target = deepCopy(target)
  if (typeof target !== 'object' || typeof source !== 'object') return target

  for (const prop in source) {
    if (!Object.prototype.hasOwnProperty.call(source, prop)) continue

    if (prop in target) {
      if (typeof target[prop] !== 'object' || typeof source[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop])
      } else {
        target[prop] = deepMerge(target[prop], source[prop])
      }
    } else {
      target[prop] = source[prop]
    }
  }

  return target
}

// 样式转换，对象转字符串，字符串转对象
function addStyle(customStyle, target = 'object') {
  if (
    empty(customStyle) ||
    (typeof customStyle === 'object' && target === 'object') ||
    (target === 'string' && typeof customStyle === 'string')
  ) {
    return customStyle
  }

  if (target === 'object') {
    customStyle = trim(customStyle)
    const styleArray = customStyle.split(';')
    const style = {}
    for (let i = 0; i < styleArray.length; i++) {
      if (styleArray[i]) {
        const item = styleArray[i].split(':')
        style[trim(item[0])] = trim(item[1])
      }
    }
    return style
  }

  if (target === 'string') {
    let string = ''
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, '-$1').toLowerCase()
      string += `${key}:${customStyle[i]};`
    }
    return trim(string)
  }
}

// 判断是否为空
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (value === 0 || isNaN(value)) return true
      break
    case 'object':
      if (value === null || Object.keys(value).length === 0) return true
      return false
  }
  return false
}

// 去除空格
function trim(str, pos = 'both') {
  str = String(str)
  if (pos === 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  }
  if (pos === 'left') {
    return str.replace(/^\s*/, '')
  }
  if (pos === 'right') {
    return str.replace(/(\s*$)/g, '')
  }
  if (pos === 'all') {
    return str.replace(/\s+/g, '')
  }
  return str
}

function sleep(value = 30) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, value)
  })
}

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid(len = 32, firstU = true, radix = null) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift()
    return `u${uuid.join('')}`
  }
  return uuid.join('')
}

export { deepMerge, addStyle, empty, trim, sleep, guid }
