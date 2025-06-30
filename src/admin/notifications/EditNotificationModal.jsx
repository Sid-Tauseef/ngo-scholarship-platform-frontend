import FormDialog from '../../components/FormDialog';
import NotificationForm from './NotificationForm';

export default function EditNotificationModal({ 
  isOpen, 
  initialData, 
  onClose, 
  onSave 
}) {
  return (
    <FormDialog 
      title="Edit Notification" 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <NotificationForm 
        initialData={initialData} 
        onSubmit={onSave} 
        onCancel={onClose} 
      />
    </FormDialog>
  );
}