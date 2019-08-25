$(function() {
  barCharts()
  pieCharts()
});
/*1.引入echarts.min.js文件*/
var barCharts = function() {
  var xdata = []
  var sdata = []
  var data = [{
      name: '一月',
      value: 300
    },
    {
      name: '二月',
      value: 600
    },
    {
      name: '三月',
      value: 900
    },
    {
      name: '四月',
      value: 200
    },
    {
      name: '五月',
      value: 600
    },
    {
      name: '六月',
      value: 800
    },
    {
      name: '7月',
      value: 1000
    },
    {
      name: '8月',
      value: 400
    }
  ];
  data.forEach(function(item, i) {
    xdata.push(item.name)
    sdata.push(item.value)
  })
  /*2.找到画图的容器*/
  /*3.初始化插件*/
  var myChart = echarts.init(document.querySelector('.picTable:first-child'));
  /*4.配置参数*/
  var option = {
    backgroundColor: '#fff',
    title: {
      text: '注册人数',
      subtext: '2019年'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['人数']
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: '人数',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    }]
  };

  option.xAxis[0].data = xdata
  option.series[0].data = sdata
  // 5.为echarts对象加载数据 
  myChart.setOption(option);
}


var pieCharts = function() {
  var myChart = echarts.init(document.querySelector('.picTable:last-child'));
  var option = {
    backgroundColor: '#7b68ee',
    title: {
      text: '品牌销售占比',
      subtext: '2019年6月份',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      /*series.name  a  */
      /*data.name  b */
      /*data.value  c */
      /*占比  d */
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['耐克', '阿迪达斯', '360', '特步', '安踏']
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: 1548
            }
          }
        },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    series: [{
      name: '销售情况',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '耐克' },
        { value: 310, name: '阿迪达斯' },
        { value: 234, name: '360' },
        { value: 135, name: '特步' },
        { value: 1548, name: '安踏' }
      ]
    }]
  };

  myChart.setOption(option);
}