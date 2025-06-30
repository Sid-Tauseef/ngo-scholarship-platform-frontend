import FormDialog from '../../components/FormDialog';
import MemberForm from './MemberForm';

export default function AddMemberModal({ isOpen, onClose, onSave }) {
  return (
    <FormDialog title="Add New Member" isOpen={isOpen} onClose={onClose}>
      <MemberForm onSubmit={onSave} onCancel={onClose} />
    </FormDialog>
  );
}
