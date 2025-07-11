import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from "react"

export default function Favorite() {
  const {theme} = useContext(ThemeContext)

  return <div className={`${theme} pt-25 p-6 text-slate-900`}>Your favorite movies will appear here.</div>
}