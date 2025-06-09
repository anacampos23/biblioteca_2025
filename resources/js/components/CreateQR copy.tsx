import { Button } from '@/components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { Download  } from 'lucide-react';

type AnaCampos_SoftSkillsProps = {
    fullstack_dev: string;
    psychology: string;
};

export default function AnaCampos_SoftSkills({ fullstack_dev, psychology }: AnaCampos_SoftSkillsProps) {
    const { t } = useTranslations();

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
// console.log("VALUUUU", value);
    return (
        <div className="mt-4 flex w-full flex-col items-center">

            <div className="flex justify-center">

            </div>
            <div className="mt-6 flex w-full justify-end">
                <Button className="bg-indigo-600" onClick={downloadPNG}>
                    {t('ui.books.QR_create.save')}
                    <Download  className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
