// App.tsx
import { useState } from "react";
import CreateQR from "@/components/CreateQR";
import  ReadQR  from "@/components/ReadQR";

function App() {
  const [textoQR, setTextoQR] = useState("");

  return (
    <div className="p-4">
      <h1>App de QR</h1>

      <div>
        <label htmlFor="qr-text">Texto para el QR:</label>
        <input
          id="qr-text"
          type="text"
          value={textoQR}
          onChange={(e) => setTextoQR(e.target.value)}
          className="border p-1"
        />
      </div>

      <CreateQR value={textoQR} />

      <hr />

      <ReadQR />
    </div>
  );
}

export default App;
