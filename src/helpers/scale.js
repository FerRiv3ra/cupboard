import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const guideLineBaseWith = 360;
const guideLineBaseHeight = 640;

const withScale = size => (width / guideLineBaseWith) * size; //with
const heightScale = size => (height / guideLineBaseHeight) * size; //height
const paddingScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor; //padding

export {withScale, heightScale, paddingScale};
