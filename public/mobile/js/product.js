$(function() {
  var id = LT.getParamsByUrl().productId

  getProductData(id, function(data) {
    console.log(data)
    /*清除加载状态*/
    $('.loading').remove()
    /*渲染商品详情页*/
    $('.mui-scroll').html(template('detail', data));
    /*轮播图*/
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
      indicators: false, //是否显示滚动条
    });
    /*1.尺码的选择*/
    $('.btn_size').on('tap', function() {
      $(this).addClass('now').siblings().removeClass('now')
    })
    /*2.数量的选择*/
    $('.p_number span').on('tap', function() {
      var $input = $(this).siblings('input')
      var currentNum = $input.val()
      /*字符串 转数字 */
      var max = parseInt($input.attr('data-max'))
      console.log(max)
      if ($(this).hasClass('jia')) {
        currentNum++
        if (currentNum > max) { /*不超库存*/
          /*消息框点击的时候会消失 正好和加号在一块  (击穿 tap,点击穿透)*/
          setTimeout(function() {
            mui.toast('库存不足')
          }, 100)
          return false;
        }
      } else {
        currentNum--
        if (currentNum <= 0) {
          return false
        }
      }
      $input.val(currentNum)
    })
  });
  /*3.加人购物车*/
  $('.btn_addCart').on('tap', function(event) {
    var $changeBtn = $('.btn_size.now');
    var num = $('.p_number input').val();
    /*数据校验*/
    if (!$changeBtn.length) {
      mui.toast('请选择尺码');
      return false;
    }
    console.log($changeBtn.html())
    console.log(num)

    LT.loginAjax({
      url: '/cart/addCart',
      type: 'POST',
      dataType: 'json',
      data: {
        productId: id,
        num: num,
        size: $changeBtn.html()
      },
      success: function(data) {
        console.log(data)
        if (data.success == true) {
        	/*弹出提示框*/
          mui.confirm('添加成功，去购物车看看？', '温馨提示', ['否', '是'],  function(e) {
            if (e.index == 1) {
              location.href = LT.cartUrl;
            } else {
              // todo
            }
          })
        }
      } // endfor success
    }) // endfor LT.loginAjax

  }); // endfor $('.btn_addCart').on
}); // endfor $(function())

var getProductData = function(productId, callback) {
  $.ajax({
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function(data) {
      callback && callback(data)
    }
  })
}