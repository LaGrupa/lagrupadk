import styles from "./GoBackRow.module.css";
import GoBackButton from "./GoBackButton";


export default function GoBackRow() {
  return (
    <div className={styles.row}>
      <GoBackButton />
    </div>
  );
}
