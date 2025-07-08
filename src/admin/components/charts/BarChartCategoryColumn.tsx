import { useTranslation } from 'react-i18next'

import ReactEcharts from 'echarts-for-react'

interface Props {
  legendData: string[]
  xAxisData: string[]
  color?: string[]
  seriesArr?: object[]
  barWidth?: number
  gridBottom?: number
  gridLeft?: number
  loading: boolean
}
const calcTotal = (seriesData: { value: number }[]) => {
  if (!seriesData || !seriesData.length) return ''

  const data = seriesData.reduce((acc, seriesData) => {
    return acc + seriesData.value
  }, 0)
  const n = new Intl.NumberFormat().format(data)
  return n
}

export default function BarChartCategoryColumn({
  legendData,
  xAxisData,
  color,
  seriesArr,
  barWidth = 50,
  gridBottom = 40,
  gridLeft = 8,
  loading
}: Props) {
  //Translation section
  const { t } = useTranslation()
  const makeTranslationData = (data: string[]) => {
    return data.map((item) => t(item))
  }

  const emphasisStyle = {
    label: {
      color: '#303940'
    }
  }

  const seriesItemStyle = {
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 6
  }

  const legendTextStyle = {
    color: '#979EA4',
    fontSize: 14
  }
  const axisLabelStyle = {
    fontSize: 14,
    color: '#303940'
  }

  const series: object[] = []
  seriesArr?.forEach((item: object) => {
    series?.push({
      ...item,
      type: 'bar',
      emphasis: emphasisStyle,
      itemStyle: seriesItemStyle,
      label: {
        show: true,
        fontWeight: 'bold',
        color: '#fff'
      }
    })
  })

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    color: color || ['#4DA2F1', '#FF6482'],
    barWidth: barWidth,
    legend: {
      data: makeTranslationData(legendData),
      align: 'auto',
      bottom: 0,
      textStyle: legendTextStyle
    },
    grid: {
      left: gridLeft,
      right: 8,
      top: 8,
      bottom: gridBottom,
      containLabel: true,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            formatter: function (params: { value: string, seriesData: { value: number }[] }) {
              return `${params.value}: ${calcTotal(params.seriesData)}`
            }
          }
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        data: makeTranslationData(xAxisData),
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: {
      axisLabel: axisLabelStyle
    },
    series: series
  }

  return (
    <ReactEcharts
      option={option}
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
