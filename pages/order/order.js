const store = require('../../utils/store.js')

Page({
  data: {
    tabs: [
      { id: 'all', name: '全部' },
      { id: 'unpaid', name: '待付款' },
      { id: 'undelivered', name: '待发货' },
      { id: 'shipping', name: '待收货' },
      { id: 'done', name: '已完成' }
    ],
    active: 'all',
    list: [],
    counts: {}
  },

  onLoad(query) {
    if (query && query.status) {
      this.setData({ active: query.status })
    }
  },

  onShow() {
    // 「我的」页点击待付款/待发货等入口时，通过全局变量传递筛选状态
    const app = getApp()
    if (app.globalData.orderStatus) {
      this.setData({ active: app.globalData.orderStatus })
      app.globalData.orderStatus = ''
    }
    this.load()
  },

  onTab(e) {
    this.setData({ active: e.currentTarget.dataset.id })
    this.load()
  },

  /** 读取订单并按状态过滤 */
  load() {
    const all = store.getOrders()
    const active = this.data.active
    const list = all
      .filter(o => active === 'all' || o.status === active)
      .map(o => Object.assign({}, o, {
        statusText: store.STATUS_TEXT[o.status] || '',
        totalCount: o.items.reduce((s, i) => s + i.count, 0)
      }))
    this.setData({ list, counts: store.countByStatus() })
  },

  /* ---------- 订单操作 ---------- */
  pay(e) {
    const orderNo = e.currentTarget.dataset.no
    wx.showModal({
      title: '模拟支付',
      content: '演示项目不接入真实支付。正式上线需调用 wx.requestPayment 并配合后端下单签名。',
      confirmText: '确认支付',
      success: res => {
        if (!res.confirm) return
        store.updateOrder(orderNo, { status: 'undelivered' })
        this.load()
        wx.showToast({ title: '支付成功', icon: 'success' })
      }
    })
  },

  cancel(e) {
    const orderNo = e.currentTarget.dataset.no
    wx.showModal({
      title: '取消订单',
      content: '确定要取消这笔订单吗？已支付的订单将原路退款。',
      confirmColor: '#e34d59',
      success: res => {
        if (!res.confirm) return
        store.updateOrder(orderNo, { status: 'canceled' })
        this.load()
        wx.showToast({ title: '订单已取消', icon: 'none' })
      }
    })
  },

  /** 演示用：模拟商家发货，便于走通「待收货 → 已完成」 */
  ship(e) {
    const orderNo = e.currentTarget.dataset.no
    store.updateOrder(orderNo, { status: 'shipping' })
    this.load()
    wx.showToast({ title: '商家已发货（演示）', icon: 'none' })
  },

  receive(e) {
    const orderNo = e.currentTarget.dataset.no
    wx.showModal({
      title: '确认收货',
      content: '请确认已收到药品并核对无误。',
      success: res => {
        if (!res.confirm) return
        store.updateOrder(orderNo, { status: 'done' })
        this.load()
        wx.showToast({ title: '已确认收货', icon: 'success' })
      }
    })
  },

  remind() {
    wx.showToast({ title: '已提醒商家尽快发货', icon: 'none' })
  },

  /** 再次购买：把订单内药品重新加入购物车 */
  buyAgain(e) {
    const orderNo = e.currentTarget.dataset.no
    const order = store.findOrder(orderNo)
    if (!order) return
    order.items.forEach(it => store.addToCart(it.id, it.count))
    wx.showToast({ title: '已加入购物车', icon: 'none' })
    setTimeout(() => wx.switchTab({ url: '/pages/cart/cart' }), 600)
  },

  goDetail(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
  },

  goIndex() {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
