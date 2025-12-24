import { Snackbar, Alert } from '@mui/material';
import { useNotificationStore } from '../stores/useNotificationStore';

export const Notification = () => {
  // ストアから必要なデータだけ持ってくる
  const { open, message, severity, hideNotification } = useNotificationStore();

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={hideNotification}>
      <Alert onClose={hideNotification} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Notification;