import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@mantine/core";

interface FlippableCardProps {
  frontImage: string;
  backImage: string;
}

const FlippableCard: React.FC<FlippableCardProps> = ({
  frontImage,
  backImage
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`relative cursor-pointer perspective-1000 h-full w-full`} onClick={handleFlip}>
      <div className="relative w-full h-full transition-all duration-500 preserve-3d">
        <motion.div
          className="absolute w-full h-full backface-hidden rounded-lg shadow-lg"
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 80,
            damping: 12,
          }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src={frontImage}
            className="h-full object-contain"
            fallbackSrc="https://hallofarkham.com/wp-content/uploads/2020/07/arkham2.png"
          />
        </motion.div>

        <motion.div
          className="absolute w-full h-full backface-hidden rounded-lg shadow-lg"
          animate={{
            rotateY: isFlipped ? 0 : -180,
          }}
          initial={{ rotateY: -180 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 80,
            damping: 12,
          }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src={backImage}
            className="h-full object-contain"
            fallbackSrc="https://hallofarkham.com/wp-content/uploads/2020/07/arkham2.png"
          />
        </motion.div>
      </div>
      <p>test teasdkaasdasdsad</p>
    </div>
  );
};

export default FlippableCard;
