import { AspectRatio, Image } from "@mantine/core";
import { Card } from "../types/api";
import { motion } from "framer-motion";

interface CardItemProps {
    card: Card;
    width: number;
}

const CardItem = ({ card, width }: CardItemProps) => {
    return (
        <motion.div layout={"position"}>
            <AspectRatio
                ratio={5 / 7}
                maw={width}
                className="rounded-md overflow-hidden"
            >
                {card.imagesrc ? null : (
                    <div
                        className="absolute flex flex-col justify-center items-center"
                        style={{ width: width }}
                    >
                        {card.name.split(" ").map((word, index) => (
                            <p
                                key={index}
                                className="font-black text-white select-none text-4xl"
                                style={{ mixBlendMode: "exclusion" }}
                            >
                                {word}
                            </p>
                        ))}
                    </div>
                )}
                <Image
                    src={`https://arkhamdb.com${card.imagesrc}`}
                    className="h-full object-cover object-left"
                    alt={`${card.name} card art`}
                    fallbackSrc="https://hallofarkham.com/wp-content/uploads/2020/07/arkham2.png"
                />
            </AspectRatio>
        </motion.div>
    );
};

export default CardItem;
