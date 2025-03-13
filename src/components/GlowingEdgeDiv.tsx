import { useState, useRef, MouseEvent } from "react";

interface GlowingEdgeDivProps {
  leftOnClick: () => void;
  rightOnClick: () => void;
}

const GlowingEdgeDiv = ({ leftOnClick, rightOnClick }: GlowingEdgeDivProps) => {
  const [leftGlow, setLeftGlow] = useState(0);
  const [rightGlow, setRightGlow] = useState(0);
  const [leftIconPos, setLeftIconPos] = useState(0);
  const [rightIconPos, setRightIconPos] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const divWidth = rect.width;

    // Calculate distance from edges (20% threshold)
    const edgeThreshold = divWidth * 0.1
    const leftDistance = mouseX;
    const rightDistance = divWidth - mouseX;

    // Calculate glow intensity (0-0.5)
    const leftIntensity = Math.max(0, (edgeThreshold - leftDistance) / edgeThreshold);
    const rightIntensity = Math.max(0, (edgeThreshold - rightDistance) / edgeThreshold);

    setLeftGlow(leftIntensity * 0.2);
    setRightGlow(rightIntensity * 0.2);

    // Calculate icon positions (0-1)
    setLeftIconPos(leftIntensity);
    setRightIconPos(rightIntensity);
  };

  const handleMouseLeave = () => {
    setLeftGlow(0);
    setRightGlow(0);
    setLeftIconPos(0);
    setRightIconPos(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}
      className="w-full h-full"
    >
      {/* Left glow overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "10%",
          background: `linear-gradient(to right, rgba(255, 255, 255, ${leftGlow}), transparent)`,
          transition: "opacity 0.3s ease",
        }}
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          leftOnClick();
        }}
      />

      {/* Right glow overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "10%",
          background: `linear-gradient(to left, rgba(255, 255, 255, ${rightGlow}), transparent)`,
          transition: "opacity 0.3s ease",
        }}
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          rightOnClick();
        }}
      />

      {/* Left icon */}
      <div
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: `translateY(-50%) translateX(${-20 + leftIconPos * 20}px)`,
          opacity: Math.max(0.2, leftIconPos),
          pointerEvents: "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </div>

      {/* Right icon */}
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: `translateY(-50%) translateX(${20 - rightIconPos * 20}px)`,
          opacity: Math.max(0.2, rightIconPos),
          pointerEvents: "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  );
};

export default GlowingEdgeDiv;
