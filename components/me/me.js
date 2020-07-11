// components/me.js
import { getUser } from '../../api/me.js';
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
    user: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
