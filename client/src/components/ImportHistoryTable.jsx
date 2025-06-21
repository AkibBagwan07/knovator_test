import React, { useEffect, useState } from "react";
import { getImportLogs } from "../api";
import styles from "./ImportHistoryTable.module.css";

const ImportHistoryTable = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent import logs from backend
    const fetchLogs = async () => {
      try {
        const { data } = await getImportLogs();
        setLogs(data);
        console.log(data)
      } catch (err) {
        console.error("Error fetching import logs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "3rem" }}>Loading logs...</p>;
  }

  return (
    <>
      <div className={styles.heading}>Import History</div>

      <div className={styles.wrapper}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Feed URL</th>
                <th>Timestamp</th>
                <th>Total</th>
                <th>New</th>
                <th>Updated</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id}>
                  <td>{log.url}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.totalFetched}</td>
                  <td>{log.newJobs}</td>
                  <td>{log.updatedJobs}</td>
                  <td>{log.failedJobs?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ImportHistoryTable;
