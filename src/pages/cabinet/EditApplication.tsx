import { useGetEduDegreesListByFilter, useGetSpecialtiesListByFilter } from "@/admin/api/services/common.service";
import { EduTypeIdEnum } from "@/admin/types/enum";
import { useGetApplications, useUpdateApplication } from "@/api/services/application.service";
import { ApplicationStatusEnum } from "@/types/enum";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Select, Skeleton } from "antd";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditApplication = () => {
    const [degreeIdByFilter, setDegreeIdByFilter] = useState<number>();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { data: applicationData, isFetching: isApplicationFetching, refetch: refetchApplication } = useGetApplications();

    const { data: degreeListByFilter, isFetching: isDegreeFetching } = useGetEduDegreesListByFilter({
        params: {
            admissionTypeId: 1,
            eduLevelId: 11,
            eduTypeId: EduTypeIdEnum.BAKALAVR
        },
        enabled: true
    });

    const { data: specialtiesListByFilter, isLoading: isSpecialtyLoading } = useGetSpecialtiesListByFilter({
        params: {
            degreeId: degreeIdByFilter
        },
        enabled: !!degreeIdByFilter
    });

    const { update: updateApplication, isUpdating: isUpdatePending } = useUpdateApplication(
        {
            onSuccess: () => {
                refetchApplication()
                toast.success("Заявление успешно изменена!")
            }
        }
    )

    // Set form initial values after applicationData and degree list load
    useEffect(() => {
        if (applicationData && degreeListByFilter) {
            const selectedDegree = degreeListByFilter.find(
                d => d?.name === applicationData?.degree
            );
            if (selectedDegree?.id) {
                form.setFieldsValue({ degreeId: selectedDegree.id });
                setDegreeIdByFilter(selectedDegree.id);
            }
        }
    }, [applicationData, degreeListByFilter, form]);

    useEffect(() => {
        if (applicationData && specialtiesListByFilter) {
            const selectedSpeciality = specialtiesListByFilter.find(
                s => s?.speciality === applicationData?.speciality
            );
            if (selectedSpeciality?.specialityId) {
                form.setFieldsValue({ specialityId: selectedSpeciality.specialityId });
            }
        }
    }, [applicationData, specialtiesListByFilter, form]);

    const handleSubmit = async (values: { degreeId: number, specialityId: number }) => {
        updateApplication(values);
    };

    if (applicationData && applicationData?.status !== ApplicationStatusEnum.CANCELLED) return <Navigate to={'/user'} replace />

    return (
        <>
            {isDegreeFetching || isApplicationFetching ? (
                <Skeleton active />
            ) : (
                <Form
                    className="user-edit-application"
                    onFinish={handleSubmit}
                    form={form}
                    layout="vertical"
                    initialValues={{
                        specialityId: specialtiesListByFilter?.find(el => el?.speciality === applicationData?.speciality)?.specialityId
                    }}
                >
                    <Flex vertical gap={8}>
                        <Flex vertical gap={4}>
                            <Form.Item
                                name="degreeId"
                                rules={[{ required: true, message: "Выберите форму обучения" }]}
                                label="Форма обучения"
                            >
                                <Select
                                    options={degreeListByFilter?.map(el => ({
                                        label: el?.name,
                                        value: el?.id
                                    }))}
                                    placeholder="Выберите форму обучения"
                                    onChange={(value) => {
                                        setDegreeIdByFilter(value);
                                        form.setFieldsValue({ specialityId: undefined });
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="specialityId"
                                rules={[{ required: true, message: "Выберите направление обучения" }]}
                                label="Направление обучения"
                            >
                                <Select
                                    loading={isSpecialtyLoading}
                                    options={specialtiesListByFilter?.map(el => ({
                                        label: el?.speciality,
                                        value: el?.specialityId
                                    }))}
                                    placeholder="Выберите направление обучения"
                                    disabled={!degreeIdByFilter}
                                />
                            </Form.Item>
                        </Flex>

                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginLeft: "auto" }}
                            icon={isUpdatePending ? <LoadingOutlined /> : <Edit size={15} />}
                        >
                            Редактировать
                        </Button>
                    </Flex>
                </Form>
            )}
        </>
    );
};

export default EditApplication;
