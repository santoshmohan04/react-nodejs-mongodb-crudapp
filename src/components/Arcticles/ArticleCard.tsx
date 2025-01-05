import { useState } from 'react';
import { Card, Button, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Article } from '../../types/article';
import { deleteArticle } from '../../services/articleService';

interface ArticleCardProps {
  article: Article;
  onDelete: () => void;
}

const ArticleCard = ({ article, onDelete }: ArticleCardProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteArticle(article.id);
      onDelete();
    } catch (error) {
      console.error('Error deleting article:', error);
    } finally {
      setShowModal(false); // Close modal after handling deletion
    }
  };

  return (
    <Col sm={12} md={6} lg={4}>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title className="me-3" style={{ flex: 1 }}>
              {article.title}
            </Card.Title>
          </div>
          <Card.Text className="mt-2">{article.description}</Card.Text>
          <Button
            variant={article.published ? 'success' : 'warning'}
            href={article.url}
            target="_blank"
          >
            {article.published ? 'Read Article' : 'Coming Soon'}
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted d-flex justify-content-between">
          <small>
            Created At: {new Date(article.createdAt).toLocaleDateString()}
          </small>
          <div className="d-flex flex-nowrap">
            <Button
              variant="outline-primary"
              size="sm"
              className="me-2"
              onClick={() => navigate(`/articles/edit/${article.id}`)}
            >
              <i className="bi bi-pencil"></i>
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowModal(true)} // Show modal on delete click
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </Card.Footer>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this article? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ArticleCard;
