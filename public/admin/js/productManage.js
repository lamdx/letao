$(function() {
  //用来保存文件上传的时候后台返回的图片.
  window.picArray = new Array();
  window.page = 1
  /*1.默认第一页展示*/
  var render = function() {
    getProductData(function(data) {
      /*模板渲染*/
      $('tbody').html(template('list', data))
      /*初始化分页组件  根据数据*/
      /*2.分页展示*/
      $('.pagination').bootstrapPaginator({
        /*对应的bootstrap版本*/
        bootstrapMajorVersion: 3,
        /*分页按钮的大小 mini,small,normal,large*/
        size: 'small',
        alignment: 'center',
        /*当前页码*/
        currentPage: data.page,
        /*页码按钮的数量 默认是5*/
        numberOfPages: 3,
        /*一共多少页*/
        totalPages: Math.ceil(data.total / data.size),
        /*点击页码渲染*/
        /*监听按钮的点击事件 获取点击的时候的页码*/
        onPageClicked: function(event, originalEvent, type, page) {
          /*1. event jquery的事件对象*/
          /*2. originalEvent 原生dom的事件对象*/
          /*3. type 按钮的类型 */
          /*4. 按钮对应的页码*/
          window.page = page
          render()
        }
      });
    })
  }
  render();

  /*3.点击添加分类弹窗*/
  getBrandData(function(data) {
    $('.dropdown-menu').html(template('dropDown', data))
      .on('click', 'li', function(argument) {
        /*显示选中的分类名称*/
        var $currA = $(this).find('a')
        $('.brandName').html($currA.html())
        /*给隐藏的ID表单赋值*/
        $('[name="brandId"]').val($currA.attr('data-id'))
        /*改校验状态*/
        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
      })
  })

  // http://www.jq22.com/jquery-info230
  initFileUpload()
  $('#form').bootstrapValidator({ // 校验组件对象
    /*提示的图标*/
    /*默认不去校验的表单元素（包含隐藏）*/
    excluded: [":disabled"],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    /*属性对应的是表单元素的名字*/
    fields: {
      /*配置校验规则*/
      brandId: {
        /*规则*/
        validators: {
          notEmpty: {
            message: '请先选择品牌'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品名称描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品名称数量'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品名称尺码'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品名称原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品折扣价'
          }
        }
      }
    }
    /*7.表单校验成功 在客户端校验上面的规则*/
  }).on('success.form.bv', function(e) { // success.form.bv ==> 校验组件提交的事件
    /*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
    e.preventDefault();

    /*获取当前的表单*/
    var $form = $(e.target); // 校验组件对象
    var params = $form.serialize();
    params = params + "&picName1=" + picArray[0].picName + "&picAddr1=" + picArray[0].picAddr;
    params = params + "&picName2=" + picArray[1].picName + "&picAddr2=" + picArray[1].picAddr;
    params = params + "&picName3=" + picArray[2].picName + "&picAddr3=" + picArray[2].picAddr;
    /*发送登录请求*/
    console.log(params)
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: params,
      dataType: 'json',
      success: function(data) {
        if (data.success == true) {
          window.page = 1
          render()
          $('#save').modal('hide')
        }
      }
    });
  });

});



var getProductData = function(callback) {
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetailList',
    data: {
      page: window.page || 1,
      pageSize: 3
    },
    dataType: 'json',
    success: function(data) {
      callback && callback(data)
    }
  })
}

var getBrandData = function(callback) {
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategoryPaging',
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function(data) {
      callback && callback(data)
    }
  })
}

var initFileUpload = function() {
  /*初始化上传插件*/
  $('[name="pic1"]').fileupload({
    url: '/product/addProductPic',
    dataType: 'json',
    /*上传成功*/
    done: function(e, data) {
      var pic = data._response.result;
      //pic={"picName":"","picAddr":""}
      picArray.push(pic);
      var img = "<img src='" + pic.picAddr + "' style='width:100px;height:100px;float: left;'>"
      $("#picId").append(img);
    }
  });
}