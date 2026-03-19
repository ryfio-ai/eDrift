"use client";
import React from "react";
import { motion, Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

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
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-navy-mid/95 backdrop-blur-md rounded-2xl overflow-hidden border border-border-subtle shadow-2xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
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
      onMouseLeave={() => setActive(null)} // resets the state
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
        <Image
           src={src}
           fill
           alt={title}
           className="object-cover"
        />
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

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-text-secondary hover:text-accent-teal transition-colors"
    >
      {children}
    </Link>
  );
};
