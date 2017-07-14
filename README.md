#大拇哥官网展示

### 开发须知

#### 目录结构

```bash
src
├── components					// 放一些共有组件
│   ├── Footer
│   │   ├── index.js
│   │   └── index.less
│   ├── Header
│   ├── config					// 共有组件数据 json 源文件
│   │   ├── footer.json
│   │   └── header.json
│   └── index.js				// 导出入口
├── config
│   └── app.json				// 全局配置文件
├── index.html					// 项目入口 html
├── index.js					// 项目入口 js
├── mock						// 项目请求 mock 
├── router.js					// 路由入口文件
├── routes						// 路由下对应的组件
│   ├── app.js					// 根路由
│   ├── app.less		
│   ├── home					// home 路由下的相关组件
│   │   ├── Banner		
│   │   │   └── index.js
│   │   ├── index.js			// home 路由根组件
│   │   ├── index.less			
│   │   └── route.js			// home 路由绑定文件
│   ├── about						
│   ├── admin
│   ├── product
│   ├── sale
│   └── service
├── theme.js
├── themes						//less全局主题变量 
└── utils						//工具方法
```

#### 开发
+ 代码规范
	+ [standard](https://github.com/standard/standard/blob/master/docs/README-zhcn.md) 

+ 开发过程
	+ **路由** 已经将一级路由划分完成，开发者无特殊情况，只在 `src/routes/对应模块` 文件夹下开发，二级路由挂载参考 `src/routes/home/routes`。
	
	+ **组件** 组件开发配置化，将文本等写入 json 文件，方便修改及拓展。组件无状态时采用无状态写法，参考 [React 组件的创建](http://outxu.cn/note-react-01/)。
	
	+ **其他规范** 参考已完成的模块，不懂时多问下。
+ 代码仓库
	+ 代码托管 `百度效率云` 及 `gitlab`，效率云开发为单分支模式，不允许创建新分支，具体提交规范参考 [代码提交](http://wiki.hrsoft.net/docs/show/38)
	+ 提交时至少有一个小组件完成，不得随意提交，当确认稳定时提交，所有提交提醒 **徐嘉俊** 审核
	+ 练手开发者尽量不提交到效率云库，建议在 `gitlab` 上进行操作，没有权限找 **徐嘉俊**。 `gitlab` 库允许多分支，每个人创建自己的分支进行开发，开发完成并审核完成后再迁移到效率云，`gitlab` 代码库代码不保证为最新代码。
	+ 由于本项目是商业项目，不允许将代码放到 `github` 等开源 `git` 上
	 
#### 参考资料
+ 工具栈
	+ [dvajs](https://github.com/dvajs/dva)  
	+ [less](http://lesscss.cn/)
	+ [axios](https://github.com/mzabriskie/axios)
+ 参考网站
	+ [凯迪仕](http://www.kaadas.com/index.asp)

+ 开发UI库
	+ [antd](https://ant.design/docs/react/introduce-cn)
	+ [ant motion](https://motion.ant.design/)
+ 其他资料
	+ [wiki 资源](http://wiki.hrsoft.net/docs/show/206)  