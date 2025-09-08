@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI7BB6FD0
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import io.dcloud.uniapp.extapi.switchTab as uni_switchTab
open class GenPagesIndexIndex : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {
        onLoad(fun(_: OnLoadOptions) {
            this.initData()
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
            _cE("view", _uM("class" to "map-section"), _uA(
                _cE("text", _uM("class" to "section-title"), "地图区域"),
                _cE("view", _uM("class" to "map-container"), _uA(
                    _cE("text", null, "地图加载中...")
                ))
            )),
            _cE("view", _uM("class" to "button-section"), _uA(
                _cE("view", _uM("class" to "button-grid"), _uA(
                    _cE("view", _uM("class" to "button-corner top-left free-ride", "onClick" to _ctx.freeRide), _uA(
                        _cE("text", _uM("class" to "button-text"), "自由骑")
                    ), 8, _uA(
                        "onClick"
                    )),
                    _cE("view", _uM("class" to "button-corner top-right", "onClick" to _ctx.sameAsLast), _uA(
                        _cE("text", _uM("class" to "button-text"), "上次一样")
                    ), 8, _uA(
                        "onClick"
                    )),
                    _cE("view", _uM("class" to "button-center start-riding", "onClick" to _ctx.startRiding), _uA(
                        _cE("text", _uM("class" to "button-text-large"), "开始骑行")
                    ), 8, _uA(
                        "onClick"
                    )),
                    _cE("view", _uM("class" to "button-corner bottom-left", "onClick" to _ctx.selectDestination), _uA(
                        _cE("text", _uM("class" to "button-text"), "选择目的地")
                    ), 8, _uA(
                        "onClick"
                    )),
                    _cE("view", _uM("class" to "button-corner bottom-right", "onClick" to _ctx.selectRoute), _uA(
                        _cE("text", _uM("class" to "button-text"), "选择路书")
                    ), 8, _uA(
                        "onClick"
                    ))
                ))
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
                    _uM("active" to (_ctx.activeTab === "discover"))
                )), "onClick" to fun(){
                    _ctx.switchTab("discover")
                }
                ), _uA(
                    _cE("text", _uM("class" to "tab-text"), "发现")
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
    open var activeTab: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("totalDistance" to 0, "maxSpeed" to 0, "maxTime" to 0, "activeTab" to "riding")
    }
    open var initData = ::gen_initData_fn
    open fun gen_initData_fn() {
        this.totalDistance = 128.5
        this.maxSpeed = 35.2
        this.maxTime = 4.5
    }
    open var startRiding = ::gen_startRiding_fn
    open fun gen_startRiding_fn() {
        console.log("开始骑行")
    }
    open var freeRide = ::gen_freeRide_fn
    open fun gen_freeRide_fn() {
        console.log("自由骑模式")
    }
    open var sameAsLast = ::gen_sameAsLast_fn
    open fun gen_sameAsLast_fn() {
        console.log("上次一样")
    }
    open var selectDestination = ::gen_selectDestination_fn
    open fun gen_selectDestination_fn() {
        console.log("选择目的地")
    }
    open var selectRoute = ::gen_selectRoute_fn
    open fun gen_selectRoute_fn() {
        console.log("选择路书")
    }
    open var switchTab = ::gen_switchTab_fn
    open fun gen_switchTab_fn(tab) {
        this.activeTab = tab
        console.log("切换到标签页:", tab)
        if (tab === "profile") {
            uni_switchTab(SwitchTabOptions(url = "/pages/index/my"))
        }
        if (tab === "discover") {
            uni_switchTab(SwitchTabOptions(url = "/pages/index/discover"))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to 10, "paddingRight" to 10, "paddingBottom" to 60, "paddingLeft" to 10, "backgroundColor" to "#f5f5f5")), "data-section" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "paddingTop" to 10, "paddingRight" to 10, "paddingBottom" to 10, "paddingLeft" to 10, "marginBottom" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.1)", "height" to 200)), "section-title" to _pS(_uM("fontSize" to 16, "fontWeight" to "bold", "marginBottom" to 5, "color" to "#333333")), "data-list" to _pS(_uM("backgroundColor" to "#f9f9f9", "borderTopLeftRadius" to 8, "borderTopRightRadius" to 8, "borderBottomRightRadius" to 8, "borderBottomLeftRadius" to 8, "overflow" to "hidden")), "data-list-item" to _pS(_uM("display" to "flex", "justifyContent" to "space-between", "paddingTop" to 8, "paddingRight" to 10, "paddingBottom" to 8, "paddingLeft" to 10, "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#eeeeee", "borderBottomWidth:last-child" to "medium", "borderBottomStyle:last-child" to "none", "borderBottomColor:last-child" to "#000000")), "data-list-label" to _pS(_uM("fontSize" to 14, "color" to "#666666")), "data-list-value" to _pS(_uM("fontSize" to 14, "fontWeight" to "bold", "color" to "#333333")), "map-section" to _pS(_uM("flex" to 1, "backgroundColor" to "#ffffff", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "paddingTop" to 15, "paddingRight" to 15, "paddingBottom" to 15, "paddingLeft" to 15, "marginBottom" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.1)", "display" to "flex", "flexDirection" to "column", "minHeight" to 250)), "map-container" to _pS(_uM("flex" to 1, "backgroundColor" to "#e0e0e0", "borderTopLeftRadius" to 5, "borderTopRightRadius" to 5, "borderBottomRightRadius" to 5, "borderBottomLeftRadius" to 5, "display" to "flex", "justifyContent" to "center", "alignItems" to "center")), "button-section" to _pS(_uM("height" to 200, "backgroundColor" to "#ffffff", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "paddingTop" to 15, "paddingRight" to 15, "paddingBottom" to 15, "paddingLeft" to 15, "marginBottom" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.1)")), "button-grid" to _pS(_uM("position" to "relative", "width" to "100%", "height" to "100%")), "button-corner" to _pS(_uM("position" to "absolute", "width" to 80, "height" to 80, "backgroundColor" to "#4CAF50", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "display" to "flex", "justifyContent" to "center", "alignItems" to "center")), "top-left" to _pS(_uM("top" to 0, "left" to 0)), "top-right" to _pS(_uM("top" to 0, "right" to 0)), "bottom-left" to _pS(_uM("bottom" to 0, "left" to 0)), "bottom-right" to _pS(_uM("bottom" to 0, "right" to 0)), "button-center" to _pS(_uM("position" to "absolute", "top" to "50%", "left" to "50%", "transform" to "translate(-50%, -50%)", "width" to 100, "height" to 100, "backgroundColor" to "#FF5722", "display" to "flex", "justifyContent" to "center", "alignItems" to "center", "boxShadow" to "0 4px 8px rgba(0,0,0,0.2)")), "button-text" to _pS(_uM("color" to "#FFFFFF", "fontSize" to 12, "textAlign" to "center")), "button-text-large" to _pS(_uM("color" to "#FFFFFF", "fontSize" to 16, "fontWeight" to "bold", "textAlign" to "center")), "free-ride" to _pS(_uM("backgroundColor" to "#FF5722")), "start-riding" to _pS(_uM("backgroundColor" to "#20e95cff")), "tab-bar" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "height" to 50, "backgroundColor" to "#ffffff", "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "boxShadow" to "0 -2px 5px rgba(0,0,0,0.1)", "zIndex" to 100)), "tab-item" to _uM("" to _uM("flex" to 1, "height" to "100%", "display" to "flex", "justifyContent" to "center", "alignItems" to "center", "textAlign" to "center"), ".active" to _uM("borderBottomWidth" to 2, "borderBottomStyle" to "solid", "borderBottomColor" to "#FF5722")), "tab-text" to _uM("" to _uM("fontSize" to 16, "color" to "#666666"), ".tab-item.active " to _uM("color" to "#FF5722", "fontWeight" to "bold")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
