import { useContext } from "react";
import confirmationModalContext from "../contexts/confirmationModalContext";

const useConfirmationModal = () => useContext(confirmationModalContext);

export default useConfirmationModal;
