import { Space, Statistic } from 'antd'

import { SelectInput } from '../inputs/SelectInput'
import './graphinfo.scss'

interface IGrapfInfoStat {
  name: string
  count?: number
}

interface Props {
  title: string
  stat?: IGrapfInfoStat[]
  children?: React.ReactNode
  graphHeight?: number
  yearList?: { label: number; value: number }[]
  setYear?: (year: number | undefined) => void
  year?: number
  titleW?: boolean
}

function GraphInfoCard({
  title,
  stat,
  children,
  graphHeight,
  yearList,
  setYear,
  year,
  titleW = false
}: Props) {
  return (
    <div className="graphinfo">
      <div className="graphinfo-content">
        <div className={`${stat ? 'flex-row gap-3' : 'grahp-flex mb'} `}>
          <div className={`graphinfo-title ${titleW && 'w-200'}`}>{title}</div>
          {!!stat && (
            <div className="graphinfo-stat">
              {stat.map((item) => {
                return (
                  <div className="graphinfo-stat-card" key={item.name}>
                    <p>{item.name}</p>
                    <h2>
                      <Statistic value={item.count} groupSeparator={' '} />
                    </h2>
                  </div>
                )
              })}
            </div>
          )}

          <Space>
            {yearList && (
              <SelectInput
                placeholder="Yil tanlang"
                style={{ width: '180px' }}
                options={yearList}
                onClear={() => setYear && setYear(undefined)}
                value={year}
                onSelect={setYear}
              />
            )}
          </Space>
        </div>

        <div className={`graphinfo-graph graphinfo-graph-${graphHeight}`}>{children}</div>
      </div>
    </div>
  )
}

export default GraphInfoCard
