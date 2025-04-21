import { toast } from 'react-toastify';

const toastSuccess = (msg) => {
    toast.success(msg, {
      position: 'bottom-right',
      className: 'toast-message'
    })
  }
  const toastError = (msg) => {
    toast.error(msg, {
      position: 'bottom-right',
      className: 'toast-message'
    })
  }


  export {toastSuccess, toastError}