import { FormEvent, useState } from 'react'
import { router } from '@inertiajs/react'
import { useTranslations } from '@/hooks/use-translations';
import {  FileDown } from 'lucide-react';

const ImportBooksForm = () => {
    const { t } = useTranslations();
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        router.post('/books/import', formData, {
            forceFormData: true,
            onSuccess: () => {},
            onError: (errors) => {
                alert('Error al importar libros.');
                console.error(errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 flex items-center mb-8">
                <label htmlFor="file-upload" className="cursor-pointer rounded bg-stone-200 px-4 py-2 text-stone-900 hover:bg-stone-300">
                     {t('ui.books.imported.select')}
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    required
                    className="hidden"
                />
                {file && (
                    <span className="text-sm text-stone-600">
                        {t('ui.books.imported.file')} <strong>{file.name}</strong>
                    </span>
                )}
            </div>

            <div className="flex items-end flex-col">
                <button type="submit" className="flex items-center cursor-pointer rounded bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-700">
                    <FileDown className="mr-2 h-4 w-4" />
                    {t('ui.books.imported.button')}
                </button>
            </div>
        </form>
    );
}

export default ImportBooksForm
