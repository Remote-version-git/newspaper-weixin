import {
  getAllChannels,
  getArticles
} from '../../api/news.js';

// 上拉刷新锁
let isPullUp = false;

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
    channels: [],
    isLoading: false,
    scrollViewHeight: 0,
    triggered: false,
  },
  // 下拉刷新锁
  _freshing: false,
  /**
   * 组件的方法列表
   */
  methods: {
    // 切换频道时
    changeTabs(e) {
      // 切换频道的时候，如果正在下拉刷新，则取消掉
      if (this.data.triggered) {
        this.setData({
          triggered: false,
        })
      }
      // 更新现在频道
      this.setData({
        active: e.detail.index
      }, () => {
        this.getArticles();
      })
    },
    // 跳转到文章详情
    goToDetail(event) {
      wx.navigateTo({
        url: "/pages/article/article?articleId=" + event.currentTarget.dataset.articleId,
      })
    },
    // 上拉刷新
    onPullUp(e) {
      // 判断是否锁上，锁上就直接返回
      if (isPullUp) return;
      // 本频道数据已全部加载时直接返回
      if (this.data.channels[this.data.active].finishLoading) return;
      // 锁上
      isPullUp = true;
      // 设置正在加载
      this.setData({
        isLoading: true,
      }, async () => {
        await this.getArticles();
        // 设置数据加载结束
        this.setData({
          isLoading: false,
        })
        // 解锁
        isPullUp = false;
      })
    },

    async onRefresh() {
      // 判断是否锁
      if (this._freshing) return
      // 锁
      this._freshing = true
      if (!this.data.triggered) {
        // 设置触发
        this.setData({
          triggered: true,
        })
      }
      // true表示下拉刷新
      await this.getArticles(true);
      // 复原未触发
      this.setData({
        triggered: false,
      })
      // 提示
      wx.showToast({
        title: '文章刷新成功',
        icon: 'success',
        duration: 1000,
      })
      // 开锁
      this._freshing = false
    },

    onRestore(e) {
      console.log('onRestore:', e)
    },

    onAbort(e) {
      console.log('onAbort', e)
    },
    // 请求文章数据 并 装载数据, 参数默认不是下拉刷新而是上拉刷新
    async getArticles(isPullDown = false) {
      // 获取当前频道的对象
      let currentChannel = this.data.channels[this.data.active];
      // 获取当前频道文章数组
      let currentArticles = currentChannel.articles;
      try {
        const res = await getArticles({
          data: {
            channel_id: this.data.channels[this.data.active].id,
            // 只有上拉刷新才用翻页
            timestamp: !isPullDown ? currentChannel.timestamp || Date.now() : Date.now(),
            with_top: 1
          }
        })
        // 推送当前频道文章数据到当前频道文章里
        if (isPullDown) {
          //  下拉刷新
          currentArticles.unshift(...res.results);
        } else {
          //  上拉刷新
          currentArticles.push(...res.results);
        }
        // 更新当前频道的时间戳
        // 如果为空，则代表没有下一页数据了，
        const timestamp = res.pre_timestamp;
        if (timestamp) {
          // 更新下一页的时间戳
          currentChannel.timestamp = timestamp;
        } else {
          // 设置当前频道文章数据装载结束标识为true
          currentChannel.finishLoading = true;
        }
        // 通知视图更新数据
        this.setData({
          channels: this.data.channels,
        })
      } catch (error) {
        // wx.showModal({
        //   title: "数据异常",
        //   content: '服务器不小心摔倒了，请重新试试',
        //   confirmText: '我知道了',
        //   confirmColor: '#0f88eb',
        //   showCancel: false,
        // })
      }
    }
  },
  // 组件添加到节点时
  ready() {
    // 解决列表高度自适应问题
    this.createSelectorQuery().selectAll('#scroll-list').boundingClientRect().exec(rects => {
      // 获取高度用于设置列表高度
      const systemInfo = wx.getSystemInfoSync();
      // 50为底部tabbar 高度
      // rects[0][0].top 为顶部高度
      // 都减去就是scroll-view的高度了
      this.setData({
        scrollViewHeight: systemInfo.windowHeight - 50 - rects[0][0].top,
      })
    })
    // 获取全部频道
    getAllChannels(res => {
      let channels = res.data.data.channels;
      channels.forEach(item => {
        // 用于存储每个频道的文章
        item.articles = [];
        // 每个频道文章是否装载完成状态
        item.finishLoading = false;
        // 文章的翻页是根据每次是否有返回pre_timestamp来决定的
        // 如果pre_timestamp返回是null则完成装载
        item.timestamp = null;
      })
      this.setData({
        channels: channels,
      }, () => {
        // 获取首屏文章数据
        this.getArticles();
      })
    });
  }
})