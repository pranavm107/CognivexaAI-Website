"use client";
import React, { useState } from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { CanvasRevealEffect } from "./canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
    children,
    radius = 350,
    color = "#262626",
    className,
    variant = "dark",
    ...props
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className={cn(
                "group/spotlight relative overflow-hidden rounded-[22px]",
                variant === "dark"
                    ? "border border-neutral-800 bg-black text-white"
                    : "border border-black/10 bg-white/85 text-black backdrop-blur-xl",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            {...props}
        >
            {/* Spotlight layer */}
            <motion.div
                className="pointer-events-none absolute z-0 -inset-px rounded-[22px] opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
                style={{
                    backgroundColor: color,
                    maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
                }}
            >
                {isHovering && (
                    <CanvasRevealEffect
                        animationSpeed={5}
                        containerClassName="bg-transparent absolute inset-0 pointer-events-none"
                        colors={[
                            [108, 76, 244], // brand violet
                            [255, 79, 216], // brand pink
                        ]}
                        dotSize={3}
                        showGradient={false}
                    />
                )}
            </motion.div>

            {/* content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};
