import FlashMessageContext from "@/contexts/FlashMessageContext";
import { useContext } from "react";

const useFlashMessage = () => useContext(FlashMessageContext);

export default useFlashMessage;
