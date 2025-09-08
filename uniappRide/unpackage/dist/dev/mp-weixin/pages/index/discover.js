"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      // Banner数据
      bannerList: [
        new UTSJSONObject({ image: "/static/banner/banner1.jpg" }),
        new UTSJSONObject({ image: "/static/banner/banner2.jpg" }),
        new UTSJSONObject({ image: "/static/banner/banner3.jpg" })
      ],
      // 互动区域数据
      interactionList: [
        new UTSJSONObject({
          avatar: "/static/avatars/user1.jpg",
          name: "骑行达人",
          content: "今天骑行了30公里，风景太美了！分享给大家看看。",
          images: [
            "/static/images/ride1.jpg",
            "/static/images/ride2.jpg"
          ],
          time: "2小时前",
          likes: 24,
          comments: 8,
          liked: false
        }),
        new UTSJSONObject({
          avatar: "/static/avatars/user2.jpg",
          name: "山地车爱好者",
          content: "发现了一条超棒的山地骑行路线，难度适中，风景优美，推荐给大家！",
          images: [
            "/static/images/mountain1.jpg"
          ],
          time: "5小时前",
          likes: 56,
          comments: 12,
          liked: true
        })
      ],
      // 当前选中的标签页
      activeTab: "discover"
    };
  },
  onLoad() {
    this.initData();
  },
  methods: {
    // 初始化数据
    initData() {
      common_vendor.index.__f__("log", "at pages/index/discover.uvue:146", "发现页面数据初始化");
    },
    // 导航到功能页面
    navigateTo(page = null) {
      common_vendor.index.__f__("log", "at pages/index/discover.uvue:151", "导航到页面:", page);
    },
    // 点赞互动内容
    likeItem(index = null) {
      this.interactionList[index].liked = !this.interactionList[index].liked;
      if (this.interactionList[index].liked) {
        this.interactionList[index].likes++;
      } else {
        this.interactionList[index].likes--;
      }
    },
    // 评论互动内容
    commentItem(index = null) {
      common_vendor.index.__f__("log", "at pages/index/discover.uvue:167", "评论内容:", index);
    },
    // 预览图片
    previewImage(images = null, current = null) {
      common_vendor.index.previewImage({
        urls: images,
        current
      });
    },
    // 切换标签页
    switchTab(tab = null) {
      this.activeTab = tab;
      common_vendor.index.__f__("log", "at pages/index/discover.uvue:182", "切换到标签页:", tab);
      if (tab === "riding") {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      } else if (tab === "profile") {
        common_vendor.index.switchTab({
          url: "/pages/index/my"
        });
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.bannerList, (item, index, i0) => {
      return {
        a: item.image,
        b: index
      };
    }),
    b: common_assets._imports_0,
    c: common_vendor.o(($event) => $options.navigateTo("ranking")),
    d: common_assets._imports_1,
    e: common_vendor.o(($event) => $options.navigateTo("making")),
    f: common_assets._imports_2,
    g: common_vendor.o(($event) => $options.navigateTo("tutorial")),
    h: common_assets._imports_3,
    i: common_vendor.o(($event) => $options.navigateTo("local")),
    j: common_assets._imports_4,
    k: common_vendor.o(($event) => $options.navigateTo("find-route")),
    l: common_assets._imports_5,
    m: common_vendor.o(($event) => $options.navigateTo("make-route")),
    n: common_vendor.f($data.interactionList, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.content),
        d: item.images && item.images.length > 0
      }, item.images && item.images.length > 0 ? {
        e: common_vendor.f(item.images, (img, imgIndex, i1) => {
          return {
            a: imgIndex,
            b: img,
            c: common_vendor.o(($event) => $options.previewImage(item.images, imgIndex), imgIndex)
          };
        })
      } : {}, {
        f: common_vendor.t(item.time),
        g: item.liked ? 1 : "",
        h: common_vendor.t(item.likes),
        i: common_vendor.o(($event) => $options.likeItem(index), index),
        j: common_vendor.t(item.comments),
        k: common_vendor.o(($event) => $options.commentItem(index), index),
        l: index
      });
    }),
    o: $data.activeTab === "riding" ? 1 : "",
    p: common_vendor.o(($event) => $options.switchTab("riding")),
    q: $data.activeTab === "discover" ? 1 : "",
    r: common_vendor.o(($event) => $options.switchTab("discover")),
    s: $data.activeTab === "profile" ? 1 : "",
    t: common_vendor.o(($event) => $options.switchTab("profile")),
    v: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/discover.js.map
