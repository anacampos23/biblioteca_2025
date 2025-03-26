import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "@/hooks/use-translations";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteDialogProps {
  /** ID del elemento a eliminar */
  id: string;
  /** Función para manejar la eliminación */
  onDelete: (id: string) => Promise<void>;
  /** Estado de eliminación en progreso */
  isDeleting?: boolean;
  /** Título del diálogo */
  title?: string;
  /** Descripción del diálogo */
  description?: string;
  /** Texto del botón cancelar */
  cancelText?: string;
  /** Texto del botón eliminar */
  deleteText?: string;
  /** Texto durante la eliminación */
  deletingText?: string;
  /** Mensaje de éxito */
  successMessage?: string;
  /** Mensaje de error */
  errorMessage?: string;
  /** Componente trigger personalizado */
  trigger?: React.ReactNode;
  /** Callback después de eliminar con éxito */
  onSuccess?: () => void;
}

export function DeleteDialog({
  id,
  onDelete,
  isDeleting: externalIsDeleting,
  title,
  description,
  cancelText,
  deleteText,
  deletingText,
  successMessage,
  errorMessage,
  trigger,
  onSuccess,
}: DeleteDialogProps) {
  const { t } = useTranslations();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Usar estado externo si se proporciona, de lo contrario usar estado interno
  const isPending = externalIsDeleting !== undefined ? externalIsDeleting : isDeleting;

  const handleDelete = async () => {
    if (!externalIsDeleting) {
      setIsDeleting(true);
    }
    
    try {
      await onDelete(id);
      toast.success(
        successMessage || t("ui.common.delete_dialog.success")
      );
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error(
        errorMessage || t("ui.common.delete_dialog.error")
      );
    } finally {
      if (!externalIsDeleting) {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="icon">
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title || t("ui.common.delete_dialog.title")}
          </DialogTitle>
          <DialogDescription>
            {description || t("ui.common.delete_dialog.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            {cancelText || t("ui.common.buttons.cancel")}
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending
              ? (deletingText || t("ui.common.buttons.deleting"))
              : (deleteText || t("ui.common.buttons.delete"))}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
