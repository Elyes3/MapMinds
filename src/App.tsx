import './App.css';
import ProgressBar from './components/ProgressBar';
import React, { useEffect } from 'react';
import { CriteriaResponse } from './shared/CriteriaResponse';
import { useState } from 'react';
import DestinationDetailsCard from './components/DestinationDetailsCard';
import Criteria from './shared/Criteria';
import data from './data/data';
function shuffleArray(array: Criteria[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function App() {
  const [criteria, setCriteria] = useState<Criteria[]>([
    { key: 'Weather', image: 'weather' },
    { key: 'Nature', image: 'nature' },
    { key: 'Food', image: 'food' },
    { key: 'Accomodation', image: 'accommodation' },
    { key: 'Culture', image: 'culture' },
    { key: 'Budget', image: 'budget' },
  ]);
  const [criteriaResponse, setCriteriaResponse] = useState<CriteriaResponse>({
    criteriaNumber: 0,
    selectedItem: '',
    budget: 2000,
  });
  const allImages = (): string[] => {
    const images: string[] = [];
    Object.keys(data).map((criteria) => {
      images.push(data[criteria].image);
    });
    return images;
  };
  const [cardAnimation, setCardAnimation] = useState<boolean>(false);
  const changeCardAnimation = (value: boolean) => {
    setCardAnimation(value);
  };
  const changeCriteriaResponse = (
    key: keyof CriteriaResponse,
    value: string | number,
  ) => {
    let updatedCriteriaInfo = { ...criteriaResponse, [key]: value };
    if (key == 'criteriaNumber')
      updatedCriteriaInfo = { ...updatedCriteriaInfo, selectedItem: '' };
    console.log(updatedCriteriaInfo);
    setCriteriaResponse(updatedCriteriaInfo);
  };
  useEffect(() => {
    const shuffledCriteria = shuffleArray([...criteria]);
    setCriteria(shuffledCriteria);
  }, []);
  return (
    <div className="w-full h-full">
      <ProgressBar
        criteria={criteria}
        itemNumber={criteriaResponse.criteriaNumber}
      />
      <div className="h-full justify-center items-center flex">
        <DestinationDetailsCard
          criteriaInfo={data[criteria[criteriaResponse.criteriaNumber].image]}
          changeCriteriaResponse={changeCriteriaResponse}
          budget={criteriaResponse.budget}
          selectedItem={criteriaResponse.selectedItem}
          itemNumber={criteriaResponse.criteriaNumber}
          currentCriteria={allImages()}
          cardAnimation={cardAnimation}
          setCardAnimation={changeCardAnimation}
        ></DestinationDetailsCard>
      </div>
    </div>
  );
}

export default App;
