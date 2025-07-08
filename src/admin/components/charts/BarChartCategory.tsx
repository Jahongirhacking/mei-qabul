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
  stack?: string
  gridLeft?: number
}

export interface Series {
  data: number[]
  name: string
}
export default function BarChartCategory({
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
  loading,
  stack = '',
  gridLeft = 10
}: Props) {
  const legendTextStyle = {
    color: '#6f7172',
    fontSize: legendSize,
    fontWeight: 'bold'
  }

  const series: unknown[] = []
  seriesArr?.forEach((item: Series, index) => {
    const barItem: unknown = {
      ...item,
      itemStyle: {
        borderRadius: 10,
        color: color?.[index]
      },
      type: 'bar',
      stack: stack,
      label: {
        show: true,
        fontWeight: 'bold',
        color: '#fff'
      }
    }

    series.push(barItem)
  })

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: gridLeft,
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
    xAxis: {
      type: 'value',
      axisLabel: { rotate: xAxisRotate, interval: 0 }
    },
    yAxis: {
      type: 'category',
      data: legendData,
      axisLabel: { rotate: yAxisRotate }
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
