const { bannerList, category, goodsDynamic, notice } = require('../../apis/products.js')

Page({
  data: {
    banners: [],
    categories: [],
    goodsDynamic: [],
    noticeList: {}
  },
  goSearch() {
    console.log("hello")
  },
  onLoad: function (options) {
    // 轮播图
    bannerList().then(res => {
      console.log(res, "bannerList")
      if (res.code === 10000) {
        this.setData({
          banners: res.data
        })
      }
    })
    // 金刚区
    category().then(res => {
      console.log(res, "category")
      if (res.code === 10000) {
        this.setData({
          categories: res.data
        })
      }
    })
    // 购买记录
    goodsDynamic().then(res => {
      console.log(res, "goodsDynamic")
      if (res.code === 10000) {
        this.setData({
          goodsDynamic: res.data
        })
      }
    })
    // 公告资讯
    notice().then(res => {
      console.log(res, "notice")
      this.setData({
        noticeList: res.data
      })
    })
  }
})