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
      searchTimer: null,
      // 设备详细信息
      deviceInfo: new UTSJSONObject({
        show: false,
        model: "",
        serialNumber: "",
        firmwareVersion: "",
        hardwareVersion: "",
        softwareVersion: "",
        manufacturer: "",
        batteryLevel: "",
        name: "",
        connected: false
      }),
      // 蓝牙服务和特征值存储
      bleServices: new UTSJSONObject({}),
      bleCharacteristics: new UTSJSONObject({}),
      // 监听器状态
      characteristicListenerSet: false,
      // 连接状态监控
      connectionMonitorInterval: null
    };
  },
  onLoad() {
    this.initData();
  },
  onShow() {
    common_vendor.index.__f__("log", "at pages/index/my.uvue:180", "页面显示，开始搜索设备");
    this.initBluetooth();
    setTimeout(() => {
      this.searchDevices();
    }, 500);
  },
  onUnload() {
    common_vendor.index.__f__("log", "at pages/index/my.uvue:188", "页面卸载");
    this.stopSearchDevices();
    this.stopConnectionMonitor();
  },
  methods: {
    // 初始化数据
    initData() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:198", "我的页面数据初始化");
    },
    // 初始化蓝牙适配器
    initBluetooth() {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:205", "初始化蓝牙适配器");
      common_vendor.index.onBluetoothAdapterStateChange((res = null) => {
        if (!res.available) {
          that.deviceStatus = "蓝牙不可用";
          that.bluetoothEnabled = false;
        } else {
          that.bluetoothEnabled = true;
          that.deviceStatus = "蓝牙已就绪";
          if (res.discovering) {
            return null;
          }
          setTimeout(() => {
            that.searchDevices();
          }, 2e3);
        }
      });
      common_vendor.index.getBluetoothAdapterState(new UTSJSONObject({
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:230", "getBluetoothAdapterState", res);
          if (!res.available) {
            that.deviceStatus = "蓝牙不可用";
            that.bluetoothEnabled = false;
          } else {
            that.bluetoothEnabled = true;
            that.deviceStatus = "蓝牙已就绪";
            if (!res.discovering) {
              setTimeout(() => {
                that.searchDevices();
              }, 2e3);
            }
          }
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:247", "获取蓝牙适配器状态失败", err);
          that.deviceStatus = "蓝牙不可用";
          that.bluetoothEnabled = false;
        }
      }));
    },
    // 切换蓝牙开关
    toggleBluetooth() {
      const that = this;
      if (that.bluetoothEnabled) {
        that.closeBluetooth();
      } else {
        that.initBluetooth();
        that.openBluetooth();
      }
    },
    // 打开蓝牙
    openBluetooth() {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:273", "打开蓝牙");
      common_vendor.index.__f__("log", "at pages/index/my.uvue:274", common_vendor.index.getSystemInfoSync().platform);
      if (common_vendor.index.getSystemInfoSync().platform === "android") {
        common_vendor.index.openBluetoothAdapter(new UTSJSONObject({
          success: (res = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:279", "openBluetoothAdapter success", res);
            that.bluetoothEnabled = true;
            that.deviceStatus = "蓝牙已开启";
            that.searchDevices();
          },
          fail: (res = null) => {
            if (res.errCode === 10001) {
              common_vendor.index.onBluetoothAdapterStateChange((res2 = null) => {
                common_vendor.index.__f__("log", "at pages/index/my.uvue:288", "onBluetoothAdapterStateChange", res2);
                if (res2.available) {
                  that.bluetoothEnabled = true;
                  that.deviceStatus = "蓝牙已开启";
                  that.searchDevices();
                }
              });
            }
            that.deviceStatus = "蓝牙开启失败";
          }
        }));
      } else if (common_vendor.index.getSystemInfoSync().platform === "ios") {
        common_vendor.index.openBluetoothAdapter(new UTSJSONObject({
          success: (res = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:304", "openBluetoothAdapter success", res);
            that.bluetoothEnabled = true;
            that.deviceStatus = "蓝牙已开启";
            that.searchDevices();
          },
          fail: (res = null) => {
            that.deviceStatus = "蓝牙开启失败";
          }
        }));
      }
    },
    // 关闭蓝牙
    closeBluetooth() {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:321", "关闭蓝牙");
      common_vendor.index.closeBluetoothAdapter(new UTSJSONObject({
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:324", "关闭蓝牙适配器成功", res);
          that.bluetoothEnabled = false;
          that.deviceStatus = "蓝牙已关闭";
          that.disconnectAllDevices();
          that.discoveredDevices = [];
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:333", "关闭蓝牙适配器失败", err);
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
      const that = this;
      if (!that.bluetoothEnabled) {
        common_vendor.index.showToast({
          title: "请先开启蓝牙",
          icon: "none"
        });
        return null;
      }
      if (that.isSearching) {
        common_vendor.index.__f__("log", "at pages/index/my.uvue:362", "正在搜索中，请稍候...");
        return null;
      }
      common_vendor.index.__f__("log", "at pages/index/my.uvue:366", "开始搜索蓝牙设备");
      that.isSearching = true;
      that.deviceStatus = "搜索中...";
      that.discoveredDevices = [];
      that.deviceInfo.show = false;
      if (that.searchTimer) {
        clearInterval(that.searchTimer);
        that.searchTimer = null;
      }
      if (that.searchTimeoutTimer) {
        clearTimeout(that.searchTimeoutTimer);
        that.searchTimeoutTimer = null;
      }
      that.lastLogTime = new UTSJSONObject({});
      that.logInterval = 2e3;
      common_vendor.index.openBluetoothAdapter(new UTSJSONObject({
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:389", "蓝牙适配器已打开", res);
          common_vendor.index.startBluetoothDevicesDiscovery(new UTSJSONObject({
            allowDuplicatesKey: false,
            // services: ['0xADB401C0B1C6-11ED-AFA1-0242AC120002'], // 设备发现服务UUID
            success: (res2 = null) => {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:396", "开始搜索设备", res2);
              common_vendor.index.onBluetoothDeviceFound((res3 = null) => {
                if (that.connectedDeviceId) {
                  return null;
                }
                res3.devices.forEach((device = null) => {
                  if (!device.name && !device.localName) {
                    return null;
                  }
                  const now = Date.now();
                  const deviceId = device.deviceId;
                  if (!that.lastLogTime[deviceId] || now - that.lastLogTime[deviceId] >= that.logInterval) {
                    that.lastLogTime[deviceId] = now;
                    common_vendor.index.__f__("log", "at pages/index/my.uvue:420", "发现设备:", device.name, "ID:", deviceId);
                  }
                  const foundDevices = that.discoveredDevices;
                  const idx = that.inArray(foundDevices, "deviceId", deviceId);
                  if (idx === -1) {
                    if (device.name && device.name.includes("RideHDD")) {
                      common_vendor.index.__f__("log", "at pages/index/my.uvue:430", "添加新设备:", device.name);
                      const newDevice = new UTSJSONObject({
                        deviceId,
                        name: device.name,
                        RSSI: device.RSSI,
                        connected: false,
                        lastRssiUpdateTime: now
                        // 添加最后更新时间
                      });
                      that.discoveredDevices.push(newDevice);
                      common_vendor.index.__f__("log", "at pages/index/my.uvue:441", "尝试连接设备:", device.name);
                      that.connectDevice(newDevice);
                    }
                  } else {
                    const rssiUpdateInterval = 2e3;
                    const deviceInfo = that.discoveredDevices[idx];
                    const lastUpdateTime = deviceInfo.lastRssiUpdateTime || 0;
                    if (now - lastUpdateTime >= rssiUpdateInterval || Math.abs(device.RSSI - deviceInfo.RSSI) > 5) {
                      that.discoveredDevices[idx] = Object.assign(Object.assign({}, deviceInfo), { RSSI: device.RSSI, name: device.name || deviceInfo.name, lastRssiUpdateTime: now });
                    }
                    if (!that.discoveredDevices[idx].connected && !that.connectedDeviceId) {
                      if (!that.lastConnectAttempt || now - that.lastConnectAttempt >= that.logInterval) {
                        that.lastConnectAttempt = now;
                        common_vendor.index.__f__("log", "at pages/index/my.uvue:465", "尝试重新连接设备:", device.name);
                        that.connectDevice(that.discoveredDevices[idx]);
                      }
                    }
                  }
                });
              });
            },
            fail: (err = null) => {
              common_vendor.index.__f__("error", "at pages/index/my.uvue:474", "搜索设备失败", err);
              that.isSearching = false;
              that.deviceStatus = "搜索失败";
            }
          }));
          that.searchTimer = setInterval(() => {
            if (that.isSearching && !that.connectedDeviceId) {
              common_vendor.index.getBluetoothAdapterState(new UTSJSONObject({
                success: (res2 = null) => {
                  if (res2.available) {
                    if (!res2.discovering) {
                      common_vendor.index.startBluetoothDevicesDiscovery(new UTSJSONObject({
                        allowDuplicatesKey: false,
                        success: (res3 = null) => {
                        },
                        fail: (err = null) => {
                          common_vendor.index.__f__("error", "at pages/index/my.uvue:498", "搜索设备失败", err);
                        }
                      }));
                    }
                  }
                },
                fail: (err = null) => {
                  common_vendor.index.__f__("error", "at pages/index/my.uvue:505", "获取蓝牙适配器状态失败", err);
                  that.isSearching = false;
                  if (that.searchTimer) {
                    clearInterval(that.searchTimer);
                    that.searchTimer = null;
                  }
                }
              }));
            } else if (that.connectedDeviceId) {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:516", "已连接设备，停止搜索");
              that.stopSearchDevices();
            }
          }, 2e3);
          that.searchTimeoutTimer = setTimeout(() => {
            if (that.isSearching && !that.connectedDeviceId) {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:524", "搜索超时，自动停止搜索");
              that.stopSearchDevices();
              that.deviceStatus = "搜索超时，请手动重试";
            }
          }, 3e4);
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:531", "打开蓝牙适配器失败", err);
          that.isSearching = false;
          that.deviceStatus = "蓝牙开启失败";
          if (that.searchTimer) {
            clearInterval(that.searchTimer);
            that.searchTimer = null;
          }
        }
      }));
    },
    // 停止搜索设备
    stopSearchDevices() {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:547", "停止搜索蓝牙设备");
      if (that.searchTimer) {
        clearInterval(that.searchTimer);
        that.searchTimer = null;
      }
      if (that.searchTimeoutTimer) {
        clearTimeout(that.searchTimeoutTimer);
        that.searchTimeoutTimer = null;
      }
      that.lastLogTime = new UTSJSONObject({});
      that.lastConnectAttempt = null;
      that.logInterval = null;
      common_vendor.index.getBluetoothAdapterState(new UTSJSONObject({
        success: (res = null) => {
          if (res.available && res.discovering) {
            common_vendor.index.stopBluetoothDevicesDiscovery(new UTSJSONObject({
              success: (res2 = null) => {
                common_vendor.index.__f__("log", "at pages/index/my.uvue:570", "停止搜索设备成功", res2);
              },
              fail: (err = null) => {
                common_vendor.index.__f__("error", "at pages/index/my.uvue:573", "停止搜索设备失败", err);
              }
            }));
          }
          that.isSearching = false;
          if (that.discoveredDevices.length === 0) {
            that.deviceStatus = "未找到设备";
          } else {
            that.deviceStatus = "找到 " + that.discoveredDevices.length + " 个设备";
          }
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:586", "获取蓝牙适配器状态失败", err);
          that.isSearching = false;
        }
      }));
    },
    // 检查是否有已连接的设备
    checkConnectedDevice() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:595", "检查设备连接状态");
      const savedDeviceId = common_vendor.index.getStorageSync("connectedDeviceId");
      const savedDeviceName = common_vendor.index.getStorageSync("connectedDeviceName");
      if (savedDeviceId) {
        this.deviceStatus = "检查设备连接状态...";
        this.$forceUpdate();
        common_vendor.index.openBluetoothAdapter(new UTSJSONObject({
          success: () => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:608", "蓝牙适配器已开启");
            this.checkDeviceConnection(savedDeviceId, savedDeviceName);
            this.bluetoothEnabled = true;
          },
          fail: (err = null) => {
            common_vendor.index.__f__("error", "at pages/index/my.uvue:614", "蓝牙适配器未开启，尝试初始化", err);
            this.initBluetooth();
            this.bluetoothEnabled = false;
            setTimeout(() => {
              this.checkDeviceConnection(savedDeviceId, savedDeviceName);
            }, 1e3);
          }
        }));
      } else {
        common_vendor.index.__f__("log", "at pages/index/my.uvue:625", "没有保存的连接设备");
        this.deviceStatus = "未连接";
      }
    },
    // 检查设备连接状态的核心方法
    checkDeviceConnection(savedDeviceId = null, savedDeviceName = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:632", "检查设备连接状态 - 核心方法", savedDeviceId);
      common_vendor.index.getConnectedBluetoothDevices(new UTSJSONObject({
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:637", "获取已连接设备列表", res);
          const isStillConnected = res.devices.some((device = null) => {
            return device.deviceId === savedDeviceId;
          });
          if (isStillConnected) {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:641", "设备仍然保持连接");
            this.updateConnectedState(savedDeviceId, savedDeviceName);
          } else {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:644", "设备连接已断开");
            this.clearConnectedDeviceStorage();
            this.deviceStatus = "未连接";
            this.$forceUpdate();
          }
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:652", "获取已连接设备列表失败", err);
          this.updateConnectedState(savedDeviceId, savedDeviceName);
          setTimeout(() => {
            this.verifyConnectionStatus();
          }, 500);
        }
      }));
    },
    // 更新已连接状态的UI和逻辑
    updateConnectedState(savedDeviceId = null, savedDeviceName = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:666", "更新已连接状态", savedDeviceId);
      this.connectedDeviceId = savedDeviceId;
      this.deviceName = savedDeviceName || "未知设备";
      this.deviceStatus = "已连接";
      this.deviceInfo.show = true;
      this.deviceInfo.connected = true;
      this.deviceInfo.name = savedDeviceName || "未知设备";
      this.characteristicListenerSet = false;
      this.setupCharacteristicListener();
      setTimeout(() => {
        this.getBLEDeviceServices(savedDeviceId);
      }, 1e3);
      this.startConnectionMonitor();
      this.$forceUpdate();
    },
    // 连接设备
    connectDevice(device = null) {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:696", "连接设备", device);
      if (!that.bluetoothEnabled) {
        common_vendor.index.showToast({
          title: "请先开启蓝牙",
          icon: "none"
        });
        return null;
      }
      if (that.connectedDeviceId && that.connectedDeviceId !== device.deviceId) {
        that.disconnectDevice(new UTSJSONObject({ deviceId: that.connectedDeviceId }));
      }
      that.deviceStatus = "连接中...";
      that.$forceUpdate();
      common_vendor.index.createBLEConnection(new UTSJSONObject({
        deviceId: device.deviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:718", "连接设备成功", res);
          device.connected = true;
          that.connectedDeviceId = device.deviceId;
          that.deviceName = device.name;
          that.deviceStatus = "已连接";
          that.deviceInfo.show = true;
          that.deviceInfo.connected = true;
          that.deviceInfo.name = device.name;
          that.characteristicListenerSet = false;
          that.setupCharacteristicListener();
          setTimeout(() => {
            that.getBLEDeviceServices(device.deviceId);
          }, 1e3);
          that.startConnectionMonitor();
          that.$forceUpdate();
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:745", "连接设备失败", err);
          that.deviceStatus = "连接失败";
          that.$forceUpdate();
        }
      }));
    },
    // 启动连接监控
    startConnectionMonitor() {
      this.stopConnectionMonitor();
      this.connectionMonitorInterval = setInterval(() => {
        if (this.connectedDeviceId) {
          this.verifyConnectionStatus();
        }
      }, 3e4);
    },
    // 停止连接监控
    stopConnectionMonitor() {
      if (this.connectionMonitorInterval) {
        clearInterval(this.connectionMonitorInterval);
        this.connectionMonitorInterval = null;
      }
    },
    // 验证连接状态
    verifyConnectionStatus() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:776", "验证设备连接状态");
      if (!this.connectedDeviceId)
        return null;
      common_vendor.index.getBLEDeviceServices(new UTSJSONObject({
        deviceId: this.connectedDeviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:783", "连接状态验证成功，设备仍然在线");
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:787", "连接状态验证失败，设备可能已断开", err);
          this.handleUnexpectedDisconnect();
        }
      }));
    },
    // 处理意外断开连接
    handleUnexpectedDisconnect() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:796", "处理意外断开连接");
      this.stopConnectionMonitor();
      this.connectedDeviceId = "";
      this.deviceName = "智能骑行传感器 A1";
      this.deviceStatus = "连接丢失";
      if (this.deviceInfo.show) {
        this.deviceInfo.connected = false;
      }
      this.clearConnectedDeviceStorage();
      common_vendor.index.offBLECharacteristicValueChange();
      this.characteristicListenerSet = false;
      common_vendor.index.showToast({
        title: "设备连接已丢失",
        icon: "none"
      });
    },
    // 清除本地存储的连接状态
    clearConnectedDeviceStorage() {
      common_vendor.index.removeStorageSync("connectedDeviceId");
      common_vendor.index.removeStorageSync("connectedDeviceName");
    },
    // 连接设备
    connectDevice(device = null) {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:835", "连接设备", device);
      if (!that.bluetoothEnabled) {
        common_vendor.index.showToast({
          title: "请先开启蓝牙",
          icon: "none"
        });
        return null;
      }
      if (that.connectedDeviceId && that.connectedDeviceId !== device.deviceId) {
        that.disconnectDevice(new UTSJSONObject({ deviceId: that.connectedDeviceId }));
      }
      that.deviceStatus = "连接中...";
      that.$forceUpdate();
      common_vendor.index.createBLEConnection(new UTSJSONObject({
        deviceId: device.deviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:857", "连接设备成功", res);
          device.connected = true;
          that.connectedDeviceId = device.deviceId;
          that.deviceName = device.name || "未知设备";
          that.deviceStatus = "已连接";
          that.deviceInfo.show = true;
          that.deviceInfo.connected = true;
          that.deviceInfo.name = device.name || "未知设备";
          that.setupCharacteristicListener();
          that.stopSearchDevices();
          common_vendor.index.setStorageSync("connectedDeviceId", device.deviceId);
          common_vendor.index.setStorageSync("connectedDeviceName", device.name || "未知设备");
          setTimeout(() => {
            that.getBLEDeviceServices(device.deviceId);
          }, 1e3);
          that.startConnectionMonitor();
          that.$forceUpdate();
          common_vendor.index.__f__("log", "at pages/index/my.uvue:890", "deviceInfo当前状态:", UTS.JSON.stringify(that.deviceInfo));
          common_vendor.index.showToast({
            title: "连接成功",
            icon: "success"
          });
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:898", "连接设备失败", err);
          that.deviceStatus = "连接失败";
          that.clearConnectedDeviceStorage();
          that.$forceUpdate();
          common_vendor.index.showToast({
            title: "连接失败",
            icon: "none"
          });
        }
      }));
    },
    // 断开设备连接
    disconnectDevice(device = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:915", "断开设备连接", device);
      const that = this;
      common_vendor.index.closeBLEConnection(new UTSJSONObject({
        deviceId: device.deviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:922", "断开设备连接成功", res);
          device.connected = false;
          if (that.connectedDeviceId === device.deviceId) {
            that.connectedDeviceId = "";
            that.deviceName = "智能骑行传感器 A1";
            that.deviceStatus = "已断开";
            that.deviceInfo.show = false;
            that.deviceInfo.connected = false;
            that.deviceInfo.name = "";
            that.deviceInfo.model = "";
            that.deviceInfo.serialNumber = "";
            that.deviceInfo.firmwareVersion = "";
            that.deviceInfo.hardwareVersion = "";
            that.deviceInfo.manufacturer = "";
            that.deviceInfo.batteryLevel = "";
            that.clearConnectedDeviceStorage();
            common_vendor.index.offBLECharacteristicValueChange();
            that.characteristicListenerSet = false;
            that.stopConnectionMonitor();
          }
          common_vendor.index.showToast({
            title: "已断开连接",
            icon: "success"
          });
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:957", "断开设备连接失败", err);
          common_vendor.index.showToast({
            title: "断开失败",
            icon: "none"
          });
        }
      }));
    },
    // 断开所有设备连接
    disconnectAllDevices() {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:969", "断开所有设备连接");
      const that = this;
      that.discoveredDevices.forEach((device) => {
        if (device.connected) {
          that.disconnectDevice(device);
        }
      });
    },
    // 移除设备
    removeDevice(device = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:982", "移除设备", device);
      const that = this;
      if (device.connected) {
        that.disconnectDevice(device);
      }
      const index = that.discoveredDevices.findIndex((d) => {
        return d.deviceId === device.deviceId;
      });
      if (index !== -1) {
        that.discoveredDevices.splice(index, 1);
      }
      if (that.connectedDeviceId === device.deviceId) {
        that.connectedDeviceId = "";
        that.deviceName = "智能骑行传感器 A1";
        that.deviceStatus = "已移除";
      }
      common_vendor.index.showToast({
        title: "已移除设备",
        icon: "success"
      });
    },
    // 获取蓝牙设备服务
    getBLEDeviceServices(deviceId = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1011", "获取设备服务", deviceId);
      const that = this;
      that.bleServices = new UTSJSONObject({});
      that.bleCharacteristics = new UTSJSONObject({});
      common_vendor.index.getBLEDeviceServices(new UTSJSONObject({
        deviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1021", "获取设备服务成功", res);
          res.services.forEach((service = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1025", "服务UUID:", service.uuid);
            that.bleServices[service.uuid] = service;
            that.getBLEDeviceCharacteristics(deviceId, service.uuid);
          });
          if (that.bleServices["0x180a"] || that.bleServices["180a"]) {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1035", "找到设备信息服务，尝试读取设备信息");
            setTimeout(() => {
              that.readDeviceInformation(deviceId);
            }, 500);
          }
          if (that.bleServices["0x180f"] || that.bleServices["180f"]) {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1044", "找到电池服务，尝试读取电池电量");
            setTimeout(() => {
              that.readBatteryLevel(deviceId);
            }, 500);
          }
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:1052", "获取设备服务失败", err);
        }
      }));
    },
    // 读取设备信息
    readDeviceInformation(deviceId = null) {
      var e_1, _a;
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1060", "尝试读取设备信息", deviceId);
      const normalizeUUID = (uuid = null) => {
        let normalized = uuid.toLowerCase().replace(/^0x|^0X/g, "");
        normalized = normalized.replace(/-/g, "");
        return normalized;
      };
      let serviceId = null;
      const serviceKeys = Object.keys(that.bleServices);
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1074", "已发现的服务列表:", serviceKeys);
      try {
        for (var serviceKeys_1 = common_vendor.__values(serviceKeys), serviceKeys_1_1 = serviceKeys_1.next(); !serviceKeys_1_1.done; serviceKeys_1_1 = serviceKeys_1.next()) {
          var key = serviceKeys_1_1.value;
          const normalizedKey = normalizeUUID(key);
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1078", `检查服务: ${key} (normalized: ${normalizedKey})`);
          if (normalizedKey === "180a") {
            serviceId = key;
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1081", "找到设备信息服务:", serviceId);
            break;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (serviceKeys_1_1 && !serviceKeys_1_1.done && (_a = serviceKeys_1.return))
            _a.call(serviceKeys_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      if (serviceId && that.bleCharacteristics[serviceId]) {
        common_vendor.index.__f__("log", "at pages/index/my.uvue:1087", "设备信息服务的特征值列表:", Object.keys(that.bleCharacteristics[serviceId]));
        const characteristicsToRead = [
          new UTSJSONObject({ id: "2a24", key: "model", name: "设备型号" }),
          new UTSJSONObject({ id: "2a25", key: "serialNumber", name: "序列号" }),
          new UTSJSONObject({ id: "2a26", key: "firmwareVersion", name: "固件版本" }),
          new UTSJSONObject({ id: "2a27", key: "hardwareVersion", name: "硬件版本" }),
          new UTSJSONObject({ id: "2a28", key: "softwareVersion", name: "软件版本" }),
          new UTSJSONObject({ id: "2a29", key: "manufacturer", name: "制造商" })
        ];
        let readIndex = 0;
        const readNextCharacteristic = () => {
          var e_2, _a2;
          if (readIndex >= characteristicsToRead.length) {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1101", "设备信息读取完成");
            return null;
          }
          const _b = characteristicsToRead[readIndex], id = _b.id;
          _b.key;
          const name = _b.name;
          let charId = null;
          const charKeys = Object.keys(that.bleCharacteristics[serviceId]);
          try {
            for (var charKeys_1 = common_vendor.__values(charKeys), charKeys_1_1 = charKeys_1.next(); !charKeys_1_1.done; charKeys_1_1 = charKeys_1.next()) {
              var charKey = charKeys_1_1.value;
              const normalizedCharKey = normalizeUUID(charKey);
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1112", `检查特征值: ${charKey} (normalized: ${normalizedCharKey})，寻找: ${id}`);
              if (normalizedCharKey === id) {
                charId = charKey;
                common_vendor.index.__f__("log", "at pages/index/my.uvue:1115", `找到${name}特征值: ${charId}`);
                break;
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (charKeys_1_1 && !charKeys_1_1.done && (_a2 = charKeys_1.return))
                _a2.call(charKeys_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
          if (charId) {
            const char = that.bleCharacteristics[serviceId][charId];
            if (char.properties.read) {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1125", `尝试读取${name}: ${serviceId}/${charId}`);
              setTimeout(() => {
                that.readDeviceCharacteristicValue(deviceId, serviceId, charId);
                readIndex++;
                readNextCharacteristic();
              }, 200);
            } else {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1133", `${name}特征值不支持读取`);
              if (char.properties.notify || char.properties.indicate) {
                common_vendor.index.__f__("log", "at pages/index/my.uvue:1136", `尝试启用${name}特征值通知`);
                setTimeout(() => {
                  that.notifyBLECharacteristicValueChange(deviceId, serviceId, charId);
                  readIndex++;
                  readNextCharacteristic();
                }, 200);
              } else {
                readNextCharacteristic();
              }
            }
          } else {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1147", `${name}特征值未找到 (寻找标准化的: ${id})`);
            readIndex++;
            readNextCharacteristic();
          }
        };
        readNextCharacteristic();
      } else {
        common_vendor.index.__f__("log", "at pages/index/my.uvue:1156", "未找到设备信息服务或特征值");
        that.directReadDeviceInfo(deviceId);
      }
    },
    // 读取电池电量
    readBatteryLevel(deviceId = null) {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1165", "尝试读取电池电量", deviceId);
      const serviceId = that.bleServices["0x180f"] ? "0x180f" : "180f";
      const characteristicId = "0x2a19";
      if (serviceId && that.bleCharacteristics[serviceId] && (that.bleCharacteristics[serviceId][characteristicId] || that.bleCharacteristics[serviceId][characteristicId.replace("0x", "")])) {
        const charId = that.bleCharacteristics[serviceId][characteristicId] ? characteristicId : characteristicId.replace("0x", "");
        const char = that.bleCharacteristics[serviceId][charId];
        if (char.properties.read) {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1178", "尝试读取电池电量");
          that.readDeviceCharacteristicValue(deviceId, serviceId, charId);
        } else if (char.properties.notify) {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1181", "电池电量特征值支持通知，设置通知");
          that.notifyBLECharacteristicValueChange(deviceId, serviceId, charId);
        }
      }
    },
    // 获取蓝牙设备特征值
    getBLEDeviceCharacteristics(deviceId = null, serviceId = null) {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1191", "获取设备特征值", deviceId, serviceId);
      if (!that.bleCharacteristics[serviceId]) {
        that.bleCharacteristics[serviceId] = {};
      }
      if (!that.characteristicListenerSet) {
        that.setupCharacteristicListener();
      }
      common_vendor.index.getBLEDeviceCharacteristics(new UTSJSONObject({
        deviceId,
        serviceId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1207", "获取设备特征值成功", res);
          res.characteristics.forEach((characteristic = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1211", "特征值UUID:", characteristic.uuid);
            that.bleCharacteristics[serviceId][characteristic.uuid] = characteristic;
            if (characteristic.properties.notify || characteristic.properties.indicate) {
              that.notifyBLECharacteristicValueChange(deviceId, serviceId, characteristic.uuid);
            }
            if (characteristic.properties.read) {
              setTimeout(() => {
                that.readDeviceCharacteristicValue(deviceId, serviceId, characteristic.uuid);
              }, 200);
            }
          });
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:1231", "获取设备特征值失败", err);
        }
      }));
    },
    // 启用蓝牙设备特征值变化通知
    notifyBLECharacteristicValueChange(deviceId = null, serviceId = null, characteristicId = null) {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1240", "启用蓝牙设备特征值变化通知", deviceId, serviceId, characteristicId);
      common_vendor.index.offBLECharacteristicValueChange();
      common_vendor.index.onBLECharacteristicValueChange((res = null) => {
        common_vendor.index.__f__("log", "at pages/index/my.uvue:1247", "特征值变化", res);
        if (res.deviceId === that.connectedDeviceId) {
          that.handleCharacteristicValueChange(res);
        }
      });
      common_vendor.index.notifyBLECharacteristicValueChange(new UTSJSONObject({
        deviceId,
        serviceId,
        characteristicId,
        state: true,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1262", "启用蓝牙设备特征值变化通知成功", res);
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:1265", "启用蓝牙设备特征值变化通知失败", err);
        }
      }));
    },
    // 处理接收到的数据
    handleReceivedData(buffer = null) {
      const str = this.ab2hex(buffer);
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1274", "接收到的数据:", str);
    },
    // ArrayBuffer转16进制字符串
    ab2hex(buffer = null) {
      const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit = null) {
        return ("00" + bit.toString(16)).slice(-2);
      });
      return hexArr.join("");
    },
    // 读取设备特征值数据
    readDeviceCharacteristicValue(deviceId = null, serviceId = null, characteristicId = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1296", "读取设备特征值数据", deviceId, serviceId, characteristicId);
      common_vendor.index.readBLECharacteristicValue(new UTSJSONObject({
        deviceId,
        serviceId,
        characteristicId,
        success: (res = null) => {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1303", "读取特征值成功", res);
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at pages/index/my.uvue:1307", "读取特征值失败", err);
        }
      }));
    },
    // 监听特征值变化
    setupCharacteristicListener() {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1316", "设置特征值监听器");
      common_vendor.index.offBLECharacteristicValueChange();
      common_vendor.index.onBLECharacteristicValueChange(that.handleCharacteristicValueChange.bind(that));
      that.characteristicListenerSet = true;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1323", "特征值监听器设置完成");
    },
    // 直接读取设备信息（备用方法）
    directReadDeviceInfo(deviceId = null) {
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1330", "尝试直接读取设备信息");
      const serviceIds = ["0x180a", "180a", "0X180A", "0000180a-0000-1000-8000-00805f9b34fb"];
      const characteristics = [
        new UTSJSONObject({ id: "0x2a24", altIds: ["2a24", "00002a24-0000-1000-8000-00805f9b34fb"], key: "model", name: "设备型号" }),
        new UTSJSONObject({ id: "0x2a25", altIds: ["2a25", "00002a25-0000-1000-8000-00805f9b34fb"], key: "serialNumber", name: "序列号" }),
        new UTSJSONObject({ id: "0x2a26", altIds: ["2a26", "00002a26-0000-1000-8000-00805f9b34fb"], key: "firmwareVersion", name: "固件版本" }),
        new UTSJSONObject({ id: "0x2a27", altIds: ["2a27", "00002a27-0000-1000-8000-00805f9b34fb"], key: "hardwareVersion", name: "硬件版本" }),
        new UTSJSONObject({ id: "0x2a28", altIds: ["2a28", "00002a28-0000-1000-8000-00805f9b34fb"], key: "softwareVersion", name: "软件版本" }),
        new UTSJSONObject({ id: "0x2a29", altIds: ["2a29", "00002a29-0000-1000-8000-00805f9b34fb"], key: "manufacturer", name: "制造商" })
      ];
      let serviceIndex = 0;
      let charIndex = 0;
      let charIdIndex = 0;
      const tryReadCharacteristic = () => {
        if (serviceIndex >= serviceIds.length) {
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1357", "直接读取设备信息完成");
          return null;
        }
        if (charIndex >= characteristics.length) {
          serviceIndex++;
          charIndex = 0;
          charIdIndex = 0;
          tryReadCharacteristic();
          return null;
        }
        const serviceId = serviceIds[serviceIndex];
        const _a = characteristics[charIndex], id = _a.id, altIds = _a.altIds;
        _a.key;
        const name = _a.name;
        const allCharIds = [id, ...altIds];
        if (charIdIndex >= allCharIds.length) {
          charIndex++;
          charIdIndex = 0;
          tryReadCharacteristic();
          return null;
        }
        const characteristicId = allCharIds[charIdIndex];
        common_vendor.index.__f__("log", "at pages/index/my.uvue:1385", `尝试直接读取 ${name}: ${serviceId}/${characteristicId}`);
        common_vendor.index.readBLECharacteristicValue(new UTSJSONObject({
          deviceId,
          serviceId,
          characteristicId,
          success: (res = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1392", `直接读取${name}成功，等待数据回调`, res);
            charIndex++;
            charIdIndex = 0;
            setTimeout(tryReadCharacteristic, 300);
          },
          fail: (err = null) => {
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1399", `直接读取${name}失败 (${serviceId}/${characteristicId}):`, err);
            charIdIndex++;
            setTimeout(tryReadCharacteristic, 100);
          }
        }));
      };
      tryReadCharacteristic();
    },
    // 处理特征值变化
    handleCharacteristicValueChange(res = null) {
      const that = this;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1415", "特征值变化", res);
      const deviceId = res.deviceId, serviceId = res.serviceId, characteristicId = res.characteristicId, value = res.value;
      if (deviceId !== that.connectedDeviceId) {
        common_vendor.index.__f__("log", "at pages/index/my.uvue:1420", "忽略非当前连接设备的数据");
        return null;
      }
      const hexString = that.ab2hex(value);
      const strValue = that.ab2str(value);
      const normalizeUUID = (uuid = null) => {
        let normalized = uuid.toLowerCase().replace(/^0x|^0X/g, "");
        normalized = normalized.replace(/-/g, "");
        return normalized;
      };
      const normalizedServiceId = normalizeUUID(serviceId);
      const normalizedCharId = normalizeUUID(characteristicId);
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1441", `Service: ${serviceId} (normalized: ${normalizedServiceId}), Characteristic: ${characteristicId} (normalized: ${normalizedCharId}), Value: ${hexString}, String: "${strValue}"`);
      if (!that.deviceInfo.show) {
        that.deviceInfo.show = true;
        common_vendor.index.__f__("log", "at pages/index/my.uvue:1446", "设置deviceInfo.show为true");
      }
      if (normalizedServiceId === "180f") {
        if (normalizedCharId === "2a19") {
          try {
            const batteryLevel = new Uint8Array(value)[0];
            that.deviceInfo.batteryLevel = `${batteryLevel}%`;
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1456", "电池电量:", that.deviceInfo.batteryLevel);
          } catch (error) {
            common_vendor.index.__f__("error", "at pages/index/my.uvue:1458", "解析电池电量失败:", error);
          }
        }
      }
      if (normalizedServiceId === "180a") {
        common_vendor.index.__f__("log", "at pages/index/my.uvue:1465", "检测到设备信息服务(180a)，处理特征值:", normalizedCharId);
        switch (normalizedCharId) {
          case "2a24":
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1468", "检测到设备型号特征值(2a24)，原始值:", strValue);
            if (strValue && strValue.trim()) {
              that.deviceInfo.model = strValue.trim();
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1471", "更新设备型号为:", that.deviceInfo.model);
            } else {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1473", "设备型号值为空或只有空白字符");
            }
            break;
          case "2a25":
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1477", "检测到序列号特征值(2a25)，原始值:", strValue);
            if (strValue && strValue.trim()) {
              that.deviceInfo.serialNumber = strValue.trim();
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1480", "更新序列号为:", that.deviceInfo.serialNumber);
            } else {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1482", "序列号值为空或只有空白字符");
            }
            break;
          case "2a26":
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1486", "检测到固件版本特征值(2a26)，原始值:", strValue);
            if (strValue && strValue.trim()) {
              that.deviceInfo.firmwareVersion = strValue.trim();
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1489", "更新固件版本为:", that.deviceInfo.firmwareVersion);
            } else {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1491", "固件版本值为空或只有空白字符");
            }
            break;
          case "2a27":
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1495", "检测到硬件版本特征值(2a27)，原始值:", strValue);
            if (strValue && strValue.trim()) {
              that.deviceInfo.hardwareVersion = strValue.trim();
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1498", "更新硬件版本为:", that.deviceInfo.hardwareVersion);
            } else {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1500", "硬件版本值为空或只有空白字符");
            }
            break;
          case "2a28":
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1504", "检测到软件版本特征值(2a28)，原始值:", strValue);
            if (strValue && strValue.trim()) {
              that.deviceInfo.softwareVersion = strValue.trim();
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1507", "更新软件版本为:", that.deviceInfo.softwareVersion);
            } else {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1509", "软件版本值为空或只有空白字符");
            }
            break;
          case "2a29":
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1513", "检测到制造商特征值(2a29)，原始值:", strValue);
            if (strValue && strValue.trim()) {
              that.deviceInfo.manufacturer = strValue.trim();
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1516", "更新制造商为:", that.deviceInfo.manufacturer);
            } else {
              common_vendor.index.__f__("log", "at pages/index/my.uvue:1518", "制造商值为空或只有空白字符");
            }
            break;
          default:
            common_vendor.index.__f__("log", "at pages/index/my.uvue:1522", "未识别的设备信息特征值:", normalizedCharId);
        }
      }
      if (that.deviceName === "智能骑行传感器 A1" && strValue && strValue.trim()) {
        if (normalizedCharId === "2a24" || normalizedCharId === "2a29") {
          that.deviceName = strValue.trim();
          common_vendor.index.__f__("log", "at pages/index/my.uvue:1531", "更新设备名称为:", that.deviceName);
        }
      }
      that.$forceUpdate();
    },
    // ArrayBuffer转字符串
    ab2str(buffer = null) {
      try {
        const uint8Array = new Uint8Array(buffer);
        let result = String.fromCharCode.apply(null, uint8Array);
        result = result.replace(/[\x00-\x1F\x7F]/g, "");
        return result;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/my.uvue:1551", "字符串转换失败:", error);
        return "";
      }
    },
    // 切换标签页
    switchTab(tab = null) {
      this.activeTab = tab;
      common_vendor.index.__f__("log", "at pages/index/my.uvue:1560", "切换到标签页:", tab);
      if (tab === "riding") {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
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
    i: $data.deviceInfo.show
  }, $data.deviceInfo.show ? {
    j: common_vendor.t($data.deviceInfo.name || "未知"),
    k: common_vendor.t($data.deviceInfo.connected ? "已连接" : "未连接"),
    l: common_vendor.n($data.deviceInfo.connected ? "connected" : "disconnected"),
    m: common_vendor.t($data.deviceInfo.model || "未知"),
    n: common_vendor.t($data.deviceInfo.serialNumber || "未知"),
    o: common_vendor.t($data.deviceInfo.firmwareVersion || "未知"),
    p: common_vendor.t($data.deviceInfo.hardwareVersion || "未知"),
    q: common_vendor.t($data.deviceInfo.softwareVersion || "未知"),
    r: common_vendor.t($data.deviceInfo.manufacturer || "未知"),
    s: common_vendor.t($data.deviceInfo.batteryLevel || "未知")
  } : {}, {
    t: $data.discoveredDevices.length > 0
  }, $data.discoveredDevices.length > 0 ? {
    v: common_vendor.f($data.discoveredDevices, (device, index, i0) => {
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
    w: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/my.js.map
