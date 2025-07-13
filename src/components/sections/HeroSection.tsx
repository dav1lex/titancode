"use client";
import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Define types for stars and particles
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
  moveSpeed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Improved Star Field Component
const StarField = ({ starCount = 150 }) => {
  const [stars, setStars] = useState<Star[]>([]);
  
  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleDelay: Math.random() * 5,
        moveSpeed: Math.random() * 0.5 + 0.1
      }));
    };
    
    setStars(generateStars());
  }, [starCount]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
            x: [0, star.moveSpeed * 15, 0],
            y: [0, star.moveSpeed * -5, 0],
          }}
          transition={{
            duration: 4 + star.twinkleDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.twinkleDelay
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Floating Particles Component
const FloatingParticles = ({ isDark }: { isDark: boolean }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10
      }));
    };
    
    setParticles(generateParticles());
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDark 
              ? "bg-blue-400/10 dark:bg-blue-300/5" 
              : "bg-blue-300/20"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: `blur(${particle.size > 4 ? 1 : 0}px)`
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, particle.size * 5, -particle.size * 3, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
};

// Improved Saturn Component with realistic rings
const ImprovedSaturn = ({ isDark }: { isDark: boolean }) => {
  return (
    <motion.div
      className="absolute right-[10%] top-[20%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] pointer-events-none"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
    >
      {/* Saturn Group */}
      <div className="relative w-full h-full">
        {/* Saturn Rings (Behind) */}
        <motion.div 
          className="absolute left-1/2 top-1/2 w-[280px] h-[100px] md:w-[380px] md:h-[140px] lg:w-[480px] lg:h-[180px] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{
            transform: "translate(-50%, -50%) perspective(800px) rotateX(75deg)",
            transformOrigin: "center center"
          }}
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 180,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div 
            className="w-full h-full rounded-[100%] absolute"
            style={{
              background: isDark 
                ? "radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, rgba(200,200,200,0.2) 25%, rgba(150,150,150,0.1) 50%, rgba(100,100,100,0.05) 75%, transparent 100%)"
                : "radial-gradient(ellipse at center, rgba(220,220,220,0.4) 0%, rgba(180,180,180,0.25) 25%, rgba(150,150,150,0.15) 50%, rgba(120,120,120,0.05) 75%, transparent 100%)",
              boxShadow: isDark
                ? "inset 0px 0px 20px rgba(255,255,255,0.1)"
                : "inset 0px 0px 15px rgba(200,200,200,0.2)",
            }}
          />
          
          {/* Ring details */}
          <motion.div 
            className="absolute left-0 top-1/2 w-full h-[2px] -translate-y-[25px]"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent 0%, rgba(200,200,200,0.3) 30%, rgba(200,200,200,0.5) 50%, rgba(200,200,200,0.3) 70%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(150,150,150,0.3) 30%, rgba(150,150,150,0.5) 50%, rgba(150,150,150,0.3) 70%, transparent 100%)"
            }}
          />
          <motion.div 
            className="absolute left-0 top-1/2 w-full h-[1px]"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent 0%, rgba(180,180,180,0.2) 30%, rgba(180,180,180,0.4) 50%, rgba(180,180,180,0.2) 70%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(120,120,120,0.2) 30%, rgba(120,120,120,0.4) 50%, rgba(120,120,120,0.2) 70%, transparent 100%)"
            }}
          />
          <motion.div 
            className="absolute left-0 top-1/2 w-full h-[1px] translate-y-[25px]"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent 0%, rgba(160,160,160,0.1) 30%, rgba(160,160,160,0.3) 50%, rgba(160,160,160,0.1) 70%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(100,100,100,0.1) 30%, rgba(100,100,100,0.3) 50%, rgba(100,100,100,0.1) 70%, transparent 100%)"
            }}
          />
        </motion.div>
        
        {/* Saturn Body */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            background: isDark 
              ? "radial-gradient(circle at 30% 30%, #FFD700, #FFA500, #FF8C00)" 
              : "radial-gradient(circle at 30% 30%, #F2C94C, #E6A026, #D4941C)",
            boxShadow: isDark 
              ? "0 0 30px rgba(255, 215, 0, 0.3), inset -20px -20px 40px rgba(0,0,0,0.4)" 
              : "0 0 20px rgba(242, 201, 76, 0.4), inset -16px -16px 30px rgba(0,0,0,0.3)"
          }}
          animate={{
            rotate: 360,
            y: [0, -5, 0, 5, 0],
          }}
          transition={{
            rotate: {
              duration: 120,
              repeat: Infinity,
              ease: "linear"
            },
            y: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* Surface details */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
            <div className="absolute left-[10%] top-[20%] w-[60%] h-[15%] bg-[#FFE066] rounded-full transform -rotate-12"></div>
            <div className="absolute left-[5%] top-[50%] w-[70%] h-[10%] bg-[#FFB347] rounded-full transform rotate-6"></div>
            <div className="absolute left-[15%] top-[75%] w-[50%] h-[8%] bg-[#FFD700] rounded-full transform -rotate-8"></div>
          </div>
        </motion.div>
        
        {/* Saturn Rings (Front - overlay for 3D effect) */}
        <motion.div 
          className="absolute left-1/2 top-1/2 w-[280px] h-[100px] md:w-[380px] md:h-[140px] lg:w-[480px] lg:h-[180px] -translate-x-1/2 -translate-y-1/2 overflow-hidden z-20"
          style={{
            transform: "translate(-50%, -50%) perspective(800px) rotateX(75deg)",
            transformOrigin: "center center"
          }}
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 180,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute left-1/2 top-1/2 w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full -translate-x-1/2 -translate-y-1/2 bg-transparent shadow-[0_0_30px_30px_rgba(0,0,0,0.2)]"></div>
        </motion.div>

        {/* Titan Moon */}
        <motion.div
          className="absolute w-[24px] h-[24px] md:w-[30px] md:h-[30px] lg:w-[36px] lg:h-[36px] rounded-full z-30"
          style={{
            background: isDark 
              ? "radial-gradient(circle at 30% 30%, #C0C0C0, #888888)" 
              : "radial-gradient(circle at 30% 30%, #B8B8B8, #8F8F8F)",
            boxShadow: isDark 
              ? "0 0 15px rgba(192, 192, 192, 0.4)" 
              : "0 0 10px rgba(184, 184, 184, 0.5)"
          }}
          animate={{
            // Complex orbital path
            x: [150, 120, 80, 40, 0, -40, -80, -120, -150, -120, -80, -40, 0, 40, 80, 120, 150],
            y: [0, 60, 100, 120, 130, 120, 100, 60, 0, -60, -100, -120, -130, -120, -100, -60, 0],
            scale: [1, 1.05, 1.1, 1.05, 1]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Titan surface details */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
            <div className="absolute left-[20%] top-[30%] w-[30%] h-[30%] bg-[#A0A0A0] rounded-full"></div>
            <div className="absolute left-[50%] top-[60%] w-[20%] h-[20%] bg-[#707070] rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Enhanced Gradient Background */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: isDark 
              ? "radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 30%, #0f1419 70%, #000000 100%)"
              : "radial-gradient(ellipse at top, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)"
          }}
          animate={{
            background: isDark 
              ? [
                  "radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 30%, #0f1419 70%, #000000 100%)",
                  "radial-gradient(ellipse at center, #16213e 0%, #1a1a2e 30%, #0f1419 70%, #000000 100%)",
                  "radial-gradient(ellipse at bottom, #0f1419 0%, #16213e 30%, #1a1a2e 70%, #000000 100%)",
                  "radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 30%, #0f1419 70%, #000000 100%)"
                ]
              : [
                  "radial-gradient(ellipse at top, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)",
                  "radial-gradient(ellipse at center, #e2e8f0 0%, #f8fafc 30%, #cbd5e1 70%, #94a3b8 100%)",
                  "radial-gradient(ellipse at bottom, #cbd5e1 0%, #e2e8f0 30%, #f8fafc 70%, #94a3b8 100%)",
                  "radial-gradient(ellipse at top, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)"
                ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: isDark 
              ? "radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)"
              : "radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.2) 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Enhanced Star Field (Dark Mode Only) */}
        {mounted && isDark && <StarField starCount={180} />}
        
        {/* Enhanced Floating Particles */}
        {mounted && <FloatingParticles isDark={isDark} />}
        
        {/* Nebula Effect (subtle color highlights) */}
        {mounted && (
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-[20%] right-[30%] w-[250px] h-[250px] rounded-full opacity-10 blur-[60px]"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(219, 39, 119, 0.3) 0%, transparent 70%)"
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.18, 0.1]
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        )}
      </div>

      {/* Improved Saturn */}
      {mounted && <ImprovedSaturn isDark={isDark} />}

      {/* Main Content - Updated Layout */}
      <div className="container mx-auto px-4 z-20 relative py-20">
        <div className="max-w-4xl ml-8 md:ml-16 lg:ml-24">          
          {/* Main Heading - Enhanced */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className={`block ${
              isDark 
                ? 'bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 bg-clip-text text-transparent'
            }`}>
              {t("home.welcome")}
            </span>
          </motion.h1>
          
          {/* Subtitle - Enhanced */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-2xl"
            style={{
              color: isDark
                ? 'rgba(203, 213, 225, 0.8)'
                : 'rgba(71, 85, 105, 0.9)'
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {t("home.subtitle")}
          </motion.p>
          
          {/* Action Buttons - Enhanced */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-10 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("home.getStarted")}
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className={`px-10 py-6 text-lg font-medium rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 border-gray-700 text-gray-300 hover:bg-white/10 hover:border-gray-500' 
                    : 'bg-black/5 border-gray-300 text-gray-700 hover:bg-black/10 hover:border-gray-400'
                }`}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 left-10 w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(20px)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
}