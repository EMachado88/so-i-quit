import {View, type ViewProps} from 'react-native';
import {useColorScheme} from "@/hooks/use-color-scheme";
import {themes} from "@/constants/theme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({style, lightColor, darkColor, ...otherProps}: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = themes[colorScheme].colors.background;

  return <View style={[{backgroundColor}, style]} {...otherProps} />;
}
