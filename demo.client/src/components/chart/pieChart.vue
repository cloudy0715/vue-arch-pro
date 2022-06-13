<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    :align="alignPos"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    alignPos: {
      type: String,
      default: 'end'
    },
    width: {
      type: Number,
      default: 350
    },
    height: {
      type: Number,
      default: 350
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        labels: ['EC2', 'ELB', 'RDS', 'WAF', 'KMS', 'Others'],
        datasets: [
          {
            backgroundColor: ['rgb(22, 191, 152)', 'rgb(44, 161, 203)', 'rgb(233, 134, 14)', 'rgb(162, 91, 233)', 'rgb(144, 217, 123)', 'rgb(127, 213, 233)'],
            data: [29.9, 29.2, 21.7, 18.8, 4, 4]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
