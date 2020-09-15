<script>
import { Bar, mixins } from 'vue-chartjs'
//import {Bar, mixins} from'vue-chartjs'
//import { hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
//import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['height','chartDatas','max','min'],
  data : function(){
    return {
      brandSuccess : '#4dbd74',
      brandInfo : '#20a8d8',
      brandDanger : '#f86c6b',
      options :{
        tooltips: {
          enabled: true,
          //custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks:{
              suggestedMin: 0,
              stepSize: Math.ceil(20),
            },
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(10),
              max: 100,
              min: 0
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  },
  mounted () {
    this.options.scales.yAxes[0].ticks.max = this.max
    this.options.scales.yAxes[0].ticks.stepSize = Math.ceil((this.max-this.min)/5)
    this.options.scales.yAxes[0].ticks.min = this.min
    this.renderChart(this.chartDatas, this.options)
  }
}


</script>