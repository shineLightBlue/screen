<template>
  <div class="d-flex ai-center flex-column">
    <dv-capsule-chart :config="config" class="dv-cap-chart"></dv-capsule-chart>
    <centerRight2Chart1 />
  </div>
</template>

<script>
import centerRight2Chart1 from "@/components/echart/centerRight/centerRightChart";
export default {
  components: {
    centerRight2Chart1,
  },
  data() {
    return {
      config: {
        data: [
          {
            name: "南阳",
            value: 167,
          },
          {
            name: "周口",
            value: 67,
          },
          {
            name: "漯河",
            value: 123,
          },
          {
            name: "郑州",
            value: 55,
          },
          {
            name: "西峡",
            value: 98,
          },
        ],
      },
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.dv-cap-chart {
  width: 100%;
  height: 160px;
}
</style>
