import React, { useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ReadQR() {
  const [result, setResult] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Crear instancia solo si no existe
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

  // Puedes limpiar la instancia al desmontar el componente si quieres:
  // useEffect(() => {
  //   return () => {
  //     if (html5QrCodeRef.current) {
  //       html5QrCodeRef.current.clear();
  //     }
  //   };
  // }, []);

  return (
    <div>
      <h2>Leer QR desde imagen</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {result && (
        <p>
          <strong>Resultado:</strong> {result}
        </p>
      )}
      {/* Div oculto para que Html5Qrcode pueda funcionar */}
      <div id="image-reader" style={{ display: "none" }}></div>
    </div>
  );
}
