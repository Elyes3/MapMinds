import React from 'react';
import { useCycle } from 'framer-motion';
import { motion } from 'framer-motion';
import { MenuToggle } from './MenuToggle';
import Navigation from './Navigation';
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
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
export const Example = ({ userQuestionsAndResponse }: Props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
      <motion.div className="background overflow-scroll" variants={sidebar}>
        <Navigation
          userQuestionsAndResponse={userQuestionsAndResponse}
        ></Navigation>
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.div>
    </motion.nav>
  );
};
