"use client";

import React from "react";
import { ChatWidget } from "../chatbot/ChatWidget";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export const FloatingSupport = () => {
  return (
    <div className="fixed md:top-1/2 bottom-6 right-6 md:-translate-y-1/2 z-[100] flex flex-col items-center gap-4 print:hidden">
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
};
