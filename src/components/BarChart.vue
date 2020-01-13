<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
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
  },
  watch: {
     dataset: function () {
       this.renderChart(this.dataset, this.chartoptions);
    }
  },
};
</script>
