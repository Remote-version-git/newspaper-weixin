const {
  sendCode
} = require('../../api/user');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '', //手机号
    captcha: '', //验证码
    buttonValue: '发送验证码', //发送验证码按钮上的字
    phoneMessage: '', //手机号输入提示
    codeInput: true, //是否禁用验证码输入框 
    banSend: false, //是否禁用发送验证码按钮
    sub: true //是否禁用登录按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 监听电话号码输入
  onChange(event) {
    this.setData({
      phoneNumber: event.detail,

    });
  },
  // 发送验证码功能
  sendCode: function () {
    // 发送之前先判断输入的电话号码
    if (this.data.phoneNumber == "") {
      this.data.phoneMessage = "请先输入电话号码";
      this.setData({
        phoneMessage: this.data.phoneMessage
      })
      return;
    } else if (this.data.phoneNumber !== "") {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.data.phoneNumber)) {
        this.data.phoneMessage = "请填写正确的电话号码"
        this.setData({
          phoneMessage: this.data.phoneMessage
        })
      } else {
        this.setData({
          codeInput: false, //解除验证码输入框的禁用
          banSend: true //禁用发送验证码按钮
        })
        sendCode(this.data.phoneNumber, (res) => { 
          console.log(res) 
        }) 
        let that = this;
        let buttonValue = '60' //验证码发送后倒计时60秒
        that.setData({
          timer: setInterval(function () {
            buttonValue--;
            that.setData({
              buttonValue: buttonValue + 's'
            })
            if (buttonValue == 0) { //倒计时结束
              clearInterval(that.data.timer);
              that.setData({
                buttonValue: '发送验证码', //按钮变回原样
                banSend: false // 解除发送验证码按钮的禁用
              })
            }
          }, 1000)
        })
      }
    }
  },
  //监听验证码输入框
  onChangeCode(e) {
    if (this.data.captcha.length >= 5) {
      this.setData({
        sub: false // 解除登录按钮的禁用
      })
    } else {
      this.setData({
        sub: true //禁用登录按钮
      })
    }
    this.setData({
      captcha: e.detail
    })
  },
  // 登录功能
  onlogin: function () {
    wx.request({
      url: app.config.apiUrl + '/app/v1_0/authorizations',
      data: {
        mobile: this.data.phoneNumber,
        code: this.data.captcha,
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode === '200' || '201') {
          wx.showToast({
            title: '验证成功',
            icon: 'success',
          })
          // 存入setStorage
          wx.setStorage({
            key: 'token',
            data: res.data.data, //存第三条数据
          })
          wx.navigateTo({
            url: '../index/index'
          })
        } else {
          wx.showToast({
            title: '登录失败，请确认验证码',
            icon: 'none'
          })
        }
      
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