import React from "react";
import type { Metadata } from "next";
import Layout from "@/component/layout/Layout";

export const metadata: Metadata = {
  title: "Pengumuman Observasi Siswa & Orang Tua | SMP Islam Modern Al-Fakhir",
  description: "Developed by Nozazi",
};

const page = () => {
  return (
    <Layout>
      <iframe
        className="pdf_viewer"
        src="https://drive.google.com/file/d/10s3J2sUbHPnVijA2_28khgBQ_fCin4XA/preview"
        width="100%"
        height="1000"
      />
    </Layout>
  );
};

export default page;
