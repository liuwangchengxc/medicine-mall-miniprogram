const data = require('../../utils/data.js')
const store = require('../../utils/store.js')

Page({
  data: {
    goods: null,
    count: 1,
    cartCount: 0,
    priceText: '',
    originText: ''
  },

  onLoad(options) {
    const goods = data.getGoodsById(options.id)
    if (!goods) {
      wx.showToast({ title: '商品不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 800)
      return
    }
    this.setData({
      goods,
      priceText: goods.price.toFixed(2),
      originText: goods.originPrice ? goods.originPrice.toFixed(2) : ''
    })
    wx.setNavigationBarTitle({ title: goods.name })
  },

  onShow() {
    this.setData({ cartCount: store.getCartCount() })
  },

  /* ---------- 数量增减 ---------- */
  minus() {
    if (this.data.count <= 1) return
    this.setData({ count: this.data.count - 1 })
  },

  plus() {
    if (this.data.count >= 99) {
      wx.showToast({ title: '单次最多购买 99 件', icon: 'none' })
      return
    }
    this.setData({ count: this.data.count + 1 })
  },

  /* ---------- 加入购物车 ---------- */
  addCart() {
    store.addToCart(this.data.goods.id, this.data.count)
    this.setData({ cartCount: store.getCartCount() })
    wx.showToast({
      title: this.data.goods.rx ? '已加入（结算需处方）' : '已加入购物车',
      icon: 'none'
    })
  },

  /* ---------- 立即购买 ---------- */
  buyNow() {
    store.addToCart(this.data.goods.id, this.data.count)
    if (!getApp().requireLogin()) return
    wx.switchTab({ url: '/pages/cart/cart' })
  },

  goCart() {
    wx.switchTab({ url: '/pages/cart/cart' })
  },

  /* ---------- 药师咨询 ---------- */
  consult() {
    wx.showModal({
      title: '在线药师咨询',
      content: '演示项目未接入客服系统。正式上线可在此跳转企业微信客服或接入微信客服消息接口。',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  onShareAppMessage() {
    const g = this.data.goods
    return {
      title: g ? g.name + ' ¥' + this.data.priceText : '康宁大药房',
      path: '/pages/detail/detail?id=' + (g ? g.id : '')
    }
  }
})
