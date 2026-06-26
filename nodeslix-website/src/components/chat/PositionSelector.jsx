import React, { forwardRef, useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';

const PositionSelector = forwardRef(({ position, launcherRef, onSelect }, ref) => {
  const [layoutState, setLayoutState] = useState({
    side: position === 'right' ? 'left' : 'right',
    shiftX: 0,
    isCalculated: false,
  });

  useEffect(() => {
    const calculatePosition = () => {
      if (!launcherRef?.current) return;
      const rect = launcherRef.current.getBoundingClientRect();
      const popoverWidth = 192; // w-48 is 192px
      const margin = 12;
      const padding = 16; // safety padding from screen boundary
      
      const spaceLeft = rect.left;
      const spaceRight = window.innerWidth - rect.right;
      
      // Default preferred side: open towards the center of the screen
      const preferredSide = position === 'right' ? 'left' : 'right';
      let side = preferredSide;
      
      if (preferredSide === 'left') {
        if (spaceLeft < popoverWidth + margin + padding) {
          // If insufficient space on left, flip to right if right has more space
          if (spaceRight > spaceLeft) {
            side = 'right';
          }
        }
      } else {
        if (spaceRight < popoverWidth + margin + padding) {
          // If insufficient space on right, flip to left if left has more space
          if (spaceLeft > spaceRight) {
            side = 'left';
          }
        }
      }
      
      // Calculate shift X to prevent any viewport overflow
      let shiftX = 0;
      if (side === 'left') {
        const leftEdge = rect.left - margin - popoverWidth;
        if (leftEdge < padding) {
          shiftX = padding - leftEdge;
        }
      } else {
        const rightEdge = rect.right + margin + popoverWidth;
        if (rightEdge > window.innerWidth - padding) {
          shiftX = -(rightEdge - (window.innerWidth - padding));
        }
      }
      
      setLayoutState({
        side,
        shiftX,
        isCalculated: true,
      });
    };

    // Calculate immediately on mount/update
    calculatePosition();
    
    // Add event listener to recalculate on resize
    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, [position, launcherRef]);

  const { side, shiftX, isCalculated } = layoutState;

  // Position style: Centered vertically relative to the launcher (sibling in the parent flexbox)
  // and absolute offset to the left/right of the launcher.
  const style = {
    top: '50%',
    right: side === 'left' ? 'calc(100% + 12px)' : 'auto',
    left: side === 'right' ? 'calc(100% + 12px)' : 'auto',
  };

  // Animation values:
  // Slide in from the side it opens (right launcher -> side left -> slides right-to-left, so start with offset +15)
  // Slide in from the side it opens (left launcher -> side right -> slides left-to-right, so start with offset -15)
  const initialX = side === 'left' ? 15 : -15;

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX + shiftX, y: '-50%', scale: 0.95 }}
      animate={isCalculated ? { opacity: 1, x: shiftX, y: '-50%', scale: 1 } : { opacity: 0 }}
      exit={{ opacity: 0, x: initialX + shiftX, y: '-50%', scale: 0.95 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={style}
      className="absolute z-[99999] w-48 bg-[#0C0C0C]/95 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl pointer-events-auto"
    >
      <div className="text-[9px] font-extrabold text-[#B3B3B3]/60 uppercase tracking-widest px-1 pb-2 mb-2 select-none">
        Launcher Position
      </div>
      
      {/* Segmented Control with Sliding Indicator */}
      <div className="relative flex gap-1 p-1 overflow-hidden border bg-black/40 border-white/5 rounded-xl h-9">
        <button
          type="button"
          onClick={() => onSelect('left')}
          className="relative z-10 flex-1 flex items-center justify-center text-[11px] font-bold transition-colors duration-200 cursor-pointer outline-none rounded-lg"
          style={{ color: position === 'left' ? '#080808' : '#B3B3B3' }}
        >
          {position === 'left' && (
            <Motion.div
              layoutId="activePosition"
              className="absolute inset-0 bg-[#00D4FF] rounded-lg z-[-1] shadow-md shadow-[#00D4FF]/10"
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            />
          )}
          Left
        </button>
        <button
          type="button"
          onClick={() => onSelect('right')}
          className="relative z-10 flex-1 flex items-center justify-center text-[11px] font-bold transition-colors duration-200 cursor-pointer outline-none rounded-lg"
          style={{ color: position === 'right' ? '#080808' : '#B3B3B3' }}
        >
          {position === 'right' && (
            <Motion.div
              layoutId="activePosition"
              className="absolute inset-0 bg-[#00D4FF] rounded-lg z-[-1] shadow-md shadow-[#00D4FF]/10"
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            />
          )}
          Right
        </button>
      </div>
    </Motion.div>
  );
});

PositionSelector.displayName = 'PositionSelector';

export default PositionSelector;
