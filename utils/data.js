/**
 * 商品 mock 数据
 * 说明：真实项目应由后端接口返回；此处为演示数据，价格/厂家/批准文号均为示例，请勿直接用于生产。
 */

// 分类
const categories = [
  { id: 'all', name: '全部' },
  { id: 'cold', name: '感冒发热' },
  { id: 'stomach', name: '肠胃用药' },
  { id: 'chronic', name: '慢病用药' },
  { id: 'vitamin', name: '维生素营养' },
  { id: 'skin', name: '皮肤外用' },
  { id: 'child', name: '儿童用药' },
  { id: 'device', name: '医疗器械' }
]

/**
 * 字段说明
 * price        售价（元）
 * originPrice  划线价（元）
 * rx           true = 处方药（需凭处方购买）
 * tag          OTC / RX / HEALTH
 * color        缩略图占位背景（正式项目替换为 image 地址）
 */
const goodsList = [
  {
    id: 1,
    name: '连花清瘟胶囊',
    spec: '0.35g×24粒/盒',
    factory: '石家庄以岭药业股份有限公司',
    cat: 'cold',
    price: 26.8,
    originPrice: 33.0,
    sales: 12860,
    stock: 120,
    rx: false,
    tag: 'OTC',
    emoji: '🌿',
    color: 'linear-gradient(135deg,#e6f7ee,#c8ebd9)',
    effect: '清瘟解毒，宣肺泄热。用于治疗流行性感冒属热毒袭肺证，症见发热、恶风寒、肌肉酸痛、鼻塞流涕、咳嗽、头痛、咽干咽痛。',
    usage: '口服。一次4粒，一日3次。',
    notice: '忌烟、酒及辛辣、生冷、油腻食物。不宜在服药期间同时服用滋补性中药。'
  },
  {
    id: 2,
    name: '布洛芬缓释胶囊',
    spec: '0.3g×20粒/盒',
    factory: '中美天津史克制药有限公司',
    cat: 'cold',
    price: 21.5,
    originPrice: 25.0,
    sales: 8742,
    stock: 86,
    rx: false,
    tag: 'OTC',
    emoji: '💊',
    color: 'linear-gradient(135deg,#eef2ff,#d9e0fb)',
    effect: '用于缓解轻至中度疼痛，如头痛、关节痛、偏头痛、牙痛、肌肉痛、神经痛、痛经，也用于普通感冒或流行性感冒引起的发热。',
    usage: '口服。成人一次1粒，一日2次（早晚各一次）。',
    notice: '本品为对症治疗药，用于止痛不得超过5天，用于解热不得超过3天，症状不缓解请咨询医师或药师。'
  },
  {
    id: 3,
    name: '感冒灵颗粒',
    spec: '10g×9袋/盒',
    factory: '华润三九医药股份有限公司',
    cat: 'cold',
    price: 15.9,
    originPrice: 19.9,
    sales: 20315,
    stock: 200,
    rx: false,
    tag: 'OTC',
    emoji: '🍵',
    color: 'linear-gradient(135deg,#fff4e6,#ffe1bf)',
    effect: '解热镇痛。用于感冒引起的头痛、发热、鼻塞、流涕、咽痛。',
    usage: '开水冲服。一次1袋，一日3次。',
    notice: '服药期间不得驾驶机、车、船，不得从事高空作业、机械作业及操作精密仪器。'
  },
  {
    id: 4,
    name: '蒙脱石散',
    spec: '3g×10袋/盒',
    factory: '博福-益普生（天津）制药有限公司',
    cat: 'stomach',
    price: 18.6,
    originPrice: 22.0,
    sales: 6531,
    stock: 150,
    rx: false,
    tag: 'OTC',
    emoji: '🥣',
    color: 'linear-gradient(135deg,#f0f7ff,#d6e8fb)',
    effect: '用于成人及儿童急、慢性腹泻。',
    usage: '口服。成人一次1袋，一日3次；儿童酌减或遵医嘱。',
    notice: '治疗急性腹泻时，应注意纠正脱水。'
  },
  {
    id: 5,
    name: '奥美拉唑肠溶胶囊',
    spec: '20mg×14粒/盒',
    factory: '阿斯利康制药有限公司',
    cat: 'stomach',
    price: 32.0,
    originPrice: 38.0,
    sales: 3420,
    stock: 60,
    rx: true,
    tag: 'RX',
    emoji: '💊',
    color: 'linear-gradient(135deg,#f3f0ff,#dfd8fb)',
    effect: '用于胃溃疡、十二指肠溃疡、应激性溃疡、反流性食管炎及卓-艾综合征。',
    usage: '口服。一次1粒，一日1次，晨起吞服或早晚各一次。请遵医嘱。',
    notice: '处方药，须凭执业医师处方购买，请在药师指导下使用。'
  },
  {
    id: 6,
    name: '盐酸二甲双胍片',
    spec: '0.5g×48片/盒',
    factory: '中美上海施贵宝制药有限公司',
    cat: 'chronic',
    price: 28.5,
    originPrice: 34.0,
    sales: 5120,
    stock: 88,
    rx: true,
    tag: 'RX',
    emoji: '🧪',
    color: 'linear-gradient(135deg,#eafaf5,#c9efe4)',
    effect: '用于2型糖尿病，尤其适用于肥胖的2型糖尿病患者。',
    usage: '口服。餐中或餐后服用，剂量需由医师根据血糖情况调整。',
    notice: '处方药，须凭处方购买。肾功能不全者禁用，用药期间定期监测血糖与肾功能。'
  },
  {
    id: 7,
    name: '阿莫西林胶囊',
    spec: '0.25g×24粒/盒',
    factory: '华北制药股份有限公司',
    cat: 'chronic',
    price: 12.8,
    originPrice: 16.0,
    sales: 9860,
    stock: 130,
    rx: true,
    tag: 'RX',
    emoji: '💉',
    color: 'linear-gradient(135deg,#eef7ff,#d4e9fb)',
    effect: '适用于敏感菌所致的呼吸道感染、泌尿生殖道感染、皮肤软组织感染等。',
    usage: '口服。成人一次2粒，每6-8小时1次。请遵医嘱。',
    notice: '处方药。青霉素过敏者禁用，使用前须做皮试或确认无过敏史。'
  },
  {
    id: 8,
    name: '维生素C泡腾片',
    spec: '1g×20片/瓶',
    factory: '拜耳医药保健有限公司',
    cat: 'vitamin',
    price: 39.9,
    originPrice: 49.0,
    sales: 7218,
    stock: 180,
    rx: false,
    tag: 'HEALTH',
    emoji: '🍊',
    color: 'linear-gradient(135deg,#fff8e6,#ffe6b8)',
    effect: '补充维生素C，增强机体抵抗力，用于预防和治疗维生素C缺乏症。',
    usage: '用冷水或温开水溶解后饮用，成人一日1片。',
    notice: '不宜长期过量服用；请勿直接吞服，以免损伤口腔黏膜。'
  },
  {
    id: 9,
    name: '钙片（碳酸钙D3）',
    spec: '60片/瓶',
    factory: '惠氏制药有限公司',
    cat: 'vitamin',
    price: 68.0,
    originPrice: 88.0,
    sales: 4390,
    stock: 96,
    rx: false,
    tag: 'HEALTH',
    emoji: '🥛',
    color: 'linear-gradient(135deg,#f6f7fb,#e2e6f2)',
    effect: '用于妊娠和哺乳期妇女、更年期妇女、老年人等的钙补充，并帮助防治骨质疏松症。',
    usage: '口服。一次1片，一日1-2次，餐后服用。',
    notice: '高钙血症、高尿酸血症患者禁用；不宜与洋地黄类药物合用。'
  },
  {
    id: 10,
    name: '云南白药气雾剂',
    spec: '85g+30g/盒',
    factory: '云南白药集团股份有限公司',
    cat: 'skin',
    price: 45.0,
    originPrice: 52.0,
    sales: 6120,
    stock: 75,
    rx: false,
    tag: 'OTC',
    emoji: '🧴',
    color: 'linear-gradient(135deg,#eef6ff,#d3e6fb)',
    effect: '活血散瘀，消肿止痛。用于跌打损伤、瘀血肿痛、肌肉酸痛及风湿疼痛。',
    usage: '外用。喷于伤患处，一日3-5次；凡遇较重闭合性跌打损伤者，先喷保险液。',
    notice: '仅供外用，切勿口服。皮肤破溃处禁用，避免接触眼睛、口腔等黏膜。'
  },
  {
    id: 11,
    name: '小儿氨酚黄那敏颗粒',
    spec: '6g×10袋/盒',
    factory: '哈药集团制药总厂',
    cat: 'child',
    price: 16.5,
    originPrice: 20.0,
    sales: 11240,
    stock: 140,
    rx: false,
    tag: 'OTC',
    emoji: '🧒',
    color: 'linear-gradient(135deg,#fff0f3,#ffd9e2)',
    effect: '适用于缓解儿童普通感冒及流行性感冒引起的发热、头痛、四肢酸痛、打喷嚏、流鼻涕、鼻塞、咽痛等症状。',
    usage: '温水冲服。1-3岁一次0.5-1袋，4-6岁一次1-1.5袋，一日3次。',
    notice: '用药3-7天症状未缓解请咨询医师。服用本品期间不得饮酒或含酒精饮料。'
  },
  {
    id: 12,
    name: '医用外科口罩',
    spec: '50只/盒（独立包装）',
    factory: '稳健医疗用品股份有限公司',
    cat: 'device',
    price: 29.9,
    originPrice: 39.9,
    sales: 30120,
    stock: 500,
    rx: false,
    tag: 'OTC',
    emoji: '😷',
    color: 'linear-gradient(135deg,#f2f6fa,#dde6ee)',
    effect: '用于覆盖佩戴者的口鼻，阻隔飞沫、花粉、粉尘等颗粒物。',
    usage: '一次性使用，建议连续佩戴不超过4小时。',
    notice: '本品为一次性使用医疗器械，包装破损禁止使用。'
  }
]

