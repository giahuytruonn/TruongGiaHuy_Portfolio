import React, { useEffect, useRef } from 'react';

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const checkVideoTime = () => {
      if (video && !isNaN(video.duration) && video.duration > 0) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        let targetOpacity = 1;

        if (currentTime < 0.5) {
          // Fade in over 0.5s
          targetOpacity = currentTime / 0.5;
        } else if (currentTime > duration - 0.5) {
          // Fade out over 0.5s before the end
          targetOpacity = Math.max(0, (duration - currentTime) / 0.5);
        }

        // Apply opacity directly to the element style for smooth performance
        video.style.opacity = String(targetOpacity);
      }
      animationFrameId = requestAnimationFrame(checkVideoTime);
    };

    animationFrameId = requestAnimationFrame(checkVideoTime);

    const handleEnded = () => {
      // Set opacity to 0 on ended event
      video.style.opacity = '0';
      
      // Wait 100ms, reset to 0, then play again
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch((err) => {
            console.log("Browser auto-play restriction or play interrupted:", err);
          });
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  return (
    <div 
      className="absolute z-0 pointer-events-none w-full overflow-hidden"
      style={{
        top: '300px',
        inset: 'auto 0 0 0',
        height: 'calc(100% - 300px)'
      }}
    >
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        muted
        playsInline
        autoPlay
        className="w-full h-full object-cover"
        style={{ opacity: 0 }}
      />
      {/* Gradient Overlay: bg-gradient-to-b from-background via-transparent to-background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
    </div>
  );
};
