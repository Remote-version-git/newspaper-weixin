
import { getAllChannels, sendCode, login } from '../../api/news.js';

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
    active: 1,
    channels: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached() {
   login("925365")

    getAllChannels((res) => {
      this.setData({
        channels: res.data.data.channels
      })
    })
  }
})
