"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const layouts = [
  {
    id: "layout1",
    header: {
      logo: true,
      nav: true,
    },
    main: {
      type: "image",
    },
    textLines: 3,
  },
  {
    id: "layout2",
    header: {
      logo: true,
      nav: false,
    },
    main: {
      type: "grid",
      items: 2,
    },
    textLines: 2,
  },
];

export default function WebpageAnimation() {
  const [layoutIndex, setLayoutIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayoutIndex((prevIndex) => (prevIndex + 1) % layouts.length);
    }, 4000); // Cycle every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentLayout = layouts[layoutIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-80 bg-gray-100 dark:bg-gray-900/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
      {/* Browser UI */}
      <div className="flex items-center pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentLayout.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-3"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center space-x-4 h-10">
            {currentLayout.header.logo && <motion.div className="w-10 h-10 rounded-full bg-cyan-500/20"></motion.div>}
            {currentLayout.header.nav && (
              <div className="flex-1 flex items-center justify-end space-x-2">
                <motion.div className="h-3 w-10 rounded bg-gray-300 dark:bg-gray-600"></motion.div>
                <motion.div className="h-3 w-10 rounded bg-gray-300 dark:bg-gray-600"></motion.div>
                <motion.div className="h-3 w-10 rounded bg-gray-300 dark:bg-gray-600"></motion.div>
              </div>
            )}
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="h-28 w-full rounded-lg bg-gray-200 dark:bg-gray-700/50 p-2">
            {currentLayout.main.type === 'image' && <div className="h-full w-full bg-cyan-500/20 rounded"></div>}
            {currentLayout.main.type === 'grid' && (
              <div className="h-full w-full grid grid-cols-2 gap-2">
                <div className="bg-cyan-500/20 rounded"></div>
                <div className="bg-cyan-500/20 rounded"></div>
              </div>
            )}
          </motion.div>

          {/* Text lines */}
          <motion.div variants={itemVariants} className="space-y-2 pt-2">
            {[...Array(currentLayout.textLines)].map((_, i) => (
              <div key={i} className="h-2.5 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}