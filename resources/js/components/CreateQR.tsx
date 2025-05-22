import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

type CreateQRProps = {
  value: string;
};

export default function CreateQR({ value }: CreateQRProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png"); // también puede ser "image/jpeg"
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div>
      <h2>Generar QR</h2>
      <input type="text" value={value} readOnly />
      <div>
        <QRCodeCanvas ref={canvasRef} value={value} size={256} />
      </div>
      <button onClick={downloadPNG}>Descargar QR (PNG)</button>
    </div>
  );
}
