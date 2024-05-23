<template>
  <div id="bottomRight">
    <div class="d-flex pt-2 pl-2">
      <span>
        <icon name="chart-area" class="text-icon"></icon>
      </span>
      <div>
        <span class="fs-xl text mx-2">工单修复以及满意度统计图</span>
      </div>
    </div>
    <div>
      <BottomRightChart />
    </div>
  </div>
</template>

<script>
import BottomRightChart from "@/components/echart/bottom/bottomRightChart";
export default {
  components: {
    BottomRightChart,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
$box-height: 520px;
$box-width: 100%;
#bottomRight {
  padding: 14px 16px;
  height: $box-height;
  width: $box-width;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
}
</style>
