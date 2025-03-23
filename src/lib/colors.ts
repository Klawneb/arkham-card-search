import { useMantineColorScheme } from "@mantine/core";

export const useThemeColor = (darkColor: string, lightColor: string) => {
  const theme = useMantineColorScheme().colorScheme;
  return theme === "dark" ? darkColor : lightColor;
};
