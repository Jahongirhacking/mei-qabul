import ReactEcharts from 'echarts-for-react'

interface Props {
  color: string[]
  seriesArr: Series[]
  legendSize?: number
  gridBottom?: number
  marginTop?: number
  legendData: string[]
  xAxisRotate?: number
  yAxisRotate?: number
  barWidth?: number
  legendIcon?: string
  loading: boolean
}

export interface Series {
  data: number[]
  name: string
}
export default function BarChart({
  color,
  legendSize = 12,
  gridBottom = 0,
  marginTop = -40,
  barWidth = 40,
  seriesArr,
  legendData,
  xAxisRotate = 0,
  yAxisRotate = 0,
  legendIcon = 'circle',
  loading
}: Props) {
  const legendTextStyle = {
    color: '#6f7172',
    fontSize: legendSize,
    fontWeight: 'bold'
  }

  let series: any = []
  seriesArr?.forEach((item: Series, index) => {
    const barItem: any = {
      ...item,
      itemStyle: {
        borderRadius: 10,
        color: color?.[index]
      },
      type: 'bar',
      // stack: 'total',
      label: {
        show: true,
        fontWeight: 'bold',
        color: '#fff'
      }
    }

    series.push(barItem)
  })

  const option = {
    xAxis: {
      type: 'category',
      data: legendData,
      axisLabel: { rotate: xAxisRotate, interval: 0 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: 10,
      right: 0,
      bottom: 30,
      containLabel: true
    },
    barWidth: barWidth,
    legend: {
      bottom: gridBottom,
      icon: legendIcon,
      textStyle: legendTextStyle
    },

    yAxis: {
      type: 'value',
      axisLabel: {
        rotate: yAxisRotate
      }
    },
    series: series
  }

  return (
    <ReactEcharts
      option={option}
      style={{ marginTop: marginTop }}
      showLoading={loading}
      loadingOption={{
        text: "Ma'lumot yuklanmoqda...",
        color: '#5470C6',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      }}
      onChartReady={(chart) => {
        setTimeout(() => {
          chart.resize()
        }, 100) // AntDesign UI render bo‘lishini kutish uchun
      }}
    />
  )
}
