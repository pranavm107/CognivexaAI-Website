"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
    const ref = useRef(null);

    const SECTION_HEIGHT = 750; // must match scroll track height
    const [activeCard, setActiveCard] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = down, -1 = up

    // ✅ Always start from first card
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTo({ top: 0, behavior: "instant" });
        }
        setActiveCard(0);
    }, []);

    // ✅ Perfect active card update based on actual scroll position
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let lastScrollTop = el.scrollTop;

        const onScroll = () => {
            const st = el.scrollTop;

            // detect direction
            const nextDirection = st > lastScrollTop ? 1 : -1;
            setDirection(nextDirection);
            lastScrollTop = st;

            // calculate active section (perfect snapping logic)
            const rawIndex = st / SECTION_HEIGHT;
            const nextIndex = Math.min(
                content.length - 1,
                Math.max(0, Math.round(rawIndex))
            );

            setActiveCard(nextIndex);
        };

        el.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            el.removeEventListener("scroll", onScroll);
        };
    }, [content.length]);

    return (
        <div
            ref={ref}
            className="relative mx-auto w-full max-w-[1200px] h-[750px] overflow-y-auto no-scrollbar rounded-2xl"
        >
            <div className="relative">
                {/* ✅ Sticky overlay */}
                <div className="pointer-events-none sticky top-0 h-[750px]">
                    <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-16 px-4 sm:px-6 lg:px-10 h-full items-center">
                        {/* ✅ LEFT TEXT ANIMATION (Perfect UP/DOWN) */}
                        <div className="hidden lg:block pointer-events-auto">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeCard}
                                    custom={direction}
                                    initial={(dir) => ({
                                        opacity: 0,
                                        y: dir === 1 ? 24 : -24,
                                    })}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={(dir) => ({
                                        opacity: 0,
                                        y: dir === 1 ? -24 : 24,
                                    })}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                >
                                    <h3 className="text-[38px] font-bold text-[#0b1220] leading-[1.15]">
                                        {content[activeCard].title}
                                    </h3>

                                    <div className="mt-5 text-[16px] leading-[1.85] text-gray-600 max-w-[420px]">
                                        {content[activeCard].description}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ✅ RIGHT IMAGE (Old behavior, no animation) */}
                        <div
                            className={cn(
                                "hidden lg:block pointer-events-auto w-[520px] h-[460px] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm",
                                contentClassName
                            )}
                        >
                            {content[activeCard]?.content ?? null}
                        </div>
                    </div>
                </div>

                {/* ✅ Scroll track: must match SECTION_HEIGHT */}
                <div className="hidden lg:block">
                    {content.map((_, index) => (
                        <div key={index} className="h-[750px]" />
                    ))}
                </div>

                {/* ✅ Mobile fallback */}
                <div className="lg:hidden flex flex-col gap-10 px-4 sm:px-6 py-10">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="rounded-2xl border bg-white p-6">
                            <h3 className="text-[22px] font-bold text-[#0b1220]">{item.title}</h3>
                            <div className="mt-3 text-[15px] leading-[1.7] text-gray-600">
                                {item.description}
                            </div>
                            <div className="mt-5 rounded-xl overflow-hidden border">
                                {item.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};
