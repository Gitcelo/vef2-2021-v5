import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import s from './News.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function News({ id, limit = 10, link=true }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const url = `${apiUrl}/${id}`;
      setLoading(true);
      setError(null);
      let json;
      try {
        const result = await fetch(url);
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
  }, [id]);
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
  const title = (data && data.title) || '';
  const news = (data && data.items) || [];
  return ( 
    <div className={[s.news__flex, (link&&s.news__box)].join(" ")}>
      <h2>{title}</h2>
      <ul className={s.news__ul}>
        {news.length > 0 && news.map((n, i) => {
          if (i < limit) {
            return (
              <li key={i}>
              <a href={n.link}>{n.title}</a>
              </li>
            );
          }
          return (
            false
          );
        })}
        </ul>
        {(link&&<Link to="/">Til baka</Link>)||<Link to={id} className={s.news_link}><strong>Allar Fréttir</strong></Link>}
    </div>
  );
}
