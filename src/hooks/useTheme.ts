import { useContext } from "react";
import ThemeContext from "../contexts/themeContext";

const useTheme = () => useContext(ThemeContext);

export default useTheme;
