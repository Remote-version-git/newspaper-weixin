const app = getApp();
// 获取当前用户自己的信息
export function getSelf() {
  return request({
    url: app.config.apiUrl + "/app/v1_0/user/profile",
    success: cb,
  });
}