$(function() {
  window.page = 1
  /*1.默认第一页展示*/
  var render = function() {
    getSecondCateData(function(data) {
      console.log(data)
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
  getFirstCateData(function(data) {
    console.log(data)
    $('.dropdown-menu').html(template('dropDown', data))
      .on('click', 'li', function(argument) {
      	/*显示选中的分类名称*/
        var $currA = $(this).find('a')
        $('.categoryName').html($currA.html())
        /*给隐藏的ID表单赋值*/
        $('[name="categoryId"]').val($currA.attr('data-id'))
        /*改校验状态*/
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
      })
  })

  // http://www.jq22.com/jquery-info230
  initFileUpload()
  $('#form').bootstrapValidator({// 校验组件对象
    /*提示的图标*/
    /*默认不去校验的表单元素（包含隐藏）*/
    excluded:[":disabled"],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    /*属性对应的是表单元素的名字*/
    fields: {
      /*配置校验规则*/
      categoryId: {
        /*规则*/
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        /*规则*/
        validators: {
          notEmpty: {
            message: '请选择logo'
          }
        }
      }
    }
    /*7.表单校验成功 在客户端校验上面的规则*/
  }).on('success.form.bv', function(e) {// success.form.bv ==> 校验组件提交的事件
    /*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
    e.preventDefault();

    /*获取当前的表单*/
    var $form = $(e.target);// 校验组件对象   
    console.log($form.serialize())
    console.log(0)
    /*发送登录请求*/
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $form.serialize(),
      dataType: 'json',
      success: function(data) {
      	console.log(data)
        if (data.success == true) {
          window.page = 1;
          render();
          /*重置表单*/
          $('#form')[0].reset();
          $form.find('[name="brandLogo"]').val('');
          $('#uploadImg').attr('src', 'images/none.png');
          $form.data('bootstrapValidator').resetForm();
          $('#save').modal('hide');
        }
      }
    });
  });

});

var getSecondCateData = function(callback) {
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategoryPaging',
    data: {
      page: window.page || 1,
      pageSize: 2
    },
    dataType: 'json',
    success: function(data) {
      callback && callback(data)
    }
  })
}

var getFirstCateData = function(callback) {
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
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
    url: '/category/addSecondCategoryPic',
    dataType: 'json',
    /*上传成功*/
    done: function(e, data) {
      console.log(data)
      $('#uploadImg').attr('src',data.result.picAddr)
      $('[name="brandLogo"]').val(data.result.picAddr)
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  });
}