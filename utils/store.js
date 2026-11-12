/**
 * 本地状态管理（购物车 / 订单 / 用户）
 * 说明：演示项目使用 wx.setStorageSync 持久化；接入后端时把这里的读写替换为接口请求即可，
 *      页面调用方式保持不变。
 */
const data = require('./data.js')

const KEY_CART = 'mm_cart'      // [{ id, count, selected }]
const KEY_ORDER = 'mm_orders'   // [order]
const KEY_USER = 'mm_user'      // { nickname, phone, avatar, loginTime }
const KEY_ADDR = 'mm_address'   // { name, phone, region, detail }

/* ---------------- 通用读写 ---------------- */
function read(key, def) {
  try {
    const val = wx.getStorageSync(key)
    return val === '' || val === null || val === undefined ? def : val
  } catch (e) {
    return def
  }
}

function write(key, val) {
  try {
    wx.setStorageSync(key, val)
  } catch (e) {
    console.error('storage write failed', key, e)
  }
}

/* ---------------- 用户 ---------------- */
function getUser() {
  return read(KEY_USER, null)
}

function setUser(user) {
  write(KEY_USER, user)
  const app = getApp()
  if (app) app.globalData.user = user
}

function clearUser() {
  try { wx.removeStorageSync(KEY_USER) } catch (e) {}
  const app = getApp()
  if (app) app.globalData.user = null
}

/* ---------------- 收货地址 ---------------- */
function getAddress() {
  return read(KEY_ADDR, {
    name: '张明',
    phone: '138****6688',
    region: '上海市 浦东新区',
    detail: '张江路 88 号 3 号楼 502 室'
  })
}

function setAddress(addr) {
  write(KEY_ADDR, addr)
}

/* ---------------- 购物车 ---------------- */
function getCart() {
  return read(KEY_CART, [])
}

function saveCart(cart) {
  write(KEY_CART, cart)
  const app = getApp()
  if (app && app.refreshCartBadge) app.refreshCartBadge()
  return cart
}

function getCartCount() {
  return getCart().reduce((sum, it) => sum + Number(it.count || 0), 0)
}

/** 加入购物车；已存在则累加数量 */
function addToCart(goodsId, count) {
  const num = Number(count) || 1
  const cart = getCart()
  const hit = cart.find(it => it.id === Number(goodsId))
  if (hit) {
    hit.count = Math.min(hit.count + num, 99)
    hit.selected = true
  } else {
    cart.push({ id: Number(goodsId), count: num, selected: true })
  }
  return saveCart(cart)
}

function updateCount(goodsId, count) {
  const cart = getCart()
  const hit = cart.find(it => it.id === Number(goodsId))
  if (hit) {
    hit.count = Math.max(1, Math.min(Number(count) || 1, 99))
  }
  return saveCart(cart)
}

function removeItem(goodsId) {
  return saveCart(getCart().filter(it => it.id !== Number(goodsId)))
}

function toggleSelect(goodsId) {
  const cart = getCart()
  const hit = cart.find(it => it.id === Number(goodsId))
  if (hit) hit.selected = !hit.selected
  return saveCart(cart)
}

function toggleSelectAll(selected) {
  const cart = getCart().map(it => Object.assign({}, it, { selected: !!selected }))
  return saveCart(cart)
}

/** 购物车 + 商品信息合并，供页面渲染 */
function getCartDetail() {
  return getCart()
    .map(it => {
      const goods = data.getGoodsById(it.id)
      if (!goods) return null
      return {
        id: it.id,
        count: it.count,
        selected: !!it.selected,
        goods,
        subtotal: (goods.price * it.count).toFixed(2)
      }
    })
    .filter(Boolean)
}

/** 已勾选的商品 */
function getSelectedDetail() {
  return getCartDetail().filter(it => it.selected)
}

function removeByIds(ids) {
  const set = ids.map(Number)
  return saveCart(getCart().filter(it => set.indexOf(it.id) === -1))
}

/* ---------------- 订单 ---------------- */
function getOrders() {
  return read(KEY_ORDER, [])
}

function saveOrders(list) {
  write(KEY_ORDER, list)
  return list
}

function genOrderNo() {
  const d = new Date()
  const p = n => (n < 10 ? '0' + n : '' + n)
  const rand = Math.floor(Math.random() * 9000 + 1000)
  return 'KN' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) +
    p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds()) + rand
}

function formatTime(ts) {
  const d = new Date(ts)
  const p = n => (n < 10 ? '0' + n : '' + n)
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
    ' ' + p(d.getHours()) + ':' + p(d.getMinutes())
}

/**
 * 创建订单
 * @param {Object} payload { items, remark }
 */
function createOrder(payload) {
  const items = payload.items || []
  const goodsAmount = items.reduce((s, it) => s + it.goods.price * it.count, 0)
  const freight = goodsAmount >= 99 ? 0 : 8
  const order = {
    orderNo: genOrderNo(),
    createTime: Date.now(),
    createTimeText: formatTime(Date.now()),
    status: 'unpaid',
    items: items.map(it => ({
      id: it.goods.id,
      name: it.goods.name,
      spec: it.goods.spec,
      price: it.goods.price,
      count: it.count,
      emoji: it.goods.emoji,
      color: it.goods.color,
      rx: it.goods.rx
    })),
    goodsAmount: goodsAmount.toFixed(2),
    freight: freight.toFixed(2),
    total: (goodsAmount + freight).toFixed(2),
    hasRx: items.some(it => it.goods.rx),
    remark: payload.remark || '',
    address: getAddress()
  }
  const list = getOrders()
  list.unshift(order)
  saveOrders(list)
  return order
}

function updateOrder(orderNo, patch) {
  const list = getOrders().map(o => (o.orderNo === orderNo ? Object.assign({}, o, patch) : o))
  return saveOrders(list)
}

function findOrder(orderNo) {
  return getOrders().find(o => o.orderNo === orderNo) || null
}

/** 订单状态统计，用于「我的」页角标 */
function countByStatus() {
  const list = getOrders()
  return {
    unpaid: list.filter(o => o.status === 'unpaid').length,
    undelivered: list.filter(o => o.status === 'undelivered').length,
    shipping: list.filter(o => o.status === 'shipping').length,
    done: list.filter(o => o.status === 'done').length
  }
}

const STATUS_TEXT = {
  unpaid: '待付款',
  undelivered: '待发货',
  shipping: '待收货',
  done: '已完成',
  canceled: '已取消'
}

module.exports = {
  getUser,
  setUser,
  clearUser,
  getAddress,
  setAddress,
  getCart,
  getCartCount,
  addToCart,
  updateCount,
  removeItem,
  removeByIds,
  toggleSelect,
  toggleSelectAll,
  getCartDetail,
  getSelectedDetail,
  getOrders,
  createOrder,
  updateOrder,
  findOrder,
  countByStatus,
  formatTime,
  STATUS_TEXT
}
