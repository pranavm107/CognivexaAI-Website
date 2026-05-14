import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function AuroraText({
    children,
    colors = ["#38BDF8", "#3B82F6", "#6366F1"], // Default blue-ish
    speed = 0.6,
    className = ""
}) {
    const reduceMotion = useReducedMotion();

    // Create a gradient string from the colors
    const gradient = `linear-gradient(to right, ${colors.join(", ")}, ${colors[0]}, ${colors[1]})`;

    // If reduced motion is enabled, return a static gradient
    if (reduceMotion) {
        return (
            <span
                className={`bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
                style={{ backgroundImage: gradient }}
            >
                {children}
            </span>
        );
    }

    return (
        <motion.span
            className={`bg-clip-text text-transparent bg-[length:200%_auto] inline-block ${className}`}
            style={{ backgroundImage: gradient }}
            animate={{
                backgroundPosition: ["0% center", "-200% center"],
            }}
            transition={{
                duration: 10 / speed, // Lower speed = longer duration
                ease: "linear",
                repeat: Infinity,
            }}
        >
            {children}
        </motion.span>
    );
}
