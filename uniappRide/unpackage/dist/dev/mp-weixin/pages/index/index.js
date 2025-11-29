"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      // 数据展示
      totalDistance: 0,
      maxSpeed: 0,
      maxTime: 0,
      // 地图相关
      latitude: 39.90923,
      longitude: 116.407413,
      scale: 18,
      markers: [],
      mapContext: null,
      locationEnabled: false,
      // 骑行相关
      isRiding: false,
      isPaused: false,
      currentSpeed: 0,
      averageSpeed: 0,
      ridingDistance: 0,
      ridingTime: "00:00:00",
      timeCount: 0,
      timer: null,
      // 位置跟踪
      locationWatchId: null
    };
  },
  onLoad() {
    this.initData();
    this.initMap();
    this.requestLocationPermission();
  },
  onUnload() {
    this.clearTimer();
    this.clearLocationWatch();
  },
  methods: {
    // 初始化数据
    initData() {
      this.totalDistance = 128.5;
      this.maxSpeed = 35.2;
      this.maxTime = 4.5;
    },
    // 初始化地图
    initMap() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:143", "初始化地图上下文");
      try {
        this.mapContext = common_vendor.index.createMapContext("map");
        common_vendor.index.__f__("log", "at pages/index/index.uvue:146", "地图上下文创建成功");
      } catch (exception) {
        common_vendor.index.__f__("error", "at pages/index/index.uvue:148", "创建地图上下文时发生异常:", exception);
        this.mapContext = null;
      }
    },
    // 请求位置权限
    requestLocationPermission() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:155", "开始请求位置权限...");
      try {
        common_vendor.index.getSetting(new UTSJSONObject({
          success: (res = null) => {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:162", "获取权限设置成功:", UTS.JSON.stringify(res));
            if (res.authSetting && res.authSetting["scope.userLocation"]) {
              common_vendor.index.__f__("log", "at pages/index/index.uvue:165", "位置权限已开启");
              this.getLocation();
            } else {
              common_vendor.index.__f__("log", "at pages/index/index.uvue:169", "位置权限未开启，请求权限");
              common_vendor.index.requestLocationPermission(new UTSJSONObject({
                success: (authRes = null) => {
                  common_vendor.index.__f__("log", "at pages/index/index.uvue:173", "请求位置权限成功:", UTS.JSON.stringify(authRes));
                  if (authRes.authSetting && authRes.authSetting["scope.userLocation"]) {
                    common_vendor.index.__f__("log", "at pages/index/index.uvue:175", "用户允许了位置权限");
                    this.getLocation();
                  } else {
                    common_vendor.index.__f__("log", "at pages/index/index.uvue:179", "用户拒绝了位置权限");
                    this.locationEnabled = false;
                    try {
                      common_vendor.index.showToast({
                        title: "位置权限被拒绝，地图功能将受限",
                        icon: "none",
                        duration: 3e3
                      });
                    } catch (toastErr) {
                      common_vendor.index.__f__("error", "at pages/index/index.uvue:189", "显示提示时发生错误:", UTS.JSON.stringify(toastErr));
                    }
                    common_vendor.index.showModal(new UTSJSONObject({
                      title: "权限提示",
                      content: "需要位置权限才能使用地图功能，请在设置中开启",
                      confirmText: "去设置",
                      cancelText: "取消",
                      success: (modalRes) => {
                        if (modalRes.confirm) {
                          common_vendor.index.openSetting(new UTSJSONObject({
                            success: (settingRes = null) => {
                              common_vendor.index.__f__("log", "at pages/index/index.uvue:202", "设置页面操作结果:", UTS.JSON.stringify(settingRes));
                              if (settingRes.authSetting && settingRes.authSetting["scope.userLocation"]) {
                                common_vendor.index.__f__("log", "at pages/index/index.uvue:204", "用户在设置中开启了位置权限");
                                this.getLocation();
                              } else {
                                common_vendor.index.__f__("log", "at pages/index/index.uvue:207", "用户在设置中未开启位置权限");
                                common_vendor.index.showToast({
                                  title: "位置权限未开启，地图功能将受限",
                                  icon: "none",
                                  duration: 3e3
                                });
                              }
                            }
                          }));
                        }
                      }
                    }));
                  }
                },
                fail: (authErr = null) => {
                  common_vendor.index.__f__("error", "at pages/index/index.uvue:222", "请求位置权限失败:", UTS.JSON.stringify(authErr));
                  this.locationEnabled = false;
                  if (authErr.errMsg.includes("auth deny")) {
                    common_vendor.index.showToast({
                      title: "位置权限被拒绝",
                      icon: "none",
                      duration: 3e3
                    });
                  } else {
                    common_vendor.index.showToast({
                      title: "请求位置权限失败",
                      icon: "none",
                      duration: 3e3
                    });
                  }
                }
              }));
            }
          },
          fail: (err = null) => {
            common_vendor.index.__f__("error", "at pages/index/index.uvue:245", "获取权限设置失败:", UTS.JSON.stringify(err));
            this.locationEnabled = false;
            common_vendor.index.showToast({
              title: "无法获取权限设置",
              icon: "none",
              duration: 3e3
            });
          }
        }));
      } catch (exception) {
        common_vendor.index.__f__("error", "at pages/index/index.uvue:255", "请求位置权限时发生异常:", UTS.JSON.stringify(exception));
        this.locationEnabled = false;
        common_vendor.index.showToast({
          title: "系统不支持位置服务",
          icon: "none",
          duration: 5e3
        });
      }
    },
    // 获取当前位置
    getLocation() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:267", "开始获取当前位置...");
      if (this.locationEnabled) {
        common_vendor.index.__f__("log", "at pages/index/index.uvue:270", "位置服务已启用，跳过重复获取");
        return null;
      }
      try {
        common_vendor.index.getNetworkType(new UTSJSONObject({
          success: (networkRes) => {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:278", "网络状态:", UTS.JSON.stringify(networkRes));
            if (networkRes.networkType === "none") {
              try {
                common_vendor.index.showToast({
                  title: "当前无网络连接，请检查网络设置",
                  icon: "none",
                  duration: 3e3
                });
              } catch (toastErr) {
                common_vendor.index.__f__("error", "at pages/index/index.uvue:288", "显示提示时发生错误:", UTS.JSON.stringify(toastErr));
              }
              return null;
            }
            common_vendor.index.getLocation(new UTSJSONObject({
              type: "gcj02",
              highAccuracy: true,
              altitude: true,
              success: (res) => {
                common_vendor.index.__f__("log", "at pages/index/index.uvue:299", "获取位置成功:", UTS.JSON.stringify(res));
                this.locationEnabled = true;
                this.latitude = res.latitude;
                this.longitude = res.longitude;
                this.updateMarker(res.latitude, res.longitude);
                this.startLocationWatch();
                this.moveToLocation();
              },
              fail: (err) => {
                common_vendor.index.__f__("error", "at pages/index/index.uvue:312", "获取位置失败:", UTS.JSON.stringify(err));
                this.locationEnabled = false;
                let errorMsg = "获取位置失败";
                if (err.errMsg.includes("frequently")) {
                  errorMsg = "获取位置过于频繁，请稍后再试";
                } else if (err.errMsg.includes("system")) {
                  errorMsg = "系统位置服务未开启，请检查设置";
                } else if (err.errMsg.includes("failed")) {
                  errorMsg = "定位失败，请检查GPS信号或稍后重试";
                } else if (err.errMsg.includes("auth deny")) {
                  errorMsg = "位置权限被拒绝，请在设置中开启";
                } else if (err.errMsg.includes("auth canceled")) {
                  errorMsg = "您取消了位置权限请求";
                } else if (err.errMsg.includes("permission")) {
                  errorMsg = "缺少位置权限，请在设置中开启";
                } else if (err.errMsg.includes("ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF")) {
                  errorMsg = "无网络定位信号，请开启移动网络或WiFi";
                } else {
                  errorMsg = `获取位置信息时发生错误(${err.errMsg || "未知错误"})`;
                }
                common_vendor.index.__f__("log", "at pages/index/index.uvue:338", "错误信息:", errorMsg, "原始错误:", err.errMsg, "错误代码:", err.errCode);
                try {
                  common_vendor.index.showToast({
                    title: errorMsg,
                    icon: "none",
                    duration: 5e3
                    // 延长显示时间，让用户看清楚错误信息
                  });
                } catch (toastErr) {
                  common_vendor.index.__f__("error", "at pages/index/index.uvue:348", "显示提示时发生错误:", UTS.JSON.stringify(toastErr));
                }
              }
            }));
          }
        }));
      } catch (exception) {
        common_vendor.index.__f__("error", "at pages/index/index.uvue:355", "获取位置时发生异常:", UTS.JSON.stringify(exception));
        this.locationEnabled = false;
        try {
          common_vendor.index.showToast({
            title: "获取位置信息时发生异常",
            icon: "none",
            duration: 3e3
          });
        } catch (toastErr) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:365", "显示提示时发生错误:", UTS.JSON.stringify(toastErr));
        }
      }
    },
    // 开始位置监听
    startLocationWatch() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:372", "准备启动位置监听...");
      if (this.locationWatchId) {
        common_vendor.index.__f__("log", "at pages/index/index.uvue:375", "位置监听已存在，先清理");
        try {
          common_vendor.index.offLocationChange(this.locationWatchId);
        } catch (offErr) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:379", "关闭位置监听时发生错误:", UTS.JSON.stringify(offErr));
        }
        this.locationWatchId = null;
      }
      if (!this.latitude || !this.longitude) {
        common_vendor.index.__f__("log", "at pages/index/index.uvue:386", "尚未获取到位置，先不启动监听");
        return null;
      }
      try {
        common_vendor.index.startLocationUpdate(new UTSJSONObject({
          type: "gcj02",
          altitude: true,
          geocode: false,
          highAccuracyExpireTime: 3e4,
          interval: 1e3,
          success: () => {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:399", "位置更新服务已启动，每秒更新一次");
            this.locationWatchId = common_vendor.index.onLocationChange((res) => {
              try {
                common_vendor.index.__f__("log", "at pages/index/index.uvue:403", "位置变化:", UTS.JSON.stringify(res));
                this.locationEnabled = true;
                this.latitude = res.latitude;
                this.longitude = res.longitude;
                this.updateMarker(res.latitude, res.longitude);
                if (res.speed !== void 0) {
                  let speed = parseFloat(res.speed);
                  if (speed < 0)
                    speed = 0;
                  this.currentSpeed = speed.toFixed(1);
                  if (this.isRiding && !this.isPaused) {
                    this.updateAverageSpeed();
                  }
                }
              } catch (locationErr) {
                common_vendor.index.__f__("error", "at pages/index/index.uvue:424", "处理位置变化时发生错误:", UTS.JSON.stringify(locationErr));
              }
            });
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/index/index.uvue:429", "启动位置更新失败:", UTS.JSON.stringify(err));
            this.locationEnabled = false;
            let errorMsg = "位置更新服务启动失败";
            if (err.errMsg && err.errMsg.includes("failed")) {
              errorMsg = "定位服务启动失败，请检查GPS是否开启";
            } else if (err.errMsg && err.errMsg.includes("permission")) {
              errorMsg = "缺少位置权限，请在设置中开启";
            } else if (err.errMsg && err.errMsg.includes("backgroundfetch")) {
              errorMsg = "后台位置更新失败，请保持应用在前台使用";
            }
            if (!this.latitude || !this.longitude) {
              try {
                common_vendor.index.showToast({
                  title: errorMsg,
                  icon: "none",
                  duration: 3e3
                });
              } catch (toastErr) {
                common_vendor.index.__f__("error", "at pages/index/index.uvue:452", "显示提示时发生错误:", UTS.JSON.stringify(toastErr));
              }
            }
          }
        }));
      } catch (exception) {
        common_vendor.index.__f__("error", "at pages/index/index.uvue:458", "启动位置监听时发生异常:", UTS.JSON.stringify(exception));
        this.locationEnabled = false;
        try {
          common_vendor.index.showToast({
            title: "位置监听服务异常",
            icon: "none",
            duration: 3e3
          });
        } catch (toastErr) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:468", "显示提示时发生错误:", UTS.JSON.stringify(toastErr));
        }
      }
    },
    // 清理位置监听
    clearLocationWatch() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:474", "清理位置监听...");
      if (this.locationWatchId) {
        try {
          common_vendor.index.offLocationChange(this.locationWatchId);
        } catch (offErr) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:479", "关闭位置监听时发生错误:", UTS.JSON.stringify(offErr));
        }
        this.locationWatchId = null;
      }
      try {
        common_vendor.index.stopLocationUpdate(new UTSJSONObject({
          success: () => {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:486", "位置更新服务已停止");
          },
          fail: (stopErr) => {
            common_vendor.index.__f__("error", "at pages/index/index.uvue:489", "停止位置更新服务时发生错误:", UTS.JSON.stringify(stopErr));
          }
        }));
      } catch (stopErr) {
        common_vendor.index.__f__("error", "at pages/index/index.uvue:493", "停止位置更新服务时发生异常:", UTS.JSON.stringify(stopErr));
      }
    },
    // 地图加载完成
    onMapLoaded() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:499", "地图加载完成");
      if (!this.locationEnabled) {
        common_vendor.index.__f__("log", "at pages/index/index.uvue:502", "地图加载但位置服务未启用，尝试重新获取位置");
        this.requestLocationPermission();
      } else {
        common_vendor.index.__f__("log", "at pages/index/index.uvue:505", "地图加载且位置服务已启用，移动到当前位置");
        this.moveToLocation();
      }
    },
    // 地图位置变化回调
    onLocationChange(e = null) {
      try {
        if (!e || !e.detail) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:515", "地图位置变化事件数据无效");
          return null;
        }
        common_vendor.index.__f__("log", "at pages/index/index.uvue:518", "地图位置变化:", UTS.JSON.stringify(e));
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/index/index.uvue:521", "处理地图位置变化时发生错误:", UTS.JSON.stringify(err));
      }
    },
    // 更新当前位置标记
    updateMarker(lat = null, lng = null) {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:527", "更新位置标记:", lat, lng);
      this.markers = [{
        id: 1,
        latitude: lat,
        longitude: lng,
        title: "我的位置",
        // 对于uni-app，默认使用系统提供的标记图标
        // 不指定iconPath，使用默认图标
        width: 30,
        height: 30,
        anchor: { x: 0.5, y: 0.5 },
        // 确保标记可点击
        callout: {
          content: "我的位置",
          display: "BYCLICK"
        }
      }];
    },
    // 移动地图到当前位置
    moveToLocation() {
      if (this.mapContext && this.latitude && this.longitude) {
        common_vendor.index.__f__("log", "at pages/index/index.uvue:551", "移动地图到当前位置:", this.latitude, this.longitude);
        try {
          this.mapContext.moveToLocation(new UTSJSONObject({
            success: () => {
              common_vendor.index.__f__("log", "at pages/index/index.uvue:555", "地图移动到当前位置成功");
            },
            fail: (err = null) => {
              common_vendor.index.__f__("error", "at pages/index/index.uvue:558", "地图移动到当前位置失败:", UTS.JSON.stringify(err));
            }
          }));
        } catch (exception) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:562", "移动地图时发生异常:", UTS.JSON.stringify(exception));
        }
      } else {
        common_vendor.index.__f__("log", "at pages/index/index.uvue:565", "无法移动地图: 地图上下文未创建或位置无效");
      }
    },
    // 开始骑行
    startRiding() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:571", "开始骑行");
      this.isRiding = true;
      this.isPaused = false;
      this.ridingDistance = 0;
      this.timeCount = 0;
      this.updateTimeDisplay();
      this.startTimer();
    },
    // 暂停骑行
    pauseRiding() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        this.clearTimer();
      } else {
        this.startTimer();
      }
    },
    // 结束骑行
    endRiding() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:592", "结束骑行");
      this.isRiding = false;
      this.isPaused = false;
      this.clearTimer();
      this.totalDistance = (parseFloat(this.totalDistance) + parseFloat(this.ridingDistance)).toFixed(1);
      if (parseFloat(this.currentSpeed) > parseFloat(this.maxSpeed)) {
        this.maxSpeed = this.currentSpeed;
      }
    },
    // 开始计时器
    startTimer() {
      this.timer = setInterval(() => {
        if (!this.isPaused) {
          this.timeCount++;
          this.updateTimeDisplay();
          if (this.currentSpeed > 0) {
            this.ridingDistance = (parseFloat(this.ridingDistance) + parseFloat(this.currentSpeed) / 3600).toFixed(2);
          }
        }
      }, 1e3);
    },
    // 清理计时器
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    // 更新时间显示
    updateTimeDisplay() {
      let hours = Math.floor(this.timeCount / 3600);
      let minutes = Math.floor(this.timeCount % 3600 / 60);
      let seconds = this.timeCount % 60;
      this.ridingTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
    // 更新平均速度
    updateAverageSpeed() {
      if (this.timeCount > 0) {
        let totalSpeed = parseFloat(this.currentSpeed) + parseFloat(this.averageSpeed) * (this.timeCount - 1);
        this.averageSpeed = (totalSpeed / this.timeCount).toFixed(1);
      } else {
        this.averageSpeed = this.currentSpeed;
      }
    },
    // 其他按钮点击事件
    selectDestination() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:647", "选择目的地");
    },
    selectRoute() {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:651", "选择路书");
    }
    //}
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: !$data.isRiding
  }, !$data.isRiding ? {
    b: common_vendor.t($data.totalDistance),
    c: common_vendor.t($data.maxSpeed),
    d: common_vendor.t($data.maxTime)
  } : {}, {
    e: common_vendor.sei("map", "map"),
    f: $data.latitude,
    g: $data.longitude,
    h: $data.scale,
    i: $data.markers,
    j: common_vendor.o((...args) => $options.onMapLoaded && $options.onMapLoaded(...args)),
    k: common_vendor.o((...args) => _ctx.onRegionChange && _ctx.onRegionChange(...args)),
    l: common_vendor.o((...args) => $options.onLocationChange && $options.onLocationChange(...args)),
    m: $data.isRiding ? 1 : "",
    n: $data.isRiding
  }, $data.isRiding ? {
    o: common_vendor.t($data.currentSpeed),
    p: common_vendor.t($data.averageSpeed),
    q: common_vendor.t($data.ridingDistance),
    r: common_vendor.t($data.ridingTime)
  } : {}, {
    s: !$data.isRiding
  }, !$data.isRiding ? {
    t: common_vendor.o((...args) => $options.startRiding && $options.startRiding(...args)),
    v: common_vendor.o((...args) => $options.selectDestination && $options.selectDestination(...args)),
    w: common_vendor.o((...args) => $options.selectRoute && $options.selectRoute(...args))
  } : {}, {
    x: $data.isRiding
  }, $data.isRiding ? {
    y: common_vendor.t($data.isPaused ? "继续" : "暂停"),
    z: common_vendor.o((...args) => $options.pauseRiding && $options.pauseRiding(...args)),
    A: common_vendor.o((...args) => $options.endRiding && $options.endRiding(...args))
  } : {}, {
    B: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
