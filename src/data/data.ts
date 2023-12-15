import { Data } from '../shared/Questions';
const data: Data = {
  weather: {
    question:
      'What weather conditions would be your ideal choice for the destination?',
    choices: ['Sunny', 'Cold', 'Rainy', 'Cloudy'],
    type: 'static',
  },
  nature: {
    question: 'What natural surroundings do you desire in your destination?',
    choices: ['Tropical', 'Beaches', 'Mountains', 'Islands'],
    type: 'static',
  },
  food: {
    question:
      'What type of cuisine or culinary experience are you hoping to explore at your destination?',
    choices: ['Arab Food', 'Sea Food', 'Tropical Fruits', 'Fast Food'],
    type: 'static',
  },
  accommodation: {
    question:
      'What type of accommodation are you looking for at your destination?',
    choices: ['Hotels', 'Resorts'],
    type: 'static',
  },
  culture: {
    question:
      'What aspects of local culture are you interested in exploring during your visit?',
    choices: ['Urbanized', 'Wildlife', 'History'],
    type: 'static',
  },
  budget: {
    question: 'What budget range are you considering for your arrangements?',
    choices: [],
    type: 'dynamic',
  },
};

export default data;
