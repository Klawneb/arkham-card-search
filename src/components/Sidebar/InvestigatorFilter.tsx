import React from "react";
import { AspectRatio, Image, Modal, MantineTransition } from "@mantine/core";
import FlipCard from "../FlipCard";
import { useFilterStore } from "../../lib/filter";
import InvestigatorCombobox from "./InvestigatorComboBox";
import { Card } from "../../types/api";
import parseHTML from "html-react-parser";
import { parseCardText } from "../../lib/parsers";
import { useDisclosure } from "@mantine/hooks";

interface InvestigatorFilterProps {
  cards: Card[];
}

const enterTransition: MantineTransition = {
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0 },
  transitionProperty: "opacity, scale",
};

function onBackgroundClicked(e: React.MouseEvent<HTMLDivElement>, closeFunction: () => void) {
  if (e.target === e.currentTarget) {
    closeFunction();
  }
}

const InvestigatorFilter = ({ cards }: InvestigatorFilterProps) => {
  const [opened, handlers] = useDisclosure();
  const filterStore = useFilterStore();

  return (
    <div className="m-2 flex flex-col">
      <InvestigatorCombobox
        cards={cards}
        onSelect={(investigator) => filterStore.setInvestigatorFilter(investigator)}
      />
      {filterStore.investigatorFilter && (
        <div className="flex flex-col">
          <AspectRatio
            ratio={7 / 5}
            onClick={() => handlers.open()}
            className="cursor-pointer my-2"
          >
            <Image src={`https://arkhamdb.com${filterStore.investigatorFilter?.imagesrc}`} />
          </AspectRatio>
        </div>
      )}

      {filterStore.investigatorFilter && (
        <Modal.Root
          opened={opened}
          onClose={handlers.close}
          closeOnClickOutside={true}
          centered
          size={"auto"}
          className="container"
          transitionProps={{ transition: enterTransition }}
          classNames={{
            content: "bg-transparent",
          }}
        >
          <Modal.Overlay backgroundOpacity={0.9} blur={5}></Modal.Overlay>
          <Modal.Content>
            <Modal.Body>
              <div className={`overflow-hidden`}>
                <div className="grid grid-cols-[500px,auto,500px] h-[50vh]">
                  <div onClick={(e) => onBackgroundClicked(e, handlers.close)}></div>
                  <div className="w-full h-full flex flex-col">
                    <AspectRatio ratio={7 / 5} className="h-full w-full flex-1">
                      <FlipCard
                        frontImage={`https://arkhamdb.com${filterStore.investigatorFilter.imagesrc}`}
                        backImage={`https://arkhamdb.com${filterStore.investigatorFilter.backimagesrc}`}
                      />
                    </AspectRatio>
                  </div>

                  <div
                    className="flex flex-col justify-between p-10 overflow-auto"
                    onClick={(e) => onBackgroundClicked(e, handlers.close)}
                  >
                    <div>
                      <h2 className="text-center text-5xl">
                        {filterStore.investigatorFilter.name}
                      </h2>
                      <p className="text-center font-bold text-2xl">
                        {filterStore.investigatorFilter.type_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-center text-2xl font-bold">
                        {filterStore.investigatorFilter.traits}
                      </p>
                      <p className="text-center text-2xl pt-8">
                        {filterStore.investigatorFilter.text
                          ? parseHTML(parseCardText(filterStore.investigatorFilter.text))
                          : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-center italic">{filterStore.investigatorFilter.flavor}</p>
                      <p className="text-center font-bold">
                        {filterStore.investigatorFilter.pack_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </div>
  );
};

export default InvestigatorFilter;
