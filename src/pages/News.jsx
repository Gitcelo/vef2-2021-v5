import { News } from '../components/news/News';
import { useParams } from 'react-router-dom';

export function NewsPage() {
  const { id } = useParams();
  return (
    <News id={id} />
  );
}