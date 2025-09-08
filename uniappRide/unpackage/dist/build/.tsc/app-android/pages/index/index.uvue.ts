
	const __sfc__ = defineComponent({
		data() {
			return {
				// 数据展示
				totalDistance: 0,
				maxSpeed: 0,
				maxTime: 0,
				// 当前选中的标签页
				activeTab: 'riding'
			}
		},
		onLoad() {
			// 页面加载时初始化数据
			this.initData();
		},
		methods: {
			// 初始化数据
			initData() {
				// 这里可以从本地存储或服务器获取数据
				this.totalDistance = 128.5;
				this.maxSpeed = 35.2;
				this.maxTime = 4.5;
			},
			
			// 按钮点击事件
			startRiding() {
				console.log('开始骑行');
				// 实现开始骑行的逻辑
			},
			freeRide() {
				console.log('自由骑模式');
				// 实现自由骑模式的逻辑
			},
			sameAsLast() {
				console.log('上次一样');
				// 实现与上次相同的逻辑
			},
			selectDestination() {
				console.log('选择目的地');
				// 实现选择目的地的逻辑
			},
			selectRoute() {
				console.log('选择路书');
				// 实现选择路书的逻辑
			},
			
			// 切换标签页
			switchTab(tab) {
				this.activeTab = tab;
				console.log('切换到标签页:', tab);
				if(tab === 'profile') {
					// 跳转到我的页面
					uni.switchTab({
						url: '/pages/index/my'
					});
				}
				if(tab === 'discover') {
					// 跳转到我的页面
					uni.switchTab({
						url: '/pages/index/discover'
					});
				}
			}
		}
	})

