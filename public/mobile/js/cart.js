$(function() {
  mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
  });

  /*初始化上下拉*/
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",
      down: {
        style: 'circle',
        auto: true, //可选,默认false.首次加载自动上拉刷新一次
        callback: function() {
          /*1.初始化页面  自动下拉刷新*/
          var that = this
          /*定义一个全局的 下拉组件对象  使用里面的方法*/
          //window.down = this;
          /*渲染页面*/
          getCartData(function(data) {
            $('.mui-table-view').html(template('cart', data))
            /*加载状态隐藏*/
            that.endPulldownToRefresh();
            that.refresh(true);
            $('#cartAmount').html('0.00')
            /*注册刷新事件 防止多次绑定  先解绑再次绑定*/
            // $('.fa-refresh').off('tap').on('tap', function() {
            //   /*重新 加载*/
            //   /*点击刷新按钮  刷新*/
            //   that.pulldownLoading();
            // });
          })
        }
      },
      up: {
        callback: function() {
          var that = this
          setTimeout(function() {
            that.endPullupToRefresh(true);
          }, 100)
        }
      }
    }
  });

  /* 初始化页面 自动下拉刷新*/
  /* 侧滑的时候，点击编辑，弹出对话框（尺码，数量）*/
  /* 侧滑的时候，点击删除，弹出对话确认框*/
  /* 点击刷新按钮， 刷新*/
  $('.fa-refresh').on('tap', function() {
    /*刷新  触发下拉操作*/
    mui('#refreshContainer').pullRefresh().pulldownLoading();
    $('#cartAmount').html('0.00')
  });
  /* 点击复选框， 计算总金额*/


  $('.mui-table-view').on('tap', '.mui-icon-compose', function() {
    var elem = this;
    var li = elem.parentNode.parentNode;
    /*弹窗的内容*/
    /*默认的子字符串 ===》 html格式的字符串*/
    /*获取当前按钮对应商品的数据*/
    /*根据ID去缓存获取*/
    var id = $(this).parent().attr('data-id')
    var item = LT.getItemById(window.cartData.data, id)
    console.log(item)
    var html = template('edit', item)
    /*confirm 在使用字符串作为内容的时候 '普通\n文字' \n 加上<br> \t 默认空格*/
    mui.confirm(html.replace(/\n/g, ''), '商品编辑', ['是', '否'], function(e) {
      if (e.index == 0) {
        /*发送请求*/
        var size = $('.btn_size.now').html()
        var num = $('.p_number input').val()
        LT.loginAjax({
          type: 'post',
          url: '/cart/updateCart',
          data: {
            size: size,
            num: num,
            id: id
          },
          dataType: 'json',
          success: function(data) {
            if (data.success == true) {
              /*窗口关闭*/
              /*列表更新*/
              item.size = size
              item.num = num
              console.log(window.cartData)
              /*缓存的数据  window.cartData.data 已修改*/
              /*渲染页面*/
              // $('.mui-table-view').html(template('cart', window.cartData))
              /*整个列表重新渲染*/
              $(li).find('.number').html("x"+num+"双")
              $(li).find('.size').html("鞋码：" + size)
              mui.swipeoutClose(li);
              setAmount()
            }
          }
        })
      } else {
        // TODO
        mui.swipeoutClose(li);
      }
    })
  }) // endfor $('.mui-table-view')

  $('.mui-table-view').on('tap', '.mui-icon-trash', function() {
    // var elem = this;
    // var li = elem.parentNode.parentNode;
    var $this = $(this)
    var li = $this.parent().parent()[0]
    // console.log(elem)
    // console.log($this)
    /*字符串 转数字 */
    var id = $this.parent().attr('data-id')
    mui.confirm('您确认是否删除该商品？', '商品删除', ['是', '否'], function(e) {
      if (e.index == 0) {
        LT.loginAjax({
          type: 'get',
          url: '/cart/deleteCart',
          data: {
            id: id
          },
          dataType: 'json',
          success: function(data) {
            if (data.success == true) {
              /*删除*/
              $this.parent().parent().remove();
              setAmount()
            }
          }
        })
      } else {
        // TODO
        mui.swipeoutClose(li);
        console.log(mui)
      }
    })
  })

  /*5.点击复选框  计算总金额 */
  $('.mui-table-view').on('change', '[type=checkbox]', function() {
    setAmount()
  })

  $('body').on('tap', '.btn_size', function() {
    $(this).addClass('now').siblings().removeClass('now')
  })

  $('body').on('tap', '.p_number span', function() {
    var $input = $(this).siblings('input')
    var currentNum = $input.val()
    var max = parseInt($input.attr('data-max'))
    if ($(this).hasClass('jia')) {
      currentNum++
      if (currentNum > max) {
        setTimeout(function() {
          mui.toast('库存不足')
        }, 100)
        return false
      }
    } else {
      currentNum--
      if (currentNum < 1) {
        return false
      }
    }
    $input.val(currentNum)
  }) // endfor $('body').on
}); // endfor $(function)

var setAmount = function() {
  /*所有选中的复选框*/
  var $checkbox = $('[type=checkbox]:checked')
  console.log($checkbox.length)
  var amountSum = 0
  /*获取选中商品的ID*/
  /*$.each(i,item)    $dom.each(i,item)  arr.forEach(item,i) */
  if ($checkbox.length != 0) {
    $checkbox.each(function(index, el) {
      var id = $(this).attr('data-id');
      var item = LT.getItemById(window.cartData.data, id)
      var num = item.num
      var price = item.price
      var amount = num * price
      amountSum += amount
      // if (amountSum%10) {
      //  amountSum = (Math.floor(amountSum *100))/100
      // }else{
      //  amountSum = (Math.floor(amountSum *100))/100
      //  amountSum = amountSum.toString()+'0'
      // }
      amountSum = (Math.floor(amountSum * 100)) / 100
      $('#cartAmount').html(amountSum) // 留下一个bug小数保留位数问题
    });
  } else {
    $('#cartAmount').html('0.00')
  }
}

var getCartData = function(callback) {
  LT.loginAjax({
    url: '/cart/queryCartPaging',
    type: 'get',
    data: {
      page: 1,
      /*不产生分页  需要修改接口*/
      pageSize: 100
    },
    dataType: 'json',
    success: function(data) {
      /*缓存的数据*/
      window.cartData = data
      callback && callback(data)
    }
  })
}