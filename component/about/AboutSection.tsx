"use client";
import Link from "next/link";
import React from "react";

const AboutSection = () => {
  return (
    <section className="about-integrated-section mt_100 mb_100">
      <div className="container">
        {/* KARTU UTAMA: Menggabungkan Foto, Tujuan, Visi, dan Misi */}
        <div className="integrated-card">
          <div className="row g-0 align-items-stretch">
            
            {/* SISI KIRI: Visual Fasilitas Gedung */}
            <div className="col-xl-5 col-lg-6">
              <div className="image-frame-container">
                <img 
                  src="/images/fasilitas/webp/bagian-depan-sekolah.webp" 
                  alt="Gedung SMP Islam Modern Al-Fakhir" 
                  className="main-school-img" 
                />
                <div className="experience-badge">
                  <span className="text">Modern Islamic</span>
                  <span className="number">EDUCATION</span>
                </div>
              </div>
            </div>

            {/* SISI KANAN: Konten Utama (Text Area) */}
            <div className="col-xl-7 col-lg-6">
              <div className="content-body">
                
                {/* 1. Tujuan Sekolah (Menghilangkan Background Ungu yang mengganggu) */}
                <div className="content-segment mb-5">
                  <span className="label-teal">OUR PURPOSE</span>
                  <h2 className="segment-title">Tujuan Sekolah</h2>
                  <p className="segment-text">
                    Sebagai ruang formal dalam membentuk generasi <b>Islami Modern</b> yang berpengetahuan luas, 
                    berakhlak baik, dan dapat menerapkan ilmu pengetahuan di berbagai aspek kehidupan untuk kesuksesan hidup di dunia dan di akhirat.
                  </p>
                </div>

                {/* 2. Visi Kami (Box Highlight) */}
                <div className="visi-box-modern mb-5">
                  <h5 className="mini-title-teal">Visi Sekolah</h5>
                  <p className="visi-quote">
                    "Terwujudnya pendidikan yang bermutu tinggi dalam membentuk siswa-siswi yang berakhlak, modern, dan menjadi kebanggaan orang tua, masyarakat, bangsa dan negara."
                  </p>
                </div>

                {/* 3. Misi Kami (Grid agar tidak memanjang ke bawah) */}
                <div className="misi-segment">
                  <h5 className="mini-title-teal">Misi Kami</h5>
                  <div className="row g-3">
                    {[
                      "Beribadah dengan benar",
                      "Berakhlak Mulia",
                      "Cinta Al-Qur'an",
                      "Berfikir Kritis & Kreatif"
                    ].map((item, i) => (
                      <div key={i} className="col-md-6">
                        <div className="misi-pill-modern">
                          <i className="fas fa-check-circle me-2"></i> {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Pendaftaran */}
                <div className="mt-5">
                  <Link href="/sign-up" className="btn-modern-teal">
                    DAFTAR SEKARANG <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .integrated-card {
          background: #ffffff;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.06);
          border: 1px solid #f1f5f9;
        }

        .image-frame-container { position: relative; height: 100%; min-height: 550px; }
        .main-school-img { width: 100%; height: 100%; object-fit: cover; }
        
        .experience-badge {
          position: absolute;
          bottom: 30px;
          right: 30px;
          background: #14b8a6;
          color: #fff;
          padding: 20px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(20, 184, 166, 0.4);
        }
        .experience-badge .number { display: block; font-size: 20px; font-weight: 900; letter-spacing: 1px; }
        .experience-badge .text { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.9; }

        .content-body { padding: 60px; }
        .label-teal { color: #14b8a6; font-weight: 800; font-size: 13px; letter-spacing: 2px; }
        .segment-title { font-size: 38px; font-weight: 900; color: #0f172a; margin: 10px 0 20px; }
        .segment-text { color: #64748b; line-height: 1.8; font-size: 16px; }

        .visi-box-modern {
          background: #f8fafc;
          padding: 30px;
          border-radius: 20px;
          border-left: 6px solid #14b8a6;
        }
        .visi-quote { font-style: italic; color: #1e293b; font-weight: 600; margin: 0; line-height: 1.7; }
        .mini-title-teal { font-size: 14px; font-weight: 800; color: #14b8a6; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px; }

        .misi-pill-modern {
          background: #fff;
          border: 1px solid #e2e8f0;
          padding: 12px 18px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #475569;
          transition: 0.3s ease;
        }
        .misi-pill-modern:hover { border-color: #14b8a6; color: #14b8a6; transform: translateX(5px); }

        .btn-modern-teal {
          background: #14b8a6;
          color: #fff;
          padding: 16px 45px;
          border-radius: 50px;
          font-weight: 800;
          text-decoration: none;
          display: inline-block;
          transition: 0.3s;
        }
        .btn-modern-teal:hover { background: #0d9488; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(20, 184, 166, 0.2); }

        @media (max-width: 991px) {
          .content-body { padding: 40px 25px; }
          .image-frame-container { min-height: 400px; }
          .segment-title { font-size: 30px; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;