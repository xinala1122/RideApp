"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      // 数据展示
      totalDistance: 0,
      maxSpeed: 0,
      maxTime: 0,
      // 当前选中的标签页
      activeTab: "riding"
    };
  },
  onLoad() {
    this.initData();
  },
  methods: {
    // 初始化数据
    initData() {
      this.totalDistance = 128.5;
      this.maxSpeed = 35.2;
      this.maxTime = 4.5;
    },
    // 按钮点击事件
    startRiding() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:93", "开始骑行");
    },
    freeRide() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:97", "自由骑模式");
    },
    sameAsLast() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:101", "上次一样");
    },
    selectDestination() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:105", "选择目的地");
    },
    selectRoute() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:109", "选择路书");
    },
    // 切换标签页
    switchTab(tab = null) {
      this.activeTab = tab;
      common_vendor.index.__f__("log", "at pages/index/index.uvue:116", "切换到标签页:", tab);
      if (tab === "profile") {
        common_vendor.index.switchTab({
          url: "/pages/index/my"
        });
      }
      if (tab === "discover") {
        common_vendor.index.switchTab({
          url: "/pages/index/discover"
        });
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.totalDistance),
    b: common_vendor.t($data.maxSpeed),
    c: common_vendor.t($data.maxTime),
    d: common_vendor.o((...args) => $options.freeRide && $options.freeRide(...args)),
    e: common_vendor.o((...args) => $options.sameAsLast && $options.sameAsLast(...args)),
    f: common_vendor.o((...args) => $options.startRiding && $options.startRiding(...args)),
    g: common_vendor.o((...args) => $options.selectDestination && $options.selectDestination(...args)),
    h: common_vendor.o((...args) => $options.selectRoute && $options.selectRoute(...args)),
    i: $data.activeTab === "riding" ? 1 : "",
    j: common_vendor.o(($event) => $options.switchTab("riding")),
    k: $data.activeTab === "discover" ? 1 : "",
    l: common_vendor.o(($event) => $options.switchTab("discover")),
    m: $data.activeTab === "profile" ? 1 : "",
    n: common_vendor.o(($event) => $options.switchTab("profile")),
    o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
