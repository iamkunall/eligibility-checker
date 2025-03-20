import toast from 'react-hot-toast';

const notify = (message: string, type = 'success') => {
  const toastOptions = {
    style: {
      border: type === 'success' ? '1px solid green' : '1px solid red',
      padding: '16px',
      color: type === 'success' ? 'green' : 'red',
      backgroundColor: type === 'success' ? '#e0f7e4' : '#fce8e6',
    },
    iconTheme: {
      primary: type === 'success' ? 'green' : 'red',
      secondary: '#fff',
    },
  };

  if (type === 'success') {
    toast.success(message, toastOptions);
  } else if (type === 'error') {
    toast.error(message, toastOptions);
  } else {
    toast(message, toastOptions);
  }
};

export default notify;
