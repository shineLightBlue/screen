<template>
  <div id="centerLeft1">
    <div class="d-flex pt-2 pl-2">
      <span>
        <icon name="chart-pie" class="text-icon"></icon>
      </span>
      <div class="d-flex">
        <span class="fx-xl mx-2">地图数据</span>
        <dv-decoration-1 class="dv-dec-1"></dv-decoration-1>
      </div>
    </div>
    <div class="d-flex jc-center">
      <CenterLeft2Chart />
    </div>
  </div>
</template>

<script>
import CenterLeft2Chart from "@/components/echart/centerLeft2Chart";
export default {
  components: {
    CenterLeft2Chart,
  },
};
</script>

<style lang="scss" scoped>
#centerLeft1 {
  padding: 16px;
  .dv-dec-1 {
    width: 100px;
    height: 20px;
  }
}
</style>
