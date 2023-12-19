import React, { useState, useEffect } from 'react';
import { Question } from '../shared/Questions';
import Chips from './Chips';
import { motion, useAnimation } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { CriteriaResponse } from '../shared/CriteriaResponse';
type Props = {
  changeCriteriaResponse: (
    key: keyof CriteriaResponse,
    value: string | number,
  ) => void;
  criteriaInfo: Question;
  budget: number;
  selectedItem: string;
  itemNumber: number;
  allCriteria: string[];
  setBudget: (budget: number) => void;
  setSelectedItem: Dispatch<SetStateAction<string>>;
  setCriteriaNumber: Dispatch<SetStateAction<number>>;
};
export default function DestinationDetailsCard({
  changeCriteriaResponse,
  criteriaInfo,
  budget,
  selectedItem,
  itemNumber,
  allCriteria,
  setSelectedItem,
  setBudget,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const backgroundImageUrl = '/images/weather.png'; // Replace with your image URL

    const img = new Image();
    img.src = backgroundImageUrl;

    img.onload = () => {
      // Image has loaded, update state
      setImageLoaded(true);
    };

    // Optionally, you can handle the case when the image fails to load
    img.onerror = () => {
      console.error('Error loading background image');
    };

    // Cleanup: remove event listeners when the component is unmounted
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);
  const parentControls = useAnimation();
  const childControls = useAnimation();
  const handleAnimation = async () => {
    await childControls.start({ y: -150 }, { duration: 0.5 });
    await parentControls.start({ overflow: 'hidden' });
    await childControls.start({ y: 300 }, { duration: 0.5 });

    changeCriteriaResponse(
      //@ts-ignore
      allCriteria[itemNumber],
      allCriteria[itemNumber] === 'budget'
        ? parseInt(selectedItem)
        : selectedItem,
    );
    await childControls.start({ y: -150 }, { duration: 0.5 });
    await parentControls.start({ overflow: 'visible' });
    await childControls.start({ y: 0 }, { duration: 0.5 });
  };
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
          className="transition-1"
          style={{
            width: 80 * 6 + 'vw',
            display: 'flex',
            height: '100%',
            transition: 'transform ease-out 0.3s',
            transform: `translateX(${-(itemNumber * 80)}vw)`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {allCriteria.map((criteria, id) => (
            <motion.div
              key={id}
              animate={parentControls}
              initial={{ overflow: 'visible' }}
              className="h-64 md:h-96 w-full rounded-xl flex justify-center items-center relative shadow-lg"
              style={{
                backgroundImage: imageLoaded
                  ? 'url("/images/' + criteria + '.png")'
                  : '/images/Logo.svg',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '80vw',
                backgroundPosition: 'center',
              }}
            >
              {imageLoaded ? (
                <motion.div
                  animate={childControls}
                  transition={{ duration: 1.5 }}
                  className="w-11/12 md:w-10/12 lg:w-10/12 bg-white shadow-2xl  opacity-90 p-5 rounded-xl absolute bottom"
                  data-bottom={criteriaInfo.choices?.length}
                >
                  <div>
                    <h3 className="text-center">{criteriaInfo.question}</h3>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex md:flex-row flex-col gap-3 justify-center items-center mt-7">
                      {criteriaInfo.type === 'static' ? (
                        criteriaInfo.choices?.map((choice) => (
                          <Chips
                            key={choice}
                            choice={choice}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                          ></Chips>
                        ))
                      ) : (
                        <div className="flex items-end gap-5">
                          <input
                            type="range"
                            min="500"
                            defaultValue="0"
                            max="15000"
                            className="input-range"
                            onChange={(event) => {
                              setBudget(parseInt(event.target.value));
                            }}
                          />
                          <span
                            className="font-bold text-blue-500"
                            style={{ width: '5ch' }}
                          >
                            {budget}$
                          </span>
                        </div>
                      )}
                    </div>

                    {selectedItem && (
                      <div className="flex justify-center mt-5">
                        <motion.button
                          initial="hidden"
                          animate="visible"
                          onClick={async () => {
                            if (itemNumber < 5) handleAnimation();
                            //@ts-ignore
                            else if (itemNumber == 5) {
                              await childControls.start(
                                { y: -150 },
                                { duration: 0.5 },
                              );
                              await parentControls.start({
                                overflow: 'hidden',
                              });
                              await childControls.start(
                                { y: 300 },
                                { duration: 0.5 },
                              );
                              await parentControls.start(
                                { y: 250, opacity: 0 },
                                { duration: 0.5 },
                              );
                              await parentControls.start(
                                { display: 'none' },
                                { duration: 0 },
                              );
                              changeCriteriaResponse(
                                //@ts-ignore
                                allCriteria[itemNumber],
                                allCriteria[itemNumber] === 'budget'
                                  ? parseInt(selectedItem)
                                  : selectedItem,
                              );
                            }
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
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
