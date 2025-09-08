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
import io.dcloud.uniapp.extapi.previewImage as uni_previewImage
import io.dcloud.uniapp.extapi.switchTab as uni_switchTab
open class GenPagesIndexDiscover : BasePage {
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
            _cE("view", _uM("class" to "banner-section"), _uA(
                _cE("swiper", _uM("class" to "banner-swiper", "indicator-dots" to "", "autoplay" to "", "circular" to ""), _uA(
                    _cE(Fragment, null, RenderHelpers.renderList(_ctx.bannerList, fun(item, index, __index, _cached): Any {
                        return _cE("swiper-item", _uM("key" to index), _uA(
                            _cE("image", _uM("class" to "banner-image", "src" to item.image, "mode" to "aspectFill"), null, 8, _uA(
                                "src"
                            ))
                        ))
                    }
                    ), 128)
                ))
            )),
            _cE("view", _uM("class" to "function-section"), _uA(
                _cE("view", _uM("class" to "function-row"), _uA(
                    _cE("view", _uM("class" to "function-item", "onClick" to fun(){
                        _ctx.navigateTo("ranking")
                    }
                    ), _uA(
                        _cE("image", _uM("class" to "function-icon", "src" to "/static/icons/ranking.png")),
                        _cE("text", _uM("class" to "function-text"), "好物排行")
                    ), 8, _uA(
                        "onClick"
                    )),
                    _cE("view", _uM("class" to "function-item", "onClick" to fun(){
                        _ctx.navigateTo("making")
                    }
                    ), _uA(
                        _cE("image", _uM("class" to "function-icon", "src" to "/static/icons/making.png")),
                        _cE("text", _uM("class" to "function-text"), "美图制作")
                    ), 8, _uA(
                        "onClick"
                    )),
                    _cE("view", _uM("class" to "function-item", "onClick" to fun(){
                        _ctx.navigateTo("tutorial")
                    }
                    ), _uA(
                        _cE("image", _uM("class" to "function-icon", "src" to "/static/icons/tutorial.png")),
                        _cE("text", _uM("class" to "function-text"), "教程分享")
                    ), 8, _uA(
                        "onClick"
                    ))
                )),
                _cE("view", _uM("class" to "function-row"), _uA(
                    _cE("view", _uM("class" to "function-item", "onClick" to fun(){
                        _ctx.navigateTo("local")
                    }
                    ), _uA(
                        _cE("image", _uM("class" to "function-icon", "src" to "/static/icons/local.png")),
                        _cE("text", _uM("class" to "function-text"), "本地排行")
                    ), 8, _uA(
                        "onClick"
                    )),
                    _cE("view", _uM("class" to "function-item", "onClick" to fun(){
                        _ctx.navigateTo("find-route")
                    }
                    ), _uA(
                        _cE("image", _uM("class" to "function-icon", "src" to "/static/icons/find-route.png")),
                        _cE("text", _uM("class" to "function-text"), "路书查找")
                    ), 8, _uA(
                        "onClick"
                    )),
                    _cE("view", _uM("class" to "function-item", "onClick" to fun(){
                        _ctx.navigateTo("make-route")
                    }
                    ), _uA(
                        _cE("image", _uM("class" to "function-icon", "src" to "/static/icons/make-route.png")),
                        _cE("text", _uM("class" to "function-text"), "路书制作")
                    ), 8, _uA(
                        "onClick"
                    ))
                ))
            )),
            _cE("view", _uM("class" to "interaction-section"), _uA(
                _cE("text", _uM("class" to "section-title"), "互动区域"),
                _cE("view", _uM("class" to "interaction-list"), _uA(
                    _cE(Fragment, null, RenderHelpers.renderList(_ctx.interactionList, fun(item, index, __index, _cached): Any {
                        return _cE("view", _uM("class" to "interaction-item", "key" to index), _uA(
                            _cE("view", _uM("class" to "user-info"), _uA(
                                _cE("image", _uM("class" to "user-avatar", "src" to item.avatar), null, 8, _uA(
                                    "src"
                                )),
                                _cE("text", _uM("class" to "user-name"), _tD(item.name), 1)
                            )),
                            _cE("text", _uM("class" to "interaction-content"), _tD(item.content), 1),
                            if (isTrue(item.images && item.images.length > 0)) {
                                _cE("view", _uM("key" to 0, "class" to "interaction-images"), _uA(
                                    _cE(Fragment, null, RenderHelpers.renderList(item.images, fun(img, imgIndex, __index, _cached): Any {
                                        return _cE("image", _uM("class" to "interaction-image", "key" to imgIndex, "src" to img, "mode" to "aspectFill", "onClick" to fun(){
                                            _ctx.previewImage(item.images, imgIndex)
                                        }), null, 8, _uA(
                                            "src",
                                            "onClick"
                                        ))
                                    }), 128)
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            _cE("view", _uM("class" to "interaction-footer"), _uA(
                                _cE("text", _uM("class" to "interaction-time"), _tD(item.time), 1),
                                _cE("view", _uM("class" to "interaction-actions"), _uA(
                                    _cE("view", _uM("class" to "action-item", "onClick" to fun(){
                                        _ctx.likeItem(index)
                                    }
                                    ), _uA(
                                        _cE("text", _uM("class" to _nC(_uA(
                                            "action-icon",
                                            _uM("liked" to item.liked)
                                        ))), "❤️", 2),
                                        _cE("text", _uM("class" to "action-count"), _tD(item.likes), 1)
                                    ), 8, _uA(
                                        "onClick"
                                    )),
                                    _cE("view", _uM("class" to "action-item", "onClick" to fun(){
                                        _ctx.commentItem(index)
                                    }
                                    ), _uA(
                                        _cE("text", _uM("class" to "action-icon"), "💬"),
                                        _cE("text", _uM("class" to "action-count"), _tD(item.comments), 1)
                                    ), 8, _uA(
                                        "onClick"
                                    ))
                                ))
                            ))
                        ))
                    }
                    ), 128)
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
    open var bannerList: UTSArray<UTSJSONObject> by `$data`
    open var interactionList: UTSArray<UTSJSONObject> by `$data`
    open var activeTab: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("bannerList" to _uA(
            object : UTSJSONObject() {
                var image = "/static/banner/banner1.jpg"
            },
            object : UTSJSONObject() {
                var image = "/static/banner/banner2.jpg"
            },
            object : UTSJSONObject() {
                var image = "/static/banner/banner3.jpg"
            }
        ), "interactionList" to _uA(
            object : UTSJSONObject() {
                var avatar = "/static/avatars/user1.jpg"
                var name = "骑行达人"
                var content = "今天骑行了30公里，风景太美了！分享给大家看看。"
                var images = _uA(
                    "/static/images/ride1.jpg",
                    "/static/images/ride2.jpg"
                )
                var time = "2小时前"
                var likes: Number = 24
                var comments: Number = 8
                var liked = false
            },
            object : UTSJSONObject() {
                var avatar = "/static/avatars/user2.jpg"
                var name = "山地车爱好者"
                var content = "发现了一条超棒的山地骑行路线，难度适中，风景优美，推荐给大家！"
                var images = _uA(
                    "/static/images/mountain1.jpg"
                )
                var time = "5小时前"
                var likes: Number = 56
                var comments: Number = 12
                var liked = true
            }
        ), "activeTab" to "discover")
    }
    open var initData = ::gen_initData_fn
    open fun gen_initData_fn() {
        console.log("发现页面数据初始化", " at pages/index/discover.uvue:146")
    }
    open var navigateTo = ::gen_navigateTo_fn
    open fun gen_navigateTo_fn(page) {
        console.log("导航到页面:", page, " at pages/index/discover.uvue:151")
    }
    open var likeItem = ::gen_likeItem_fn
    open fun gen_likeItem_fn(index) {
        this.interactionList[index].liked = !this.interactionList[index].liked
        if (this.interactionList[index].liked) {
            this.interactionList[index].likes++
        } else {
            this.interactionList[index].likes--
        }
    }
    open var commentItem = ::gen_commentItem_fn
    open fun gen_commentItem_fn(index) {
        console.log("评论内容:", index, " at pages/index/discover.uvue:167")
    }
    open var previewImage = ::gen_previewImage_fn
    open fun gen_previewImage_fn(images, current) {
        uni_previewImage(PreviewImageOptions(urls = images, current = current))
    }
    open var switchTab = ::gen_switchTab_fn
    open fun gen_switchTab_fn(tab) {
        this.activeTab = tab
        console.log("切换到标签页:", tab, " at pages/index/discover.uvue:182")
        if (tab === "riding") {
            uni_switchTab(SwitchTabOptions(url = "/pages/index/index"))
        } else if (tab === "profile") {
            uni_switchTab(SwitchTabOptions(url = "/pages/index/my"))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to 10, "paddingRight" to 10, "paddingBottom" to 60, "paddingLeft" to 10, "backgroundColor" to "#f5f5f5ff")), "banner-section" to _pS(_uM("height" to 80, "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "overflow" to "hidden", "marginBottom" to 10)), "banner-swiper" to _pS(_uM("width" to "100%", "height" to "100%")), "banner-image" to _pS(_uM("width" to "100%", "height" to "100%")), "function-section" to _pS(_uM("backgroundColor" to "#bcc4d6ff", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "paddingTop" to 10, "paddingRight" to 10, "paddingBottom" to 10, "paddingLeft" to 10, "marginBottom" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.1)", "height" to 130, "overflow" to "visible")), "function-row" to _pS(_uM("display" to "flex", "flex" to 1, "flexDirection" to "row", "justifyContent" to "space-between", "marginBottom" to 10, "width" to "100%", "height" to 50, "position" to "relative", "flexWrap" to "nowrap", "marginBottom:last-child" to 0)), "function-item" to _pS(_uM("flex" to "0 0 auto", "display" to "flex", "alignItems" to "center", "paddingTop" to 5, "paddingRight" to 0, "paddingBottom" to 5, "paddingLeft" to 0, "boxSizing" to "border-box", "backgroundColor" to "#f1f2f5ff", "borderTopLeftRadius" to 5, "borderTopRightRadius" to 5, "borderBottomRightRadius" to 5, "borderBottomLeftRadius" to 5, "justifyContent" to "center", "height" to "100%", "position" to "relative", "zIndex" to 1, "overflow" to "visible", "backgroundColor:active" to "#f5f5f5")), "function-icon" to _pS(_uM("width" to 20, "height" to 20, "marginBottom" to 5)), "function-text" to _pS(_uM("fontSize" to 12, "color" to "#333333", "whiteSpace" to "nowrap", "overflow" to "hidden", "textOverflow" to "ellipsis", "textAlign" to "center")), "interaction-section" to _pS(_uM("flex" to 1, "backgroundColor" to "#ffffff", "borderTopLeftRadius" to 10, "borderTopRightRadius" to 10, "borderBottomRightRadius" to 10, "borderBottomLeftRadius" to 10, "paddingTop" to 15, "paddingRight" to 15, "paddingBottom" to 15, "paddingLeft" to 15, "marginBottom" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.1)", "display" to "flex", "flexDirection" to "column")), "section-title" to _pS(_uM("fontSize" to 18, "fontWeight" to "bold", "marginBottom" to 10, "color" to "#333333")), "interaction-list" to _pS(_uM("flex" to 1, "overflowY" to "auto")), "interaction-item" to _pS(_uM("paddingTop" to 15, "paddingRight" to 0, "paddingBottom" to 15, "paddingLeft" to 0, "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#eeeeee", "borderBottomWidth:last-child" to "medium", "borderBottomStyle:last-child" to "none", "borderBottomColor:last-child" to "#000000")), "user-info" to _pS(_uM("display" to "flex", "alignItems" to "center", "marginBottom" to 10)), "user-avatar" to _pS(_uM("width" to 40, "height" to 40, "marginRight" to 10)), "user-name" to _pS(_uM("fontSize" to 16, "fontWeight" to "bold", "color" to "#333333")), "interaction-content" to _pS(_uM("fontSize" to 16, "color" to "#333333", "marginBottom" to 10, "lineHeight" to 1.5)), "interaction-images" to _pS(_uM("display" to "flex", "flexWrap" to "wrap", "marginBottom" to 10)), "interaction-image" to _pS(_uM("width" to 100, "height" to 100, "marginRight" to 5, "marginBottom" to 5, "borderTopLeftRadius" to 5, "borderTopRightRadius" to 5, "borderBottomRightRadius" to 5, "borderBottomLeftRadius" to 5)), "interaction-footer" to _pS(_uM("display" to "flex", "justifyContent" to "space-between", "alignItems" to "center")), "interaction-time" to _pS(_uM("fontSize" to 12, "color" to "#999999")), "interaction-actions" to _pS(_uM("display" to "flex")), "action-item" to _pS(_uM("display" to "flex", "alignItems" to "center", "marginLeft" to 15)), "action-icon" to _uM("" to _uM("fontSize" to 16, "marginRight" to 5), ".liked" to _uM("color" to "#FF5722")), "action-count" to _pS(_uM("fontSize" to 12, "color" to "#666666")), "tab-bar" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "height" to 50, "backgroundColor" to "#ffffff", "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "boxShadow" to "0 -2px 5px rgba(0,0,0,0.1)", "zIndex" to 100)), "tab-item" to _uM("" to _uM("flex" to 1, "height" to "100%", "display" to "flex", "justifyContent" to "center", "alignItems" to "center", "textAlign" to "center"), ".active" to _uM("borderBottomWidth" to 2, "borderBottomStyle" to "solid", "borderBottomColor" to "#FF5722")), "tab-text" to _uM("" to _uM("fontSize" to 16, "color" to "#666666"), ".tab-item.active " to _uM("color" to "#FF5722", "fontWeight" to "bold")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
