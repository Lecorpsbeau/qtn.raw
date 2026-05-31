"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { softSpring } from "@/lib/utils";

interface PhotoCardProps {
  src:    string;
  alt:    string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function PhotoCard({
  src,
  alt,
  width  = 320,
  height = 420,
  priority = false,
  className = "",
}: PhotoCardProps) {
  return (
    <motion.div
      className={`photo-card ${className}`}
      style={{ width, height }}
      whileHover={{
        y: -6,
        scale: 1.03,
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        transition: softSpring,
      }}
      data-cursor="photo"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        draggable={false}
      />
    </motion.div>
  );
}
