"use client";
import React from "react";
import RegisterForm from "../form/RegisterForm";
import Link from "next/link";

const RegisterSection = () => {
  return (
    <section className="tf__registration mt_195 xs_mt_95">
      <div className="container">
        <div className="row wow fadeInUp">
          <div className="col-xxl-5 col-xl-6 col-md-9 col-lg-7 m-auto">
            <div className="tf__login_area">
              <h2 className="mb-5">
                Pendaftaran Online SMP Islam Modern Al-Fakhir
              </h2>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
