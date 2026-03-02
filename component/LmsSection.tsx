"use client";
import React from "react";
import Link from "next/link";

const LmsSection = () => {
  return (
    <section className="lms-portal-area pt_100 pb_100" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div className="row align-items-center">
          
          {/* Visual Ilustrasi Teknologi */}
          <div className="col-lg-6">
            <div className="lms-visual" style={{ position: 'relative' }}>
              <img 
                src="/images/fasilitas/webp/nobg.webp" 
                alt="Siswa Digital Al-Fakhir" 
                className="img-fluid"
                style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }}
              />
              <div className="status-badge">
                <span className="dot"></span> Online Learning Active
              </div>
            </div>
          </div>

          {/* Konten Portal Login */}
          <div className="col-lg-6">
            <div className="lms-login-content ps-lg-5">
              <span className="text-teal fw-bold">DIGITAL CAMPUS</span>
              <h2 className="fw-black mt-2 mb-4" style={{ color: '#0f172a', fontSize: '36px' }}>
                Portal LMS Al-Fakhir
              </h2>
              <p className="text-muted mb-4">
                Silakan masuk ke platform pembelajaran digital kami untuk mengakses materi, 
                tugas, dan evaluasi hasil belajar siswa secara real-time.
              </p>

              {/* Grid Tombol Login berdasarkan Peran */}
              <div className="row g-3">
                <div className="col-sm-6">
                  <Link href="https://lms.smpialfakhir.sch.id/login" className="login-card">
                    <div className="icon"><i className="fas fa-user-graduate"></i></div>
                    <span>Login Siswa</span>
                  </Link>
                </div>
                <div className="col-sm-6">
                  <Link href="https://lms.smpialfakhir.sch.id/login" className="login-card">
                    <div className="icon"><i className="fas fa-chalkboard-teacher"></i></div>
                    <span>Login Guru</span>
                  </Link>
                </div>
                <div className="col-sm-12">
                  <Link href="https://lms.smpialfakhir.sch.id/" className="login-card-full">
                    <i className="fas fa-user-check me-2"></i> Akses Monitoring Orang Tua
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .text-teal { color: #14b8a6; }
        .lms-visual { position: relative; text-align: center; }
        
        .status-badge {
          position: absolute; top: 20px; left: 20px;
          background: #fff; padding: 8px 15px; border-radius: 50px;
          font-weight: 700; font-size: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          display: flex; align-items: center; gap: 8px;
        }
        .dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; display: inline-block; }

        .login-card {
          display: block; background: #fff; padding: 20px; border-radius: 15px;
          text-align: center; text-decoration: none; color: #0f172a;
          font-weight: 800; border: 1px solid #e2e8f0; transition: 0.3s;
        }
        .login-card:hover { border-color: #14b8a6; color: #14b8a6; transform: translateY(-5px); }
        .login-card .icon { font-size: 24px; margin-bottom: 10px; color: #14b8a6; }

        .login-card-full {
          display: block; background: #0f172a; color: #fff; padding: 15px;
          border-radius: 12px; text-align: center; text-decoration: none;
          font-weight: 700; transition: 0.3s;
        }
        .login-card-full:hover { background: #14b8a6; }
      `}</style>
    </section>
  );
};

export default LmsSection;