/** 底部服务保障文案 */
const promises = [
  { icon: '✅', text: '正品保障' },
  { icon: '🚚', text: '满99包邮' },
  { icon: '💬', text: '药师咨询' },
  { icon: '↩️', text: '7天退换' }
]

/** 首页轮播 / 活动位 */
const banners = [
  { id: 1, title: '换季常备药 满99减20', sub: '感冒发热 · 肠胃用药 专区', bg: 'linear-gradient(135deg,#12996f,#4ec49a)', emoji: '🍃' },
  { id: 2, title: '慢病用药 长期处方续方', sub: '凭处方在线续方，药师审核', bg: 'linear-gradient(135deg,#2563eb,#60a5fa)', emoji: '📋' },
  { id: 3, title: '家庭小药箱 清单推荐', sub: '一次配齐，应急不慌', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)', emoji: '🧰' }
]

function getGoods() {
  return goodsList.map(g => Object.assign({}, g))
}

function getGoodsById(id) {
  const target = goodsList.find(g => g.id === Number(id))
  return target ? Object.assign({}, target) : null
}

function getGoodsByCat(catId, keyword) {
  const kw = (keyword || '').trim()
  return goodsList
    .filter(g => (catId === 'all' || !catId ? true : g.cat === catId))
    .filter(g => {
      if (!kw) return true
      return (g.name + g.effect + g.factory).indexOf(kw) > -1
    })
    .map(g => Object.assign({}, g))
}

function getCatName(catId) {
  const c = categories.find(i => i.id === catId)
  return c ? c.name : '全部'
}

module.exports = {
  categories,
  promises,
  banners,
  getGoods,
  getGoodsById,
  getGoodsByCat,
  getCatName
}
