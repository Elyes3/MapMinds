import React from 'react';
import Criteria from '../shared/Criteria';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIcon } from '../utils/findIcon';
import { motion } from 'framer-motion';
type Props = {
  id: string;
  criteria: Criteria;
  itemNumber: number;
};
export default function ProgressItem({ criteria, id, itemNumber }: Props) {
  return (
    <div className="flex justify-center">
      <div className="w-20 h-20 rounded-full flex flex-col justify-center items-center z-5 overflow-hidden bg-white relative">
        <FontAwesomeIcon
          className={
            'text-2xl z-10 ' +
            (parseInt(id) <= itemNumber ? 'text-transit-white' : '')
          }
          icon={findIcon(criteria.image)}
        ></FontAwesomeIcon>
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: parseInt(id) <= itemNumber ? '-6.5rem' : 0,
          }}
          transition={{ duration: 1 }}
          className="absolute top-20 z-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className=" relative top-1 z-0"
          >
            <path
              fill="#0099ff"
              fillOpacity="1"
              d="M0,192L40,181.3C80,171,160,149,240,165.3C320,181,400,235,480,256C560,277,640,267,720,229.3C800,192,880,128,960,96C1040,64,1120,64,1200,80C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
          <div className="w-24 h-24 bg-[#0099ff] z-0"></div>
        </motion.div>
      </div>
    </div>
  );
}
