import { useGetApplicationDetail } from "@/admin/api/services/common.service"
import { SearchParams } from "@/admin/utils/constants"
import { LoadingOutlined } from "@ant-design/icons"
import { Descriptions, Flex, message, Modal, Typography } from "antd"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const ApplicationDetailModal = ({ isOpen = false, onCancel }: { isOpen?: boolean, onCancel?: () => void }) => {
    const [searchParams] = useSearchParams();
    const { data: application, isFetching, isError } = useGetApplicationDetail({ id: Number(searchParams.get(SearchParams.ApplicationId)) },)

    useEffect(() => {
        if (isError) {
            if (onCancel) onCancel();
            message.destroy();
            message.warning("Ariza ma'lumoti topilmadi!")
        }
    }, [isError, onCancel])

    return (
        <Modal
            open={isOpen}
            maskClosable
            onCancel={onCancel}
            footer={null}
        >
            {
                isFetching ? (
                    <LoadingOutlined />
                ) : (
                    <Flex vertical gap={12}>
                        <Typography.Title level={3}>Ariza haqida ma'lumot</Typography.Title>
                        <Descriptions
                            items={[
                                { label: 'F.I.O', children: `${application?.data?.lastName} ${application?.data?.firstName} ${application?.data?.fatherName}`, span: 'filled' },
                                { label: 'JShSHIR', children: `${application?.data?.pinfl}`, span: 'filled' },
                                { label: 'Qabul', children: `${application?.data?.admissionType}`, span: 'filled' },
                                { label: 'Qabul turi', children: `${application?.data?.degree}`, span: 'filled' },
                                { label: "Yo'nalish", children: `${application?.data?.speciality}`, span: 'filled' },
                                { label: "Yo'nalish kodi", children: `${application?.data?.specialityCode}`, span: 'filled' },
                                { label: "Bitirgan ta'lim muassasa", children: `${application?.data?.oldEdu?.eduInstitutionType}`, span: 'filled' },
                                { label: "Bitirgan yili", children: `${application?.data?.oldEdu?.graduatedYear}`, span: 'filled' },
                                { label: "Hujjat", children: <a style={{ color: '#3b82f6' }} href={application?.data?.oldEdu?.schoolCertificate} target="_blank">Bitirganlik haqida hujjat</a>, span: 'filled' },
                            ]}
                        />
                    </Flex>
                )
            }
        </Modal>
    )
}

export default ApplicationDetailModal