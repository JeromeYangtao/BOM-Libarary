// 自己实现的类似jQuery的DOM，BOM库
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


    array.on = function(eventType, fn) {
        for (let i = 0; i < array.length; i++) {
            array[i].addEventListener(eventType, fn)
        }
    }
    array.click = function(fn) {
        for (let i = 0; i < array.length; i++) {
            array[i].addEventListener('click', fn)
        }
    }

    array.addClass = function(className) {
        for (let i = 0; i < array.length; i++) {
            array[i].classList.add(className)
        }
        return array
    }
    array.removeClass = function(className) {
        for (let i = 0; i < array.length; i++) {
            array[i].classList.remove(className)
        }
        return array
    }

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

    array.get = function(index) {
        return array[index]
    }

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
    array.parent = function() {
        return array[0].parentElement
    }
    array.children = function() {
        return array[0].children
    }

    array.end = function() {
        return array.previousSelection
    }

    array.width = function(number) {
        if (number === undefined) {
            return array[0].offsetWidth

        } else if (typeof number === 'number') {
            for (let i = 0; i < array.length; i++) {
                array[i].style.width = `${number}px`
            }
        }
    }
    array.height = function(number) {
        if (number === undefined) {
            return array[0].offsetWidth

        } else if (typeof number === 'number') {
            for (let i = 0; i < array.length; i++) {
                array[i].style.height = `${number}px`
            }
        }
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
        // 检测插件
        name = name.toLowerCase
        for (let i = 0; i < navigator.plugins.length; i++) {
            if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
                return true
            }
        }
        return false
    }
}


// 使用者输入代码
// $('.topic')
// $('.topic').children().width()
// $.bom.openAtCenter(url, width, height)
// https://www.google.com.hk/search?hl=zh-CN&q=mdn&gws_rd=ssl
// $.bom.search(hl) // zh-CN
// $.bom.search(hl，english) // ?hl=english
// $.bom.hasPlugins("Flash")  //true or false