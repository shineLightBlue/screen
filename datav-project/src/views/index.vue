<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading</dv-loading>
      <div v-else class="host-body">
        <!-- <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
        </div> -->
        <!-- <div class="d-flex jc-between px-2"></div> -->
        <div class="body-box">
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <centerLeft2 />
              </dv-border-box-12>
            </div>
            <div>
              <center />
            </div>
            <div>
              <centerRight2 />
            </div>
            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>
          <div class="bottom-box">
            <dv-border-box-13>
              <bottomLeft></bottomLeft>
            </dv-border-box-13>
            <dv-border-box-12>
              <bottomRight></bottomRight>
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import centerLeft1 from "./centerLeft1";
import centerLeft2 from "./centerLeft2";
import centerRight1 from "./centerRight1.vue";
import centerRight2 from "./centerRight2.vue";
import bottomLeft from "./bottomLeft";
import bottomRight from "./bottomRight";
import center from "./center";
import drawMixin from "../utils/drawMixin";
export default {
  mixins: [drawMixin],
  data() {
    return {
      loading: true,
    };
  },
  components: {
    centerLeft1,
    centerLeft2,
    center,
    centerRight1,
    centerRight2,
    bottomLeft,
    bottomRight,
  },
  mounted() {
    this.cancelLoading();
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
</style>
