import React, { useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ReadQR() {
  const [result, setResult] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode("image-reader");
    }

    try {
      const decodedText = await html5QrCodeRef.current.scanFile(file, true);
      setResult(decodedText);
    } catch (error) {
      console.error("Error leyendo QR de la imagen:", error);
      setResult("No se pudo leer ningún QR en la imagen.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-green-50 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Leer QR desde imagen</h2>

      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => inputFileRef.current?.click()}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Seleccionar imagen
      </button>

      {result && (
        <p className="mt-6 p-4 bg-green-100 text-green-900 rounded break-words">
          <strong>Resultado:</strong> {result}
        </p>
      )}

      {/* Div oculto para Html5Qrcode */}
      <div id="image-reader" style={{ display: "none" }}></div>
    </div>
  );
}