export default __sfc__
function GenPagesIndexIndexRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "data-section" }), [
      _cE("text", _uM({ class: "section-title" }), "我的数据"),
      _cE("view", _uM({ class: "data-list" }), [
        _cE("view", _uM({ class: "data-list-item" }), [
          _cE("text", _uM({ class: "data-list-label" }), "总里程"),
          _cE("text", _uM({ class: "data-list-value" }), _tD(_ctx.totalDistance) + " km", 1 /* TEXT */)
        ]),
        _cE("view", _uM({ class: "data-list-item" }), [
          _cE("text", _uM({ class: "data-list-label" }), "最快速度"),
          _cE("text", _uM({ class: "data-list-value" }), _tD(_ctx.maxSpeed) + " km/h", 1 /* TEXT */)
        ]),
        _cE("view", _uM({ class: "data-list-item" }), [
          _cE("text", _uM({ class: "data-list-label" }), "最长时间"),
          _cE("text", _uM({ class: "data-list-value" }), _tD(_ctx.maxTime) + " h", 1 /* TEXT */)
        ])
      ])
    ]),
    _cE("view", _uM({ class: "map-section" }), [
      _cE("text", _uM({ class: "section-title" }), "地图区域"),
      _cE("view", _uM({ class: "map-container" }), [
        _cE("text", null, "地图加载中...")
      ])
    ]),
    _cE("view", _uM({ class: "button-section" }), [
      _cE("view", _uM({ class: "button-grid" }), [
        _cE("view", _uM({
          class: "button-corner top-left free-ride",
          onClick: _ctx.freeRide
        }), [
          _cE("text", _uM({ class: "button-text" }), "自由骑")
        ], 8 /* PROPS */, ["onClick"]),
        _cE("view", _uM({
          class: "button-corner top-right",
          onClick: _ctx.sameAsLast
        }), [
          _cE("text", _uM({ class: "button-text" }), "上次一样")
        ], 8 /* PROPS */, ["onClick"]),
        _cE("view", _uM({
          class: "button-center start-riding",
          onClick: _ctx.startRiding
        }), [
          _cE("text", _uM({ class: "button-text-large" }), "开始骑行")
        ], 8 /* PROPS */, ["onClick"]),
        _cE("view", _uM({
          class: "button-corner bottom-left",
          onClick: _ctx.selectDestination
        }), [
          _cE("text", _uM({ class: "button-text" }), "选择目的地")
        ], 8 /* PROPS */, ["onClick"]),
        _cE("view", _uM({
          class: "button-corner bottom-right",
          onClick: _ctx.selectRoute
        }), [
          _cE("text", _uM({ class: "button-text" }), "选择路书")
        ], 8 /* PROPS */, ["onClick"])
      ])
    ]),
    _cE("view", _uM({ class: "tab-bar" }), [
      _cE("view", _uM({
        class: _nC(["tab-item", _uM({ active: _ctx.activeTab === 'riding' })]),
        onClick: () => {_ctx.switchTab('riding')}
      }), [
        _cE("text", _uM({ class: "tab-text" }), "骑行")
      ], 10 /* CLASS, PROPS */, ["onClick"]),
      _cE("view", _uM({
        class: _nC(["tab-item", _uM({ active: _ctx.activeTab === 'discover' })]),
        onClick: () => {_ctx.switchTab('discover')}
      }), [
        _cE("text", _uM({ class: "tab-text" }), "发现")
      ], 10 /* CLASS, PROPS */, ["onClick"]),
      _cE("view", _uM({
        class: _nC(["tab-item", _uM({ active: _ctx.activeTab === 'profile' })]),
        onClick: () => {_ctx.switchTab('profile')}
      }), [
        _cE("text", _uM({ class: "tab-text" }), "我的")
      ], 10 /* CLASS, PROPS */, ["onClick"])
    ])
  ])
}
const GenPagesIndexIndexStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["paddingTop", 10], ["paddingRight", 10], ["paddingBottom", 60], ["paddingLeft", 10], ["backgroundColor", "#f5f5f5"]]))], ["data-section", _pS(_uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", 10], ["borderTopRightRadius", 10], ["borderBottomRightRadius", 10], ["borderBottomLeftRadius", 10], ["paddingTop", 10], ["paddingRight", 10], ["paddingBottom", 10], ["paddingLeft", 10], ["marginBottom", 10], ["boxShadow", "0 2px 5px rgba(0,0,0,0.1)"], ["height", 200]]))], ["section-title", _pS(_uM([["fontSize", 16], ["fontWeight", "bold"], ["marginBottom", 5], ["color", "#333333"]]))], ["data-list", _pS(_uM([["backgroundColor", "#f9f9f9"], ["borderTopLeftRadius", 8], ["borderTopRightRadius", 8], ["borderBottomRightRadius", 8], ["borderBottomLeftRadius", 8], ["overflow", "hidden"]]))], ["data-list-item", _pS(_uM([["display", "flex"], ["justifyContent", "space-between"], ["paddingTop", 8], ["paddingRight", 10], ["paddingBottom", 8], ["paddingLeft", 10], ["borderBottomWidth", 1], ["borderBottomStyle", "solid"], ["borderBottomColor", "#eeeeee"], ["borderBottomWidth:last-child", "medium"], ["borderBottomStyle:last-child", "none"], ["borderBottomColor:last-child", "#000000"]]))], ["data-list-label", _pS(_uM([["fontSize", 14], ["color", "#666666"]]))], ["data-list-value", _pS(_uM([["fontSize", 14], ["fontWeight", "bold"], ["color", "#333333"]]))], ["map-section", _pS(_uM([["flex", 1], ["backgroundColor", "#ffffff"], ["borderTopLeftRadius", 10], ["borderTopRightRadius", 10], ["borderBottomRightRadius", 10], ["borderBottomLeftRadius", 10], ["paddingTop", 15], ["paddingRight", 15], ["paddingBottom", 15], ["paddingLeft", 15], ["marginBottom", 10], ["boxShadow", "0 2px 5px rgba(0,0,0,0.1)"], ["display", "flex"], ["flexDirection", "column"], ["minHeight", 250]]))], ["map-container", _pS(_uM([["flex", 1], ["backgroundColor", "#e0e0e0"], ["borderTopLeftRadius", 5], ["borderTopRightRadius", 5], ["borderBottomRightRadius", 5], ["borderBottomLeftRadius", 5], ["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"]]))], ["button-section", _pS(_uM([["height", 200], ["backgroundColor", "#ffffff"], ["borderTopLeftRadius", 10], ["borderTopRightRadius", 10], ["borderBottomRightRadius", 10], ["borderBottomLeftRadius", 10], ["paddingTop", 15], ["paddingRight", 15], ["paddingBottom", 15], ["paddingLeft", 15], ["marginBottom", 10], ["boxShadow", "0 2px 5px rgba(0,0,0,0.1)"]]))], ["button-grid", _pS(_uM([["position", "relative"], ["width", "100%"], ["height", "100%"]]))], ["button-corner", _pS(_uM([["position", "absolute"], ["width", 80], ["height", 80], ["backgroundColor", "#4CAF50"], ["borderTopLeftRadius", 10], ["borderTopRightRadius", 10], ["borderBottomRightRadius", 10], ["borderBottomLeftRadius", 10], ["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"]]))], ["top-left", _pS(_uM([["top", 0], ["left", 0]]))], ["top-right", _pS(_uM([["top", 0], ["right", 0]]))], ["bottom-left", _pS(_uM([["bottom", 0], ["left", 0]]))], ["bottom-right", _pS(_uM([["bottom", 0], ["right", 0]]))], ["button-center", _pS(_uM([["position", "absolute"], ["top", "50%"], ["left", "50%"], ["transform", "translate(-50%, -50%)"], ["width", 100], ["height", 100], ["backgroundColor", "#FF5722"], ["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"], ["boxShadow", "0 4px 8px rgba(0,0,0,0.2)"]]))], ["button-text", _pS(_uM([["color", "#FFFFFF"], ["fontSize", 12], ["textAlign", "center"]]))], ["button-text-large", _pS(_uM([["color", "#FFFFFF"], ["fontSize", 16], ["fontWeight", "bold"], ["textAlign", "center"]]))], ["free-ride", _pS(_uM([["backgroundColor", "#FF5722"]]))], ["start-riding", _pS(_uM([["backgroundColor", "#20e95cff"]]))], ["tab-bar", _pS(_uM([["position", "fixed"], ["bottom", 0], ["left", 0], ["right", 0], ["height", 50], ["backgroundColor", "#ffffff"], ["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["boxShadow", "0 -2px 5px rgba(0,0,0,0.1)"], ["zIndex", 100]]))], ["tab-item", _uM([["", _uM([["flex", 1], ["height", "100%"], ["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"], ["textAlign", "center"]])], [".active", _uM([["borderBottomWidth", 2], ["borderBottomStyle", "solid"], ["borderBottomColor", "#FF5722"]])]])], ["tab-text", _uM([["", _uM([["fontSize", 16], ["color", "#666666"]])], [".tab-item.active ", _uM([["color", "#FF5722"], ["fontWeight", "bold"]])]])]])]
