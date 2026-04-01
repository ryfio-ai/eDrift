// File revoked as per user request
"use client";
import React from 'react';
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const useTheme = () => ({ theme: 'light', toggleTheme: () => {} });
