<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    dataset: {
      type: Object,
      default: null
    },
    chartoptions: {
      type: Object,
      default: null
    },
    shouldRender: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    shouldRender() {
      this.renderChart(this.dataset, this.chartoptions);
      if (this.shouldRender) this.$emit('completeRender');
    }
  },
  mounted() {
    this.renderChart(this.dataset, this.chartoptions);
  }
};
</script>
