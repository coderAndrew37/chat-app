"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import {
  CTABanner,
  Features,
  Footer,
  Hero,
  HowItWorks,
  LoginModal,
  Navbar,
  ProfilesGrid,
  RegisterModal,
} from ".";

type ModalType = "login" | "register" | null;

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <Toaster position="top-center" richColors />

      <Navbar onLoginClick={openLogin} onRegisterClick={openRegister} />

      <main>
        <Hero onRegisterClick={openRegister} />
        <ProfilesGrid onProfileClick={openRegister} />
        <HowItWorks />
        <Features />
        <CTABanner onRegisterClick={openRegister} onLoginClick={openLogin} />
      </main>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onSwitchToRegister={() => setActiveModal("register")}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={() => setActiveModal("login")}
      />
    </>
  );
}
