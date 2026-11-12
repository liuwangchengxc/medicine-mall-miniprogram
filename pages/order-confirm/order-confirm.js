const store = require('../../utils/store.js')

Page({
  data: {
    items: [],
    address: {},
    goodsAmount: '0.00',
    freight: '0.00',
    total: '0.00',
    remark: '',
    hasRx: false,
    rxFile: '',
    submitting: false
  },

  onLoad() {
    const items = store.getSelectedDetail()
    if (!items.length) {
      wx.showToast({ title: '没有待结算的药品', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 900)
      return
    }
    const goodsAmount = items.reduce((s, i) => s + i.goods.price * i.count, 0)
    const freight = goodsAmount >= 99 ? 0 : 8
    this.setData({
      items,
      address: store.getAddress(),
      goodsAmount: goodsAmount.toFixed(2),
      freight: freight.toFixed(2),
      total: (goodsAmount + freight).toFixed(2),
      hasRx: items.some(i => i.goods.rx)
    })
  },

  onRemark(e) {
    this.setData({ remark: e.detail.value })
  },

  editAddress() {
    wx.showModal({
      title: '收货地址',
      content: '演示项目使用内置示例地址。正式上线可跳转地址列表页，调用 wx.chooseAddress 或自建地址簿。',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  /* ---------- 处方上传（演示） ---------- */
  uploadRx() {
    const ok = res => {
      const file = (res.tempFiles && res.tempFiles[0]) || (res.tempFilePaths && { tempFilePath: res.tempFilePaths[0] })
      this.setData({ rxFile: file.tempFilePath || 'picked' })
      wx.showToast({ title: '处方已上传，待药师审核', icon: 'none' })
    }
    const fail = () => wx.showToast({ title: '未选择图片', icon: 'none' })

    if (wx.chooseMedia) {
      wx.chooseMedia({ count: 1, mediaType: ['image'], success: ok, fail })
    } else {
      wx.chooseImage({ count: 1, success: ok, fail })
    }
  },

  /* ---------- 提交订单 ---------- */
  submit() {
    if (this.data.submitting) return
    if (this.data.hasRx && !this.data.rxFile) {
      wx.showToast({ title: '含处方药，请先上传处方', icon: 'none' })
      return
    }
    this.setData({ submitting: true })

    const order = store.createOrder({
      items: this.data.items,
      remark: this.data.remark
    })
    store.removeByIds(this.data.items.map(i => i.id))

    wx.showToast({ title: '下单成功', icon: 'success' })
    setTimeout(() => {
      this.setData({ submitting: false })
      wx.switchTab({ url: '/pages/order/order' })
    }, 800)
    console.log('订单已创建：', order.orderNo)
  },

  goBack() {
    wx.navigateBack()
  }
})
