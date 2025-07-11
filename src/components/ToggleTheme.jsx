import { Switch } from "@/components/ui/switch"
import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"

export default function ToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const isDark = theme === "dark"

  return (
    <div className="absolute top-9 right-15">
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="scale-150 cursor-pointer"
      />
    </div>
  )
}