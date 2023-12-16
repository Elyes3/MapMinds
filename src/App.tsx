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
    budget: 0,
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
    const updatedCriteriaInfo = { ...criteriaResponse, [key]: value };
    console.log(updatedCriteriaInfo);
    setCriteriaResponse(updatedCriteriaInfo);
  };
  useEffect(() => {
    const shuffledCriteria = shuffleArray([...criteria]);
    setCriteria(shuffledCriteria);
  }, []);
  return (
    <div className="w-full h-full p-12">
      <div className="w-full h-full overflow-visible">
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
              className="shadow-2xl bg-white opacity-90 p-5 text-center rounded-full"
            >
              <p
                className="text-6xl"
                onClick={() => console.log(JSON.stringify(criteriaResponse))}
              >
                Your suggested destinations are :
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
