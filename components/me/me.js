// components/me.js
import {
  getSelf
} from '../../api/me.js';
const app = getApp();

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
    photo: '',
    name: '',
    like_count: '',
    follow_count: '',
    fans_count: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  async attached() {
    const res = await getSelf({});
    this.setData({
      photo: res.data.data.photo,
      name: res.data.data.name,
      like_count: res.data.data.like_count,
      follow_count: res.data.data.follow_count,
      fans_count: res.data.data.fans_count
    })
    console.log(res)
  }
})