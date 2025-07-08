import { useCancelContract, useGetContracts } from '@/api/services/contract.service'
import { Loader } from '@/components/Loader'
import { XaznaBanner } from '@/components/ads/XaznaBanner'
import { ContractCard } from '@/components/cards/ContractCard'
import { Modal } from 'antd'
import { toast } from 'sonner'

export default function ContractsPage() {
  const { confirm } = Modal

  const {
    data: contracts = [],
    isFetching: contractsLoading,
    refetch: refetchContracts
  } = useGetContracts()

  const { mutate: cancelContract, isPending: isCancelPending } = useCancelContract({
    onSuccess: () => {
      refetchContracts()
      toast.success('Shartnomani bekor qilishga ariza muvaffaqiyatli yuborildi!')
    }
  })

  const onContractCancel = (contractId: number) => {
    confirm({
      title: 'Rostdan ham shartnomani bekor qilmoqchimisiz?',
      content: 'Shartnomani bekor qilishni tasdiqlaysizmi?',
      okText: 'Ha, bekor qilish',
      okType: 'danger',
      cancelText: "Yo'q, orqaga qaytish",
      onOk() {
        cancelContract(contractId)
      }
    })
  }

  if (contractsLoading || isCancelPending) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-5">Mening shartnomam</h1>

      {contracts.length > 0 ? (
        <div>
          <div className="flex flex-col gap-4">
            {contracts.map((contract) => (
              <ContractCard
                key={contract.id}
                contract={contract}
                onContractCancel={onContractCancel}
              />
            ))}
          </div>

          <XaznaBanner />
        </div>
      ) : (
        <NoContract />
      )}
    </div>
  )
}

function NoContract() {
  return (
    <div className="w-full flex justify-center items-center h-64 border-dashed border-gray-400 border mx-auto max-w-2xl rounded-3xl">
      <p className="text-gray-500 text-2xl">Shartnoma mavjud emas</p>
    </div>
  )
}
