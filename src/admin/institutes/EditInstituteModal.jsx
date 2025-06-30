import FormDialog from '../../components/FormDialog';
import InstituteForm from './InstituteForm';

export default function EditInstituteModal({ isOpen, initialData, onClose, onSave }) {
  return (
    <FormDialog title="Edit Institute" isOpen={isOpen} onClose={onClose}>
      <InstituteForm
        initialData={initialData}
        onSubmit={onSave}
        onCancel={onClose}
      />
    </FormDialog>
  );
}
