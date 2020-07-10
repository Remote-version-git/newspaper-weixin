const {
  sendCode
} = require('../../api/user');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber: '',
    captcha: '',
    buttonvalue: '发送验证码',
    phonemessage: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(event) {
    // const phone = event.detail || event;
    // let message = '';
    // let disable = '';
    // if (phone) {
    //   if (/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
    //     message = '';
    //     disable = false;
    //   } else {
    //     message = '您输入的手机号码有误';
    //     disable = true;
    //   }
    // } else {
    //   message = '输入的手机号不能为空',
    //   disable = true
    // }
    // event.detail 为当前输入的值
    this.setData({
      phonenumber: event.detail,

    });
  },
  // 发送验证码计时
  sendCode: function () {
    if (this.data.phonenumber == "") {
      this.data.phonemessage = "请先输入电话号码";
      this.setData({
        phonemessage: this.data.phonemessage
      })
      return;
    } else if (this.data.phonenumber !== "") {
      var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.data.phonenumber != reg) {
        this.data.phonemessage = "请填写正确的电话号码"
        this.setData({
          phonemessage: this.data.phonemessage
        })
      } else {
        buttonChange();
      }
    }
  },
  buttonChange: function () {
    let that = this;
    let buttonvalue = '60'
    that.setData({
      timer: setInterval(function () {
        buttonvalue--;
        that.setData({
          buttonvalue: buttonvalue + 's'
        })
        if (buttonvalue == 0) {
          clearInterval(that.data.timer);
          that.setData({
            buttonvalue: '发送验证码'
          })
        }
      }, 1000)
    })
  },
  onChangeCode(e) {
    this.setData({
      captcha: e.detail
    })
  },
  onlogin: function () {
    console.log(this);
    var phone = this.data.phonenumber;
    var setcode = this.data.captcha;
    console.log(phone);
    console.log(setcode)
    wx.request({
      url: app.config.apiUrl + '/app/v1_0/authorizations',
      data: {
        mobile: this.data.phonenumber,
        code: this.data.captcha,
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.statusCode === '200') {
          wx.showToast({
            title: '验证成功',
            icon: 'success',
          })
          // 存入setStorage
          wx.setStorage({
            key: 'kkk',
            data: res.data.message, //存第三条数据
          })
        } else {
          wx.showToast({
            title: '登录失败,请确认验证码输入是否正确',
            icon: 'warn'
          })
        }
        wx.navigateTo({
          url: '../index/index'
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})