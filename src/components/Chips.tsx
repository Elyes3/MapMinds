import React from 'react';
import { useState } from 'react';
import { CriteriaResponse } from '../shared/CriteriaResponse';
import { motion } from 'framer-motion';
type Props = {
  choice: string;
  changeCriteriaResponse: (
    key: keyof CriteriaResponse,
    value: string | number,
  ) => void;
  selectedItem: string;
};
export default function Chips({
  choice,
  changeCriteriaResponse,
  selectedItem,
}: Props) {
  const [isWavy, setIsWavy] = useState<boolean>(false);
  return (
    <motion.div
      onHoverStart={() => {
        setIsWavy(true);
      }}
      initial={{
        color: '#0099ff',
      }}
      animate={
        selectedItem !== choice
          ? {
              color: isWavy ? '#FFFFFF' : '#0099ff',
            }
          : {
              color: '#FFFFFF',
            }
      }
      transition={{
        delay: 0.2,
      }}
      onHoverEnd={() => setIsWavy(false)}
      className={
        'p-2 relative border-2 rounded-full cursor-pointer overflow-hidden font-bold z-5 border-[#0099ff] text-[#0099ff]'
      }
      onClick={() => {
        if (selectedItem !== choice)
          changeCriteriaResponse('selectedItem', choice);
      }}
    >
      <div className="z-10">{choice}</div>
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: isWavy || selectedItem === choice ? '-4.5rem' : 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className=" absolute top-12 -z-10 h-12 left-0 w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            className="-z-10"
            d="M0,192L40,181.3C80,171,160,149,240,165.3C320,181,400,235,480,256C560,277,640,267,720,229.3C800,192,880,128,960,96C1040,64,1120,64,1200,80C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
        <div className="h-16 w-full relative bottom-1 bg-[#0099ff]"></div>
      </motion.div>
    </motion.div>
  );
}
