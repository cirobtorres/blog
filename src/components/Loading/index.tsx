import Styles from "./Styles.module.css";

const Loading = ({ size = 48 }: { size?: number }) => {
  return (
    <span
      className={Styles["loading"]}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Loading;
