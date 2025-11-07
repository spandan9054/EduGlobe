import { useEffect, useRef } from 'react';

export function EarthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = 600;
    canvas.width = size;
    canvas.height = size;

    let rotation = 0;

    const drawEarth = () => {
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2.5;

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Draw outer glow
      const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.3);
      outerGlow.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      outerGlow.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)');
      outerGlow.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, size, size);

      // Draw main globe with gradient
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, '#4a9eff');
      gradient.addColorStop(0.4, '#2563eb');
      gradient.addColorStop(0.7, '#1e40af');
      gradient.addColorStop(1, '#1e3a8a');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw latitude lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        const y = centerY + (lat / 90) * radius * 0.8;
        const width = Math.sqrt(radius * radius - Math.pow(lat / 90 * radius * 0.8, 2)) * 2;
        ctx.ellipse(centerX, y, width / 2, radius * 0.1, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * Math.abs(Math.cos(angle)), radius, Math.PI / 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw continents (simplified shapes)
      ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.lineWidth = 2;

      const continents = [
        // North America
        { x: -0.3 + Math.cos(rotation) * 0.3, y: -0.2, scale: 0.35, angle: rotation },
        // South America
        { x: -0.2 + Math.cos(rotation + 0.5) * 0.3, y: 0.3, scale: 0.25, angle: rotation + 0.5 },
        // Europe
        { x: 0.1 + Math.cos(rotation + 1) * 0.3, y: -0.3, scale: 0.2, angle: rotation + 1 },
        // Africa
        { x: 0.15 + Math.cos(rotation + 1.2) * 0.3, y: 0.1, scale: 0.3, angle: rotation + 1.2 },
        // Asia
        { x: 0.4 + Math.cos(rotation + 2) * 0.3, y: -0.1, scale: 0.4, angle: rotation + 2 },
        // Australia
        { x: 0.5 + Math.cos(rotation + 2.5) * 0.3, y: 0.35, scale: 0.2, angle: rotation + 2.5 },
      ];

      continents.forEach(continent => {
        // Only draw if on visible hemisphere
        const visibilityFactor = Math.cos(continent.angle);
        if (visibilityFactor > -0.3) {
          ctx.globalAlpha = Math.max(0.3, visibilityFactor);
          
          ctx.beginPath();
          const cx = centerX + continent.x * radius;
          const cy = centerY + continent.y * radius;
          const scale = continent.scale * radius * (0.8 + visibilityFactor * 0.2);
          
          // Draw organic continent shape
          ctx.ellipse(cx, cy, scale, scale * 0.8, continent.angle * 0.3, 0, Math.PI * 2);
          ctx.fill();
          
          // Add some detail
          ctx.beginPath();
          ctx.ellipse(cx + scale * 0.3, cy - scale * 0.2, scale * 0.4, scale * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      // Draw clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      const clouds = [
        { x: 0.2, y: -0.4, scale: 0.3, speed: 1.2 },
        { x: -0.4, y: 0.1, scale: 0.25, speed: 0.8 },
        { x: 0.3, y: 0.4, scale: 0.2, speed: 1.5 },
        { x: -0.1, y: -0.2, scale: 0.35, speed: 1.0 },
      ];

      clouds.forEach(cloud => {
        const cloudRotation = rotation * cloud.speed;
        const visibilityFactor = Math.cos(cloudRotation);
        if (visibilityFactor > -0.2) {
          ctx.globalAlpha = Math.max(0.1, visibilityFactor * 0.3);
          const cx = centerX + cloud.x * radius + Math.cos(cloudRotation) * radius * 0.2;
          const cy = centerY + cloud.y * radius;
          const scale = cloud.scale * radius;
          
          ctx.beginPath();
          ctx.ellipse(cx, cy, scale, scale * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      // Add atmospheric glow
      const atmosphereGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.95, centerX, centerY, radius * 1.05);
      atmosphereGradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
      atmosphereGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.3)');
      atmosphereGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.05, 0, Math.PI * 2);
      ctx.fillStyle = atmosphereGradient;
      ctx.fill();

      // Add highlight
      const highlight = ctx.createRadialGradient(
        centerX - radius * 0.4,
        centerY - radius * 0.4,
        0,
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.5
      );
      highlight.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      highlight.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = highlight;
      ctx.fill();

      // Smooth shadow on the right edge
      const shadow = ctx.createRadialGradient(
        centerX + radius * 0.4,
        centerY + radius * 0.2,
        radius * 0.3,
        centerX + radius * 0.3,
        centerY + radius * 0.2,
        radius * 1.2
      );
      shadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadow.addColorStop(0.6, 'rgba(0, 0, 0, 0.3)');
      shadow.addColorStop(1, 'rgba(0, 0, 0, 0.5)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = shadow;
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      rotation += 0.003; // Slow rotation
      drawEarth();
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      // Animation will stop when component unmounts
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full blur-sm animate-float-slow" />
        <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-blue-300/20 rounded-full blur-md animate-float-slower" />
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-blue-500/25 rounded-full blur-sm animate-float-medium" />
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-15px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(5px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
