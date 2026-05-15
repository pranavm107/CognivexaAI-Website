"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children, className, onMouseEnter, to, menuClassName }) => {
  const MotionLink = motion(Link);
  const Trigger = to ? MotionLink : motion.p;
  const timeoutRef = React.useRef(null);

  const handleMouseEnter = (e) => {
    timeoutRef.current = setTimeout(() => {
      setActive(item);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  
  return (
    <div onMouseLeave={handleMouseLeave} className="relative ">
      <Trigger
        to={to}
        transition={{ duration: 0.3 }}
        onMouseEnter={(e) => {
          handleMouseEnter(e);
          if (onMouseEnter) onMouseEnter(e);
        }}
        className={`cursor-pointer text-gray-700 hover:text-purple-600 transition-colors nav-link ${className}`}
      >
        {item}
      </Trigger>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <>
              {/* Invisible mouse bridge — fills gap between trigger and dropdown */}
              <div 
                className="absolute top-full left-0 w-full h-10"
                style={{ background: "transparent" }}
              />

              <div className="absolute top-[calc(100%_+_1.5rem)] left-1/2 transform -translate-x-1/2 pt-0">
                <motion.div
                  transition={transition}
                  layoutId="active"
                  className={menuClassName || "bg-white/98 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-100/80 shadow-2xl shadow-purple-100/40 min-w-[520px]"}
                >
                  <motion.div
                    layout
                    className="w-max h-full p-4"
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children, onMouseLeave }) => {
  const [closeTimeout, setCloseTimeout] = React.useState(null);

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActive(null);
      if (onMouseLeave) onMouseLeave();
    }, 150); // 150ms grace period
    setCloseTimeout(timeout);
  };

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
  };

  return (
    <nav
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative flex flex-col md:flex-row items-center gap-4 md:gap-8"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link
      to={href}
      className="flex space-x-3 group rounded-xl p-2.5 hover:bg-purple-50 transition-all duration-200 border border-transparent hover:border-purple-100"
    >
      {/* Image thumbnail */}
      <img
        src={src}
        width={120}
        height={65}
        alt={title}
        className="shrink-0 rounded-lg object-cover w-[120px] h-[65px] group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Text content */}
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 mb-1">
          {title}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed max-w-[160px] line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ to, children, ...rest }) => {
  return (
    <Link
      to={to}
      className="text-gray-600 hover:text-purple-600 font-medium text-sm transition-colors duration-200 flex items-center gap-2 group py-0.5"
      {...rest}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-200" />
      {children}
    </Link>
  );
};
