const app = getApp();
import {
  refreshToken
} from "../api/user.js";

const request = (options) => {
  // 必须放在函数内，这样每次调用请求时才会重新去取token
  // 如果放在函数外，也就是文件里，只会在文件初次引用时初始化一次，也就是在整个程序周期内只被初始化一次，只赋值一次
  // 也就是说这是 单例模式的，无论这个文件被多少个文件引用，函数外的代码，都始终只被执行一次。
  const token = wx.getStorageSync('token');

  if (token && token.token) {
    // 附加令牌
    if (!options.header) options.header = {};
    options.header.Authorization = `Bearer ${token.token}`;
  } else {
    // 如果没有token就跳去登录，这个封装的请求只用于需要验证的
    wx.navigateTo({
      url: "/pages/login/login"
    })
    // 返回函数
    return;
  }
  // 附加请求基址
  options.url = app.config.apiUrl.concat(options.url);
  return new Promise((resolve, reject) => {
    options = Object.assign(options, {
      success: resolve,
      fail: reject,
    });
    wx.request(options)
  }).then(res => {
    // 401 token 过期 或 无效
    if (res.statusCode === 401) {
      // 1. 验证是否存在刷新token
      if (token.refresh_token) {
        refreshToken(token.refresh_token, (res) => {
          // 2.如果刷新失败,跳去登录
          // 403 wrong refresh token 
          if (res.statusCode === 403) {
            wx.navigateTo({
              url: "/pages/login/login"
            })
            return res;
          }
          // 如果刷新token成功，更新storage中的信息
          const prevToken = wx.getStorageSync('token');
          prevToken.token = res.data.data.token;
          wx.setStorageSync('token', prevToken);
          // 并重新请求本次请求并将数据返回
          return request(options);
        })
      } else {
        // 3.如果不存在刷新token直接跳去登录
        wx.navigateTo({
          url: "/pages/login/login"
        })
      }
    }
    return res;
  })
};

module.exports = request;