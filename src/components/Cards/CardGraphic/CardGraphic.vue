<template>
  <div class="card-graphic">
    <canvas
      ref="canvas"
      v-show="
        chartData.datasets[0].data.length || chartData.datasets[1].data.length
      "
    ></canvas>
    <Spinner
      v-show="
        !chartData.datasets[0].data.length || !chartData.datasets[1].data.length
      "
    />
  </div>
</template>

<script>
import { Line } from "vue-chartjs";

import { getExchangeRatesForMonth } from "@/services/index";

import Spinner from "@/components/Spinner";

export default {
  extends: Line,
  props: {
    mainCurrency: String,
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: `Курс USD / RUB за текущий месяц`,
            data: [],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: `Курс USD / RUB за предыщуий месяц`,
            data: [],
            backgroundColor: "rgba(99, 132, 255, 0.2)",
            borderColor: "rgba(99, 132, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    async getExchangeRates(currency = "USD") {
      const {
        currentMonthExchange,
        prevMonthExchange,
      } = await getExchangeRatesForMonth(currency);

      this.chartData.datasets[0].data = currentMonthExchange;
      this.chartData.datasets[1].data = prevMonthExchange;

      this.renderChart(this.chartData, this.options);
    },
  },
  mounted() {
    for (let i = 1; i <= 31; i++) {
      this.chartData.labels.push(`${i}`);
    }

    this.getExchangeRates();
  },
  watch: {
    async mainCurrency(val, oldVal) {
      this.chartData.datasets[0].data = [];
      this.chartData.datasets[1].data = [];

      this.getExchangeRates(val);

      this.chartData.datasets[0].label = `Курс ${this.mainCurrency} / RUB за текущий месяц`;
      this.chartData.datasets[1].label = `Курс ${this.mainCurrency} / RUB за предыдущий месяц`;
    },
  },
  components: {
    Spinner,
  },
};
</script>

<style>
@import "../../../assets/stylesheets/CardGraphic/CardGraphic.css";
</style>
