import * as React from 'react';
import { motion } from 'framer-motion';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const childVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    opacity: 0,
    y: 50,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

type UserQuestionAndResponse = {
  question: string;
  response: string | number;
};
type Props = {
  userQuestionsAndResponse: UserQuestionAndResponse[];
};
const Navigation = ({ userQuestionsAndResponse }: Props) => (
  <motion.div
    className="flex justify-center flex-col gap-3 top-12 absolute p-3 w-full"
    variants={variants}
  >
    <motion.h1 variants={childVariants} className="z-50 text-3xl text-center">
      Your Responses:
    </motion.h1>
    {userQuestionsAndResponse.length > 0 ? (
      userQuestionsAndResponse.map((userQA) => (
        <motion.div
          variants={childVariants}
          key={userQA.response}
          className="shadow-2xl border-none outline-none rounded-xl bg-white text-center z-50 p-5 overflow-hidden response-card relative"
        >
          <div className="mb-5">
            <p className="text-md">{userQA.question}</p>
          </div>
          <span className="text-white bg-[#0099ff] p-3 rounded-xl change-bg">
            {userQA.response}
          </span>
        </motion.div>
      ))
    ) : (
      <motion.div
        variants={childVariants}
        className="shadow-2xl border-none outline-none rounded-xl w-full bg-white text-center z-50 p-3"
      >
        <h5>No Responses were made !</h5>
      </motion.div>
    )}
  </motion.div>
);
export default Navigation;
