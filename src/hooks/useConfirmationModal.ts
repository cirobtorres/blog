import ConfirmationModalContext from "@/contexts/ConfirmationModalContext";
import { useContext } from "react";

const useConfirmationModal = () => useContext(ConfirmationModalContext);

export default useConfirmationModal;
