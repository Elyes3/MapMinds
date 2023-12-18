import './App.css';
import ProgressBar from './components/ProgressBar';
import React, { useEffect } from 'react';
import { CriteriaResponse } from './shared/CriteriaResponse';
import { useState } from 'react';
import DestinationDetailsCard from './components/DestinationDetailsCard';
import Criteria from './shared/Criteria';
import data from './data/data';
import { Example } from './components/Sidebar';
import './App.css';
import { Country } from './shared/Country';
import { getCode } from './data/countries';
import { motion } from 'framer-motion';
import axios from 'axios';
function shuffleArray(array: Criteria[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
type UserQuestionAndResponse = {
  question: string;
  response: string | number;
};
function App() {
  const [userRes, setUserRes] = useState<UserQuestionAndResponse[]>([]);
  const [criteria, setCriteria] = useState<Criteria[]>([
    { key: 'Weather', image: 'weather' },
    { key: 'Nature', image: 'nature' },
    { key: 'Food', image: 'food' },
    { key: 'Accomodation', image: 'accommodation' },
    { key: 'Culture', image: 'culture' },
    { key: 'Budget', image: 'budget' },
  ]);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [criteriaNumber, setCriteriaNumber] = useState<number>(0);
  const [criteriaResponse, setCriteriaResponse] = useState<CriteriaResponse>({
    budget: 500,
    weather: '',
    nature: '',
    food: '',
    culture: '',
    accommodation: '',
  });
  const allImages = (): string[] => {
    const images: string[] = [];
    criteria.forEach((criteri) => {
      images.push(criteri.image);
    });
    return images;
  };
  const [countries, setCountries] = useState<Country[] | null>(null);
  const fetchCountries = async (body: CriteriaResponse) => {
    console.log(JSON.stringify(criteriaResponse));
    const response = await axios({
      method: 'post',
      url: 'https://mapminds.onrender.com/',
      data: body,
    });
    console.log(response.data);
    setCountries(response.data);
    return response.data;
  };
  const setBudget = (budget: number) => {
    setSelectedItem(`${budget}`);
    const updatedBudget = { ...criteriaResponse, budget };
    setCriteriaResponse(updatedBudget);
  };

  const changeCriteriaResponse = (
    key: keyof CriteriaResponse,
    value: string | number,
  ) => {
    console.log(key);
    console.log(value);
    const userResponses = [
      ...userRes,
      {
        question: data[criteria[criteriaNumber].image].question,
        response: value,
      },
    ];
    setUserRes(userResponses);
    setCriteriaNumber((prev) => prev + 1);
    setSelectedItem('');
    const updatedCriteriaInfo: CriteriaResponse = {
      ...criteriaResponse,
      [key]: value,
    };
    console.log(updatedCriteriaInfo);
    setCriteriaResponse(updatedCriteriaInfo);
    if (criteriaNumber == 5) {
      fetchCountries(updatedCriteriaInfo);
    }
  };
  useEffect(() => {
    const shuffledCriteria = shuffleArray([...criteria]);
    setCriteria(shuffledCriteria);
  }, []);
  return (
    <div className="w-full h-full p-12 overflow-visible">
      <Example userQuestionsAndResponse={userRes} />
      <ProgressBar criteria={criteria} itemNumber={criteriaNumber} />
      <div className="h-full justify-center items-center flex">
        {criteriaNumber < 6 ? (
          <DestinationDetailsCard
            criteriaInfo={data[criteria[criteriaNumber].image]}
            changeCriteriaResponse={changeCriteriaResponse}
            budget={criteriaResponse.budget}
            selectedItem={selectedItem}
            setBudget={setBudget}
            itemNumber={criteriaNumber}
            setCriteriaNumber={setCriteriaNumber}
            setSelectedItem={setSelectedItem}
            allCriteria={allImages()}
          ></DestinationDetailsCard>
        ) : (
          <div
            style={{ width: '80vw' }}
            className="shadow-2xl bg-white opacity-90 p-5 text-center rounded-3xl"
          >
            <p
              className="text-2xl lg:text-4xl"
              onClick={() => console.log(JSON.stringify(criteriaResponse))}
            >
              Your suggested destinations are :
            </p>
            {countries === null ? (
              <div className="justify-center items-center mt-16 flex">
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
              </div>
            ) : countries.length === 0 ? (
              <p className="text-md mt-16 lg:text-xl">
                No destinations found !
              </p>
            ) : (
              <div
                className={
                  'mt-16 grid grid-cols-1 md:grid-cols-' +
                  (countries.length === 1 ? '1 ' : '2 ')
                }
              >
                {countries.map((country, id) => (
                  <div
                    className="flex flex-col justify-center items-center"
                    key={country.pays}
                  >
                    <motion.div
                      className="overflow-hidden"
                      initial={{ x: -50, rotate: -90, opacity: 0 }}
                      animate={{ x: 0, rotate: 0, opacity: 1 }}
                      transition={{
                        delay: 0.15 * (id + 1),
                        duration: 0.3,
                      }}
                    >
                      <img
                        src={`https://flagsapi.com/${getCode(
                          country.pays,
                        )}/flat/64.png`}
                      />
                    </motion.div>
                    <motion.div
                      className="mt-2 overflow-visible"
                      transition={{ staggerChildren: 0.3 }}
                    >
                      {country.pays.split('').map((letter, id) => (
                        <motion.span
                          className=" overflow-visible"
                          key={id}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: 0.15 * (id + 1),
                            duration: 0.3,
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.div>
                    <motion.div
                      className="mt-2"
                      transition={{ staggerChildren: 0.3 }}
                    >
                      {country.gouvernorat.split('').map((letter, id) => (
                        <motion.span
                          key={id}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: 0.15 * (id + 1),
                            duration: 0.3,
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
