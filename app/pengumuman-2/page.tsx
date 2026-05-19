"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/component/layout/Layout";

const PengumumanPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pdfUrl = "https://drive.google.com/file/d/1m5et57lwKofpF_hpYIRV2cDAnukRJzR8/preview";
  const downloadUrl = "https://drive.google.com/file/d/1m5et57lwKofpF_hpYIRV2cDAnukRJzR8/view?usp=sharing";

  if (!mounted) return null;

  return (
    <Layout>
      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
        minHeight: '100vh', 
        padding: '30px 15px', /* Lebih Rapat */
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Dekorasi Aura */}
        <div style={{ position: 'absolute', top: -100, width: '100%', maxWidth: '600px', height: '600px', background: 'rgba(20, 184, 166, 0.12)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>

        {/* Kotak Pengumuman - Super Compact */}
        <div style={{
          width: '100%', maxWidth: '900px', 
          background: 'rgba(255, 255, 255, 0.75)', 
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '30px', 
          padding: '25px 20px', /* Lebih Padat */
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 15px 40px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,1)',
          border: '1px solid rgba(226, 232, 240, 0.6)',
        }}>
          
          {/* Badge */}
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: '#fffbeb', border: '1px solid #fbbf24', 
            color: '#d97706', padding: '6px 18px', borderRadius: '100px', 
            fontSize: '11px', fontWeight: '800', marginBottom: '15px',
          }}>
            <span className="dot-blink-gold"></span> OFFICIAL RESULT 2026/2027
          </div>

          {/* Judul Rapat */}
          <h1 style={{ 
            color: '#1e293b', 
            fontSize: 'clamp(22px, 5vw, 32px)', 
            fontWeight: '900', 
            margin: '0 0 5px 0', 
            lineHeight: '1.1'
          }}>
            Hasil Observasi <br/>
            <span style={{ 
              color: '#14b8a6', 
              fontWeight: '1000',
              fontSize: '1.2em',
              display: 'inline-block',
              marginTop: '5px'
            }}>Gel. 1 2026</span>
          </h1>
          
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 25px 0', fontWeight: '500' }}>
            SMP Islam Modern Al-Fakhir Depok
          </p>

          {/* ========================================= */}
          {/* CONTAINER PDF - SEAMLESS & BEAM MELINGKARI */}
          {/* ========================================= */}
          <div className="pdf-frame-3d" style={{ 
            width: '100%', 
            maxWidth: '800px',
            margin: '0 auto',
            aspectRatio: '1 / 1.414', /* Rasio A4 */
            borderRadius: '20px', 
            overflow: 'hidden', 
            border: '2px solid #e2e8f0', 
            background: '#ffffff', 
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)' 
          }}>
            
            {/* Lampu Berjalan yang MEMUTAR PENUH */}
            <div className="pdf-moving-beam-full"></div>

            {/* IFRAME PDF DENGAN HACK UNTUK MENYEMBUNYIKAN PINGGIRAN GOOGLE */}
            <div style={{
              position: 'absolute',
              top: '-2px', left: '-2px', right: '-2px', bottom: '-2px',
              overflow: 'hidden',
              borderRadius: '18px',
              background: '#ffffff',
              zIndex: 1
            }}>
              <iframe 
                src={pdfUrl} 
                className="vivid-pdf-iframe-seamless"
                allow="autoplay" 
                title="SK PPDB Al-Fakhir" 
              />
            </div>
          </div>
          {/* ========================================= */}

          {/* Tombol Aksi */}
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="btn-alfakhir-vibrant">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Unduh File PDF
            </a>
            <a href="/" className="btn-alfakhir-outline">
              Kembali
            </a>
          </div>
        </div>

        <style>{`
          /* 1. HACK PDF SEAMLESS: Menyembunyikan pinggiran Drive */
          .vivid-pdf-iframe-seamless {
            width: 100%;
            height: 100%;
            border: none;
            position: relative;
            
            /* Trik mask-image untuk memotong bagian toolbar atas Google Drive */
            -webkit-mask-image: linear-gradient(to bottom, transparent 40px, black 40px);
            mask-image: linear-gradient(to bottom, transparent 40px, black 40px);
            
            /* Menarik iframe ke atas untuk menyembunyikan toolbar, dan menambah tinggi agar bawah tidak terpotong */
            margin-top: -40px; 
            height: calc(100% + 40px);
            
            /* Memastikan tidak ada garis outline aneh */
            outline: none;
          }

          /* 2. BEAM LIGHT YANG MELINGKARI PENUH (Atas -> Kanan -> Bawah -> Kiri) */
          .pdf-moving-beam-full::before {
            content: "";
            position: absolute;
            /* Lampu dimulai dari pojok kiri atas */
            top: 0;
            left: 0;
            width: 100px; /* Lebar lampu saat horizontal */
            height: 4px;  /* Tebal lampu */
            
            background: linear-gradient(90deg, transparent, #14b8a6, #fbbf24, transparent);
            box-shadow: 0 0 12px 2px #14b8a6;
            
            /* Animasi Berputar Penuh */
            animation: moveBeamFullCircle 6s infinite linear;
            z-index: 5;
            border-radius: 4px;
          }

          @keyframes moveBeamFullCircle {
            /* --- SISI ATAS (Kiri ke Kanan) --- */
            0% {
              top: 0; left: 0;
              width: 100px; height: 4px;
            }
            20% {
              top: 0; left: calc(100% - 100px);
              width: 100px; height: 4px;
            }
            /* Transisi Pojok Kanan Atas */
            25% {
              top: 0; left: calc(100% - 4px);
              width: 4px; height: 100px;
            }
            
            /* --- SISI KANAN (Atas ke Bawah) --- */
            45% {
              top: calc(100% - 100px); left: calc(100% - 4px);
              width: 4px; height: 100px;
            }
            /* Transisi Pojok Kanan Bawah */
            50% {
              top: calc(100% - 4px); left: calc(100% - 100px);
              width: 100px; height: 4px;
            }
            
            /* --- SISI BAWAH (Kanan ke Kiri) --- */
            70% {
              top: calc(100% - 4px); left: 0;
              width: 100px; height: 4px;
            }
            /* Transisi Pojok Kiri Bawah */
            75% {
              top: calc(100% - 100px); left: 0;
              width: 4px; height: 100px;
            }
            
            /* --- SISI KIRI (Bawah ke Atas) --- */
            95% {
              top: 0; left: 0;
              width: 4px; height: 100px;
            }
            /* Kembali ke Awal */
            100% {
              top: 0; left: 0;
              width: 100px; height: 4px;
            }
          }

          .dot-blink-gold {
            width: 7px; height: 7px; background: #fbbf24; border-radius: 50%;
            display: inline-block; margin-right: 7px;
            box-shadow: 0 0 8px #fbbf24; animation: blink 1.5s infinite;
          }

          @keyframes blink { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

          .btn-alfakhir-vibrant {
            background: #14b8a6; color: #fff; padding: 14px 35px; borderRadius: 12px; fontWeight: 800;
            text-decoration: none; transition: 0.3s; font-size: 15px; display: flex; align-items: center; gap: 8px;
            box-shadow: 0 8px 15px rgba(20, 184, 166, 0.15);
          }
          .btn-alfakhir-vibrant:hover { transform: translateY(-2px); background: #0f9d8c; }
          
          .btn-alfakhir-outline {
            background: #fff; color: #475569; padding: 14px 35px; borderRadius: 12px; fontWeight: bold; 
            text-decoration: none; border: 1px solid #e2e8f0; font-size: 15px; transition: 0.3s;
          }

          @media (max-width: 600px) {
            .btn-alfakhir-vibrant, .btn-alfakhir-outline { width: 100%; text-align: center; justify-content: center; }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default PengumumanPage;