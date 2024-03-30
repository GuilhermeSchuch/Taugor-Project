import { toast } from 'react-toastify';

const Notification = ({ text, type }) => {
  return (
    <>
      {type === "error" && (
        toast.error(text, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark"
        })
      )}

      {type === "success" && (
        toast.success(text, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark"
        })
      )}

      {type === "info" && (
        toast.info(text, {
          position: "top-right",
          autoClose: 5000,
          delay: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark"
        })
      )}  
    </>
  )
}

export default Notification