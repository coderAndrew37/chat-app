"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Toaster } from "sonner";
import {
  CTABanner,
  Features,
  Hero,
  HowItWorks,
  LoginModal,
  Navbar,
  ProfilesGrid,
  RegisterModal
} from ".";

type ModalType = "login" | "register" | null;

export default function HomePage() {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [redirectTo, setRedirectTo] = useState<string | undefined>(undefined);

  const openLogin = (redirect?: string) => {
    setRedirectTo(redirect);
    setActiveModal("login");
  };
  const openRegister = (redirect?: string) => {
    setRedirectTo(redirect);
    setActiveModal("register");
  };
  const closeModal = () => setActiveModal(null);

  // If user is logged in, clicking chat profiles → go directly to /chat
  const handleProfileClick = () => {
    if (user) {
      // Already logged in – just open chat
      window.location.href = "/chat";
    } else {
      openRegister("/chat");
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      <Navbar
        onLoginClick={() => openLogin()}
        onRegisterClick={() => openRegister()}
        isLoggedIn={!!user}
      />

      <main>
        <Hero onRegisterClick={() => openRegister()} />
        <ProfilesGrid onProfileClick={handleProfileClick} />
        <HowItWorks />
        <Features />
        <CTABanner
          onRegisterClick={() => openRegister()}
          onLoginClick={() => openLogin()}
        />
      </main>


      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onSwitchToRegister={() => setActiveModal("register")}
        redirectTo={redirectTo}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={() => setActiveModal("login")}
        redirectTo={redirectTo}
      />
    </>
  );
}
