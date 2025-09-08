import App from './App.uvue'

import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
export function main(app: IApp) {
    definePageRoutes();
    defineAppConfig();
    (createApp()['app'] as VueApp).mount(app, GenUniApp());
}

export class UniAppConfig extends io.dcloud.uniapp.appframe.AppConfig {
    override name: string = "RideNavi"
    override appid: string = "__UNI__7BB6FD0"
    override versionName: string = "1.0.0"
    override versionCode: string = "100"
    override uniCompilerVersion: string = "4.76"
    
    constructor() { super() }
}

import GenPagesIndexIndexClass from './pages/index/index.uvue'
import GenPagesIndexDiscoverClass from './pages/index/discover.uvue'
import GenPagesIndexMyClass from './pages/index/my.uvue'
function definePageRoutes() {
__uniRoutes.push({ path: "pages/index/index", component: GenPagesIndexIndexClass, meta: { isQuit: true } as UniPageMeta, style: _uM([["navigationBarTitleText","骑行"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/discover", component: GenPagesIndexDiscoverClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","发现"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/my", component: GenPagesIndexMyClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","我的"]]) } as UniPageRoute)
}
const __uniTabBar: Map<string, any | null> | null = _uM([["color","#7A7E83"],["selectedColor","#FF5722"],["borderStyle","black"],["backgroundColor","#ffffff"],["list",[_uM([["pagePath","pages/index/index"],["text","骑行"]]),_uM([["pagePath","pages/index/discover"],["text","发现"]]),_uM([["pagePath","pages/index/my"],["text","我的"]])]]])
const __uniLaunchPage: Map<string, any | null> = _uM([["url","pages/index/index"],["style",_uM([["navigationBarTitleText","骑行"]])]])
function defineAppConfig(){
  __uniConfig.entryPagePath = '/pages/index/index'
  __uniConfig.globalStyle = _uM([["navigationBarTextStyle","black"],["navigationBarTitleText","uni-app x"],["navigationBarBackgroundColor","#F8F8F8"],["backgroundColor","#F8F8F8"]])
  __uniConfig.getTabBarConfig = ():Map<string, any> | null =>  _uM([["color","#7A7E83"],["selectedColor","#FF5722"],["borderStyle","black"],["backgroundColor","#ffffff"],["list",[_uM([["pagePath","pages/index/index"],["text","骑行"]]),_uM([["pagePath","pages/index/discover"],["text","发现"]]),_uM([["pagePath","pages/index/my"],["text","我的"]])]]])
  __uniConfig.tabBar = __uniConfig.getTabBarConfig()
  __uniConfig.conditionUrl = ''
  __uniConfig.uniIdRouter = _uM()
  
  __uniConfig.ready = true
}
