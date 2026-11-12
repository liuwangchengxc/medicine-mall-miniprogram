const store = require('../../utils/store.js')

Page({
  data: {
    items: [],
    allSelected: false,
    selectedCount: 0,
    total: '0.00',
    hasRx: false,
    freeGap: '0.00'
  },

  onShow() {
    this.refresh()
  },

  /** 重新计算小计 / 合计 / 全选状态 */
  refresh() {
    const items = store.getCartDetail()
    const selected = items.filter(i => i.selected)
    const total = selected.reduce((s, i) => s + i.goods.price * i.count, 0)
    const count = selected.reduce((s, i) => s + i.count, 0)
    this.setData({
      items,
      allSelected: items.length > 0 && selected.length === items.length,
      selectedCount: count,
      total: total.toFixed(2),
      hasRx: selected.some(i => i.goods.rx),
      freeGap: total >= 99 ? '0.00' : (99 - total).toFixed(2)
    })
  },

  /* ---------- 勾选 ---------- */
  toggle(e) {
    store.toggleSelect(e.currentTarget.dataset.id)
    this.refresh()
  },

  toggleAll() {
    store.toggleSelectAll(!this.data.allSelected)
    this.refresh()
  },

  /* ---------- 数量 ---------- */
  minus(e) {
    const { id, count } = e.currentTarget.dataset
    if (count <= 1) {
      wx.showToast({ title: '至少购买 1 件', icon: 'none' })
      return
    }
    store.updateCount(id, count - 1)
    this.refresh()
  },

  plus(e) {
    const { id, count } = e.currentTarget.dataset
    if (count >= 99) {
      wx.showToast({ title: '单件最多 99 件', icon: 'none' })
      return
    }
    store.updateCount(id, count + 1)
    this.refresh()
  },

  /* ---------- 删除 ---------- */
  remove(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '移出购物车',
      content: '确定要删除这件药品吗？',
      confirmColor: '#e34d59',
      success: res => {
        if (!res.confirm) return
        store.removeItem(id)
        this.refresh()
        wx.showToast({ title: '已删除', icon: 'none' })
      }
    })
  },

  /* ---------- 跳转 ---------- */
  goDetail(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
  },

  goIndex() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  /* ---------- 结算 ---------- */
  checkout() {
    if (this.data.selectedCount === 0) {
      wx.showToast({ title: '请先勾选要结算的药品', icon: 'none' })
      return
    }
    if (!getApp().requireLogin()) return
    wx.navigateTo({ url: '/pages/order-confirm/order-confirm' })
  }
})
