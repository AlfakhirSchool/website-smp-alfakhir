"use client";
import React, { ReactNode } from "react";
import NavbarSection from "../navbar/NavbarSection";
// import FooterSection from "../footer/FooterSection";
import ScrollToTopButton from "../utils/ScrollToTopButton";
import TopbarSection from "@/component/topbar/TopbarSection";
import FooterSection2 from "./../footer/FooterSection2";
import dynamic from "next/dynamic";

const CookieConsentBanner = dynamic(
  () => import("../cookie/CookieConsentBanner"),
  { ssr: false }
);

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <TopbarSection style="tf__topbar tf__topbar_2" />
      <NavbarSection style="main_menu_3" logo="/images/main/alfakhir.png" />
      {children}
      <ScrollToTopButton style="" />
      <FooterSection2 style="tf__footer_3" logo="/images/main/alfakhir.png" />
      <CookieConsentBanner />
    </>
  );
};

export default Layout;
