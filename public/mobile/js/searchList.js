$(function() {
  /*区域滚动*/
  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });

  /*1.页面初始化的时候：关键字在输入框内显示*/
  /*获取关键字*/
  var urlParams = LT.getParamsByUrl()
  console.log(urlParams)
  $input = $('input').val(urlParams.key || '')

  /*2.页面初始化的时候：根据关键字查询第一页数据4条*/
  /*下拉刷新配置自动执行  重复操作*/
  // getSearchData({
  //   page: 1,
  //   pageSize: 4,
  //   proName: urlParams.key
  // }, function(data) {
  //   console.log(data)
  //   /*渲染数据*/
  //   $('.lt_product').html(template('list', data))
  // })

  /*3.用户点击搜索的时候 根据新的关键字搜索商品 重置排序功能*/
  $('.lt_search a').on('tap', function() {
    $('.lt_order a').removeClass('now')
    $('.lt_order a').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
    /*跳转去搜索列表页 并且需要带上关键字*/
    var key = $.trim($('input').val())
    /*判断  没有关键字就提示用户“请输入关键字”*/
    if (!key) {
      /*mui 消息提示*/
      mui.toast('请输入关键字')
      return false
    }
    getSearchData({
      page: 1,
      pageSize: 4,
      proName: key
    }, function(data) {
      console.log(data)
      $('.lt_product').html(template('list', data))
    })
  })
  /*4.用户点击排序的时候  
      根据排序的选项去进行排序（默认的时候是 降序  再次点击的时候 升序）*/
  $('.lt_order a').on('tap', function() {
    /*当前点击的 a */
    $this = $(this)
    /*如果之前有选择*/
    if ($this.hasClass('now')) {
      /*改当前的箭头方向*/
      if ($this.find('span').hasClass('fa-angle-down')) {
        $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
      } else {
        $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
      }
    }
    /*没有now的时候*/
    else {
      /*选中，其他的不选中，箭头默认朝下*/
      $this.addClass('now').siblings().removeClass('now')
        .find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
    }

    /*获取当前点击的功能参数  price 1 2 num 1 2*/
    var order = $this.attr('data-order')
    var orderVal = $this.find('span').hasClass('fa-angle-up') ? 2 : 1
    console.log(order, orderVal)
    var key = $.trim($('input').val())
    /*判断  没有关键字就提示用户“请输入关键字”*/
    if (!key) {
      /*mui 消息提示*/
      mui.toast('请输入关键字')
      return false
    }
    /*获取数据*/
    var params = {
      page: 1,
      pageSize: 4,
      proName: key,
      /*排序的方式*/
    }
    params[order] = orderVal
    getSearchData(params, function(data) {
      console.log(data)
      $('.lt_product').html(template('list', data))
    })
  })

  /*5.用户下拉的时候  根据当前条件刷新 上拉加载重置  排序功能也重置 */
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",
      down: {
        style: 'circle',
        /*自动加载*/
        auto: true, //可选,默认false.首次加载自动上拉刷新一次
        callback: function() {
          /*组件对象*/
          var that = this
          var key = $.trim($('input').val())
          /*判断  没有关键字就提示用户“请输入关键字”*/
          if (!key) {
            /*mui 消息提示*/
            mui.toast('请输入关键字')
            return false
          }
          /*记录当前排序状态*/
          // $('.lt_order a').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
          var order = $('.lt_order a.now').attr('data-order')
          var orderVal = $('.lt_order a.now').find('span').hasClass('fa-angle-up') ? 2 : 1
          console.log(order, orderVal)
          var params = {
            page: 1,
            pageSize: 4,
            proName: key,
          }
          params[order] = orderVal
          getSearchData(params, function(data) {
            console.log(data)
            $('.lt_product').html(template('list', data))
            /*注意：停止下拉刷新*/
            that.endPulldownToRefresh();
            // /*上拉加载重置*/
            that.refresh(true);
          })
        }
      },
      /*6.用户上拉的时候  加载下一页（没有数据不去加载了）*/
      up: {
        callback: function() {
          window.page++
          /*组件对象*/
          var that = this
          var key = $.trim($('input').val())
          /*判断  没有关键字就提示用户“请输入关键字”*/
          if (!key) {
            /*mui 消息提示*/
            mui.toast('请输入关键字')
            return false
          }
          /*记录当前排序状态*/
          // $('.lt_order a').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
          var order = $('.lt_order a.now').attr('data-order')
          var orderVal = $('.lt_order a.now').find('span').hasClass('fa-angle-up') ? 2 : 1
          console.log(order, orderVal)
          var params = {
            page: window.page,
            pageSize: 4,
            proName: key,
          }
          params[order] = orderVal
          getSearchData(params, function(data) {
            console.log(data)
            /*追加内容，而非覆盖*/
            $('.lt_product').append(template('list', data))
            if (data.data.length) {
              /*注意：停止上拉加载*/
              that.endPullupToRefresh();
            } else {
              /*消息“没有更多数据了”提示*/
              that.endPullupToRefresh(true);
            }
          })
        }
      }
    }
  });
});

var getSearchData = function(params, callback) {
  $.ajax({
    url: '/product/queryProduct',
    type: 'get',
    data: params,
    dataType: 'json',
    success: function(data) {
      /*存当前页码*/
      window.page = data.page
      callback && callback(data)
    }
  })
}