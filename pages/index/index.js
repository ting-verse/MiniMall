const {
  bannerList,
  category,
  goodsDynamic,
  notice,
  seckill,
  hotGoods,
  discount,
  collage,
} = require("../../apis/products.js");

Page({
  data: {
    banners: [],
    categories: [],
    goodsDynamic: [],
    noticeList: {},
    miaoshaGoods: [],
    goodsRecommend: [],
    kanjiaList: [],
    pingtuanList: []
  },
  goSearch() {
    console.log("hello");
  },
  onLoad: function (options) {
    // 轮播图
    bannerList().then((res) => {
      console.log(res, "轮播图");
      if (res.code === 10000) {
        this.setData({
          banners: res.data,
        });
      }
    });

    // 金刚区
    category().then((res) => {
      console.log(res, "金刚区");
      if (res.code === 10000) {
        this.setData({
          categories: res.data,
        });
      }
    });

    // 购买记录
    goodsDynamic().then((res) => {
      console.log(res, "购买记录");
      if (res.code === 10000) {
        this.setData({
          goodsDynamic: res.data,
        });
      }
    });

    // 公告资讯
    notice().then((res) => {
      console.log(res, "公告资讯");
      this.setData({
        noticeList: res.data,
      });
    });

    // 现时秒杀
    seckill().then((res) => {
      console.log(res, "限时秒杀");
      // 处理时间
      if (res.code === 10000) {
        res.data.result.forEach((el) => {
          const _now = new Date().getTime();
          // 做一个假数据验证
          el.dateStart = "2026 02-01 12:00:00";
          el.dateEnd = "2026 03-01 12:00:00";
          // 设置的活动时间大于当前时间说明活动未开始，反之活动开始
          if (el.dateStart) {
            el.dateStartInt = new Date(el.dateStart).getTime() - _now;
          }
          if (el.dateEnd) {
            el.dateEndInt = new Date(el.dateEnd).getTime() - _now;
          }
        });
      }
      this.setData({
        miaoshaGoods: res.data.result,
      });
    });

    // 爆品推荐
    hotGoods().then((res) => {
      console.log(res, "爆品推荐");
      this.setData({
        goodsRecommend: res.data.result,
      });
    });

    // 疯狂砍价
    discount().then((res) => {
      console.log(res, "疯狂砍价");
      this.setData({
        kanjiaList: res.data.result,
      });
    });

    // 全民拼团
    collage().then((res) => {
      console.log(res, "全民拼团");
      this.setData({
        pingtuanList: res.data.result
      })
    });
  },
});
