import React from 'react';
import { Row } from 'react-bootstrap';
import { Article } from '../../types/article';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  onDelete: () => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onDelete }) => {
  if (articles.length === 0) {
    return <p className="text-center mt-4">No articles found.</p>;
  }

  return (
    <Row>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} onDelete={onDelete} />
      ))}
    </Row>
  );
};

export default ArticleList;