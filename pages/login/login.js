const store = require('../../utils/store.js')

Page({
  data: {
    nickname: '',
    phone: '',
    agree: false,
    avatars: ['🙂', '🐻', '🌿', '🐱', '🦊', '🍀'],
    avatarIdx: 0
  },

  onLoad(query) {
    this.redirect = query && query.redirect ? decodeURIComponent(query.redirect) : ''
  },

  onNickname(e) {
    this.setData({ nickname: e.detail.value })
  },

  onPhone(e) {
    this.setData({ phone: e.detail.value })
  },

  pickAvatar(e) {
    this.setData({ avatarIdx: e.currentTarget.dataset.idx })
  },

  toggleAgree() {
    this.setData({ agree: !this.data.agree })
  },

  showAgreement() {
    wx.showModal({
      title: '用户协议与隐私说明',
      content: '本演示小程序仅在本地保存你的昵称与手机号，用于展示登录态；不会上传服务器。\n\n' +
        '真实项目应：① 明示收集目的与范围；② 提供隐私政策与撤回同意入口；' +
        '③ 手机号等敏感信息加密存储；④ 不收集与购药无关的信息。',
      showCancel: false,
      confirmText: '我已了解'
    })
  },

  /** 一键登录（演示）：自动填充示例资料 */
  quickLogin() {
    this.setData({
      nickname: '微信用户_小城',
      phone: '13800136688',
      agree: true
    })
    wx.showToast({ title: '已填入示例资料', icon: 'none' })
  },

  submit() {
    const { nickname, phone, agree, avatars, avatarIdx } = this.data

    if (!agree) {
      wx.showToast({ title: '请先阅读并同意用户协议', icon: 'none' })
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的 11 位手机号', icon: 'none' })
      return
    }

    store.setUser({
      nickname: (nickname || '').trim() || '微信用户',
      phone,
      avatar: avatars[avatarIdx],
      loginTime: Date.now()
    })

    wx.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        wx.navigateBack()
      } else {
        wx.switchTab({ url: '/pages/mine/mine' })
      }
    }, 700)
  }
})
