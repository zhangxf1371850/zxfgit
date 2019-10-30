var container = document.querySelector('#container'); // 获取指定元素对象
var box = document.querySelector('#box'); // 获取目标元素对象

// 声明 2 个变量用来保存鼠标初始位置的 x,y坐标
var startX = 0;
var startY = 0;

// 声明 2 个变量用来保存目标元素初始位置的 x，y坐标
var sourceX = 0;
var sourceY = 0;

box.addEventListener("mousedown", start, false);
function start(event) {

    box.style.cursor = "crosshair";
    //获取鼠标的初始位置
    startX = event.pageX;
    startY = event.pageY;

    //获取目标元素的初始位置
    var curPos = getTargetPos(box);
    sourceX = curPos.x;
    sourceY = curPos.y;

    // 绑定
    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', end, false);
}


function move(event) {

    //获取鼠标的当前位置
    var currentX = event.pageX;
    var currentY = event.pageY;

    // 计算差值
    var disX = currentX - startX;
    var disY = currentY - startY;

    //目标元素的移动位置
    var moveX = sourceX + disX;
    var moveY = sourceY + disY;

    //父子元素的宽度高度之间的差值
    var disW = container.offsetWidth - box.offsetWidth;
    var disH = container.offsetHeight - box.offsetHeight;
    if (moveX < 0) {
        moveX = 0;
    }

    if (moveY < 0) {
        moveY = 0;
    }

    if (disW < moveX) {
        moveX = disW;
    }
    if (disH < moveY) {
        moveY = disH;
    }
    //计算并设置元素当前位置
    setTargetPos(box, {
        x: moveX.toFixed(),
        y: moveY.toFixed()
    })
    //console.log(disX)
}

function end() {
    box.style.cursor = "default";
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
}

function getTargetPos(elem) {
    var pos = { x: 0, y: 0 };
    var x = parseInt(getStyle(elem, 'left') ? getStyle(elem, 'left') : 0);
    var y = parseInt(getStyle(elem, 'top') ? getStyle(elem, 'top') : 0);
    return pos = {
        x: x,
        y: y
    }
}

function setTargetPos(elem, pos) {
    elem.style.left = pos.x + 'px';
    elem.style.top = pos.y + 'px';
    return elem;
}

function getStyle(elem, property) {
    // IE通过currentStyle来获取元素的样式
    // 其他浏览器通过getComputedStyle来获取
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, null)[property] : document.currentStyle[property];
}

// 获取浏览器支持兼容性问题
function getTransform() {
    var transform = '',
        divStyle = document.createElement('div').style,
        _transform = ['translate', "webkitTranslate", "MozTranslate", "msTransform", "OTranslate"],
        i = 0,
        len = _transform.length;
    for (; i < len; i++) {

        if (_transform[i] in divStyle) {
            // 找到之后立即返回，结束函数
            return transform = _transform[i];
        }
    }
    // 如果没有找到，就直接返回空字符串
    return transform;
}






(function ($) {
    var defaults = {
        startX: 0,
        startY: 0,//该属性是设置拖动后自动还原效果
        sourceX: 0,
        sourceY: 0,//鼠标点击拖动对象时候，proxy的位移，称作德尔塔
    }
    function getTargetPos(elem) {
        var pos = { x: 0, y: 0 };
        var x = parseInt(getStyle(elem, 'left') ? getStyle(elem, 'left') : 0);
        var y = parseInt(getStyle(elem, 'top') ? getStyle(elem, 'top') : 0);
        return pos = {
            x: x,
            y: y
        }
    }

    function setTargetPos(elem, pos) {
        elem.style.left = pos.x + 'px';
        elem.style.top = pos.y + 'px';
        return elem;
    }

    function getStyle(elem, property) {
        // IE通过currentStyle来获取元素的样式
        // 其他浏览器通过getComputedStyle来获取
        return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, null)[property] : document.currentStyle[property];
    }
    function start(event) {

        box.style.cursor = "crosshair";
        //获取鼠标的初始位置
        startX = event.pageX;
        startY = event.pageY;

        //获取目标元素的初始位置
        var curPos = getTargetPos(box);
        sourceX = curPos.x;
        sourceY = curPos.y;

        // 绑定
        document.addEventListener('mousemove', move, false);
        document.addEventListener('mouseup', end, false);
    }


    function move(event) {

        //获取鼠标的当前位置
        var currentX = event.pageX;
        var currentY = event.pageY;

        // 计算差值
        var disX = currentX - startX;
        var disY = currentY - startY;

        //目标元素的移动位置
        var moveX = sourceX + disX;
        var moveY = sourceY + disY;

        //父子元素的宽度高度之间的差值
        var disW = container.offsetWidth - box.offsetWidth;
        var disH = container.offsetHeight - box.offsetHeight;
        if (moveX < 0) {
            moveX = 0;
        }

        if (moveY < 0) {
            moveY = 0;
        }

        if (disW < moveX) {
            moveX = disW;
        }
        if (disH < moveY) {
            moveY = disH;
        }
        //计算并设置元素当前位置
        setTargetPos(box, {
            x: moveX.toFixed(),
            y: moveY.toFixed()
        })
        //console.log(disX)
    }

    function end() {
        box.style.cursor = "default";
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', end);
    }


    //step03-b 合并用户自定义属性，默认属性


    $.fn.draggable = function (options) {
        var options = $.extend({}, defaults, options);
        return this.each(function () {
            var box = this;
            box.addEventListener("mousedown", start, false);

        })
    }

})(jQuery);