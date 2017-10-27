参考阅读jQuery源码笔记。
自己动手实现的类似jQuery的DOM，BOM库。API功能保持和jQuery一致

###已经实现的方法

######DOM相关

- on
- click
- addClass
- removeClass
- text
- get
- siblings
- parent
- children
- end
- width
- height

#####BOM相关

- openAtCenter
- search
- hasPlugin
- hasIEPlugin
- hasFlash
- hasQuickTime




// 使用者输入代码
// $('.topic')
// $('.topic').children().width()
// $.bom.openAtCenter(url, width, height)
// https://www.google.com.hk/search?hl=zh-CN&q=mdn&gws_rd=ssl
// $.bom.search(hl) // zh-CN
// $.bom.search(hl，english) // ?hl=english
// $.bom.hasPlugins("Flash")  //true or false
// $.bom.hasFlash()  //true or false
// $.bom.hasQuickTime()  //true or false