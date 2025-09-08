"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      // 数据展示
      totalDistance: 128.5,
      maxSpeed: 35.2,
      maxTime: 4.5,
      // 历史骑行数据
      historyData: [
        new UTSJSONObject({
          date: "2023-06-15",
          time: "14:30 - 16:45",
          location: "城市公园"
        }),
        new UTSJSONObject({
          date: "2023-06-10",
          time: "09:15 - 11:30",
          location: "湖边绿道"
        }),
        new UTSJSONObject({
          date: "2023-06-05",
          time: "16:00 - 18:20",
          location: "山地赛道"
        }),
        new UTSJSONObject({
          date: "2023-05-28",
          time: "10:30 - 13:15",
          location: "滨江路"
        })
      ],
      // 设备信息
      deviceName: "智能骑行传感器 A1",
      deviceStatus: "未连接",
      // 蓝牙相关数据
      isSearching: false,
      discoveredDevices: [],
      connectedDeviceId: "",
      bluetoothEnabled: false,
      // 当前选中的标签页
      activeTab: "history"
    };
  },
  onLoad() {
    this.initData();
    this.initBluetooth();
  },
  methods: {
    // 初始化数据
    initData() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:135", "我的页面数据初始化");
    },
    // 初始化蓝牙适配器
    initBluetooth() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:140", "初始化蓝牙适配器");
      common_vendor.index.onBluetoothAdapterStateChange((res = null) => {
        if (!res.available) {
          this.deviceStatus = "蓝牙不可用";
          this.bluetoothEnabled = false;
        } else {
          this.bluetoothEnabled = true;
          this.deviceStatus = "蓝牙已就绪";
        }
      });
      common_vendor.index.getBluetoothAdapterState(new UTSJSONObject({
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:156", "getBluetoothAdapterState", res);
          if (!res.available) {
            this.deviceStatus = "蓝牙不可用";
            this.bluetoothEnabled = false;
          } else {
            this.bluetoothEnabled = true;
            this.deviceStatus = "蓝牙已就绪";
          }
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:166", "获取蓝牙适配器状态失败", err);
          this.deviceStatus = "蓝牙不可用";
          this.bluetoothEnabled = false;
        }
      }));
    },
    // 切换蓝牙开关
    toggleBluetooth() {
      if (this.bluetoothEnabled) {
        this.closeBluetooth();
      } else {
        this.openBluetooth();
      }
    },
    // 打开蓝牙
    openBluetooth() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:187", "打开蓝牙");
      common_vendor.index.__f__("log", "at pages/index/my.uvue:188", common_vendor.index.getSystemInfoSync().platform);
      if (common_vendor.index.getSystemInfoSync().platform === "android") {
        common_vendor.index.openBluetoothAdapter(new UTSJSONObject({
          success: (res = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:193", "openBluetoothAdapter success", res);
            this.bluetoothEnabled = true;
            this.deviceStatus = "蓝牙已开启";
            this.searchDevices();
          },
          fail: (res = null) => {
            if (res.errCode === 10001) {
              common_vendor.index.onBluetoothAdapterStateChange((res2 = null) => {
                common_vendor.index.__f__("log", "at pages/index/my.uvue:202", "onBluetoothAdapterStateChange", res2);
                if (res2.available) {
                  this.bluetoothEnabled = true;
                  this.deviceStatus = "蓝牙已开启";
                  this.searchDevices();
                }
              });
            }
            this.deviceStatus = "蓝牙开启失败";
          }
        }));
      } else if (common_vendor.index.getSystemInfoSync().platform === "ios") {
        common_vendor.index.openBluetoothAdapter(new UTSJSONObject({
          success: (res = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:218", "openBluetoothAdapter success", res);
            this.bluetoothEnabled = true;
            this.deviceStatus = "蓝牙已开启";
            this.searchDevices();
          },
          fail: (res = null) => {
            this.deviceStatus = "蓝牙开启失败";
          }
        }));
      }
    },
    // 关闭蓝牙
    closeBluetooth() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:233", "关闭蓝牙");
      common_vendor.index.closeBluetoothAdapter(new UTSJSONObject({
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:236", "关闭蓝牙适配器成功", res);
          this.bluetoothEnabled = false;
          this.deviceStatus = "蓝牙已关闭";
          this.disconnectAllDevices();
          this.discoveredDevices = [];
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:245", "关闭蓝牙适配器失败", err);
        }
      }));
    },
    // 判断数组中是否包含某个元素
    inArray(arr = null, key = null, val = null) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) {
          return i;
        }
      }
      return -1;
    },
    // 搜索设备
    searchDevices() {
      if (!this.bluetoothEnabled) {
        common_vendor.index.showToast({
          title: "请先开启蓝牙",
          icon: "none"
        });
        return null;
      }
      if (this.isSearching) {
        common_vendor.index.__f__("log", "at pages/index/my.uvue:271", "正在搜索中，请稍候...");
        return null;
      }
      common_vendor.index.__f__("log", "at pages/index/my.uvue:275", "开始搜索蓝牙设备");
      this.isSearching = true;
      this.deviceStatus = "搜索中...";
      this.discoveredDevices = [];
      common_vendor.index.openBluetoothAdapter({
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:284", "蓝牙适配器已打开", res);
          common_vendor.index.startBluetoothDevicesDiscovery({
            allowDuplicatesKey: true,
            success: (res2 = null) => {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:290", "开始搜索设备", res2);
              common_vendor.index.onBluetoothDeviceFound((res3 = null) => {
                res3.devices.forEach((device = null) => {
                  if (!device.name && !device.localName) {
                    return null;
                  }
                  common_vendor.index.__f__("log", "at pages/index/my.uvue:300", "发现新设备1111", device.name);
                  const foundDevices = this.discoveredDevices;
                  const idx = this.inArray(foundDevices, "deviceId", device.deviceId);
                  common_vendor.index.__f__("log", "at pages/index/my.uvue:303", "发现新设备inArray", idx);
                  new UTSJSONObject({});
                  if (idx === -1) {
                    if (device.name && device.name.includes("AINSTEC_")) {
                      common_vendor.index.__f__("log", "at pages/index/my.uvue:308", "发现新设备oooo", res3);
                      common_vendor.index.__f__("log", "at pages/index/my.uvue:309", "发现新设备oooo", device.name);
                      this.discoveredDevices.push({
                        deviceId: device.deviceId,
                        name: device.name,
                        RSSI: device.RSSI,
                        connected: false
                      });
                    }
                  } else {
                    common_vendor.index.__f__("log", "at pages/index/my.uvue:318", "发现新设备pppp", res3);
                    common_vendor.index.__f__("log", "at pages/index/my.uvue:319", "发现新设备pppp", device.name);
                    this.discoveredDevices[idx] = Object.assign(Object.assign({}, this.discoveredDevices[idx]), { RSSI: device.RSSI, name: device.name || this.discoveredDevices[idx].name });
                  }
                });
              });
            },
            fail: (err = null) => {
              common_vendor.index.__f__("error", "at pages/index/my.uvue:331", "搜索设备失败", err);
              this.isSearching = false;
              this.deviceStatus = "搜索失败";
            }
          });
          setTimeout(() => {
            this.stopSearchDevices();
          }, 3e3);
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:343", "打开蓝牙适配器失败", err);
          this.isSearching = false;
          this.deviceStatus = "蓝牙开启失败";
        }
      });
    },
    // 停止搜索设备
    stopSearchDevices() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:352", "停止搜索蓝牙设备");
      common_vendor.index.stopBluetoothDevicesDiscovery(new UTSJSONObject({
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:355", "停止搜索设备成功", res);
          this.isSearching = false;
          if (this.discoveredDevices.length === 0) {
            this.deviceStatus = "未找到设备";
          } else {
            this.deviceStatus = "找到 " + this.discoveredDevices.length + " 个设备";
          }
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:364", "停止搜索设备失败", err);
          this.isSearching = false;
        }
      }));
    },
    // 连接设备
    connectDevice(device = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:373", "连接设备", device);
      if (!this.bluetoothEnabled) {
        common_vendor.index.showToast({
          title: "请先开启蓝牙",
          icon: "none"
        });
        return null;
      }
      this.deviceStatus = "连接中...";
      common_vendor.index.createBLEConnection(new UTSJSONObject({
        deviceId: device.deviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:388", "连接设备成功", res);
          device.connected = true;
          this.connectedDeviceId = device.deviceId;
          this.deviceName = device.name || "未知设备";
          this.deviceStatus = "已连接";
          this.stopSearchDevices();
          this.getBLEDeviceServices(device.deviceId);
          common_vendor.index.showToast({
            title: "连接成功",
            icon: "success"
          });
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:408", "连接设备失败", err);
          this.deviceStatus = "连接失败";
          common_vendor.index.showToast({
            title: "连接失败",
            icon: "none"
          });
        }
      }));
    },
    // 断开设备连接
    disconnectDevice(device = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:421", "断开设备连接", device);
      common_vendor.index.closeBLEConnection(new UTSJSONObject({
        deviceId: device.deviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:427", "断开设备连接成功", res);
          device.connected = false;
          if (this.connectedDeviceId === device.deviceId) {
            this.connectedDeviceId = "";
            this.deviceName = "智能骑行传感器 A1";
            this.deviceStatus = "已断开";
          }
          common_vendor.index.showToast({
            title: "已断开连接",
            icon: "success"
          });
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:443", "断开设备连接失败", err);
          common_vendor.index.showToast({
            title: "断开失败",
            icon: "none"
          });
        }
      }));
    },
    // 断开所有设备连接
    disconnectAllDevices() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:455", "断开所有设备连接");
      this.discoveredDevices.forEach((device) => {
        if (device.connected) {
          this.disconnectDevice(device);
        }
      });
    },
    // 移除设备
    removeDevice(device = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:467", "移除设备", device);
      if (device.connected) {
        this.disconnectDevice(device);
      }
      const index = this.discoveredDevices.findIndex((d) => {
        return d.deviceId === device.deviceId;
      });
      if (index !== -1) {
        this.discoveredDevices.splice(index, 1);
      }
      if (this.connectedDeviceId === device.deviceId) {
        this.connectedDeviceId = "";
        this.deviceName = "智能骑行传感器 A1";
        this.deviceStatus = "已移除";
      }
      common_vendor.index.showToast({
        title: "已移除设备",
        icon: "success"
      });
    },
    // 获取蓝牙设备服务
    getBLEDeviceServices(deviceId = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:495", "获取设备服务", deviceId);
      common_vendor.index.getBLEDeviceServices(new UTSJSONObject({
        deviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:500", "获取设备服务成功", res);
          res.services.forEach((service = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:504", "服务UUID:", service.uuid);
            this.getBLEDeviceCharacteristics(deviceId, service.uuid);
          });
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:511", "获取设备服务失败", err);
        }
      }));
    },
    // 获取蓝牙设备特征值
    getBLEDeviceCharacteristics(deviceId = null, serviceId = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:518", "获取设备特征值", deviceId, serviceId);
      common_vendor.index.getBLEDeviceCharacteristics(new UTSJSONObject({
        deviceId,
        serviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:524", "获取设备特征值成功", res);
          res.characteristics.forEach((characteristic = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:528", "特征值UUID:", characteristic.uuid);
            if (characteristic.properties.notify || characteristic.properties.indicate) {
              this.notifyBLECharacteristicValueChange(deviceId, serviceId, characteristic.uuid);
            }
          });
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:537", "获取设备特征值失败", err);
        }
      }));
    },
    // 启用蓝牙设备特征值变化通知
    notifyBLECharacteristicValueChange(deviceId = null, serviceId = null, characteristicId = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:544", "启用蓝牙设备特征值变化通知", deviceId, serviceId, characteristicId);
      common_vendor.index.notifyBLECharacteristicValueChange(new UTSJSONObject({
        deviceId,
        serviceId,
        characteristicId,
        state: true,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:552", "启用蓝牙设备特征值变化通知成功", res);
          common_vendor.index.onBLECharacteristicValueChange((res2 = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:556", "特征值变化", res2);
          });
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:562", "启用蓝牙设备特征值变化通知失败", err);
        }
      }));
    },
    // 处理接收到的数据
    handleReceivedData(buffer = null) {
      const str = this.ab2hex(buffer);
      common_vendor.index.__f__("log", "at pages/index/my.uvue:571", "接收到的数据:", str);
    },
    // ArrayBuffer转16进制字符串
    ab2hex(buffer = null) {
      const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit = null) {
        return ("00" + bit.toString(16)).slice(-2);
      });
      return hexArr.join("");
    },
    // 切换标签页
    switchTab(tab = null) {
      this.activeTab = tab;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:592", "切换到标签页:", tab);
      if (tab === "riding") {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.totalDistance),
    b: common_vendor.t($data.maxSpeed),
    c: common_vendor.t($data.maxTime),
    d: common_vendor.f($data.historyData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.date),
        b: common_vendor.t(item.time),
        c: common_vendor.t(item.location),
        d: index
      };
    }),
    e: common_vendor.t($data.deviceName),
    f: common_vendor.t($data.deviceStatus),
    g: $data.isSearching
  }, $data.isSearching ? {} : {}, {
    h: common_vendor.o((...args) => $options.toggleBluetooth && $options.toggleBluetooth(...args)),
    i: $data.discoveredDevices.length > 0
  }, $data.discoveredDevices.length > 0 ? {
    j: common_vendor.f($data.discoveredDevices, (device, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(device.name || "未知设备"),
        b: common_vendor.t(device.RSSI),
        c: device.connected
      }, device.connected ? {
        d: common_vendor.o(($event) => $options.disconnectDevice(device), index)
      } : {}, {
        e: common_vendor.o(($event) => $options.removeDevice(device), index),
        f: index,
        g: common_vendor.o(($event) => $options.connectDevice(device), index)
      });
    })
  } : {}, {
    k: $data.activeTab === "riding" ? 1 : "",
    l: common_vendor.o(($event) => $options.switchTab("riding")),
    m: $data.activeTab === "history" ? 1 : "",
    n: common_vendor.o(($event) => $options.switchTab("history")),
    o: $data.activeTab === "profile" ? 1 : "",
    p: common_vendor.o(($event) => $options.switchTab("profile")),
    q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/my.js.map
