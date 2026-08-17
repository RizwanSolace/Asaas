import { View } from 'react-native';

export const enableScreens = () => undefined;
export const enableFreeze = () => undefined;
export const screensEnabled = () => false;
export const shouldUseActivityState = () => false;

export const Screen = View;
export const NativeScreen = View;
export const ScreenContainer = View;
export const NativeScreenContainer = View;
export const ScreenStack = View;
export const ScreenStackHeaderConfig = View;
export const ScreenStackHeaderSubview = View;
export const FullWindowOverlay = View;
export const SearchBar = View;
export const ActivityState = {
  INACTIVE: 0,
  TRANSITIONING_OR_BELOW_TOP: 1,
  ON_TOP: 2,
};

export default {
  enableScreens,
  enableFreeze,
  screensEnabled,
  Screen,
  NativeScreen,
  ScreenContainer,
  NativeScreenContainer,
  ScreenStack,
  ScreenStackHeaderConfig,
  ScreenStackHeaderSubview,
  FullWindowOverlay,
  SearchBar,
};