import { useMantineColorScheme } from "@mantine/core";

export function darkenHexColor(hex: string, percent = 50) {
  // Ensure the hex code is valid and remove the "#" if present
  hex = hex.replace(/^#/, "");

  // Convert short hex format (e.g. "abc") to full format (e.g. "aabbcc")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // Ensure valid 6-character hex
  if (hex.length !== 6) {
    throw new Error("Invalid hex color format");
  }

  // Convert hex to RGB values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Reduce brightness by the given percentage
  const darken = (color: number) =>
    Math.max(0, Math.min(255, Math.round(color * (1 - percent / 100))));

  r = darken(r);
  g = darken(g);
  b = darken(b);

  // Convert back to hex and return
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`;
}

export const useBackgroundColor = (darkColor: string, lightColor: string) => {
  const theme = useMantineColorScheme().colorScheme;
  return theme === "dark" ? darkColor : lightColor;
};
