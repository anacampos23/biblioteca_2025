import { Html5Qrcode } from 'html5-qrcode';
import React, { useRef, useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';

export default function ReadQR({ onResult }: { onResult: (result: string) => void }) {
    const { t } = useTranslations();
    const [result, setResult] = useState<string | null>(null);
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!html5QrCodeRef.current) {
            html5QrCodeRef.current = new Html5Qrcode('image-reader');
        }

        try {
            const decodedText = await html5QrCodeRef.current.scanFile(file, true);
            setResult(decodedText);
            onResult(decodedText);
        } catch (error) {
            console.error('Error leyendo QR de la imagen:', error);
            setResult('No se pudo leer ningún QR en la imagen.');
        }
    };

    return (
        <div className="m-2 pt-6 pb-6 text-center border-2 rounded-xl">
            <h2 className="mb-6 text-lg font-bold text-stone-700 ">Leer QR desde imagen</h2>

            <input ref={inputFileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <button onClick={() => inputFileRef.current?.click()} className="rounded bg-stone-500 px-6 py-2 text-white transition hover:bg-stone-700">
                {t('ui.books.QR_reader.description')}
            </button>

            {result && (
                <p className="mt-6 rounded p-1 break-words ">
                    <strong>Id:</strong> {result}
                </p>
            )}

            {/* Div oculto para Html5Qrcode */}
            <div id="image-reader" style={{ display: 'none' }}></div>
        </div>
    );
}
