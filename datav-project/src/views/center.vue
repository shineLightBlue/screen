<template>
  <div>
    <div class="up">
      <div v-for="item in titleItem" :key="item.title" class="item">
        <p class="colorBlue">{{ item.title }}</p>
        <div>
          <dv-digital-flop :config="item.number" class="dv-dig-flop">
          </dv-digital-flop>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1 pl-3">年度负责人组件达标榜</span>
        <dv-scroll-ranking-board
          :config="ranking"
          class="dv-scr-rank-board"
        ></dv-scroll-ranking-board>
      </div>
      <div class="percent">
        <div class="item">
          <span>今日任务通过率</span>
          <CenterChart
            :id="rate[0].id"
            :tips="rate[0].tips"
            :colorObj="rate[0].colorData"
          />
        </div>
        <div class="item">
          <span>今日任务达标率</span>
          <CenterChart
            :id="rate[1].id"
            :tips="rate[1].tips"
            :colorObj="rate[1].colorData"
          />
        </div>
        <div class="water">
          <dv-water-level-pond
            :config="water"
            class="dv-wa-le-po"
          ></dv-water-level-pond>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterChart from "@/components/echart/center/centerChartRate";
export default {
  data() {
    return {
      titleItem: [
        {
          title: "今年累计任务建次数",
          number: {
            number: [120],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "本月累计任务次数",
          number: {
            number: [18],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "今日累计任务次数",
          number: {
            number: [2],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "今年失败任务次数",
          number: {
            number: [14],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "今年成功任务次数",
          number: {
            number: [106],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
        {
          title: "今年达标任务个数",
          number: {
            number: [100],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        },
      ],
      ranking: {
        data: [
          {
            name: "周口",
            value: 55,
          },
          {
            name: "南阳",
            value: 120,
          },
          {
            name: "西峡",
            value: 78,
          },
          {
            name: "驻马店",
            value: 66,
          },
          {
            name: "新乡",
            value: 80,
          },
          {
            name: "新乡2",
            value: 80,
          },
          {
            name: "新乡3",
            value: 80,
          },
          {
            name: "新乡4",
            value: 80,
          },
          {
            name: "新乡5",
            value: 80,
          },
          {
            name: "新乡6",
            value: 80,
          },
        ],
        carousel: "single",
        unit: "人",
      },
      water: {
        data: [24, 45],
        shape: "roundRect",
        formatter: "{value}%",
        waveNum: 3,
      },
      rate: [
        {
          id: "centerRate1",
          tips: 60,
          colorData: {
            textStyle: "#3fc0fb",
            series: {
              color: ["#00bcd44a", "transparent"],
              dataColor: {
                normal: "#03a9f4",
                shadowColor: "#97e2f5",
              },
            },
          },
        },
        {
          id: "centerRate2",
          tips: 40,
          colorData: {
            textStyle: "#67e0e3",
            series: {
              color: ["#faf3a378", "transparent"],
              dataColor: {
                normal: "#ff9800",
                shadowColor: "#fcebad",
              },
            },
          },
        },
      ],
    };
  },
  components: {
    CenterChart,
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.up {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  .item {
    width: 32%;
    height: 70px;
    .dv-dig-flop {
      height: 30px;
      width: 150px;
    }
  }
}
.down {
  //   width: 100%;
  display: flex;
  height: 255px;
  .ranking {
    padding: 10px;
    width: 59%;
    .dv-scr-rank-board {
      height: 225px;
    }
  }
  .percent {
    display: flex;
    width: 40%;
    flex-wrap: wrap;
    .item {
      width: 50%;
      height: 120px;
    }
    .water {
      width: 100%;
      .dv-wa-le-po {
        height: 120px;
      }
    }
  }
}
</style>
