
import { getAllChannels } from '../../api/news.js';

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
    getAllChannels((res) => {
      this.setData({
        channels: res.data.data.channels
      })
    })
  }
})
