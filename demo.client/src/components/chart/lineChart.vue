<template>
  <Bar 
    :chart-data="chartData"
    :width="width"
     />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
   props: {
    width: {
      type: Number,
      default: 550
    },
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'cost',
            backgroundColor: '#ecb300',
            data: [48.4, 35.6, 40.3, 39.7, 10.4, 20.6, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  }
}
</script>