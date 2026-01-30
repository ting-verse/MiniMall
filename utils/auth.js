const { checkToken, loginApi } = require("../apis/login.js");

// 检查登录态是否过期
async function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail() {
        reject(false);
      },
    });
  });
}

// 检查登录状态 返回 true / false
async function checkHasLogined() {
  // 判断 token 是否存在
  const token = wx.getStorageSync("token");
  if (!token) return false;
  // 检查登录态是否失效
  const logined = await checkSession();
  if (!logined) {
    wx.removeStorageSync("token");
    return false;
  }
  // 判断 token 是否合法
  const checkTokenRes = await checkToken({ token });
  if (checkTokenRes === -1) {
    wx.removeStorageSync("token");
    return false;
  }
  return true;
}

// 微信登录
async function wxCode() {
  return new Promise((resolve) => {
    wx.login({
      success: (res) => {
        resolve(res.code);
      },
    });
  });
}

// 静默登录
async function authorize() {
  return new Promise(async (resolve, reject) => {
    const code = await wxCode();
    const res = await loginApi({code})
    console.log(res, "token信息")
    wx.setStorageSync('token', res.token)
    wx.setStorageSync('uid', res.uid)
    resolve()
  })
}

module.exports = {
  checkHasLogined,
  authorize
};
