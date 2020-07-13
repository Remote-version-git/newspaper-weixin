var util = require('../../utils/util');
import {
  getSelf
} from '../../api/me.js';
var app = getApp();
Page({
  data: {
    autoplay: false,
    interval: 3000,
    duration: 1200,
    indicatorDots: true,
    emotionArr: [],
    messageInputVal: '',
    emotionHost: null,
    // nowDate: '',
    nodes: [{
      name: 'img'
    }],
    messageList: [{
        type: 'L',
        messageType: 'txt',
        con: '你好，你想对我说什么？',
        avater: 'https://img.yzcdn.cn/vant/cat.jpeg',
      },
      {
        type: 'R',
        messageType: 'txt',
        con: "你好",
        avater: 'https://img.yzcdn.cn/vant/cat.jpeg',
      },
    ],
    photo: '',
    isMedia: false,
    isEmotion: false,
    isShowAdd: true
  },
  //删除输入的值
  deleteVal() {
    // console.log(this.data.messageInputVal.length)
    let newVal = this.data.messageInputVal.substring(0, this.data.messageInputVal.length - 1);
    this.setData({
      messageInputVal: newVal
    })
    this.isShowAddFun();
  },
  //分享（带参数），在onLoad接收参数
  onShareAppMessage: function () {
    return {
      title: 'xx小程序',
      path: 'pages/index/index?id=123&name="zansan"&age=23', // 路径，传递参数到指定页面。 
      imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' //自定义分享封面
    }
  },
  onLoad: function (options) {
    console.log('options...', JSON.stringify(options));
    // console.log(options.id);
    // console.log(options.name);
    // console.log(options.age);
  },
      // getAvater:async function () {
      //   const res = await getSelf({});
      //   console.log(res);
      //   return res.data.data.photo
      // },
  // 封装获取时间的函数
  // getTime: function () {
  //    var formDate = util.formatTime(new Date());
  //    return formDate;
  //   },
  //发送消息
  messageSend: function () {
    let self = this;
    let messageVal = self.data.messageInputVal;
    if (!messageVal) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    //表情处理
    var reg = /\[.+?\]/g;
    let newVal = messageVal.replace(reg, function (a, b) {
      return face(a) ? face(a) : a;
    });

    //发送的消息
    let objR = {
      type: 'R',
      messageType: 'txt',
      con: newVal,
      avater: '../../imgs/pig.jpg'
    };
    //自动回复（模拟数据）
    let objL = {
      type: 'L',
      messageType: 'txt',
      con: "请问有什么可以帮到您？",
      avater: 'https://img.yzcdn.cn/vant/cat.jpeg'
    };
    let messageArr = [];
    messageArr.push(objR);
    messageArr.push(objL);
    let newMessageArr = self.data.messageList.concat(messageArr);

    //更新数据（模拟请求历史数据）
    self.setData({
      messageInputVal: "",
      messageList: newMessageArr,
      isEmotion: false,
      isMedia: false,
    })
    self.scrollBottom();
  },

  //使页面滚动到底部
  scrollBottom: function () {
    wx.createSelectorQuery().select('#wrapperCon').boundingClientRect(function (rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom + 1000 //加整数的目的是消息数量多的时候，解决滚动会出现不到底部，并且抖动的问题
      })
    }).exec();
  },
  //获取输入内容
  messageInput: function (e) {
    let inputVal = e.detail.value;
    this.setData({
      messageInputVal: inputVal
    })
    this.isShowAddFun();
  },
  //是否显示添加按钮
  isShowAddFun() {
    //如果有输入显示发送按钮，隐藏加号添加图片功能
    if (this.data.messageInputVal) {
      this.setData({
        isShowAdd: false
      })
    } else {
      this.setData({
        isShowAdd: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})