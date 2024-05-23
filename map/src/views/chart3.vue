<template>
  <div style="height: 500px"></div>
</template>

<script>
import "./guangdong.js";
export default {
  name: "MapChart",

  data() {
    return {
      chart: null,
      geoCoordMap: {
        东莞市: [113.763433991, 23.0430238154, 0.2],
        中山市: [113.422060021, 22.5451775145, 0.2],
        云浮市: [112.050945959, 22.9379756855, 0.2],
        佛山市: [113.134025635, 23.0350948405, 0.2],
        广州市: [113.307649675, 23.1200491021, 0.2],
        惠州市: [114.41065808, 23.1135398524, 0.2],
        揭阳市: [116.379500855, 23.5479994669, 0.2],
        梅州市: [116.126403098, 24.304570606, 100],
        汕头市: [116.728650288, 23.3839084533, 0.2],
        汕尾市: [115.372924289, 22.7787305002, 0.2],
        江门市: [113.078125341, 22.5751167835, 0.2],
        河源市: [114.713721476, 23.7572508505, 0.2],
        深圳市: [114.025973657, 22.5460535462, 0.2],
        清远市: [113.040773349, 23.6984685504, 0.2],
        湛江市: [110.365067263, 21.2574631038, 0.2],
        潮州市: [116.630075991, 23.6618116765, 0.2],
        珠海市: [113.562447026, 22.2569146461, 0.2],
        肇庆市: [112.47965337, 23.0786632829, 0.2],
        茂名市: [110.931245331, 21.6682257188, 0.2],
        阳江市: [111.977009756, 21.8715173045, 0.2],
        韶关市: [113.594461107, 24.8029603119, 0.2],
      },
      seriesData: [
        {
          name: "东莞市",
        },
        {
          name: "中山市",
        },
        {
          name: "云浮市",
        },
        {
          name: "佛山市",
        },
        {
          name: "广州市",
        },
        {
          name: "惠州市",
        },
        {
          name: "揭阳市",
        },
        {
          name: "梅州市",
        },
        {
          name: "汕头市",
        },
        {
          name: "汕尾市",
        },
        {
          name: "江门市",
        },
        {
          name: "河源市",
        },
        {
          name: "深圳市",
        },
        {
          name: "清远市",
        },
        {
          name: "湛江市",
        },
        {
          name: "潮州市",
        },
        {
          name: "珠海市",
        },
        {
          name: "肇庆市",
        },
        {
          name: "茂名市",
        },
        {
          name: "阳江市",
        },
        {
          name: "韶关市",
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
      const length = 21;
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
          map: "广东",
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
            mapType: "广东", // 自定义扩展图表类型
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
                name: "东莞市",
                value: 10,
              },
              {
                name: "中山市",
                value: 10,
              },
              {
                name: "云浮市",
                value: 10,
              },
              {
                name: "佛山市",
                value: 10,
              },
              {
                name: "广州市",
                value: 10,
              },
              {
                name: "惠州市",
                value: 10,
              },
              {
                name: "揭阳市",
                value: 10,
              },
              {
                name: "梅州市",
                value: 10,
              },
              {
                name: "汕头市",
                value: 10,
              },
              {
                name: "汕尾市",
                value: 10,
              },
              {
                name: "江门市",
                value: 10,
              },
              {
                name: "河源市",
                value: 10,
              },
              {
                name: "深圳市",
                value: 10,
              },
              {
                name: "清远市",
                value: 10,
              },
              {
                name: "湛江市",
                value: 10,
              },
              {
                name: "潮州市",
                value: 10,
              },
              {
                name: "珠海市",
                value: 10,
              },
              {
                name: "肇庆市",
                value: 10,
              },
              {
                name: "茂名市",
                value: 10,
              },
              {
                name: "阳江市",
                value: 10,
              },
              {
                name: "韶关市",
                value: 10,
              },
            ],
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            symbolSize: 10,
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
