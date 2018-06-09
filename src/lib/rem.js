// 设置rem标准
function toRem (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth
            if (!clientWidth) return

            //这里是假设在640px宽度设计稿的情况下，1rem = 20px
            window.fontSize = 100 * (clientWidth / 640)
            docEl.style.fontSize = window.fontSize + 'px'
        }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
}
toRem(document, window)
