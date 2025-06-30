import FormDialog from '../../components/FormDialog';
import InstituteForm from './InstituteForm';

export default function AddInstituteModal({ isOpen, onClose, onSave }) {
  return (
    <FormDialog title="Add New Institute" isOpen={isOpen} onClose={onClose}>
      <InstituteForm onSubmit={onSave} onCancel={onClose} />
    </FormDialog>
  );
}
