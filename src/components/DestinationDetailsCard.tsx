import React from 'react';
import { Question } from '../shared/Questions';
import Chips from './Chips';
import { motion } from 'framer-motion';
import { CriteriaResponse } from '../shared/CriteriaResponse';
type Props = {
  changeCriteriaResponse: (
    key: keyof CriteriaResponse,
    value: string | number,
  ) => void;
  criteriaInfo: Question;
  budget: number;
  selectedItem: string;
  currentCriteria: string[];
  itemNumber: number;
  cardAnimation: boolean;
  setCardAnimation: (value: boolean) => void;
};
export default function DestinationDetailsCard({
  changeCriteriaResponse,
  criteriaInfo,
  budget,
  selectedItem,
  itemNumber,
  currentCriteria,
}: Props) {
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)',
    },
  };
  const iconCircle = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)',
    },
  };
  const buttonAnimation = {
    hidden: {
      backgroundColor: 'white',
      opacity: 0,
      width: 0,
      borderColor: 'white',
      borderWidth: 0,
    },
    visible: {
      backgroundColor: '#ecfaf4',
      opacity: 1,
      width: '100px',
    },
  };
  const span = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <motion.div
      className="h-full flex justify-center items-center"
      style={{ width: '80vw' }}
    >
      <div className="h-full flex overflow-hidden" style={{ width: '100%' }}>
        <div
          style={{
            width: 80 * 6 + 'vw',
            display: 'flex',
            height: '100%',
            transform: `translateX(${-(itemNumber * 80)}vw)`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {currentCriteria.map((criteria, id) => (
            <div
              key={id}
              className="h-64 md:h-96 w-full rounded-xl flex justify-center items-center relative"
              style={{
                backgroundImage: 'url("' + criteria + '")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '80vw',
                backgroundPosition: 'center',
              }}
            >
              <div
                className="w-11/12 md:w-10/12 lg:w-10/12 bg-white opacity-90 p-5 rounded-xl absolute bottom"
                data-bottom={criteriaInfo.choices?.length}
              >
                <div>
                  <h3 className="text-center">{criteriaInfo.question}</h3>
                </div>
                <div className="flex md:flex-row flex-col gap-3 justify-center items-center mt-7">
                  {criteriaInfo.type === 'static' ? (
                    criteriaInfo.choices?.map((choice) => (
                      <Chips
                        key={choice}
                        choice={choice}
                        selectedItem={selectedItem}
                        changeCriteriaResponse={changeCriteriaResponse}
                      ></Chips>
                    ))
                  ) : (
                    <div className="flex items-end gap-5">
                      <input
                        type="range"
                        min="0"
                        defaultValue="0"
                        max="30000"
                        className="input-range"
                        onChange={(event) =>
                          changeCriteriaResponse(
                            'budget',
                            parseInt(event.target.value),
                          )
                        }
                      />
                      <span
                        className="font-bold text-blue-500"
                        style={{ width: '5ch' }}
                      >
                        {budget}$
                      </span>
                    </div>
                  )}
                  {selectedItem && (
                    <motion.button
                      initial="hidden"
                      animate="visible"
                      onClick={() => {
                        
                        changeCriteriaResponse(
                          'criteriaNumber',
                          itemNumber + 1,
                        );
                      }}
                      variants={buttonAnimation}
                      transition={{
                        duration: 0.5,
                      }}
                      className="flex gap-2 p-2 border rounded-xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="25px"
                        viewBox="0 0 258 258"
                      >
                        {/* Check mark  */}
                        {/* Circle */}
                        <motion.path
                          d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
                          fill="transparent"
                          strokeWidth="8"
                          stroke="#35b38a"
                          variants={iconCircle}
                          initial="hidden"
                          animate="visible"
                          transition={{
                            default: {
                              delay: 1,
                              duration: 0.5,
                              ease: 'easeInOut',
                            },
                            fill: {
                              delay: 1,
                              duration: 0.5,
                              ease: [1, 0, 0.8, 1],
                            },
                          }}
                        />
                        *
                        <motion.path
                          transform="translate(60 85)"
                          d="M3 50L45 92L134 3"
                          fill="transparent"
                          variants={icon}
                          initial="hidden"
                          animate="visible"
                          transition={{
                            default: {
                              delay: 1,
                              duration: 0.8,
                              ease: 'easeInOut',
                            },
                            fill: {
                              delay: 1,
                              duration: 0.8,
                              ease: [1, 0, 0.8, 1],
                            },
                          }}
                          stroke="#35b38a"
                          strokeWidth={8}
                        />
                      </svg>
                      <motion.span
                        className="text-[#35b38a] font-bold"
                        initial="hidden"
                        animate="visible"
                        variants={span}
                        transition={{
                          delay: 2,
                          duration: 0.5,
                        }}
                      >
                        Next
                      </motion.span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
