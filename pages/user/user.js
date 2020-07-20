// pages/user/user.js
// import {
//   changeInput, changeFinal 
// } from '../../api/inputChange.js';
import {getSelf} from '../../api/me.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    // photo: '',
    // name: '',
    // intro: '',
    changeReady: false,
    changeOK: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = await getSelf({});
    console.log(res);
    this.setData({
      user: res.data.data,
      photo: res.data.data.photo,
      name: res.data.data.name,
      intro: res.data.data.intro
    })
  },
  // changeName () {
  //   changeInput(this.data.changeReady)
  // },
  // 改变头像
  changeAvatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        var newAvatar = res.tempFilePaths;
        that.setData({
          photo: newAvatar,
        })
      },
      fail: function () {

      },
      fail: function () {

      },
    })
  },
  // 改变昵称
  changeName: function () {
    this.setData({
      changeReady: true
    })
  },
  changeIntro(){
    this.setData({
      changeOK: true
    })
  },

  changeStart: function () {

  },
  changeEnd: function (event) {
    console.log(event.detail)
    this.setData({
      changeReady: false,
      name: event.detail.value
    })
  },
  changeFinish: function (event) {
    console.log(event.detail)
    this.setData({
      changeEnd: false,
      intro: event.detail.intro
    })
  },
  onClickLeft() {
    wx.navigateBack();
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