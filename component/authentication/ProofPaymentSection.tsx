"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProofPaymentSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Silakan pilih file bukti pembayaran terlebih dahulu", { position: "top-right" });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload-images", formData);
      if (res.status === 200) {
        toast.success("Bukti pembayaran berhasil diunggah!", { position: "top-right" });
        setFile(null);
        setPreview(null);
        setTimeout(() => {
          router.push("/"); // Redirect to home or dashboard
        }, 2000);
      }
    } catch (error) {
      toast.error("Gagal mengunggah bukti pembayaran. Silakan coba lagi.", { position: "top-right" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="tf__login mt_195 xs_mt_95">
      <div className="container">
        <div className="row wow fadeInUp">
          <div className="col-xxl-6 col-xl-7 col-md-9 col-lg-8 m-auto">
            <div className="tf__login_area" style={{ padding: "40px", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}>Pembayaran Registrasi</h2>
              <p style={{ marginBottom: "30px", color: "#666" }}>Silakan transfer biaya registrasi ke salah satu rekening di bawah ini dan unggah bukti transfer Anda.</p>
              
              <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "10px", marginBottom: "25px", border: "1px solid #eee", textAlign: "left" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#333", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>Informasi Rekening</h4>
                
                <div style={{ marginBottom: "15px" }}>
                  <div style={{ fontSize: "14px", color: "#666" }}>Atas Nama:</div>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "#000" }}>SMPIT Al Fakhir</div>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#2E7D32", letterSpacing: "1px" }}>7344438026</div>
                </div>

                <div>
                  <div style={{ fontSize: "14px", color: "#666" }}>Atas Nama:</div>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "#000" }}>Yayasan Prestasi Belia Indonesia</div>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#2E7D32", letterSpacing: "1px" }}>7344413171</div>
                </div>
              </div>

              <form onSubmit={handleUpload}>
                <div className="tf__login_imput" style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", textAlign: "left", fontWeight: "600", marginBottom: "8px" }}>Upload Bukti Pembayaran</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    style={{ padding: "10px", border: "2px dashed #ccc", width: "100%", borderRadius: "8px", background: "#fafafa" }}
                  />
                </div>

                {preview && (
                  <div style={{ marginBottom: "25px", textAlign: "center" }}>
                    <p style={{ fontSize: "14px", marginBottom: "10px", color: "#555" }}>Preview Foto:</p>
                    <img 
                      src={preview} 
                      alt="Preview Bukti Pembayaran" 
                      style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} 
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  className="common_btn" 
                  disabled={loading}
                  style={{ width: "100%", padding: "12px", fontSize: "16px", fontWeight: "600", borderRadius: "8px", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Mengunggah..." : "Kirim Bukti Pembayaran"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofPaymentSection;
