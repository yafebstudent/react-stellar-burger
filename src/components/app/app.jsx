import React, { useEffect, useState } from 'react';
import styles from "./App.module.css";
import { data } from "../../utils/data";
import getIngredientsData from '../../utils/api/getIngredientsData';

function App() {
  const [ingredientsData, setIngredientsData] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    getIngredientsData()
      .then((data) => {
        setIsLoading(false);
        setIngredientsData(data);
        setFetchError('');
      })
      .catch((error) => {
        setIsLoading(false);
        setIngredientsData(null);
        setFetchError(error.message);
      });
  }, []);

  return (
    <div className={styles.app}>
      <pre style={{
        margin: "auto",
        fontSize: "1.5rem"
      }}>
        Измените src/components/app/app.jsx и сохраните для обновления.
      </pre>
    </div>
  );
}

export default App;
