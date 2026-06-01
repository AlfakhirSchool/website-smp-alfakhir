import React from "react";
import type { Metadata } from "next";
import Layout from "@/component/layout/Layout";
import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import RegisterSection from "@/component/authentication/RegisterSection";

export const metadata: Metadata = {
  title: "SMP Islam Modern Al-Fakhir | Pendaftaran Online",
  description: "Developed by Feri",
};
const page = () => {
  return (
    <Layout>
      <BreadcrumbSection header="Pendaftaran Online" title="Sign Up" />
      <RegisterSection />
    </Layout>
  );
};

export default page;
