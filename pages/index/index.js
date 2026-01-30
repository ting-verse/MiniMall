const {
  bannerList,
  category,
  goodsDynamic,
  notice,
  seckill,
  hotGoods,
  discount,
  collage,
  goodlist,
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
    pingtuanList: [],
    categoryId: "",
    page: 1, // 当前页
    pageSize: 20, // 每页展示商品数量
    totalRow: 0, // 商品总数量
    goods: [], // 当前商品列表
  },
  goSearch() {
    console.log("goSearch");
  },
  // 分页获取商品列表
  async getGoodsList() {
    const { categoryId, page, pageSize } = this.data;
    wx.showLoading({
      mask: true
    })
    const res = await goodlist({
      categoryId,
      page,
      pageSize,
    });
    wx.hideLoading()
    // console.log([...this.data.goods, ...res.data.result], "合并")
    this.setData({
      goods: [...this.data.goods, ...res.data.result],
      totalRow: res.data.totalRow,
    });
    console.log(this.data.goods.length,"goods")
    console.log(this.data.totalRow,"totalRow")

    // 拿到当前商品数据与后端返回的商品数据进行对比
    if (this.data.goods.length >= this.data.totalRow) {
      return;
    }
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
        pingtuanList: res.data.result,
      });
    });

    // 页面首次加载需要请求商品分页数据
    this.getGoodsList()
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    this.setData(
      {
        page: this.data.page + 1,
      },
      () => {
        this.getGoodsList();
      }
    );
  },
});
