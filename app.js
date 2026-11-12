const store = require('./utils/store.js')

App({
  globalData: {
    user: null,
    cartCount: 0
  },

  onLaunch() {
    this.globalData.user = store.getUser()
    this.refreshCartBadge()
  },

  onShow() {
    this.refreshCartBadge()
  },

  /** 同步购物车角标 */
  refreshCartBadge() {
    const count = store.getCartCount()
    this.globalData.cartCount = count
    const opts = { index: 1, fail: () => {} }
    if (count > 0) {
      wx.setTabBarBadge(Object.assign({}, opts, { text: count > 99 ? '99+' : String(count) }))
    } else {
      wx.removeTabBarBadge(opts)
    }
  },

  /** 统一登录校验，未登录时跳转登录页 */
  requireLogin(redirectUrl) {
    if (this.globalData.user) return true
    wx.navigateTo({
      url: '/pages/login/login' + (redirectUrl ? '?redirect=' + encodeURIComponent(redirectUrl) : '')
    })
    return false
  }
})
