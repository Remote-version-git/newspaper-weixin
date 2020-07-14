Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
})