<script>
  export default {
    extends: Line   ,
    props: ['chartData', 'options'],
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
