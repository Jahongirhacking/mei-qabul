import { useEffect } from 'react'

import { useCreateContractWithContractType } from '@/api/services/application.service'
import { useGetContractTemplateTypesList } from '@/api/services/common.service'
import { Contract } from '@/api/services/contract.service'
import contractImage from '@/assets/contract.png'
import AnimatedButton from '@/components/AnimatedButton'
import { CustomModal } from '@/components/CustomModal'
import { SelectInput } from '@/components/inputs/SelectInput'
import { ContractStatusText } from '@/components/shared/ContractStatusText'
import { useModalCRUD } from '@/hooks/useModalCRUD'
import { ContractStatusEnum } from '@/types/enum'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Form, QRCode } from 'antd'
import { CreditCard, FileDown, PencilIcon } from 'lucide-react'

type Props = {
  contract: Contract
  onContractCancel: (id: number) => void
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm"
}

export type FormValues = {
  contractType: number
}

type P = {
  id: number
} & FormValues

const xaznaLink =
  'https://pay.xazna.uz/billing/universal?merchantId=6ad325ed-7ff3-42e1-877f-a3a1a23e6743'

export function ContractCard({ contract, onContractCancel }: Props) {
  const isCancelVisible = contract.status === ContractStatusEnum.APPROVED
  const { onCreate, isOpen, closeModal, form } = useModalCRUD<P>()
  const queryClient = useQueryClient()

  const { update, isUpdating: isCreateContract } = useCreateContractWithContractType({
    onSuccess: (data) => {
      window.open(data.data, '_blank')
      closeModal()
      queryClient.invalidateQueries({
        queryKey: ['/applicant/applications']
      })
    }
  })

  const { data } = useGetContractTemplateTypesList()

  const onSubmit = () => {
    form.validateFields().then((values) => {
      update({
        data: { contractTemplateTypeId: values.contractType as number },
        id: contract.id
      })
    })
  }

  useEffect(() => {
    if (contract) {
      form.setFieldValue('contractType', contract.contractTemplateTypeId == 11 ? 12 : 11)
    }
  }, [contract, form])

  return (
    <div>
      <div className="flex gap-5 max-md:flex-col">
        <section className="gap-6 rounded-3xl bg-university-green grow">
          <div className="flex justify-between items-start  py-5 px-8 border-b border-gray-400">
            <div>
              <h2 className="text-xl font-semibold">Shartnoma ID - {contract.id}</h2>
              <p className="text-university-primary-700 font-semibold text-xl">
                {formatCurrency(contract.contractSum)}
              </p>
            </div>
            <div>
              <div className="text-gray-500 text-ld">
                <span>Yaratilgan vaqt: </span>
                <span>{formatDate(contract.contractRegisterDate)}</span>
              </div>
              <p>
                Status: <ContractStatusText status={contract.status} />
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Qabul turi</p>
                <p className="font-medium">{contract.eduType}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Ta'lim kursi</p>
                <p className="font-medium">{contract.eduLevel}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Ta'lim shakli</p>
                <p className="font-medium">{contract.degree}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Ta'lim tili</p>
                <p className="font-medium">{contract.language}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Ta'lim yo'nalishi</p>
                <p className="font-medium">{contract.speciality}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Shartnoma turi</p>
                <p className="font-medium">{contract.contractTemplateType}</p>
              </div>
            </div>

            {isCancelVisible && (
              <div className="px-4 flex justify-end">
                <Button shape="round" danger onClick={() => onContractCancel(contract.id)}>
                  Shartnomani bekor qilish
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="gap-2 rounded-3xl bg-university-green p-4 md:w-[330px] flex flex-col justify-between items-center">
          <h2 className="text-xl font-semibold">Shartnoma </h2>

          <img src={contractImage} alt="shartnoma" className="w-40" />

          <div className="flex  gap-2">
            <a href={contract.contractUrl} target="_blank">
              <AnimatedButton className="py-2">
                <FileDown size={20} />
              </AnimatedButton>
            </a>
            <AnimatedButton className="py-2" onClick={onCreate}>
              <PencilIcon size={20} />
            </AnimatedButton>
          </div>
        </section>

        <section className="gap-2 rounded-3xl bg-university-green p-4 md:w-[330px] flex flex-col justify-between items-center">
          <h2 className="text-xl font-semibold">To‘lov qilish</h2>

          <div>
            <QRCode
              errorLevel="H"
              value={xaznaLink}
              size={140}
              icon="https://play-lh.googleusercontent.com/0unxfuNkP2tljQrDwVMnsreRmsPH1A9hiNFbggLjQTZdHWcI0zsOb2VzzEcLy75rxHY=w240-h480-rw"
            />
          </div>

          <div>
            <a href={xaznaLink} target="_blank">
              <AnimatedButton className="py-2">
                <CreditCard /> To‘lov
              </AnimatedButton>
            </a>
          </div>
        </section>
      </div>

      <CustomModal
        isUpdate={isCreateContract}
        title="Shartnoma turi"
        open={isOpen}
        onCancel={closeModal}
        onSubmit={form.submit}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item name="contractType" label="Shartnoma turi" rules={[{ required: true }]}>
            <SelectInput
              allowClear={false}
              placeholder="Shartnoma turini tanlang"
              options={data?.map((item) => ({
                label: item.name,
                value: item.id,
                disabled: contract.contractTemplateTypeId == item.id
              }))}
            />
          </Form.Item>
        </Form>
      </CustomModal>
    </div>
  )
}
