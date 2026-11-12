const data = require('../../utils/data.js')
const store = require('../../utils/store.js')

Page({
  data: {
    keyword: '',
    activeCat: 'all',
    cats: [],
    banners: [],
    promises: [],
    list: [],
    cartCount: 0
  },

  onLoad() {
    this.setData({
      cats: data.categories,
      banners: data.banners,
      promises: data.promises
    })
    this.loadList()
  },

  onShow() {
    this.setData({ cartCount: store.getCartCount() })
  },

  onPullDownRefresh() {
    this.loadList()
    wx.stopPullDownRefresh()
    wx.showToast({ title: '已刷新', icon: 'none' })
  },

  /** 加载商品列表 */
  loadList() {
    const raw = data.getGoodsByCat(this.data.activeCat, this.data.keyword)
    const list = raw.map(g => Object.assign({}, g, {
      priceText: g.price.toFixed(2),
      originText: g.originPrice ? g.originPrice.toFixed(2) : '',
      salesText: g.sales >= 10000 ? (g.sales / 10000).toFixed(1) + '万' : g.sales + ''
    }))
    this.setData({ list })
  },

  /* ---------- 搜索 ---------- */
  onKeyword(e) {
    this.setData({ keyword: e.detail.value })
  },

  onSearch() {
    this.loadList()
  },

  clearKeyword() {
    this.setData({ keyword: '' })
    this.loadList()
  },

  /* ---------- 分类 ---------- */
  onCat(e) {
    const id = e.currentTarget.dataset.id
    if (id === this.data.activeCat) return
    this.setData({ activeCat: id })
    this.loadList()
  },

  /* ---------- 跳转 ---------- */
  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  goCart() {
    wx.switchTab({ url: '/pages/cart/cart' })
  },

  /* ---------- 加入购物车 ---------- */
  addCart(e) {
    const id = e.currentTarget.dataset.id
    const goods = data.getGoodsById(id)
    if (!goods) return
    store.addToCart(id, 1)
    this.setData({ cartCount: store.getCartCount() })
    wx.showToast({
      title: goods.rx ? '已加入，结算需上传处方' : '已加入购物车',
      icon: 'none'
    })
  }
})
