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
import io.dcloud.uniapp.extapi.exit as uni_exit
import io.dcloud.uniapp.extapi.showToast as uni_showToast
val runBlock1 = run {
    __uniConfig.getAppStyles = fun(): Map<String, Map<String, Map<String, Any>>> {
        return GenApp.styles
    }
}
var firstBackTime: Number = 0
open class GenApp : BaseApp {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onLaunch(fun(_: OnLaunchOptions) {
            console.log("App Launch")
        }
        , __ins)
        onAppShow(fun(_: OnShowOptions) {
            console.log("App Show")
        }
        , __ins)
        onAppHide(fun() {
            console.log("App Hide")
        }
        , __ins)
        onLastPageBackPress(fun() {
            console.log("App LastPageBackPress")
            if (firstBackTime == 0) {
                uni_showToast(ShowToastOptions(title = "再按一次退出应用", position = "bottom"))
                firstBackTime = Date.now()
                setTimeout(fun(){
                    firstBackTime = 0
                }, 2000)
            } else if (Date.now() - firstBackTime < 2000) {
                firstBackTime = Date.now()
                uni_exit(null)
            }
        }
        , __ins)
        onExit(fun() {
            console.log("App Exit")
        }
        , __ins)
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("uni-row" to _pS(_uM("flexDirection" to "row")), "uni-column" to _pS(_uM("flexDirection" to "column")))
            }
    }
}
val GenAppClass = CreateVueAppComponent(GenApp::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "app", name = "", inheritAttrs = true, inject = Map(), props = Map(), propsNeedCastKeys = _uA(), emits = Map(), components = Map(), styles = GenApp.styles)
}
, fun(instance): GenApp {
    return GenApp(instance)
}
)
val GenPagesIndexIndexClass = CreateVueComponent(GenPagesIndexIndex::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexIndex.inheritAttrs, inject = GenPagesIndexIndex.inject, props = GenPagesIndexIndex.props, propsNeedCastKeys = GenPagesIndexIndex.propsNeedCastKeys, emits = GenPagesIndexIndex.emits, components = GenPagesIndexIndex.components, styles = GenPagesIndexIndex.styles)
}
, fun(instance, renderer): GenPagesIndexIndex {
    return GenPagesIndexIndex(instance, renderer)
}
)
val GenPagesIndexDiscoverClass = CreateVueComponent(GenPagesIndexDiscover::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexDiscover.inheritAttrs, inject = GenPagesIndexDiscover.inject, props = GenPagesIndexDiscover.props, propsNeedCastKeys = GenPagesIndexDiscover.propsNeedCastKeys, emits = GenPagesIndexDiscover.emits, components = GenPagesIndexDiscover.components, styles = GenPagesIndexDiscover.styles)
}
, fun(instance, renderer): GenPagesIndexDiscover {
    return GenPagesIndexDiscover(instance, renderer)
}
)
val GenPagesIndexMyClass = CreateVueComponent(GenPagesIndexMy::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexMy.inheritAttrs, inject = GenPagesIndexMy.inject, props = GenPagesIndexMy.props, propsNeedCastKeys = GenPagesIndexMy.propsNeedCastKeys, emits = GenPagesIndexMy.emits, components = GenPagesIndexMy.components, styles = GenPagesIndexMy.styles)
}
, fun(instance, renderer): GenPagesIndexMy {
    return GenPagesIndexMy(instance, renderer)
}
)
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass)
    return _uO("app" to app)
}
fun main(app: IApp) {
    definePageRoutes()
    defineAppConfig()
    (createApp()["app"] as VueApp).mount(app, GenUniApp())
}
open class UniAppConfig : io.dcloud.uniapp.appframe.AppConfig {
    override var name: String = "RideNavi"
    override var appid: String = "__UNI__7BB6FD0"
    override var versionName: String = "1.0.0"
    override var versionCode: String = "100"
    override var uniCompilerVersion: String = "4.76"
    constructor() : super() {}
}
fun definePageRoutes() {
    __uniRoutes.push(UniPageRoute(path = "pages/index/index", component = GenPagesIndexIndexClass, meta = UniPageMeta(isQuit = true), style = _uM("navigationBarTitleText" to "骑行")))
    __uniRoutes.push(UniPageRoute(path = "pages/index/discover", component = GenPagesIndexDiscoverClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "发现")))
    __uniRoutes.push(UniPageRoute(path = "pages/index/my", component = GenPagesIndexMyClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "我的")))
}
val __uniTabBar: Map<String, Any?>? = _uM("color" to "#7A7E83", "selectedColor" to "#FF5722", "borderStyle" to "black", "backgroundColor" to "#ffffff", "list" to _uA(
    _uM("pagePath" to "pages/index/index", "text" to "骑行"),
    _uM("pagePath" to "pages/index/discover", "text" to "发现"),
    _uM("pagePath" to "pages/index/my", "text" to "我的")
))
val __uniLaunchPage: Map<String, Any?> = _uM("url" to "pages/index/index", "style" to _uM("navigationBarTitleText" to "骑行"))
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/index/index"
    __uniConfig.globalStyle = _uM("navigationBarTextStyle" to "black", "navigationBarTitleText" to "uni-app x", "navigationBarBackgroundColor" to "#F8F8F8", "backgroundColor" to "#F8F8F8")
    __uniConfig.getTabBarConfig = fun(): Map<String, Any>? {
        return _uM("color" to "#7A7E83", "selectedColor" to "#FF5722", "borderStyle" to "black", "backgroundColor" to "#ffffff", "list" to _uA(
            _uM("pagePath" to "pages/index/index", "text" to "骑行"),
            _uM("pagePath" to "pages/index/discover", "text" to "发现"),
            _uM("pagePath" to "pages/index/my", "text" to "我的")
        ))
    }
    __uniConfig.tabBar = __uniConfig.getTabBarConfig()
    __uniConfig.conditionUrl = ""
    __uniConfig.uniIdRouter = _uM()
    __uniConfig.ready = true
}
open class GenUniApp : UniAppImpl() {
    open val vm: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
    open val `$vm`: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
}
fun getApp(): GenUniApp {
    return getUniApp() as GenUniApp
}
