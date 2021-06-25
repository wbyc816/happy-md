const path = require('path')
module.exports = {
	title:'前端知识体系',
	description:'Just play',
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
						]
					}
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