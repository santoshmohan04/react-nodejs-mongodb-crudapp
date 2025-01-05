import { useEffect, useState } from 'react';
import { Row, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types/article';
import { fetchArticles } from '../services/articleService';
import ArticleCard from './ArticleCard';

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 text-center">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Articles</h2>
        <Button variant="primary" onClick={() => navigate('/articles/create')}>
          <i className="bi bi-plus-lg"></i> Create Article
        </Button>
      </div>
      <Row>
        {articles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            onDelete={loadArticles}
          />
        ))}
      </Row>
    </div>
  );
};

export default Articles;