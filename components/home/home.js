
import { getAllChannels, getArticles } from '../../api/news.js';
const createRecycleContext = require('miniprogram-recycle-view')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    currentChannel: null,
    channels: [],
    recycleViewHeight: 420,
  },
  // list instance
  ctx: null,

  /**
   * 组件的方法列表
   */
  methods: {
    // 切换频道时
    async changeTabs(e) {
      // 请求文章数据
      const article = await getArticles({
        data: {
          channel_id: this.data.channels[e.detail.index].id,
          timestamp: Date.now(),
          with_top: 1
        }
      })
      // 追加数据
      this.ctx.append(article.data.data.results);
      // 更新现在频道
      this.setData({
        currentChannel: this.data.channels[e.detail.index].id,
        active: e.detail.index
      })
    }
  },
  attached() {
    // 创建list上下文
    this.ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'articles',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: 162,
        height: 182
      }
    })
    // 适配list高度，去除顶部距离
    const query = this.createSelectorQuery()
    query.select('#recycleId').boundingClientRect().exec((res) => {
      wx.getSystemInfo({
        success: (result) => {
           //  总高度 - 距离顶部距离 = 列表高度
            this.setData({
              recycleViewHeight: result.windowHeight - res[0].top,
            })
        },
      })
    });
    // 获取全部频道
    getAllChannels(async (res) => {
      // 请求第一个频道的文章
      const article = await getArticles({
        data: {
          channel_id: res.data.data.channels[0].id,
          timestamp: Date.now(),
          with_top: 0
        }
      })
      this.ctx.append(article.data.data.results);
      // 向视图层传递数据
      this.setData({
        channels: res.data.data.channels,
        currentChannel: res.data.data.channels[0].id
      })
    })
   
  }
})
