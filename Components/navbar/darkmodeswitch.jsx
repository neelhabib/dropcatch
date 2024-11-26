import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export default function DarkModeSwitch({ size = "md" }) {
  const { setTheme, theme } = useNextTheme();

  return (
    <Switch
      size={size}
      color="warning"
      isSelected={theme === "dark"}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
      className="mb-2 md:mb-0"
    />
  );
}
