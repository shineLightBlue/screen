<template>
  <div style="width: 500px; height: 300px">123</div>
</template>

<script>
import "./jiangsu.js";
export default {
  name: "MapChart",

  data() {
    return {
      chart: null,
      geoCoordMap: {
        南京市: [118.778074408, 32.0572355018],
        南通市: [120.873800951, 32.0146645408],
        宿迁市: [118.296893379, 33.9520497337],
        常州市: [119.981861013, 31.7713967447],
        徐州市: [117.188106623, 34.2715534311],
        扬州市: [119.427777551, 32.4085052546],
        无锡市: [120.305455901, 31.5700374519],
        泰州市: [119.919606016, 32.4760532748],
        淮安市: [119.030186365, 33.6065127393],
        盐城市: [120.148871818, 33.3798618771],
        苏州市: [120.619907115, 31.317987368],
        连云港市: [119.173872217, 34.601548967],
        镇江市: [119.455835405, 32.2044094436],
      },
      seriesData: [
        {
          name: "南京市",
        },
        {
          name: "南通市",
        },
        {
          name: "宿迁市",
        },
        {
          name: "常州市",
        },
        {
          name: "徐州市",
        },
        {
          name: "扬州市",
        },
        {
          name: "无锡市",
        },
        {
          name: "泰州市",
        },
        {
          name: "淮安市",
        },
        {
          name: "盐城市",
        },
        {
          name: "苏州市",
        },
        {
          name: "连云港市",
        },
        {
          name: "镇江市",
        },
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
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        this.reSelectMapRandomArea();
      }, 2000);
    },
    // 重新随机选中地图区域
    reSelectMapRandomArea() {
      console.log(this.chart);
      const length = 13;
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
      // console.log(data);
      let scatterData = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          scatterData.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
          // console.log(scatterData);
        }
      }
      console.log(scatterData);
      return scatterData;
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
          map: "江苏",
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
            mapType: "江苏", // 自定义扩展图表类型
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
              {
                name: "南京市",
                value: 5,
              },
              {
                name: "南通市",
                value: 5,
              },
              {
                name: "宿迁市",
                value: 5,
              },
              {
                name: "常州市",
                value: 5,
              },
              {
                name: "徐州市",
                value: 5,
              },
              {
                name: "扬州市",
                value: 5,
              },
              {
                name: "无锡市",
                value: 5,
              },
              {
                name: "泰州市",
                value: 5,
              },
              {
                name: "淮安市",
                value: 5,
              },
              {
                name: "盐城市",
                value: 5,
              },
              {
                name: "苏州市",
                value: 5,
              },
              {
                name: "连云港市",
                value: 5,
              },
              {
                name: "镇江市",
                value: 5,
              },
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
              color: "#99FBFE",
              shadowBlur: 5,
              shadowColor: "#fff",
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
