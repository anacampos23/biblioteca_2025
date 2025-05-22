import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

export default function ReadQR() {
  const [result, setResult] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);

    scanner.render(
      (decodedText) => setResult(decodedText),
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("reader");
    try {
      const decodedText = await html5QrCode.scanFile(file, true);
      setResult(decodedText);
    } catch {
      setResult("No se pudo leer ningún QR en la imagen.");
    }
    html5QrCode.clear().catch(() => {});
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border border-green-600 rounded-lg bg-green-50 text-center">
      <h2 className="text-2xl font-semibold text-green-800 mb-6">Escanear QR con UI integrada</h2>
      <div id="reader" className="mx-auto mb-6 max-w-[300px]" />
      {result && <p className="bg-green-100 text-green-700 p-4 rounded break-words">{result}</p>}

      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={() => inputFileRef.current?.click()}
        className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold"
      >
        Subir imagen para escanear QR
      </button>
    </div>
  );
}
