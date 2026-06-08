import React, { useEffect, useRef } from 'react';

export const VideoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      originalVx: number;
      originalVy: number;
    }

    const nodes: Node[] = [];
    const maxNodes = 150; // Cap to prevent performance drops
    const initialNodeCount = Math.min(80, Math.floor((width * height) / 15000));
    const connectionDistance = 120;
    const mouse = { x: -1000, y: -1000, active: false };
    const repulsionRadius = 120; // Distance within which particles are pushed

    // Initialize nodes
    for (let i = 0; i < initialNodeCount; i++) {
      const vx = (Math.random() - 0.5) * 0.4;
      const vy = (Math.random() - 0.5) * 0.4;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: vx,
        vy: vy,
        originalVx: vx,
        originalVy: vy,
        radius: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Nodes
      nodes.forEach((node) => {
        // Apply physics if mouse is active and close
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repulsionRadius) {
            // Calculate force: stronger when closer
            const force = (repulsionRadius - dist) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            
            // Push node away from mouse
            node.x += Math.cos(angle) * force * 3;
            node.y += Math.sin(angle) * force * 3;
            
            // Temporarily speed up the node's velocity
            node.vx = Math.cos(angle) * 0.8;
            node.vy = Math.sin(angle) * 0.8;
          } else {
            // Gradually return to original calm velocity
            node.vx += (node.originalVx - node.vx) * 0.05;
            node.vy += (node.originalVy - node.vy) * 0.05;
          }
        } else {
          // Return to original calm velocity when mouse is away
          node.vx += (node.originalVx - node.vx) * 0.05;
          node.vy += (node.originalVy - node.vy) * 0.05;
        }

        // Apply velocities
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off boundaries
        if (node.x < 0 || node.x > width) {
          node.vx *= -1;
          node.originalVx *= -1;
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
          node.originalVy *= -1;
        }

        // Keep inside bounds
        if (node.x < 0) node.x = 0;
        if (node.x > width) node.x = width;
        if (node.y < 0) node.y = 0;
        if (node.y > height) node.y = height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(111, 111, 111, 0.4)';
        ctx.fill();
      });

      // Draw Connection Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(111, 111, 111, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Draw interactive connection to user mouse pointer
        if (mouse.active) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance + 50) {
            const alpha = (1 - dist / (connectionDistance + 50)) * 0.25;
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Click handler to spawn new temporary particles
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const spawnCount = 6;
      for (let i = 0; i < spawnCount; i++) {
        if (nodes.length < maxNodes) {
          // Speed vectors for explosion effect
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.5 + 0.5;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          
          nodes.push({
            x: clickX,
            y: clickY,
            vx: vx,
            vy: vy,
            originalVx: vx * 0.2, // Drifts slowly after explosion
            originalVy: vy * 0.2,
            radius: Math.random() * 2 + 1,
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('click', handleCanvasClick);
      }
    };
  }, []);

  return (
    <div 
      className="absolute z-0 w-full overflow-hidden bg-white cursor-pointer"
      style={{
        top: '300px',
        inset: 'auto 0 0 0',
        height: 'calc(100% - 300px)'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-white"
      />
      {/* Gradient Overlay blending with page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
    </div>
  );
};
