"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Link from "next/link";
import { motion } from "framer-motion"; // Import animasi

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#f1f5f9",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: "#14b8a6",
    backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0d9488 100%)",
  },
}));

// Komponen Kecil untuk Angka Berjalan (Counter)
const AnimatedNumber = ({ value }: { value: number }) => {
  const [current, setCurrent] = React.useState(0);
  
  React.useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 detik animasi
    let timer = setInterval(() => {
      start += 1;
      setCurrent(start);
      if (start === end) clearInterval(timer);
    }, duration / end);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{current}%</span>;
};

const AboutSection2 = () => {
  const skills = [
    { label: "Kurikulum Modern & IT", value: 95 },
    { label: "Program Tahfidz Al-Qur'an", value: 90 },
    { label: "Fasilitas Belajar Nyaman", value: 85 },
    { label: "Kegiatan Ekstrakurikuler", value: 80 },
  ];

  return (
    <section className="tf__home_2_about pt_100 pb_100" style={{ background: '#ffffff', overflow: 'hidden' }}>
      <div className="container">
        <div className="row align-items-center">
          
          {/* FOTO DENGAN ANIMASI FADE IN DARI KIRI */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-xl-6 col-lg-6"
          >
            <div className="tf__home_2_about_img" style={{ position: 'relative', padding: '15px' }}>
              <div className="decorative-border"></div>
              <img
                src="images/about_2_img_3.jpg"
                alt="Fasilitas AlFakhir"
                className="img-fluid w-100"
                style={{ position: 'relative', zIndex: 1, borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              />
            </div>
          </motion.div>

          {/* TEKS DENGAN ANIMASI FADE IN DARI KANAN */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-xl-6 col-lg-6"
          >
            <div className="tf__home_2_about_text" style={{ paddingLeft: '20px' }}>
              <div className="tf__heading_area tf__heading_area_left mb_25">
                <h5 className="badge-teal">PENCAPAIAN KAMI</h5>
                <h2 className="title-main">
                  Komitmen Kami untuk Pendidikan Berkualitas
                </h2>
              </div>
              <p className="desc-text">
                Kami terus berinovasi dalam mengintegrasikan nilai-nilai Islam dengan kemajuan teknologi untuk mencetak generasi yang kompeten.
              </p>

              {/* LOOPING SKILL BARS */}
              {skills.map((skill, index) => (
                <div className="mb_25" key={index}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="skill-label">{skill.label}</p>
                    <div className="skill-badge">
                      <AnimatedNumber value={skill.value} />
                    </div>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  >
                    <BorderLinearProgress variant="determinate" value={skill.value} />
                  </motion.div>
                </div>
              ))}

              <Link href="/about" className="btn-profile-modern">
                LIHAT PROFIL SEKOLAH <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .badge-teal { color: #14b8a6; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; margin-bottom: 10px; display: block; }
        .title-main { font-weight: 900; color: #0f172a; font-size: 36px; line-height: 1.2; margin-bottom: 20px; }
        .desc-text { color: #64748b; margin-bottom: 30px; font-size: 15px; line-height: 1.8; }
        .skill-label { font-weight: 700; color: #1e293b; margin: 0; font-size: 14px; }
        .skill-badge { background: #14b8a6; color: #fff; padding: 2px 12px; border-radius: 50px; font-size: 12px; font-weight: 800; }
        
        .decorative-border {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          border: 2px dashed #14b8a6;
          border-radius: 30px;
          transform: rotate(-2deg);
          z-index: 0;
          opacity: 0.5;
        }

        .btn-profile-modern {
          margin-top: 30px;
          background: #0f172a;
          color: #fff;
          padding: 14px 35px;
          border-radius: 50px;
          font-weight: 800;
          display: inline-block;
          text-decoration: none;
          transition: 0.3s;
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.2);
        }
        .btn-profile-modern:hover {
          background: #14b8a6;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(20, 184, 166, 0.3);
          color: #fff;
        }

        @media (max-width: 991px) {
          .tf__home_2_about_text { padding-left: 0; margin-top: 40px; }
          .title-main { font-size: 28px; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection2;