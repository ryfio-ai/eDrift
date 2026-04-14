"use client";

import React from "react";
import { ChatWidget } from "../chatbot/ChatWidget";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export const FloatingSupport = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4">
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
};
