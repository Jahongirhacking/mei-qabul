import ReactEcharts from 'echarts-for-react'

interface Props {
  color?: string[]
  seriesArr: { value: number, name: string }[]
  legendSize?: number
  gridBottom?: number
  marginTop?: number
  legendBottom?: number | string
  orient?: string
  legendLeft?: string | number
  titleLeft?: string | number
  pieLeft?: string | number
  loading: boolean
  pieTop?: string
}

export default function PieChart({
  color,
  seriesArr,
  legendSize = 12,
  marginTop = -40,
  orient = 'horizontal',
  legendBottom = 20,
  legendLeft = 'center',
  titleLeft = 'center',
  pieLeft = '50%',
  pieTop = '50%',
  loading
}: Props) {
  //Translation section

  //Chart section

  const legendTextStyle = {
    color: '#6f7172',
    fontSize: legendSize,
    fontWeight: 'bold',
    rich: {
      term: {
        color: '#303940',
        fontWeight: 'bold'
      }
    }
  }

  const calcPercentage = (part: number, total: number) => {
    return total !== 0 ? ((part / total) * 100).toFixed(2) : 0
  }

  interface ISeries {
    value: number
    name: string
  }

  const series: ISeries[] = []
  seriesArr?.forEach((item: { value: number, name: string }) => {
    series?.push({ value: item?.value, name: item?.name })
  })

  const obj: Record<string, ISeries['value']> = {}
  series.forEach((element: ISeries) => {
    obj[`${element.name}`] = element.value
  })

  const total = series.reduce((acc: number, box: { value: number }) => acc + box.value, 0)

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: orient,
      left: legendLeft,
      bottom: legendBottom,
      textStyle: legendTextStyle,
      formatter: (e: string) => {
        return `${e} {term|${calcPercentage(obj[`${e}`], total)}%}`
      }
    },
    title: {
      text: seriesArr?.reduce((acc: number, next: { value: number }) => acc + next.value || 0, 0),
      left: `${titleLeft}`,
      top: 'center'
    },
    color: color || ['#84D1ED', '#FF6482', '#43B1A0', '#FFD426', '#1677ff', '#7D7AFF'],
    series: [
      {
        // name: "Access From",
        type: 'pie',
        radius: [70, 120],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {},
        labelLine: {
          show: false
        },
        center: [pieLeft, pieTop],
        data: series || []
      }
    ]
  }

  return (
    <ReactEcharts
      option={option}
      style={{ marginTop: marginTop, position: 'relative', width: 'inherit' }}
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
