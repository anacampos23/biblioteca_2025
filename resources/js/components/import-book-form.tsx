import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { FileDown } from 'lucide-react';
import { FormEvent, useState } from 'react';

type Props = {
    setOpen: (open: boolean) => void;
};

const ImportBooksForm = ({ setOpen }: Props) => {
    const { t } = useTranslations();
    const [file, setFile] = useState<File | null>(null);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert(t('messages.books.not_file'));
            return;
        }

        const allowedExtensions = ['xlsx', 'xls', 'csv'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            alert(t('messages.books.not_excel'));
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        router.post('/books/import', formData, {
            forceFormData: true,
            onSuccess: () => {
                setOpen(false);
                window.location.reload();
            },
            onError: (errors) => {
                alert('Error al importar libros.');
                console.error(errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-8 flex flex-col items-center gap-4">
                <label htmlFor="file-upload" className="cursor-pointer rounded bg-stone-200 px-4 py-2 text-stone-900 hover:bg-stone-300">
                    {t('ui.books.imported.select')}
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                />
                {file && (
                    <span className="text-sm text-stone-600">
                        {t('ui.books.imported.file')} <strong>{file.name}</strong>
                    </span>
                )}
            </div>

            <div className="flex flex-col items-end">
                <button type="submit" className="flex cursor-pointer items-center rounded bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-700">
                    <FileDown className="mr-2 h-4 w-4" />
                    {t('ui.books.imported.button')}
                </button>
            </div>
        </form>
    );
};

export default ImportBooksForm;
