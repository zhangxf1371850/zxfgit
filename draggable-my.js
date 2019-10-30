(function ($) {
    var defaults = {
        proxy: null,
        revert: false,//该属性是设置拖动后自动还原效果
        cursor: 'move',
        deltaX: null,//鼠标点击拖动对象时候，proxy的位移，称作德尔塔
        deltaY: null,
        handle: null,
        disabled: false,
        edge: 0,
        axis: null,	// v or h  水平还是垂直方向拖动

        onStartDrag: function (e) { },
        onDrag: function (e) { },
        onStopDrag: function (e) { }
    }



    //step03-b 合并用户自定义属性，默认属性


    $.fn.draggable = function (options) {
        function drag(e) {
            //中间变量
            var dragData = e.data;
            //拖动后的left=原先的left+拖动位移
            var left = dragData.startLeft + (e.pageX - dragData.startX);
            var top = dragData.startTop + (e.pageY - dragData.startY);
            //console.log("left:"+left+"top:"+top)
            

            dragData.left = left;
            dragData.top = top;
           
        }
        //实现位移变化的函数
        function applyDrag(e) {
            var opts = $.data(e.data.target, 'draggable').options;
            var proxy = $.data(e.data.target, 'draggable').proxy;//获取拖动对象的proxy对象,proxy就是我们在拖动时候随鼠标移动的对象
           // console.log("left:"+e.data.left+"top:"+e.data.top)
            if(proxy){
                proxy.css("cursor",opts.cursor)
            }
            proxy.css({
                left:e.data.left,
                top:e.data.top
            })
          

        }
        function doDown(e) {
            var opts = $.data(e.data.target, 'draggable').options;//获取拖动对象中option配置信息

            // var droppables = $('.droppable').filter(function () {//如果放对象和托对象是一个对象，则不拖动
            //     return e.data.target != this;
            // }).filter(function () {//如何不是同一个对象
            //     var accept = $.data(this, 'droppable').options.accept;
            //     console.log(accept)
            //     if (accept) {//如果目标地设置了接收对象，则只有符合接收条件的对象才能被拖进来
            //         return $(accept).filter(function () {
            //             return this == e.data.target;
            //         }).length > 0; //只要有一个匹配就ok了
            //     } else {
            //         return true; //如果目标地，没设置接受对象，则所有对象都可以被拖进来。
            //     }
            // });

            // console.log(dr  oppables)
            



            var proxy = $.data(e.data.target, "draggable").proty;

            if (!proxy) {
                var curElement = $(e.data.target);
                if (opts.proxy) {
                    if (opts.proxy == 'clone') {//proxy为'clone'
                        proxy = curElement.clone();//复制当前dom,并查到当前dom后面
                        curElement.after(proxy);
                    } else if (opts.proxy == 'ghost') {
                        proxy = curElement.clone();
                        curElement.after(proxy);
                        proxy.css({
                            "border-width": "1px",
                            "border-style": "dashed",
                            "background": "none",
                            "width": curElement.width(),
                            "height": curElement.height()
                        });
                        proxy.empty();
                    } else {
                        ////proxy
                    }
                    $.data(e.data.target, 'draggable').proxy = proxy;

                } else {
                    console.log("本身")
                    proxy = $(e.data.target);//proxy对象就是本身了
                }

            }
            proxy.css('position', 'absolute');//因为是拖动，所以要absolute
            drag(e);
            applyDrag(e);

        }
        function doMove(e) {
            drag(e);
           

          
            if ($.data(e.data.target, 'draggable').options.onDrag.call(e.data.target, e) != false) {
                applyDrag(e);
            }
        }
        function doUp(e) {
            drag(e);
            var proxy = $.data(e.data.target, 'draggable').proxy;
            var opts = $.data(e.data.target, 'draggable').options;

            console.log(proxy)
            
            $(e.data.target).css({
                position: 'absolute',
                left: e.data.left,
                top: e.data.top
            });
             removeProxy();
            // opts.onStopDrag.call(e.data.target, e);
            
            function removeProxy() {
                if (proxy) {
                    console.log(111)
                    proxy.remove();
                }
                //$.data(e.data.target, 'draggable').proxy = null;
            }

            $(document).unbind('.draggable');//接触document上的事件，否则移动结束后，元素还是会变位置的
        }
      



        var options = $.extend({}, defaults, options);
        return this.each(function () {

            var state = $.data(this, 'draggable');
            var handle = null;    //handle是实际触发拖动的对象

            console.log(state)

            handle = (typeof options.handle == "string" ? $(options.handle, this) : opts.handle);

            $.data(this, 'draggable', {
                options: options,
                handle: handle
            });

            handle.bind('mousedown.draggable', { target: this }, onMouseDown);

            function onMouseDown(event) {
                var position = $(event.data.target).position();//获取被拖动元素的top 和left
                // console.log(position)


                var data = {
                    startPosition: $(event.data.target).css('position'),
                    startLeft: position.left,
                    startTop: position.top,
                    left: position.left,
                    top: position.top,
                    startX: event.pageX,
                    startY: event.pageY,
                    target: event.data.target,
                    parent: $(event.data.target).parent()[0]
                }

                $(document).bind('mousedown.draggable', data, doDown);
                $(document).bind('mousemove.draggable', data, doMove);
                $(document).bind('mouseup.draggable', data, doUp);
            }

            // console.log(handle)


            // console.log($(this))

        })
    }

})(jQuery);


