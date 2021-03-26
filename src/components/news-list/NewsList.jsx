import React, { useEffect, useState } from 'react';
import { News } from '../news/News';
import s from './NewsList.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
      try {
        const result = await fetch(apiUrl);
        if (!result.ok) {
          throw new Error('result not ok');
        }
        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt gögn');
        return;
      } finally {
        setLoading(false);
      }
      setData(json);
    }
    fetchData();
  }, []);
  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    )
  }
  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }
  const news = data || [];
  return (
    <section className={s.newsList__section}>
      {news.length > 0 && news.map((n, i) => {
        return (
          <div key={i} className={[s.newsList__box,s.newsList__col, s.newsList__col_b, s.newsList__col_m, s.newsList__col_sm].join(" ")}>
          <News
            id={n.id}
            limit={5}
            link={false}
          />
          </div>
        )

      })
      }
    </section>
  );
}
