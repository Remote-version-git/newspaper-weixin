const request = require('../utils/request');
const app = getApp();
// 获取当前用户自己的信息
module.exports = {
  getSelf(option) {
    return request({
      url: '/app/v1_0/user',
      ...option
    })
  }
};