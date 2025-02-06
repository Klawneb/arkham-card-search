import { AspectRatio } from "@mantine/core";
import { Card } from "../types/api";
import { motion } from "framer-motion";

interface CardItemProps {
    card: Card;
}

const CardItem = ({ card }: CardItemProps) => {
    return (
        <motion.div layout="position">
            <AspectRatio
                ratio={5 / 7}
                maw={200}
                className="rounded-md overflow-hidden"
            >
                <img
                    src={`https://arkhamdb.com${card.imagesrc}`}
                    className="h-full object-cover object-left"
                    alt={`${card.name} card art`}
                />
            </AspectRatio>
        </motion.div>
    );
};

export default CardItem;
