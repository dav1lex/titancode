"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Cookie from "js-cookie";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const handleThemeToggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        Cookie.set("theme", newTheme, { expires: 365 });
    };

  return (
    <Button variant="outline" size="icon" onClick={handleThemeToggle} >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
    </Button>
  );
}