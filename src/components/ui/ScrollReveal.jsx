
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    heading: {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    },
    text: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: 0.1,
                ease: "easeOut"
            }
        }
    },
    card: {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: "easeOut"
            }
        }
    },
    image: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                delay: 0.1,
                ease: "easeOut"
            }
        }
    },
    button: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.2,
                ease: "easeOut"
            }
        }
    },
    featureLeft: {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                delay: 0.2,
                ease: "easeOut"
            }
        }
    },
    featureRight: {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                delay: 0.2,
                ease: "easeOut"
            }
        }
    }
};

export const StaggerContainer = ({ children, className, delay = 0.1, staggerChildren = 0.1 }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        delayChildren: delay,
                        staggerChildren: staggerChildren
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const ScrollReveal = ({
    children,
    variant = "text",
    className = "",
    delay = 0,
    width = "100%"
}) => {
    const selectedVariant = variants[variant] || variants.text;

    // Merge custom delay if provided
    const finalVariant = {
        ...selectedVariant,
        visible: {
            ...selectedVariant.visible,
            transition: {
                ...selectedVariant.visible.transition,
                delay: (selectedVariant.visible.transition.delay || 0) + delay
            }
        }
    };

    return (
        <motion.div
            variants={finalVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
