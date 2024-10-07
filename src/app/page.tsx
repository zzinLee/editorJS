import dynamic from "next/dynamic";
import styles from "./page.module.css";

const Editor = dynamic(() => import("@/ui/components/Editor"), { ssr: false });

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Editor />
      </main>
    </div>
  );
}
