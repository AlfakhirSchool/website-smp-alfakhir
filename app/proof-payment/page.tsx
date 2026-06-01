import React from "react";
import type { Metadata } from "next";
import Layout from "@/component/layout/Layout";
import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import ProofPaymentSection from "@/component/authentication/ProofPaymentSection";

export const metadata: Metadata = {
  title: "SMP Islam Modern AlFakhir | Proof of Payment",
  description: "Developed by Feri",
};
const page = () => {
  return (
    <Layout>
      <BreadcrumbSection title="Proof Of Payment" header="Proof of payment" />
      <ProofPaymentSection />
    </Layout>
  );
};

export default page;
