import { FastSpinner } from "@/components/shared/FastSpinner";
import { ToastSuccess } from "@/components/shared/ToastMassage";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import { CopyIcon, FileText, PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";

const ClientNote = ({ note, customerId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteValue, setNoteValue] = useState(note || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleCopy = async () => {
    if (noteValue) {
      try {
        await navigator.clipboard.writeText(noteValue);
        ToastSuccess('Notes copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement save functionality
      console.log('Saving note for customer:', customerId, noteValue);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setNoteValue(note || '');
    setIsEditing(false);
  };

  return (
    <>
      {
        isEditing ? (
          <InputGroup className="dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md w-full h-full transition-all duration-200 ease-in-out">
            <InputGroupTextarea
              id="note"
              value={noteValue}
              onChange={(e) => setNoteValue(e.target.value)}
              placeholder="Add notes about this client..."
              // {...register('note')}
              className="flex-1 w-full h-full"
            />
            <InputGroupAddon align="block-start" className="border-b">
              <InputGroupText >
                <span className="flex items-center gap-1.5 text-primary text-base"><FileText /> Notes</span>
              </InputGroupText>
            </InputGroupAddon>

            <InputGroupAddon align="block-end" className="border-t">
              <InputGroupButton size="sm" className="ml-auto" variant="default" onClick={handleSave}
                disabled={isSaving}>
                {
                  isSaving
                    ? <><FastSpinner />Saving</>
                    : <><SaveIcon />Save</>
                }
              </InputGroupButton>
              <InputGroupButton size="sm" variant="outline" onClick={handleCancel} disabled={isSaving}>
                <XIcon /> Cancel
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        ) : (
          <InputGroup className="dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md transition-all duration-200 ease-in-out pointer-events-none">
            <InputGroupTextarea
              id="note"
              value={noteValue}
              placeholder="Add any additional notes about the client..."
              className="flex-1 resize-none"
              readOnly
            />
            <InputGroupAddon align="block-start" className="border-b">
              <InputGroupText >
                <span className="flex items-center gap-1.5 text-primary text-base"><FileText /> Notes</span>
              </InputGroupText>
            </InputGroupAddon>

            <InputGroupAddon align="block-end" className="border-t">
              <InputGroupButton size="sm" className="ml-auto pointer-events-auto" variant="default" onClick={() => setIsEditing(true)}>
                <PencilIcon className="size-4" /> Edit
              </InputGroupButton>
              <InputGroupButton size="sm" className="ml-auto pointer-events-auto" variant="secondary" onClick={handleCopy}>
                <CopyIcon className="size-4" /> Copy
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        )
      }
    </>
  );
};

export default ClientNote;