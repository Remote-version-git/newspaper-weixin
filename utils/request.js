const app = getApp();

const token = wx.getStorageSync('token');


const request = (options) => {
  if (token.token) {
    // 附加令牌
    if (!options.header) options.header = {};
    options.header.Authorize = `Bearer ${token.token}`;
  }
  // 附加请求基址
  options.url = app.config.apiUrl.concat(options.url);
  return new Promise((resolve, reject) => {
    options = Object.assign(options, {
      success: resolve,
      fail: reject,
    });
    wx.request(options)
  })
};

module.exports = request;