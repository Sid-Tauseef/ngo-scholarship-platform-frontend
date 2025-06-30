import FormDialog from '../../components/FormDialog';
import MemberForm from './MemberForm';

export default function EditMemberModal({ isOpen, initialData, onClose, onSave }) {
  return (
    <FormDialog title="Edit Member" isOpen={isOpen} onClose={onClose}>
      <MemberForm
        initialData={initialData}
        onSubmit={onSave}
        onCancel={onClose}
      />
    </FormDialog>
  );
}
