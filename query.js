/**
 * DOM,BOM库 
 * @datetime 2017-10-27
 * @author Thomson<yangtao135@foxmail.com>
 */

window.$ = function(selectorOrNode) {
    let array = []

    if (typeof selectorOrNode === 'string') {
        let items = document.querySelectorAll(selectorOrNode)
        for (let i = 0; i < items.length; i++) {
            array.push(items[i])
        }
    } else if (selectorOrNode instanceof Element) {
        array.push(selectorOrNode)
    } else if (selectorOrNode instanceof Array) {
        for (let i = 0; i < selectorOrNode.length; i++) {
            if (!(selectorOrNode[i] instanceof Element)) {
                continue
            }
            array.push(selectorOrNode[i])
        }
    }

    // 事件监听
    array.on = function(eventType, fn) {
        for (let i = 0; i < array.length; i++) {
            array[i].addEventListener(eventType, fn)
        }
    }

    // 点击事件
    array.click = function(fn) {
        for (let i = 0; i < array.length; i++) {
            array[i].addEventListener('click', fn)
        }
    }

    // 增加class
    array.addClass = function(className) {
        for (let i = 0; i < array.length; i++) {
            array[i].classList.add(className)
        }
        return array
    }

    // 去掉class
    array.removeClass = function(className) {
        for (let i = 0; i < array.length; i++) {
            array[i].classList.remove(className)
        }
        return array
    }

    // 获取或设置文本
    array.text = function(textContent) {
        if (textContent === undefined) {
            return array[0].innerHTML
        } else {
            for (let i = 0; i < array.length; i++) {
                array[i].innerHTML = textContent
            }
            return array
        }
    }

    // 获取第index个元素
    array.get = function(index) {
        return array[index]
    }

    // 获取同辈元素
    array.siblings = function() {
        let resultArray = []
        let children = array[0].parentElement.children
        for (let i = 0; i < children.length; i++) {
            if (children[i] != array[0]) {
                resultArray.push(children[i])
            }
        }
        let items = $(resultArray)
        items.previousSelection = array
        return items
    }

    // 获取parent元素
    array.parent = function() {
        return array[0].parentElement
    }

    // 获取children元素
    array.children = function() {
        return array[0].children
    }

    // 返回最开始选择的元素
    array.end = function() {
        return array.previousSelection
    }

    // 获取或设置元素宽度
    array.width = function(number) {
        if (number === undefined) {
            return array[0].offsetWidth

        } else if (typeof number === 'number') {
            for (let i = 0; i < array.length; i++) {
                array[i].style.width = `${number}px`
            }
        }
    }

    // 获取或设置元素高度
    array.height = function(number) {
        if (number === undefined) {
            return array[0].offsetWidth

        } else if (typeof number === 'number') {
            for (let i = 0; i < array.length; i++) {
                array[i].style.height = `${number}px`
            }
        }
    }

    //动态加载脚本
    array.loadScript = function(url) {
        let script = document.createElement("script")
        script.type = "text/javascript"
        script.src = url
        document.body.appendChild(script)
    }

    return array
}

$.bom = {
    openAtCenter: function(url, width, height) {
        window.open(url, '_blank', `
        width=${width}px,
        height=${height}px,
        left=${screen.width/2-width/2}px,
        top=${screen.height/2 - height/2}px`)
    },
    search: function(name, value) {
        // 找到所有查询字符串，并以键值对的形式保存
        let searshAll = function() {
            let result = []

            // 去掉'?'
            let search = window.location.search ? location.search.substring(1) : ''

            // 在&处分割成数组
            let searchArray = search.length ? search.split('&') : []

            // 把=改成键值对的形式
            for (let i = 0; i < searchArray.length; i++) {
                let parts = searchArray[i].split('=')

                // 防止中文出现乱码
                let key = decodeURIComponent(parts[0])
                let value = decodeURIComponent(parts[1]) || ''
                result[key] = value
            }
            return result
        }

        // 如果传入参数且参数不存在，就新增查询参数
        let result = searshAll()
        if (value === undefined) {
            return result[name]
        } else {
            if (result[name] === undefined) {
                // 如果查询字符串原来不存在，则新增
                window.location.search += `&${decodeURIComponent(name)}=${decodeURIComponent(value)}`
            } else {
                // 如果原来存在，则修改
                result[name] = encodeURIComponent(value)
                let newSearch = '?'
                for (let key in result) {
                    newSearch += `${decodeURIComponent(key)}=${decodeURIComponent(result[key])}&`
                }
                window.location.search = newSearch
            }
        }
    },
    hasPlugin: function(name) {
        // 检测插件是否存在
        name = name.toLowerCase
        for (let i = 0; i < navigator.plugins.length; i++) {
            if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
                return true
            }
        }
        return false
    },
    hasIEPlugin(name) {
        // 检测IE的插件
        try {
            new ActiveXObject(name)
            return true
        } catch (ex) {
            return false
        }
    },
    hasFlash() {
        检测是否存在Flash
        let result = this.hasPlugin("Flash")
        if (!result) {
            result = this.hasIEPlugin("ShockwaveFlash.ShockwaveFlash")
        }
        return result
    },
    hasQuickTime() {
        检测是否存在QuickTime
        let result = this.hasPlugin("QuickTime")
        if (!result) {
            result = this.hasIEPlugin("QuickTime.QuickTime")
        }
        return result
    }
}