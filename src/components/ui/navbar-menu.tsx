"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <p className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors">
        {item}
      </p>
      {active !== null && active === item && (
        <div
          className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4"
          style={{ animation: "heroFadeIn 0.2s ease both" }}
        >
          <div className="bg-navy-mid/95 backdrop-blur-md rounded-2xl overflow-hidden border border-border-subtle shadow-2xl">
            <div className="w-max h-full p-4">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-border-subtle bg-navy-mid/50 backdrop-blur-sm shadow-input flex justify-center space-x-6 px-10 py-5"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-4 group">
      <div className="relative w-[120px] h-[70px] flex-shrink-0 rounded-lg overflow-hidden border border-border-subtle group-hover:border-accent-teal transition-colors">
        <Image src={src} fill alt={title} className="object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-lg font-bold mb-1 text-text-primary group-hover:text-accent-teal transition-colors">
          {title}
        </h4>
        <p className="text-text-secondary text-xs max-w-[12rem]">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: React.ComponentPropsWithRef<"a">) => {
  return (
    <Link {...(rest as React.ComponentPropsWithRef<typeof Link>)} className="text-text-secondary hover:text-accent-teal transition-colors">
      {children}
    </Link>
  );
};
