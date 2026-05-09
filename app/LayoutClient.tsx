"use client";

import { useState, type ReactNode } from "react";
import { Footer, Navbar, ApplicationModal } from "./components";
import { toast } from "sonner"; // Assuming you're using sonner for notifications
import WhatsAppWidget from "./components/WhatsappWidget";
import { whatsappNumber } from "@/lib/constants";

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsApplyModalOpen(false);
    toast.success("Application sent successfully!");
  };

  return (
    <>
      <Navbar onApplyClick={() => setIsApplyModalOpen(true)} />

      <main>{children}</main>

      <Footer />
      <WhatsAppWidget whatsappNumber={whatsappNumber} />

      {isApplyModalOpen && (
        <ApplicationModal 
          onClose={() => setIsApplyModalOpen(false)} 
          onSuccess={handleSuccess}
          track="General Application" 
        />
      )}
    </>
  );
}