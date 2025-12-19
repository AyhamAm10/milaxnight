'use client';

import { Suspense, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Hero3DParticles } from './Hero3DParticles';
import { Hero3DLoader } from './Hero3DLoader';
import { getStore } from '../../store';
import { useTheme } from '@/lib/theme';

// Helper function to get theme colors (only called on client)
function getThemeColors() {
  return {
    mkMagenta: new THREE.Color().setHSL(330 / 360, 0.85, 0.51),
    mkCyan: new THREE.Color().setHSL(186 / 360, 0.91, 0.47),
    mkPurple: new THREE.Color().setHSL(265 / 360, 0.90, 0.66),
  };
}

// Create theme-aware material with gradient tint for light mode
function createGradientMaterial(colors: ReturnType<typeof getThemeColors>, isLightMode: boolean) {
  if (!isLightMode) {
    // Dark mode: standard crystal material (unchanged)
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.95, 0.95, 1.0), // Subtle blue tint for crystal look
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.98, // More glass-like
      thickness: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02, // More reflective
      emissive: colors.mkPurple,
      emissiveIntensity: 0.2,
      ior: 1.5,
      side: THREE.DoubleSide,
    });
  }

  // Light mode: enhanced visibility with stronger brand colors
  const gradientBase = new THREE.Color().setHSL(265 / 360, 0.90, 0.50); // Darker purple for better visibility
  
  return new THREE.MeshPhysicalMaterial({
    // Stronger base color for visibility in light mode
    color: new THREE.Color(0.70, 0.65, 0.85), // Stronger purple-tinted base
    metalness: 0.18,
    roughness: 0.15, // More roughness for better visibility
    transmission: 0.55, // Less transparent for better visibility
    thickness: 0.7,
    clearcoat: 1.0,
    clearcoatRoughness: 0.15, // More roughness to prevent overexposure
    // Stronger emissive for visibility
    emissive: gradientBase,
    emissiveIntensity: 0.65, // Higher intensity for better visibility in light mode
    ior: 1.5,
    side: THREE.DoubleSide,
  });
}

// Model component that loads and renders the GLB
function TorusModel({ onLoaded, onProgress }: { onLoaded: () => void; onProgress?: (progress: number) => void }) {
  const { scene } = useGLTF('/models/hero.glb');
  const meshRef = useRef<THREE.Group>(null);
  const colors = useMemo(() => getThemeColors(), []);
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  useEffect(() => {
    // Simulate progress during material setup
    if (onProgress) {
      onProgress(50); // Material setup started
    }

    // Apply theme-based crystal/glassy material
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = createGradientMaterial(colors, isLightMode);
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Notify parent that model is loaded
    if (onProgress) onProgress(100);
    onLoaded();
  }, [scene, onLoaded, onProgress, colors, isLightMode]);

  // Auto-rotation animation (slow, continuous)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[0.9, 0.9, 0.9]} // Reduced scale to fit within canvas, no clipping
      position={[0, 0, 0]}
    />
  );
}

// Rim lighting component using point lights - theme-aware
function RimLights() {
  const colors = useMemo(() => getThemeColors(), []);
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  
  return (
    <>
      {/* Magenta rim light (left) - stronger in light mode for gradient */}
      <pointLight
        position={[-3, 2, 3]}
        color={colors.mkMagenta}
        intensity={isLightMode ? 2.0 : 1.5}
        distance={10}
        decay={2}
      />
      {/* Cyan rim light (right) - stronger in light mode for gradient */}
      <pointLight
        position={[3, -2, 3]}
        color={colors.mkCyan}
        intensity={isLightMode ? 2.0 : 1.5}
        distance={10}
        decay={2}
      />
      {/* Purple accent light (top) - creates gradient center */}
      <pointLight
        position={[0, 4, 2]}
        color={colors.mkPurple}
        intensity={isLightMode ? 1.5 : 1.0}
        distance={10}
        decay={2}
      />
      {/* Ambient fill - brighter in light mode for visibility */}
      <ambientLight intensity={isLightMode ? 0.8 : 0.4} />
      {/* Main directional light for highlights - controlled in light mode */}
      <directionalLight position={[5, 5, 5]} intensity={isLightMode ? 0.9 : 1.0} />
      {/* Additional directional light for more highlights */}
      <directionalLight position={[-5, 3, 5]} intensity={isLightMode ? 0.5 : 0.6} />
      {/* Top-down light for gradient effect in light mode */}
      {isLightMode && (
        <directionalLight position={[0, 5, 0]} intensity={0.6} color={colors.mkPurple} />
      )}
    </>
  );
}

