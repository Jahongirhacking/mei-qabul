
import { IApplicant, useGetApplicants } from '@/admin/api/services/user.service'
import { Container } from '@/admin/components/Container'
import { PaginationTable } from '@/admin/components/table/PaginationTable'
import { usePagination } from '@/admin/hooks/usePagination'
import { Input, TableColumnsType, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ApplicantsPage() {
    const { pagination, setPagination } = usePagination();
    const [search, setSearch] = useState('');
    const searched = useRef(search);
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isFetching } = useGetApplicants({ ...pagination, search })

    const columns: TableColumnsType<IApplicant> = [
        {
            title: 'F.I.O.',
            render: (_, record) => (
                <>
                    {record.lastName} {record.firstName} {record.fatherName}
                </>
            )
        },
        {
            title: 'PINFL',
            dataIndex: 'pinfl'
        },
        {
            title: 'Telefon raqam',
            dataIndex: 'phoneNumber',
            render: (phone) => <a href={`tel:${phone}`}>+{phone}</a>
        },
        {
            title: 'Holati',
            dataIndex: 'isActive',
            render: (isActive) => isActive ? <Tag color='success'>Faol</Tag> : <Tag color='red'>Nofaol</Tag>
        },
    ]

    useEffect(() => {
        if (search !== searched.current) {
            searched.current = search;
            const params = new URLSearchParams(searchParams);
            params.set('page', '1');
            setSearchParams(params);
        }
    }, [search, searchParams, setSearchParams])

    return (
        <Container
            title="Abituriyentlar"
            extra={<Input.Search allowClear enterButton placeholder='Qidirish' onSearch={(value) => { setSearch(value) }} />}
        >
            <PaginationTable
                loading={isFetching}
                total={data?.page.totalElements}
                dataSource={data?.content}
                columns={columns}
                pagination={pagination}
                setPagination={setPagination}
                rowKey={'id'}
            />
        </Container>
    )
}
