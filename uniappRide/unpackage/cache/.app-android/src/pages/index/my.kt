@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI7BB6FD0
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import io.dcloud.uniapp.extapi.getSystemInfoSync as uni_getSystemInfoSync
import io.dcloud.uniapp.extapi.onBluetoothAdapterStateChange as uni_onBluetoothAdapterStateChange
import io.dcloud.uniapp.extapi.switchTab as uni_switchTab
open class GenPagesIndexMy : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onLoad(fun(_: OnLoadOptions) {
            this.initData()
            this.initBluetooth()
        }
        , __ins)
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to "container"), _uA(
            _cE("view", _uM("class" to "data-section"), _uA(
                _cE("text", _uM("class" to "section-title"), "我的数据"),
                _cE("view", _uM("class" to "data-list"), _uA(
                    _cE("view", _uM("class" to "data-list-item"), _uA(
                        _cE("text", _uM("class" to "data-list-label"), "总里程"),
                        _cE("text", _uM("class" to "data-list-value"), _tD(_ctx.totalDistance) + " km", 1)
                    )),
                    _cE("view", _uM("class" to "data-list-item"), _uA(
                        _cE("text", _uM("class" to "data-list-label"), "最快速度"),
                        _cE("text", _uM("class" to "data-list-value"), _tD(_ctx.maxSpeed) + " km/h", 1)
                    )),
                    _cE("view", _uM("class" to "data-list-item"), _uA(
                        _cE("text", _uM("class" to "data-list-label"), "最长时间"),
                        _cE("text", _uM("class" to "data-list-value"), _tD(_ctx.maxTime) + " h", 1)
                    ))
                ))
            )),
            _cE("view", _uM("class" to "history-section"), _uA(
                _cE("text", _uM("class" to "section-title"), "历史骑行数据"),
                _cE("view", _uM("class" to "history-list"), _uA(
                    _cE(Fragment, null, RenderHelpers.renderList(_ctx.historyData, fun(item, index, __index, _cached): Any {
                        return _cE("view", _uM("class" to "history-item", "key" to index), _uA(
                            _cE("view", _uM("class" to "history-date"), _uA(
                                _cE("text", _uM("class" to "date-text"), _tD(item.date), 1)
                            )),
                            _cE("view", _uM("class" to "history-details"), _uA(
                                _cE("text", _uM("class" to "time-text"), _tD(item.time), 1),
                                _cE("text", _uM("class" to "location-text"), _tD(item.location), 1)
                            ))
                        ))
                    }
                    ), 128)
                ))
            )),
            _cE("view", _uM("class" to "device-section"), _uA(
                _cE("text", _uM("class" to "section-title"), "我的设备"),
                _cE("view", _uM("class" to "device-container"), _uA(
                    _cE("view", _uM("class" to "device-box", "onClick" to _ctx.searchDevices), _uA(
                        _cE("text", _uM("class" to "device-name"), _tD(_ctx.deviceName), 1),
                        _cE("text", _uM("class" to "device-status"), _tD(_ctx.deviceStatus), 1),
                        if (isTrue(_ctx.isSearching)) {
                            _cE("text", _uM("key" to 0, "class" to "search-hint"), "搜索中...")
                        } else {
                            _cC("v-if", true)
                        }
                    ), 8, _uA(
                        "onClick"
                    ))
                )),
                if (_ctx.discoveredDevices.length > 0) {
                    _cE("view", _uM("key" to 0, "class" to "device-list"), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(_ctx.discoveredDevices, fun(device, index, __index, _cached): Any {
                            return _cE("view", _uM("class" to "device-list-item", "key" to index, "onClick" to fun(){
                                _ctx.connectDevice(device)
                            }), _uA(
                                _cE("text", _uM("class" to "device-item-name"), _tD(device.name || "未知设备"), 1),
                                _cE("text", _uM("class" to "device-item-signal"), "信号强度: " + _tD(device.RSSI) + "dBm", 1)
                            ), 8, _uA(
                                "onClick"
                            ))
                        }), 128)
                    ))
                } else {
                    _cC("v-if", true)
                }
            )),
            _cE("view", _uM("class" to "tab-bar"), _uA(
                _cE("view", _uM("class" to _nC(_uA(
                    "tab-item",
                    _uM("active" to (_ctx.activeTab === "riding"))
                )), "onClick" to fun(){
                    _ctx.switchTab("riding")
                }
                ), _uA(
                    _cE("text", _uM("class" to "tab-text"), "骑行")
                ), 10, _uA(
                    "onClick"
                )),
                _cE("view", _uM("class" to _nC(_uA(
                    "tab-item",
                    _uM("active" to (_ctx.activeTab === "history"))
                )), "onClick" to fun(){
                    _ctx.switchTab("history")
                }
                ), _uA(
                    _cE("text", _uM("class" to "tab-text"), "历史")
                ), 10, _uA(
                    "onClick"
                )),
                _cE("view", _uM("class" to _nC(_uA(
                    "tab-item",
                    _uM("active" to (_ctx.activeTab === "profile"))
                )), "onClick" to fun(){
                    _ctx.switchTab("profile")
                }
                ), _uA(
                    _cE("text", _uM("class" to "tab-text"), "我的")
                ), 10, _uA(
                    "onClick"
                ))
            ))
        ))
    }
    open var totalDistance: Number by `$data`
    open var maxSpeed: Number by `$data`
    open var maxTime: Number by `$data`
    open var historyData: UTSArray<UTSJSONObject> by `$data`
    open var deviceName: String by `$data`
    open var deviceStatus: String by `$data`
    open var isSearching: Boolean by `$data`
    open var discoveredDevices: UTSArray<Any?> by `$data`
    open var connectedDeviceId: String by `$data`
    open var activeTab: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("totalDistance" to 128.5, "maxSpeed" to 35.2, "maxTime" to 4.5, "historyData" to _uA(
            object : UTSJSONObject() {
                var date = "2023-06-15"
                var time = "14:30 - 16:45"
                var location = "城市公园"
            },
            object : UTSJSONObject() {
                var date = "2023-06-10"
                var time = "09:15 - 11:30"
                var location = "湖边绿道"
            },
            object : UTSJSONObject() {
                var date = "2023-06-05"
                var time = "16:00 - 18:20"
                var location = "山地赛道"
            },
            object : UTSJSONObject() {
                var date = "2023-05-28"
                var time = "10:30 - 13:15"
                var location = "滨江路"
            }
        ), "deviceName" to "智能骑行传感器 A1", "deviceStatus" to "未连接", "isSearching" to false, "discoveredDevices" to _uA(), "connectedDeviceId" to "", "activeTab" to "history")
    }
    open var initData = ::gen_initData_fn
    open fun gen_initData_fn() {
        console.log("历史页面数据初始化", " at pages/index/my.uvue:128")
    }
    open var initBluetooth = ::gen_initBluetooth_fn
    open fun gen_initBluetooth_fn() {
        console.log("初始化蓝牙适配器", " at pages/index/my.uvue:133")
        if (uni_getSystemInfoSync().platform === "android") {
            plus.android.importClass("android.bluetooth.BluetoothAdapter")
            val BluetoothAdapter = plus.android.runtimeMainActivity().getSystemService("bluetooth")
            if (!BluetoothAdapter.isEnabled()) {
                this.deviceStatus = "蓝牙未开启"
                return
            }
        } else if (uni_getSystemInfoSync().platform === "ios") {
            val bluetooth = plus.ios.`import`("CoreBluetooth")
            if (!bluetooth) {
                this.deviceStatus = "蓝牙不可用"
                return
            }
        }
        uni_onBluetoothAdapterStateChange(fun(res){
            if (!res.available) {
                this.deviceStatus = "蓝牙不可用"
            }
        }
        )
    }
    open var searchDevices = ::gen_searchDevices_fn
    open fun gen_searchDevices_fn() {
        if (this.isSearching) {
            console.log("正在搜索中，请稍候...", " at pages/index/my.uvue:163")
            return
        }
        console.log("开始搜索蓝牙设备", " at pages/index/my.uvue:167")
        this.isSearching = true
        this.deviceStatus = "搜索中..."
        this.discoveredDevices = _uA()
        uni_getSystemInfoSync().platform = "android"
        this.searchAndroidDevices()
        if (uni_getSystemInfoSync().platform === "android") {
            this.searchAndroidDevices()
        } else if (uni_getSystemInfoSync().platform === "ios") {
        }
    }
    open var searchAndroidDevices = ::gen_searchAndroidDevices_fn
    open fun gen_searchAndroidDevices_fn() {
        try {
            val main = plus.android.runtimeMainActivity()
            val Context = plus.android.importClass("android.content.Context")
            val BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter")
            val BDevice = plus.android.importClass("android.bluetooth.BluetoothDevice")
            val mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
            if (!mBluetoothAdapter.isEnabled()) {
                this.deviceStatus = "蓝牙未开启"
                this.isSearching = false
                return
            }
            mBluetoothAdapter.startDiscovery()
            val IntentFilter = plus.android.importClass("android.content.IntentFilter")
            val filter = IntentFilter()
            filter.addAction(BluetoothDevice.ACTION_FOUND)
            filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED)
            val receiver = plus.android.`implements`("io.dcloud.feature.internal.reflect.BroadcastReceiver", _uO("onReceive" to fun(context, intent){
                val action = intent.getAction()
                if (action === BluetoothDevice.ACTION_FOUND) {
                    val device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE)
                    val deviceInfo: UTSJSONObject = object : UTSJSONObject(UTSSourceMapPosition("deviceInfo", "pages/index/my.uvue", 211, 15)) {
                        var deviceId = device.getAddress()
                        var name = device.getName()
                        var RSSI = intent.getShortExtra(BluetoothDevice.EXTRA_RSSI, 0)
                    }
                    if (deviceInfo["name"] && deviceInfo["name"].includes("AINSTEC_")) {
                        val exists = this.discoveredDevices.some(fun(d): Boolean {
                            return d.deviceId === deviceInfo["deviceId"]
                        }
                        )
                        if (!exists) {
                            this.discoveredDevices.push(deviceInfo)
                        }
                    }
                } else if (action === BluetoothAdapter.ACTION_DISCOVERY_FINISHED) {
                    this.stopSearchDevices()
                }
            }
            ))
            main.registerReceiver(receiver, filter)
            setTimeout(fun(){
                this.stopSearchDevices()
                main.unregisterReceiver(receiver)
            }
            , 10000)
        }
         catch (e: Throwable) {
            console.error("Android蓝牙搜索失败", e, " at pages/index/my.uvue:239")
            this.isSearching = false
            this.deviceStatus = "搜索失败"
        }
    }
    open var searchIOSDevices = ::gen_searchIOSDevices_fn
    open fun gen_searchIOSDevices_fn() {
        try {
            val manager = plus.ios.`import`("CoreBluetooth.CBCentralManager")
            val delegate = plus.ios.`implements`("CoreBluetooth.CBCentralManagerDelegate", _uO("centralManagerDidUpdateState" to fun(central){
                if (central.state() === 5) {
                    central.scanForPeripheralsWithServices_options_(null, null)
                } else {
                    this.deviceStatus = "蓝牙未开启"
                    this.isSearching = false
                }
            }
            , "centralManagerDidDiscoverPeripheralAdvertisementDataRSSI" to fun(central, peripheral, advertisementData, RSSI){
                val deviceInfo: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("deviceInfo", "pages/index/my.uvue", 260, 14), "deviceId" to peripheral.identifier().UUIDString(), "name" to peripheral.name(), "RSSI" to RSSI)
                if (deviceInfo["name"] && deviceInfo["name"].includes("骑行")) {
                    val exists = this.discoveredDevices.some(fun(d): Boolean {
                        return d.deviceId === deviceInfo["deviceId"]
                    }
                    )
                    if (!exists) {
                        this.discoveredDevices.push(deviceInfo)
                    }
                }
            }
            ))
            val centralManager = manager.alloc().initWithDelegate_queue_(delegate, null)
            setTimeout(fun(){
                centralManager.stopScan()
                this.stopSearchDevices()
            }
            , 10000)
        }
         catch (e: Throwable) {
            console.error("iOS蓝牙搜索失败", e, " at pages/index/my.uvue:285")
            this.isSearching = false
            this.deviceStatus = "搜索失败"
        }
    }
    open var stopSearchDevices = ::gen_stopSearchDevices_fn
    open fun gen_stopSearchDevices_fn() {
        console.log("停止搜索蓝牙设备", " at pages/index/my.uvue:293")
        this.isSearching = false
        if (this.discoveredDevices.length === 0) {
            this.deviceStatus = "未找到设备"
        } else {
            this.deviceStatus = "找到 " + this.discoveredDevices.length + " 个设备"
        }
    }
    open var connectDevice = ::gen_connectDevice_fn
    open fun gen_connectDevice_fn(device) {
        console.log("连接设备", device, " at pages/index/my.uvue:304")
        this.deviceStatus = "连接中..."
        if (uni_getSystemInfoSync().platform === "android") {
            this.connectAndroidDevice(device)
        } else if (uni_getSystemInfoSync().platform === "ios") {
            this.connectIOSDevice(device)
        }
    }
    open var connectAndroidDevice = ::gen_connectAndroidDevice_fn
    open fun gen_connectAndroidDevice_fn(device) {
        try {
            val BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter")
            val BluetoothDevice1 = plus.android.importClass("android.bluetooth.BluetoothDevice")
            val mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
            val remoteDevice = mBluetoothAdapter.getRemoteDevice(device.deviceId)
            val socket = remoteDevice.createRfcommSocketToServiceRecord(java.util.UUID.fromString("00001101-0000-1000-8000-00805F9B34FB"))
            socket.connect()
            this.connectedDeviceId = device.deviceId
            this.deviceName = device.name || "未知设备"
            this.deviceStatus = "已连接"
            this.stopSearchDevices()
        }
         catch (e: Throwable) {
            console.error("Android蓝牙连接失败", e, " at pages/index/my.uvue:338")
            this.deviceStatus = "连接失败"
        }
    }
    open var connectIOSDevice = ::gen_connectIOSDevice_fn
    open fun gen_connectIOSDevice_fn(device) {
        try {
            val manager = plus.ios.`import`("CoreBluetooth.CBCentralManager")
            val delegate = plus.ios.`implements`("CoreBluetooth.CBCentralManagerDelegate", _uO("centralManagerDidConnectPeripheral" to fun(central, peripheral){
                this.connectedDeviceId = device.deviceId
                this.deviceName = device.name || "未知设备"
                this.deviceStatus = "已连接"
                this.stopSearchDevices()
            }
            , "centralManagerDidFailToConnectPeripheral_error" to fun(central, peripheral, error){
                console.error("iOS蓝牙连接失败", error, " at pages/index/my.uvue:357")
                this.deviceStatus = "连接失败"
            }
            ))
            val centralManager = manager.alloc().initWithDelegate_queue_(delegate, null)
            val peripherals = centralManager.retrievePeripheralsWithIdentifiers_(_uA(
                device.deviceId
            ))
            if (peripherals.length > 0) {
                centralManager.connectPeripheral_options_(peripherals[0], null)
            } else {
                this.deviceStatus = "设备未找到"
            }
        }
         catch (e: Throwable) {
            console.error("iOS蓝牙连接失败", e, " at pages/index/my.uvue:373")
            this.deviceStatus = "连接失败"
        }
    }
    open var switchTab = ::gen_switchTab_fn
    open fun gen_switchTab_fn(tab) {
        this.activeTab = tab
        console.log("切换到标签页:", tab, " at pages/index/my.uvue:381")
        if (tab === "riding") {
            uni_switchTab(SwitchTabOptions(url = "/pages/index/index"))
        }
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to 10, "paddingRight" to 10, "paddingBottom" to 60, "paddingLeft" to 10, "backgroundColor" to "#f5f5f5")), "data-section" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "paddingTop" to 10, "paddingRight" to 10, "paddingBottom" to 10, "paddingLeft" to 10, "marginBottom" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.1)", "height" to 200)), "section-title" to _pS(_uM("fontSize" to 16, "fontWeight" to "bold", "marginBottom" to 5, "color" to "#333333")), "data-list" to _pS(_uM("backgroundColor" to "#f9f9f9", "borderTopLeftRadius" to 8, "borderTopRightRadius" to 8, "borderBottomRightRadius" to 8, "borderBottomLeftRadius" to 8, "overflow" to "hidden")), "data-list-item" to _pS(_uM("display" to "flex", "justifyContent" to "space-between", "paddingTop" to 8, "paddingRight" to 10, "paddingBottom" to 8, "paddingLeft" to 10, "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#eeeeee", "borderBottomWidth:last-child" to "medium", "borderBottomStyle:last-child" to "none", "borderBottomColor:last-child" to "#000000")), "data-list-label" to _pS(_uM("fontSize" to 14, "color" to "#666666")), "data-list-value" to _pS(_uM("fontSize" to 14, "fontWeight" to "bold", "color" to "#333333")), "history-section" to _pS(_uM("flex" to 1, "backgroundColor" to "#ffffff", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "paddingTop" to 15, "paddingRight" to 15, "paddingBottom" to 15, "paddingLeft" to 15, "marginBottom" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.1)", "display" to "flex", "flexDirection" to "column")), "history-list" to _pS(_uM("flex" to 1, "overflowY" to "auto")), "history-item" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to 15, "paddingRight" to 15, "paddingBottom" to 15, "paddingLeft" to 15, "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#eeeeee", "borderBottomWidth:last-child" to "medium", "borderBottomStyle:last-child" to "none", "borderBottomColor:last-child" to "#000000")), "history-date" to _pS(_uM("marginBottom" to 8)), "date-text" to _pS(_uM("fontSize" to 16, "fontWeight" to "bold", "color" to "#333333")), "history-details" to _pS(_uM("display" to "flex", "justifyContent" to "space-between")), "time-text" to _pS(_uM("fontSize" to 14, "color" to "#666666")), "location-text" to _pS(_uM("fontSize" to 14, "color" to "#666666")), "device-section" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "paddingTop" to 15, "paddingRight" to 15, "paddingBottom" to 15, "paddingLeft" to 15, "marginBottom" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.1)")), "device-container" to _pS(_uM("display" to "flex", "justifyContent" to "center", "alignItems" to "center", "paddingTop" to 20, "paddingRight" to 0, "paddingBottom" to 20, "paddingLeft" to 0)), "device-box" to _pS(_uM("width" to 200, "height" to 120, "backgroundColor" to "#f0f0f0", "borderTopWidth" to 2, "borderRightWidth" to 2, "borderBottomWidth" to 2, "borderLeftWidth" to 2, "borderTopStyle" to "dashed", "borderRightStyle" to "dashed", "borderBottomStyle" to "dashed", "borderLeftStyle" to "dashed", "borderTopColor" to "#cccccc", "borderRightColor" to "#cccccc", "borderBottomColor" to "#cccccc", "borderLeftColor" to "#cccccc", "borderTopLeftRadius" to 8, "borderTopRightRadius" to 8, "borderBottomRightRadius" to 8, "borderBottomLeftRadius" to 8, "display" to "flex", "flexDirection" to "column", "justifyContent" to "center", "alignItems" to "center", "position" to "relative")), "device-name" to _pS(_uM("fontSize" to 16, "fontWeight" to "bold", "color" to "#333333", "marginBottom" to 8)), "device-status" to _pS(_uM("fontSize" to 14, "color" to "#FF5722")), "search-hint" to _pS(_uM("fontSize" to 12, "color" to "#FF5722", "marginTop" to 5)), "device-list" to _pS(_uM("marginTop" to 15, "borderTopWidth" to 1, "borderTopStyle" to "solid", "borderTopColor" to "#eeeeee", "paddingTop" to 15)), "device-list-item" to _pS(_uM("display" to "flex", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to 10, "paddingRight" to 15, "paddingBottom" to 10, "paddingLeft" to 15, "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#eeeeee", "borderBottomWidth:last-child" to "medium", "borderBottomStyle:last-child" to "none", "borderBottomColor:last-child" to "#000000")), "device-item-name" to _pS(_uM("fontSize" to 14, "color" to "#333333")), "device-item-signal" to _pS(_uM("fontSize" to 12, "color" to "#666666")), "tab-bar" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "height" to 50, "backgroundColor" to "#ffffff", "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "boxShadow" to "0 -2px 5px rgba(0,0,0,0.1)", "zIndex" to 100)), "tab-item" to _uM("" to _uM("flex" to 1, "height" to "100%", "display" to "flex", "justifyContent" to "center", "alignItems" to "center", "textAlign" to "center", "justifyContent:first-child" to "flex-start", "paddingLeft:first-child" to 20, "justifyContent:last-child" to "flex-end", "paddingRight:last-child" to 20), ".active" to _uM("borderBottomWidth" to 2, "borderBottomStyle" to "solid", "borderBottomColor" to "#FF5722")), "tab-text" to _uM("" to _uM("fontSize" to 16, "color" to "#666666"), ".tab-item.active " to _uM("color" to "#FF5722", "fontWeight" to "bold")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
