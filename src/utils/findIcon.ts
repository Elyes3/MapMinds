import {
  IconDefinition,
  faHotel,
  faLandmark,
  faSackDollar,
  faSun,
  faTree,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { Icons } from '../shared/Icons';
const icons = {
  weather: faSun,
  nature: faTree,
  food: faUtensils,
  accommodation: faHotel,
  culture: faLandmark,
  budget: faSackDollar,
};
export function findIcon(iconName: keyof Icons): IconDefinition {
  return icons[iconName];
}
