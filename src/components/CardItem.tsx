import {Card} from "../types/api";
import {motion} from "framer-motion";

interface CardItemProps {
    card: Card;
}

const CardItem = ({card}: CardItemProps) => {
    return (
        <motion.div
            layout={"position"}
            className="w-[200px] h-[280px] rounded-xl transform-style-3d overflow-hidden"
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

export default CardItem;