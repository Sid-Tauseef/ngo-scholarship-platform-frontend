import FormDialog from '../../components/FormDialog';
import NotificationForm from './NotificationForm';

export default function AddNotificationModal({ isOpen, onClose, onSave }) {
  return (
    <FormDialog 
      title="Add New Notification" 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <NotificationForm onSubmit={onSave} onCancel={onClose} />
    </FormDialog>
  );
}