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
    }
  },
  mounted() {
    this.renderChart(this.dataset, this.chartoptions);
  }
};
</script>
