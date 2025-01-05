import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface ArticleSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ArticleSearchBar: React.FC<ArticleSearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <Form className="mb-4">
      <Row>
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Search articles by title"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ArticleSearchBar;