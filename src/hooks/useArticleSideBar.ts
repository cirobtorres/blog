import ArticleSideBarContext from "@/contexts/ArticleSideBarContext";
import { useContext } from "react";

const useArticleSideBar = () => useContext(ArticleSideBarContext);

export default useArticleSideBar;
