Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    list: [],
    recycleViewHeight: 500,
    statusBarHeight: getApp().globalData.statusBarHeight, //获取全局变量 导航栏的高度statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  cleanInput() {
    this.setData({
      searchValue: '',
      list: []
    })
  },
  testKuoHao() {
    var aa = "ldfjsldfj(dsfasjfj3124123)AAA";
    //1 查找(开始
    //2 ([^)]*)中是匹配内容，不包含)的任意字符，零个或多个的字符
    var result = aa.match(/\(([^)]*)\)/);
    // var result = aa.match(/\((.+)\)/);
    // 此时result＝["(dsfasjfj3124123)", "dsfasjfj3124123"];
    console.log(result);
    if (result) {
      console.log(result[1]); // "dsfasjfj3124123"
    }
  },
  // 监听搜索框
  inputChange(e) {
    let self = this,
      value = e.detail.value;
    if (value == '') {
      var list = [];
      self.setData({
        list: list
      });
      return;
    }
    self.request(value);
  },
  // 发起搜索请求
  request(value) {
    var self = this;
    var url = 'http://ttapi.research.itcast.cn/app/v1_0/search';
    wx.request({
      url: url,
      data: {
        q: value,
      },
      success(res) {
        self.setData({
          list: res.data.data.results
        })
      }
    });
  },
  // 跳转到文章详情
  goToDetail(event) {
    wx.navigateTo({
      url: "/pages/article/article?articleId=" + event.currentTarget.dataset.articleId,
    })
  },
  onClickLeft() {
    wx.navigateBack();
  }
})