// Loading fallback component
function LoadingFallback() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.wireframe = true;
      materialRef.current.opacity = 0.3;
      materialRef.current.transparent = true;
    }
  }, []);
  
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial ref={materialRef} />
    </mesh>
  );
}

// Canvas content component (only rendered on client)
function CanvasContent({ onLoaded, onProgress }: { onLoaded: () => void; onProgress?: (progress: number) => void }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RimLights />
      <TorusModel onLoaded={onLoaded} onProgress={onProgress} />
      <Hero3DParticles count={40} enabled={true} />
      {/* Ensure particles render above other elements */}
      <Environment preset="night" /> {/* Darker environment for neon theme */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Suspense>
  );
}

// Main Hero3D component - Client-only, renders Canvas
export function Hero3D({ onLoad, onProgress }: { onLoad?: (loaded: boolean) => void; onProgress?: (progress: number) => void }) {
  const [loaded, setLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      // Initialize progress
      const store = getStore();
      const setHeroProgress = store.getState().setHeroProgress;
      if (setHeroProgress) {
        setHeroProgress(0);
      }
    }
  }, []);

  const handleProgress = useCallback((progress: number) => {
    const store = getStore();
    const setHeroProgress = store.getState().setHeroProgress;
    if (setHeroProgress) {
      setHeroProgress(progress);
    }
    if (onProgress) {
      onProgress(progress);
    }
  }, [onProgress]);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    const store = getStore();
    const setIsHeroReady = store.getState().setIsHeroReady;
    if (setIsHeroReady) {
      setIsHeroReady(true);
    }
    if (onLoad) {
      onLoad(true);
    }
  }, [onLoad]);

  // Don't render Canvas until mounted and in browser
  if (!isMounted || typeof window === 'undefined') {
    return (
      <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center">
        <Hero3DLoader isLoading={true} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, rotateY: -0.5 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full h-[600px] flex items-center justify-center"
    >
      {/* Radial glow behind model - only visible in dark mode, subtle in light mode */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[80%] bg-gradient-radial from-mk-purple/20 via-mk-magenta/10 to-transparent rounded-full blur-3xl dark:opacity-100 opacity-0" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }} // Increased distance and reduced FOV for better framing
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="relative"
        style={{ 
          width: '100%', 
          height: '600px', 
          background: 'transparent', 
          zIndex: 5, 
          border: 'none', 
          outline: 'none',
          backgroundColor: 'transparent' // Explicit transparent background for light mode
        }}
      >
        <CanvasContent onLoaded={handleLoaded} onProgress={handleProgress} />
      </Canvas>

      {/* Subtle gradient mask that fades edges into hero background - no hard edges, only in dark mode */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden dark:block hidden">
        {/* Soft fade from all edges - dissolves into hero (dark mode only) */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent/30 to-transparent" 
             style={{
               maskImage: 'radial-gradient(ellipse 80% 80% at center, black 40%, transparent 70%)',
               WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at center, black 40%, transparent 70%)',
             }}
        />
        {/* Very subtle glass effect - lower opacity (dark mode only) */}
        <div className="absolute inset-0 backdrop-blur-[0.5px] opacity-30"
             style={{
               maskImage: 'radial-gradient(ellipse 80% 80% at center, black 50%, transparent 80%)',
               WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at center, black 50%, transparent 80%)',
             }}
        />
      </div>

      {/* Gradient mask to preserve text readability (left side only) - soft fade, subtle in light mode */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background/30 via-transparent/50 to-transparent dark:opacity-100 opacity-0"
           style={{
             maskImage: 'linear-gradient(to right, black 0%, transparent 60%)',
             WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 60%)',
           }}
      />
    </motion.div>
  );
}

