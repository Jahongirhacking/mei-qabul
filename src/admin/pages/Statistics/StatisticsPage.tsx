import {
  useGetAppCountByAdmissionType,
  useGetAppCountByEduForm,
  useGetAppCountByExamType,
  useGetAppCountByGender,
  useGetAppCountByLanguage,
  useGetAppCountByLastTenDay,
  useGetAppCountByRegion,
  useGetAppCountBySpeciality,
  useGetAppCountEduOrg,
  useGetAppCountSchoolGraduated
} from '@/admin/api/services/admission.service'
import { useAuthStore } from '@/admin/app/store/authStore'
import BarChart from '@/admin/components/charts/BarChart'
import BarChartCategory from '@/admin/components/charts/BarChartCategory'
import PieChart from '@/admin/components/charts/Piechart'
import GraphInfoCard from '@/admin/components/graphInfoCard/graphInfoCard'
import { Col, Row } from 'antd'

export default function StatisticsPage() {
  const universityCode = Number(useAuthStore((state) => state.user.universityCode))
  const { data: examType, isFetching: loadingExamType } = useGetAppCountByExamType({
    universityCode
  })
  const { data: gender, isFetching: loadingGender } = useGetAppCountByGender({
    universityCode
  })
  const { data: speciality, isFetching: loadingSpeciality } = useGetAppCountBySpeciality({
    universityCode
  })
  const { data: eduForm, isFetching: loadingEduForm } = useGetAppCountByEduForm({
    universityCode
  })
  const { data: language, isFetching: loadingLanguage } = useGetAppCountByLanguage({
    universityCode
  })
  const { data: tenDay, isFetching: loadingLastTenDay } = useGetAppCountByLastTenDay({
    universityCode
  })
  const { data: region, isFetching: loadingRegion } = useGetAppCountByRegion({
    universityCode
  })
  const { data: admissionType, isFetching: loadingAdmissionType } = useGetAppCountByAdmissionType({
    universityCode
  })
  const { data: eduOrg, isFetching: loadingEduOrg } = useGetAppCountEduOrg({
    universityCode
  })

  const { data: school, isFetching: loadingSchool } = useGetAppCountSchoolGraduated({
    universityCode
  })

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} xxl={12}>
          <GraphInfoCard title="Imtihon turi bo'yicha ariza topshirganlar" graphHeight={336}>
            <BarChartCategory
              barWidth={35}
              seriesArr={[
                {
                  data: examType ? examType.map((item) => item.count) : [],
                  name: 'Abiturientlar soni'
                }
              ]}
              legendData={examType ? examType.map((item) => item.name) : []}
              color={['#1677ff']}
              loading={loadingExamType}
            />
          </GraphInfoCard>
        </Col>

        <Col xs={24} xxl={12}>
          <GraphInfoCard title="Jinsi bo'yicha ariza topshirganlar" graphHeight={336}>
            <PieChart
              loading={loadingGender}
              legendBottom={0}
              seriesArr={[
                { name: 'Erkaklar', value: gender?.find((item) => item.name === 'Erkak')?.count || 0 },
                { name: 'Ayollar', value: gender?.find((item) => item.name === 'Ayol')?.count || 0 }
              ]}
              color={['#43B1A0', '#4DA2F1']}
            />
          </GraphInfoCard>
        </Col>

        <Col xs={24}>
          <GraphInfoCard
            title="Ta'lim yo'nalishlari kesimida ariza topshirganlar"
            graphHeight={440}
          >
            <BarChart
              gridBottom={-4}
              legendData={speciality ? speciality.map((item) => item.name) : []}
              marginTop={-30}
              xAxisRotate={10}
              loading={loadingSpeciality}
              seriesArr={[
                {
                  data: speciality ? speciality.map((item) => item.count) : [],
                  name: 'Abiturientlar soni'
                }
              ]}
              color={['#faad14']}
            />
          </GraphInfoCard>
        </Col>

        <Col xs={24} xxl={12}>
          <GraphInfoCard title="Ta'lim shakllari kesimida ariza topshirganlar" graphHeight={336}>
            <BarChart
              legendData={eduForm ? eduForm.map((item) => item.name) : []}
              loading={loadingEduForm}
              seriesArr={[
                {
                  data: eduForm ? eduForm.map((item) => item.count) : [],
                  name: 'Abiturientlar soni'
                }
              ]}
              color={['#5cdbd3']}
            />
          </GraphInfoCard>
        </Col>

        <Col xs={24} xxl={12}>
          <GraphInfoCard title="Ta'lim tili bo'yicha ariza topshirganlar" graphHeight={336}>
            <PieChart
              loading={loadingLanguage}
              legendBottom={0}
              seriesArr={
                language ? language.map((item) => ({ name: item.name, value: item.count })) : []
              }
            />
          </GraphInfoCard>
        </Col>

        <Col xs={24}>
          <GraphInfoCard title="Oxirgi 10 kunda ariza  topshirganlar" graphHeight={336}>
            <BarChart
              gridBottom={-4}
              legendData={tenDay ? tenDay.map((item) => item.name) : []}
              marginTop={-30}
              xAxisRotate={15}
              loading={loadingLastTenDay}
              seriesArr={[
                {
                  data: tenDay ? tenDay.map((item) => item.count) : [],
                  name: 'Abiturientlar soni'
                }
              ]}
              color={['#7D7AFF']}
            />
          </GraphInfoCard>
        </Col>

        <Col xs={24}>
          <GraphInfoCard title="Viloyatlar kesimida ariza topshirganlar" graphHeight={336}>
            <BarChart
              gridBottom={-4}
              legendData={region ? region.map((item) => item.name) : []}
              marginTop={-30}
              xAxisRotate={15}
              loading={loadingRegion}
              seriesArr={[
                {
                  data: region ? region.map((item) => item.count) : [],
                  name: 'Abiturientlar soni'
                }
              ]}
              color={['#84D1ED']}
            />
          </GraphInfoCard>
        </Col>

        <Col xs={24} xxl={12}>
          <GraphInfoCard title="Qabul turi bo'yicha ariza topshirganlar" graphHeight={336}>
            <PieChart
              loading={loadingAdmissionType}
              legendBottom={-5}
              seriesArr={
                admissionType
                  ? admissionType.map((item) => ({ name: item.name, value: item.count }))
                  : []
              }
            />
          </GraphInfoCard>
        </Col>

        <Col xs={24} xxl={12}>
          <GraphInfoCard
            title="Ariza topshirganlar soni ta'lim muassasa bitiruvchilari kesimida"
            graphHeight={336}
          >
            <BarChartCategory
              barWidth={35}
              gridLeft={20}
              seriesArr={[
                {
                  data: eduOrg ? eduOrg.map((item) => item.count) : [],
                  name: 'Abiturientlar soni'
                }
              ]}
              legendData={eduOrg ? eduOrg.map((item) => item.name) : []}
              color={['#1677ff']}
              loading={loadingEduOrg}
            />
          </GraphInfoCard>
        </Col>

        <Col xs={12}>
          <GraphInfoCard title="Maktab bitiruvchilari soni yillar kesimida" graphHeight={336}>
            <BarChart
              gridBottom={-4}
              legendData={school ? school.map((item) => item.name) : []}
              marginTop={-30}
              xAxisRotate={15}
              loading={loadingSchool}
              seriesArr={[
                {
                  data: school ? school.map((item) => item.count) : [],
                  name: 'Bitiruvchilar soni'
                }
              ]}
              color={['rgb(114, 72, 69)']}
            />
          </GraphInfoCard>
        </Col>
      </Row>
    </>
  )
}
