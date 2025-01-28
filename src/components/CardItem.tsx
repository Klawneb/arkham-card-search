import { Card } from "../types/api";
import { motion } from "framer-motion";

interface CardItemProps {
    card: Card;
}

export function CardItem({ card }: CardItemProps) {
    return (
        <motion.div
            layout
            className="w-[300px] h-[420px] rounded-xl transform-style-3d overflow-hidden"
        >
                <img
                    loading="lazy"
                    src={`https://arkhamdb.com${card.imagesrc}`}
                    className="absolute h-full w-full object-cover object-left rounded-xl"
                    alt={`${card.name} card art`}
                />
        </motion.div>
    );
}
