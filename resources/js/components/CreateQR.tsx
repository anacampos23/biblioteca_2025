import { Button } from '@/components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { Download  } from 'lucide-react';

type CreateQRProps = {
    value: string;
};

export default function CreateQR({ value }: CreateQRProps) {
    const { t } = useTranslations();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const downloadPNG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const url = canvas.toDataURL('image/png'); // también puede ser "image/jpeg"
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.png';
        link.click();
    };
console.log("VALUUUU", value);
    return (
        <div className="mt-4 flex w-full flex-col items-center">
            <input type="text" className="mt-2 mb-2 w-64 text-center focus:shadow-none focus:outline-none" value={value} readOnly />
            <div className="flex justify-center">
                <QRCodeCanvas ref={canvasRef} value={value} size={256} />
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
