import React, { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [status, setStatus] = useState("");

  const generateReport = async () => {
    setLoading(true);
    setStatus("Rapor oluşturuluyor...");
    try {
      const response = await fetch("/api/generate-license-report", {
        method: "POST",
      });
      const result = await response.json();
      if (result.url) {
        setDownloadUrl(result.url);
        setStatus("Rapor hazır. İndirme bağlantısı aşağıda.");
      } else {
        setStatus("Rapor oluşturulamadı.");
      }
    } catch (err) {
      setStatus("Bir hata oluştu: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', marginTop: 100, textAlign: 'center' }}>
      <h1>GDAP Lisans Değerlendirme Aracı</h1>
      <p>GDAP yetkili olduğunuz tenant'lardaki kullanıcı lisanslarını analiz eder.</p>
      <button onClick={generateReport} disabled={loading}>
        {loading ? "Rapor Oluşturuluyor..." : "Raporu Oluştur"}
      </button>
      <p style={{ color: 'blue', marginTop: 20 }}>{status}</p>
      {downloadUrl && (
        <p>
          <a href={downloadUrl} download>CSV Dosyasını İndir</a>
        </p>
      )}
    </div>
  );
}