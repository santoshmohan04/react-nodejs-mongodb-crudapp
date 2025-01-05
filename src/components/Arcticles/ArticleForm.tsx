import { useState, useEffect } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createArticle, updateArticle, fetchArticleById } from '../../services/articleService';

const ArticleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    published: false,
  });

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const article = await fetchArticleById(id);
        setFormData({
          title: article.title,
          description: article.description,
          url: article.url,
          published: article.published,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateArticle(id, formData);
      } else {
        await createArticle(formData);
      }
      navigate('/articles');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading article...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="alert alert-danger">{error}</div>
        <Button variant="secondary" onClick={() => navigate('/articles')}>
          Back to Articles
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>{id ? 'Edit Article' : 'Create New Article'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              {id ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>{id ? 'Update' : 'Create'} Article</>
          )}
        </Button>
        <Button 
          variant="secondary" 
          className="ms-2" 
          onClick={() => navigate('/articles')}
          disabled={loading}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default ArticleForm;