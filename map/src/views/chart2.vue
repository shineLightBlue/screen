<template>
  <div style="height: 300px">123</div>
</template>

<script>
import "./china.js";
export default {
  name: "MapChart",

  data() {
    return {
      chart: null,
      geoCoordMap: {
        北京: [116.4551, 40.2539],
        天津: [117.4219, 39.4189],
        河北: [114.5368, 38.0431],
        山东: [117.0263, 36.6773],
        山西: [112.569, 37.8798],
        黑龙江: [126.668, 45.7479],
        吉林: [125.3322, 43.9027],
        辽宁: [123.4379, 41.8418],
        内蒙古: [111.7728, 40.8231],
        新疆: [87.6341, 43.799],
        甘肃: [103.8329, 36.0656],
        青海: [101.7867, 36.627],
        宁夏: [106.2657, 38.4783],
        四川: [104.0823, 30.6571],
        西藏: [91.12406, 29.65343],
        陕西: [108.9607, 34.27181],
        河南: [113.7597, 34.77218],
        安徽: [117.3364, 31.7398],
        江苏: [118.7693, 32.06674],
        重庆: [106.558, 29.56914],
        湖北: [114.3481, 30.55275],
        上海: [121.4801, 31.2363],
        浙江: [120.1591, 30.272553],
        云南: [102.7164, 25.052068],
        贵州: [106.7119, 26.60612],
        湖南: [112.9902, 28.11841],
        江西: [115.8227, 28.64288],
        福建: [119.3015, 26.107029],
        广东: [113.2728, 23.138577],
        广西: [108.334, 22.821439],
        海南: [110.3557, 20.0230805],
        澳门: [113.5494, 22.19295],
        香港: [114.17774, 22.28315],
        台湾: [121.51561, 25.050003],
        南海诸岛: [110.5, 18.5],
      },
      seriesData: [
        { name: "北京" },
        { name: "天津" },
        { name: "上海" },
        { name: "重庆" },
        { name: "河北" },
        { name: "河南" },
        { name: "云南" },
        { name: "辽宁" },
        { name: "黑龙江" },
        { name: "湖南" },
        { name: "安徽" },
        { name: "山东" },
        { name: "新疆" },
        { name: "江苏" },
        { name: "浙江" },
        { name: "江西" },
        { name: "湖北" },
        { name: "广西" },
        { name: "甘肃" },
        { name: "山西" },
        { name: "内蒙古" },
        { name: "陕西" },
        { name: "吉林" },
        { name: "福建" },
        { name: "贵州" },
        { name: "广东" },
        { name: "青海" },
        { name: "西藏" },
        { name: "四川" },
        { name: "宁夏" },
        { name: "海南" },
        { name: "台湾" },
        { name: "香港" },
        { name: "澳门" },
      ],
    };
  },

  mounted() {
    this.initChart();
    this.handleMapRandomSelect();
  },

  methods: {
    // 开启定时器
    startInterval() {
      const _self = this;
      // 应通过接口获取配置时间，暂时写死5s
      const time = 2000;
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        _self.reSelectMapRandomArea();
      }, time);
    },
    // 重新随机选中地图区域
    reSelectMapRandomArea() {
      console.log(this.chart);
      const length = 34;
      this.$nextTick(() => {
        try {
          const map = this.chart;
          let index = Math.floor(Math.random() * length);
          while (index === this.preSelectMapIndex || index >= length) {
            index = Math.floor(Math.random() * length);
          }
          map.dispatchAction({
            type: "mapUnSelect",
            seriesIndex: 0,
            dataIndex: this.preSelectMapIndex,
          });
          map.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: index,
          });
          map.dispatchAction({
            type: "mapSelect",
            seriesIndex: 0,
            dataIndex: index,
          });
          this.preSelectMapIndex = index;
        } catch (error) {
          console.log(error);
        }
      });
    },
    handleMapRandomSelect() {
      this.$nextTick(() => {
        try {
          const map = this.chart;
          const _self = this;
          setTimeout(() => {
            _self.reSelectMapRandomArea();
          }, 0);
          // 移入区域，清除定时器、取消之前选中并选中当前
          map.on("mouseover", function (params) {
            clearInterval(_self.intervalId);
            map.dispatchAction({
              type: "mapUnSelect",
              seriesIndex: 0,
              dataIndex: _self.preSelectMapIndex,
            });
            map.dispatchAction({
              type: "mapSelect",
              seriesIndex: 0,
              dataIndex: params.dataIndex,
            });
            _self.preSelectMapIndex = params.dataIndex;
          });
          // 移出区域重新随机选中地图区域，并开启定时器
          map.on("globalout", function () {
            _self.reSelectMapRandomArea();
            _self.startInterval();
          });
          this.startInterval();
        } catch (error) {
          console.log(error);
        }
      });
    },
    convertData(data) {
      let scatterData = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          scatterData.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return scatterData;
    },
    randomData() {
      return Math.round(Math.random() * 500);
    },
    initChart() {
      let options = {
        showLegendSymbol: true,
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 14,
            lineHeight: 22,
          },
          position: (point) => {
            // 固定在顶部
            return [point[0] + 50, point[1] - 20];
          },
          // 如果需要自定义 tooltip样式，需要使用formatter
          /*
              formatter: params => {
                return `<div style=""> ... </div>`
              }
            */
        },
        visualMap: {
          min: 0,
          max: 10,
          show: false,
          seriesIndex: 0,
          // 颜色
          inRange: {
            color: ["rgba(41,166,206, .5)", "rgba(69,117,245, .9)"],
          },
        },
        // 底部背景
        geo: {
          show: true,
          aspectScale: 0.85, //长宽比
          zoom: 1.2,
          top: "10%",
          left: "16%",
          map: "china",
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(7,114,204, .8)",
              shadowOffsetX: 5,
              shadowOffsetY: 5,
            },
            emphasis: {
              areaColor: "#00aeef",
            },
          },
        },
        series: [
          {
            name: "相关指数",
            type: "map",
            aspectScale: 0.85, //长宽比
            zoom: 1.2,
            mapType: "china", // 自定义扩展图表类型
            top: "10%",
            left: "16%",
            itemStyle: {
              normal: {
                color: "red",
                areaColor: "rgba(19,54,162, .5)",
                borderColor: "rgba(0,242,252,.3)",
                borderWidth: 1,
                shadowBlur: 7,
                shadowColor: "#00f2fc",
              },
              emphasis: {
                areaColor: "#4f7fff",
                borderColor: "rgba(0,242,252,.6)",
                borderWidth: 2,
                shadowBlur: 10,
                shadowColor: "#00f2fc",
              },
            },
            label: {
              formatter: (params) => `${params.name}`,
              show: true,
              position: "insideRight",
              textStyle: {
                fontSize: 14,
                color: "#efefef",
              },
              emphasis: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            data: [
              { name: "北京", value: "100" },
              { name: "天津", value: this.randomData() },
              { name: "上海", value: this.randomData() },
              { name: "重庆", value: this.randomData() },
              { name: "河北", value: this.randomData() },
              { name: "河南", value: this.randomData() },
              { name: "云南", value: this.randomData() },
              { name: "辽宁", value: this.randomData() },
              { name: "黑龙江", value: this.randomData() },
              { name: "湖南", value: this.randomData() },
              { name: "安徽", value: this.randomData() },
              { name: "山东", value: this.randomData() },
              { name: "新疆", value: this.randomData() },
              { name: "江苏", value: this.randomData() },
              { name: "浙江", value: this.randomData() },
              { name: "江西", value: this.randomData() },
              { name: "湖北", value: this.randomData() },
              { name: "广西", value: this.randomData() },
              { name: "甘肃", value: this.randomData() },
              { name: "山西", value: this.randomData() },
              { name: "内蒙古", value: this.randomData() },
              { name: "陕西", value: this.randomData() },
              { name: "吉林", value: this.randomData() },
              { name: "福建", value: this.randomData() },
              { name: "贵州", value: this.randomData() },
              { name: "广东", value: this.randomData() },
              { name: "青海", value: this.randomData() },
              { name: "西藏", value: this.randomData() },
              { name: "四川", value: this.randomData() },
              { name: "宁夏", value: this.randomData() },
              { name: "海南", value: this.randomData() },
              { name: "台湾", value: this.randomData() },
              { name: "香港", value: this.randomData() },
              { name: "澳门", value: this.randomData() },
              { name: "南海诸岛", value: 0 },
            ],
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            symbolSize: 7,
            effectType: "ripple",
            legendHoverLink: false,
            showEffectOn: "render",
            rippleEffect: {
              period: 4,
              scale: 2.5,
              brushType: "stroke",
            },
            zlevel: 1,
            itemStyle: {
              normal: {
                color: "#99FBFE",
                shadowBlur: 5,
                shadowColor: "#fff",
              },
            },
            data: this.convertData(this.seriesData),
          },
        ],
      };
      this.chart = this.$echarts.init(this.$el);
      this.chart.setOption(options);
    },
  },
};
</script>

<style lang="scss" scoped></style>
