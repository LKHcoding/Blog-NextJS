import { Flip, toast as reactToastify, ToastContent, ToastOptions } from 'react-toastify';

const toast = {
  info: (content: ToastContent, options?: ToastOptions | undefined) =>
    reactToastify.info(content, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      transition: Flip,
      ...options,
    }),
  error: (content: ToastContent, options?: ToastOptions | undefined) =>
    reactToastify.error(content, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      transition: Flip,
      ...options,
    }),
};

export default toast;
