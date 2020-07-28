<template>
  <div class="card-graphic">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Курс рубля к доллару за текущий месяц",
            data: [],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
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
  async mounted() {
    let day = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    if (day > 0 && day < 10) {
      day = `0${day}`;
    }

    if (month > 0 && month < 10) {
      month = `0${month}`;
    }

    for (let i = 1; i <= day; i++) {
      this.chartData.labels.push(`${i}`);
    }

    const {
      data: { rates },
    } = await axios(
      `https://api.exchangerate.host/timeseries?start_date=2020-${month}-01&end_date=2020-${month}-${day}&base=USD&symbols=RUB&places=2`
    );

    for (let key in rates) {
      for (let key2 in rates[key]) {
        this.chartData.datasets[0].data.push(rates[key][key2]);
      }
    }

    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>
@import "../../../assets/stylesheets/CardGraphic/CardGraphic.css";
</style>
