import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  useGetEduDegreesList,
  useGetEduLanguagesList,
  useGetEduLevelsList,
  useGetEduSubjectsList
} from '@/admin/api/services/common.service'
import { Specialty, SpecialtyDto, useUpdateSpecialty } from '@/admin/api/services/specialty.service'
import paths from '@/admin/app/router/paths'
import { Container } from '@/admin/components/Container'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { BaseTable } from '@/admin/components/table/BaseTable'
import { EduLevel } from '@/admin/types/Classificatory'
import { Button, Form, FormProps, Switch, TableColumnsType } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { SaveIcon } from 'lucide-react'

const scores: ScoreType[] = [
  {
    priority: 1,
    score: 3.2
  },
  {
    priority: 2,
    score: 3.1
  }
]

type ScoreType = {
  priority: number
  score: number
}

type FormValues = {
  educationLevels: {
    [eduLevelId: string]: {
      [degreeId: string]: number[] | undefined
    }
  }
  subjects: {
    [priority: string]: number
  }
  description?: string
  availableRecommendation: boolean
}

type Props = FormProps<FormValues> & {
  specialty: Specialty
}

function generateInitialValues(specialty: Specialty): FormValues {
  return {
    educationLevels: specialty.educationLevels.reduce(
      (acc, level) => {
        return {
          ...acc,
          [level.educationLevelId]: level.degrees.reduce(
            (acc, degree) => {
              return {
                ...acc,
                [degree.degreeId]: degree.languageIds
              }
            },
            {} as { [degreeId: string]: number[] }
          )
        }
      },
      {} as { [eduLevelId: string]: { [degreeId: string]: number[] } }
    ),
    subjects: specialty.subjects.reduce(
      (acc, subject) => {
        return {
          ...acc,
          [subject.priority]: subject.id
        }
      },
      {} as { [priority: string]: number }
    ),
    description: specialty.description,
    availableRecommendation: specialty.availableRecommendation
  }
}

export const SpecialtyForm = ({ specialty, ...props }: Props) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const admissionTypeId = searchParams.get('admissionTypeId')

  const { data: eduLevels } = useGetEduLevelsList()
  const { data: eduDegrees = [] } = useGetEduDegreesList()
  const { data: eduLanguages } = useGetEduLanguagesList()
  const { data: eduSubjects = [] } = useGetEduSubjectsList()

  const { isUpdating, update } = useUpdateSpecialty({
    onSuccess: () => {
      navigate(paths.specialties)
    }
  })

  const columns: TableColumnsType<EduLevel> = [
    {
      title: 'Kurs',
      dataIndex: 'name'
    },
    ...eduDegrees.map((degree) => ({
      title: degree.name,
      dataIndex: 'id',
      render: (id: number) => {
        return (
          <Form.Item name={['educationLevels', `${id}`, `${degree.id}`]} noStyle>
            <SelectInput
              style={{ minWidth: '150px' }}
              mode="multiple"
              options={eduLanguages?.map((item) => ({ label: item.name, value: item.id }))}
              placeholder="Talim tili"
            />
          </Form.Item>
        )
      }
    }))
  ]

  const subjectsColumns: TableColumnsType<ScoreType> = [
    {
      title: 'Blok',
      dataIndex: 'priority',
      render: (priority) => <span>{priority} blok</span>
    },
    {
      title: 'Fan',
      dataIndex: 'priority',
      render: (priority: number) => {
        return (
          <Form.Item name={['subjects', `${priority}`]} noStyle rules={[{ required: true }]}>
            <SelectInput
              style={{ minWidth: '150px' }}
              options={eduSubjects?.map((item) => ({ label: item.name, value: item.id }))}
              placeholder="Talim fani"
            />
          </Form.Item>
        )
      }
    }
  ]

  const onSubmit = ({
    educationLevels,
    subjects,
    description,
    availableRecommendation
  }: FormValues) => {
    const data: SpecialtyDto = {
      educationLevels: [],
      subjects: [],
      description,
      availableRecommendation
    }

    Object.keys(educationLevels).forEach((eduLevelId) => {
      data.educationLevels.push({
        educationLevelId: Number(eduLevelId),
        degrees: Object.keys(educationLevels[eduLevelId])
          .filter((degreeId) => Boolean(educationLevels[eduLevelId][degreeId]))
          .map((degreeId) => ({
            degreeId: Number(degreeId),
            languageIds: educationLevels[eduLevelId][degreeId] ?? []
          }))
      })
    })

    Object.keys(subjects)
      .filter((key) => subjects[key] !== undefined)
      .forEach((priority) => {
        data.subjects.push({
          score: scores.find((item) => item.priority === Number(priority))!.score,
          priority: Number(priority),
          id: subjects[priority]
        })
      })

    update({
      id: specialty.id,
      data: {
        ...data,
        admissionTypeId
      }
    })
  }

  return (
    <div>
      <Form
        onFinish={onSubmit}
        form={form}
        layout="vertical"
        initialValues={generateInitialValues(specialty)}
        {...props}
      >
        <Container
          hasGoBack
          title={specialty.specialityName}
          extra={
            <Button loading={isUpdating} shape="round" htmlType="submit" type="primary">
              <SaveIcon size={18} />
              Saqlash
            </Button>
          }
        >
          <BaseTable columns={columns} dataSource={eduLevels} pagination={false} />

          <Form.Item
            name="description"
            label="Tavsifi"
            style={{ width: '100%', margin: '20px 0 0' }}
          >
            <TextArea style={{ width: '100%' }} autoSize={{ minRows: 1, maxRows: 6 }} />
          </Form.Item>

          <Form.Item
            name="availableRecommendation"
            label="Tavsiya mavjudmi"
            style={{ width: '100%', margin: '20px 0 0' }}
          >
            <Switch />
          </Form.Item>

          <div className="mt-10">
            <h1 className="text-xl font-semibold mb-4">Imtihon fanlari</h1>

            <BaseTable
              rowKey="priority"
              columns={subjectsColumns}
              dataSource={scores}
              pagination={false}
            />
          </div>
        </Container>
      </Form>
    </div>
  )
}
