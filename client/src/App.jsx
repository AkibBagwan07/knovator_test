import ImportHistoryTable from "./components/ImportHistoryTable";
import styles from "./App.module.css"
function App() {
  return (
    <div>
      <header className={styles.banner}>
        <h1 className={ styles.header}>Job Importer Dashboard</h1>
      </header>
      <ImportHistoryTable />
    </div>
  );
}

export default App;
