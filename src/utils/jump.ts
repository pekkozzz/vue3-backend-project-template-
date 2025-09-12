import { updateCurrentHref, generateUrl } from './location'

/*
与页面跳转相关的通用函数
*/

// 跳转到面客端登录
export function toBackendLogin() {
  const url = generateUrl(import.meta.env.VITE_BACKEND_LOGIN, '', {
    redirectUrl: encodeURIComponent(window.location.href)
  })
  updateCurrentHref(url)
}
