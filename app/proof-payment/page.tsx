import React from "react";
import type { Metadata } from "next";
import Layout from "@/component/layout/Layout";
import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import LoginSection from "@/component/authentication/LoginSection";

export const metadata: Metadata = {
  title: "SMP Islam Modern AlFakhir | Proof of Payment",
  description: "Developed by Nozazi",
};
const page = () => {
  return (
    <Layout>
      <BreadcrumbSection title="Proof Of Payment" header="Proof of payment" />
      <LoginSection />
    </Layout>
  );
};

export default page;
