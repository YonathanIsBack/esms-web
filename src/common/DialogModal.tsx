import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface DialogModalProps {
  openModal: boolean;
  onOpenChange: (details: { open: boolean }) => void;
  title: ReactNode;
  body: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const DialogModal = ({
  openModal,
  onOpenChange,
  title,
  body,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: DialogModalProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange({ open: false });
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange({ open: false });
  };

  return (
    <Dialog.Root open={openModal} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content backgroundColor="var(--color-surface)">
            <Dialog.Header
              backgroundColor="var(--color-primary)"
              borderTopRadius="md"
            >
              <Dialog.Title color="white">{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{body}</Dialog.Body>
            <Dialog.Footer>
              <Button
                color="var(--color-secondary)"
                border="1px solid var(--color-border)"
                size="sm"
                onClick={handleCancel}
              >
                {cancelText}
              </Button>
              <Button
                backgroundColor="var(--color-secondary)"
                color="white"
                _hover={{ backgroundColor: "var(--color-primary)" }}
                size="sm"
                border="none"
                onClick={handleConfirm}
              >
                {confirmText}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="white" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DialogModal;
