const path = require('path')
module.exports = {
	title:'前端知识体系',
	description:'Just play',
	base:'happy',
	themeConfig:{
		sidebarDepth: 2,
		docsDir: 'docs',
		sidebar:[
			{
				title:'基础知识',
				path:'/base/',
				collapsable: false, // 可选的, 默认值是 true,
				children: [
					{
						title:'HTML',
						path:'/base/html/',
						collapsable: false,
						sidebarDepth: 1,
						children:[
							'/base/html/bom.md',
							'/base/html/dom.md',
							'/base/html/event.md',
							'/base/html/render.md',
							'/base/html/meta.md',
							'/base/html/link.md',
							'/base/html/canvas.md',
						]
					},
					{
						title:'CSS',
						path:'/base/css/',
						collapsable: false,
						sidebarDepth: 1,
						children:[
							'/base/css/selectors.md',
							'/base/css/layout.md',
							'/base/css/responsive.md',
							'/base/css/module.md',
						]
					},
					{
						title:'JS',
						path:'/base/js/',
						collapsable: false,
						sidebarDepth: 1,
						children:[
							'/base/js/base.md',
							'/base/js/action-scope.md',
							'/base/js/prototype.md',
							'/base/js/async.md',

						]
					}
				]
			},
			{
				title:'前端框架',
				path:'/framework/',
				collapsable: false, // 可选的, 默认值是 true,
				children: [
					{
						title:'VUE',
						path:'/framework/vue/',
						collapsable: false,
						sidebarDepth: 1,
						children:[
							'/framework/vue/theory.md',
						]
					},
				]
			}
		]
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@img': path.resolve(__dirname, '../images')
			}
		}
	}
}