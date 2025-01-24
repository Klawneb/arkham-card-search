import { Card } from "../types/api";
import { motion } from "framer-motion";

interface CardItemProps {
    card: Card;
    flipped: boolean;
}

export function CardItem({ card, flipped }: CardItemProps) {

    return (
        <motion.div
            layout
            className="w-[300px] h-[420px] rounded-xl transform-style-3d overflow-hidden [perspective-1000px]"
        >
            <motion.div
                className="absolute w-full h-full backface-hidden rounded-xl"
                initial={{rotateY: 0}}
                animate={{rotateY: flipped ? 180 : 0}}
                transition={{duration: 1, ease: "easeInOut"}}
            >
                <motion.img
                    loading="lazy"
                    src="https://hallofarkham.com/wp-content/uploads/2021/12/bleed1.png"
                    className="h-full w-full object-cover object-left rounded-xl"
                    alt={`${card.name} card back`}
                />
            </motion.div>
            <motion.div
                className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl"
                initial={{rotateY: -180}}
                animate={{rotateY: flipped ? 0 : -180}}
                transition={{duration: 1, ease: "easeInOut"}}
            >
                <motion.img
                    loading="lazy"
                    src={`https://arkhamdb.com${card.imagesrc}`}
                    className="absolute h-full w-full object-cover object-left rounded-xl"
                    alt={`${card.name} card art`}
                />
            </motion.div>
        </motion.div>
    );
}
