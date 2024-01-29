import constants from './constants';
import theme, {COLORS, SIZES, FONTS, lightTheme, darkTheme} from './theme';
import images from './images';
import icons from './icons';
// import dummyData from './dummyData';

function formatCurrency(numberValue) {
  // Convert the number to a string
  const numberString = numberValue?.toString();

  // Add commas to the string
  const formattedString = numberString?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedString;
}

export {
  constants,
  theme,
  COLORS,
  SIZES,
  FONTS,
  images,
  icons,
  // dummyData,
  lightTheme,
  darkTheme,
  formatCurrency,
};
