<template>
  <div id="centerLeft1">
    <div class="d-flex">
      <span>
        <icon name="chart-bar" class="text-icon"></icon>
      </span>
      <div class="d-flex">
        <span class="fs-xl mx-2">任务通过率</span>
        <dv-decoration-3 class="dv-dec-3"></dv-decoration-3>
      </div>
    </div>
    <div class="d-flex jc-center">
      <CenterLeft1Chart />
    </div>
    <div class="bottom-data">
      <div
        v-for="(item, index) in numberData"
        :key="index"
        class="item-box mt-2"
      >
        <div class="d-flex">
          <span class="coin">￥</span>
          <dv-digital-flop
            :config="item.number"
            class="dv-digital-flop"
          ></dv-digital-flop>
        </div>
        <p class="text">
          {{ item.text }}
          <span class="colorYellow">(件)</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CenterLeft1Chart from "@/components/echart/centerLeft/centerLeft1Chart";
export default {
  components: {
    CenterLeft1Chart,
  },
  mounted() {
    this.changeTiming();
  },
  methods: {
    changeTiming() {
      setInterval(() => {
        this.changeNumber();
      }, 3000);
    },
    changeNumber() {
      this.numberData.forEach((item, index) => {
        item.number.number[0] += ++index;
        item.number = { ...item.number };
      });
    },
  },
  data() {
    return {
      numberData: [
        {
          number: {
            number: [15],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 24,
            },
          },
          text: "今日构建总量",
        },
        {
          number: {
            number: [1144],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 24,
            },
          },
          text: "总共完成数量",
        },
        {
          number: {
            number: [361],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 24,
            },
          },
          text: "正在编译数量",
        },
        {
          number: {
            number: [157],
            toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 24,
            },
          },
          text: "未通过数量",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#centerLeft1 {
  padding: 16px;
  .dv-dec-3 {
    width: 100px;
    height: 20px;
  }
  .text {
    color: #c3cbde;
  }
  .bottom-data {
    .item-box {
      width: 50%;
      float: right;
      font-size: 14px;
      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }
      .coin {
        font-size: 20px;
        color: #ffc107;
        position: relative;
        top: 6px;
      }
      .colorYellow {
        color: yellowgreen;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>
