<template>
  <div id="bottomLeft">
    <div class="d-flex pt-2 pl-2">
      <span>
        <icon name="chart-bar" class="text-icon"></icon>
      </span>
      <div class="d-flex">
        <span class="fs-xl text mx-2">数据统计图</span>
      </div>
    </div>
    <div>
      <BottomLeftChart />
    </div>
  </div>
</template>

<script>
import BottomLeftChart from "@/components/echart/bottom/bottomLeftChart";
export default {
  components: {
    BottomLeftChart,
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
#bottomLeft {
  padding: 20px 16px;
  height: $box-height;
  width: $box-width;
}
</style>
