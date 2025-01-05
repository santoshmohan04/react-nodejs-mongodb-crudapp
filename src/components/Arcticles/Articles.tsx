import { useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Article } from '../../types/article';
import { fetchArticles } from '../../services/articleService';
import ArticleSearchBar from './ArticleSearchBar';
import ArticleList from './ArticleList';
import ArticlePagination from './ArticlePagination';

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const articlesPerPage = 6; // Number of articles per page

  const loadArticles = async () => {
    try {
      const data = await fetchArticles();
      const sortedArticles = data.sort(
        (a: Article, b: Article) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setArticles(sortedArticles);
      setFilteredArticles(sortedArticles); // Initialize filtered articles
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

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
      <ArticleSearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <ArticleList articles={paginatedArticles} onDelete={loadArticles} />
      <ArticlePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Articles;