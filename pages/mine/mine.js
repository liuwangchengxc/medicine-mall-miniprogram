const store = require('../../utils/store.js')

Page({
  data: {
    user: null,
    userName: '',
    counts: {},
    cartCount: 0,
    menu: [
      { id: 'address', icon: '📍', name: '收货地址' },
      { id: 'consult', icon: '💬', name: '在线问诊 / 药师咨询' },
      { id: 'coupon', icon: '🎟️', name: '优惠券' },
      { id: 'help', icon: '❓', name: '常见问题' },
      { id: 'about', icon: 'ℹ️', name: '关于我们' }
    ]
  },

  onShow() {
    const raw = store.getUser()
    // 手机号一律脱敏展示
    const phoneMask = raw && raw.phone
      ? String(raw.phone).replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
      : ''
    const user = raw ? Object.assign({}, raw, { phoneMask }) : null

    this.setData({
      user,
      userName: user ? user.nickname : '点击登录',
      counts: store.countByStatus(),
      cartCount: store.getCartCount()
    })
  },

  /* ---------- 登录 / 退出 ---------- */
  goLogin() {
    if (this.data.user) return
    wx.navigateTo({ url: '/pages/login/login' })
  },

  logout() {
    wx.showModal({
      title: '退出登录',
      content: '退出后购物车与订单记录仍保留在本机。',
      confirmColor: '#e34d59',
      success: res => {
        if (!res.confirm) return
        store.clearUser()
        this.setData({ user: null, userName: '点击登录' })
        wx.showToast({ title: '已退出登录', icon: 'none' })
      }
    })
  },

  /* ---------- 订单入口 ---------- */
  goOrder(e) {
    const status = e.currentTarget.dataset.status || 'all'
    const app = getApp()
    app.globalData.orderStatus = status
    wx.switchTab({ url: '/pages/order/order' })
  },

  goCart() {
    wx.switchTab({ url: '/pages/cart/cart' })
  },

  /* ---------- 菜单 ---------- */
  onMenu(e) {
    const id = e.currentTarget.dataset.id
    if (id === 'address') {
      const addr = store.getAddress()
      wx.showModal({
        title: '默认收货地址',
        content: addr.name + ' ' + addr.phone + '\n' + addr.region + addr.detail,
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (id === 'consult') {
      wx.showModal({
        title: '在线问诊',
        content: '演示项目未接入互联网医院。正式上线可对接在线问诊服务商或微信客服。',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (id === 'coupon') {
      wx.showToast({ title: '暂无可用优惠券', icon: 'none' })
      return
    }
    if (id === 'help') {
      wx.showModal({
        title: '常见问题',
        content: '1. 处方药如何购买？\n下单时上传处方，药师审核通过后发货。\n\n2. 药品能否退换？\n非质量问题拆封后不予退换。\n\n3. 多久发货？\n现货 24 小时内发出。',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    wx.showModal({
      title: '关于我们',
      content: '康宁大药房（演示项目）\n本小程序为教学/演示用途，商品与资质信息均为示例数据，不提供真实销售服务。',
      showCancel: false,
      confirmText: '知道了'
    })
  }
})
