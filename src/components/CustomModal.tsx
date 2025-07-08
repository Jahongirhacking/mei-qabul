import { Modal, ModalProps } from "antd"

interface ICustomModal extends ModalProps {
  isUpdate?: boolean
  onSubmit?: () => void
}

export function CustomModal({ children, title, isUpdate = false, onCancel, onSubmit, ...props }: ICustomModal) {
  return (
    <Modal title={title ? title : isUpdate ? "Tahrirlash" : "Qo'shish"} footer={null} onCancel={onCancel} {...props}>
      <div className="mt-6 mb-10">{children}</div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          type="button"
          className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Bekor qilish
        </button>

        <button
          type="submit"
          onClick={onSubmit}
          className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Saqlash
        </button>
      </div>
    </Modal>
  )
}
