import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useGetAdmissionTypeList, useGetEduTypesList } from '@/admin/api/services/common.service'
import {
  Specialty,
  useGetSpecialties,
  useSynchronizeSpecialies
} from '@/admin/api/services/specialty.service'
import paths from '@/admin/app/router/paths'
import { Container } from '@/admin/components/Container'
import { EditIconButton } from '@/admin/components/buttons/EditIconButton'
import { SearchInput } from '@/admin/components/filters/SearchInput'
import { SelectInput } from '@/admin/components/inputs/SelectInput'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { usePermission } from '@/admin/hooks/usePermission'
import { successHandler } from '@/admin/utils/lib'
import { Button, Segmented, TableColumnsType } from 'antd'
import { RefreshCcw } from 'lucide-react'

export default function SpecialtiesPage() {
  const { pagination, setPagination, setSearchParams, searchParams } = usePagination()
  const [eduTypeId, setEduTypeId] = useState<number>()
  const [search, setSearch] = useState<string>()
  const initialAdmissionTypeId = searchParams.get('admissionTypeId')
  const [admissionTypeId, setAdmissionTypeId] = useState<number | undefined>(
    initialAdmissionTypeId ? Number(initialAdmissionTypeId) : 1
  )
  const { isAdmin, isSuperAdmin, isVazirlikAdmin } = usePermission()
  const { data, isFetching, refetch } = useGetSpecialties({
    ...pagination,
    eduTypeId,
    search,
    admissionTypeId
  })
  const { data: eduTypes } = useGetEduTypesList()
  const { data: admissionTypeList } = useGetAdmissionTypeList()
  const { create: synchronize, isCreating: isSynchronize } = useSynchronizeSpecialies({
    onSuccess: (data) => {
      refetch()
      successHandler(data)
    }
  })

  const columns: TableColumnsType<Specialty> = [
    {
      title: 'Kod',
      dataIndex: 'code'
    },
    {
      title: 'Nomi',
      dataIndex: 'specialityName'
    },
    {
      title: "Ta'lim turi",
      dataIndex: 'eduType',
      render: (eduType) => eduType?.name
    },
    {
      title: 'Soha',
      dataIndex: 'formEducation',
      render: (formEducation) => formEducation?.name
    },
    ...(isSuperAdmin || isVazirlikAdmin
      ? [
        {
          title: 'Amallar',
          dataIndex: 'id',
          render: (id: number) => {
            return (
              <Link to={`${paths.specialties}/edit/${id}?admissionTypeId=${admissionTypeId}`}>
                <EditIconButton />
              </Link>
            )
          }
        }
      ]
      : [])
  ]

  const handleAdmissionTypeChange = (value: number) => {
    setAdmissionTypeId(value)
    setPagination({ ...pagination, page: 1 })
    setSearchParams((params) => {
      params.set('admissionTypeId', value.toString())
      return params
    })
  }

  return (
    <div>
      <div className="w-full bg-white rounded-lg p-2 overflow-auto mb-2">
        <Segmented
          defaultValue={admissionTypeId}
          options={
            admissionTypeList?.map((item) => ({
              label: item.name,
              value: item.id
            })) || []
          }
          onChange={handleAdmissionTypeChange}
        />
      </div>
      <Container
        title="Mutaxassisliklar"
        extra={
          <>
            <SearchInput onSearch={setSearch} />
            <SelectInput
              onChange={setEduTypeId}
              placeholder="Ta'lim turi"
              value={eduTypeId}
              options={eduTypes?.map((item) => ({ value: item.id, label: item.name }))}
            />
            {!isAdmin && (
              <Button
                icon={<RefreshCcw size={16} />}
                loading={isSynchronize}
                onClick={() => synchronize()}
                type="primary"
              >
                Synchronize
              </Button>
            )}
          </>
        }
      >
        <PaginationTable
          loading={isFetching}
          total={data?.page.totalElements}
          dataSource={data?.content}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Container>
    </div>
  )
}
