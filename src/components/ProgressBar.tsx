import React from 'react';
import ProgressItem from './ProgressItem';
import Criteria from '../shared/Criteria';
import { motion } from 'framer-motion';
type Props = {
  criteria: Criteria[];
  itemNumber: number;
};
export default function ProgressBar({ criteria, itemNumber }: Props) {
  const progressItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.3 },
    },
  };

  const progressItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <div className="w-full relative">
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '83.66%' }}
        transition={{ duration: 0.3, delay: 2.5 }}
        className="absolute h-3 z-0 flex items-center bg-red-50 top-8"
        style={{ left: 100 / 12 + '%' }}
      >
        <motion.div
          className="h-2 bg-[#0099ff]"
          initial={{
            width:
              ((itemNumber - 1) * 20 > 0 ? (itemNumber - 1) * 20 : 0) + '%',
          }}
          animate={{ width: itemNumber * 20 + '%' }}
          transition={{
            delay: 1,
          }}
        ></motion.div>
      </motion.div>
      <motion.div
        className="grid grid-cols-6 w-full z-10"
        initial="hidden"
        animate="visible"
        variants={progressItems}
      >
        {criteria.map((crit, id) => (
          <motion.div variants={progressItem} key={id.toString()}>
            <ProgressItem
              id={(id + 1).toString()}
              criteria={crit}
              itemNumber={itemNumber}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
