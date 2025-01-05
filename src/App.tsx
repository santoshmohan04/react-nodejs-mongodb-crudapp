import { useState, createContext } from 'react';
import './App.css';
import HomeComponent from './components/HomeComponent';
import TodoComponent from './components/TodoComponent';
import ArticleForm from './components/ArticleForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Articles from './components/Articles';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface TooltipDisplayProps {
  id: string;
  children: React.ReactElement;
  title: string;
}

export const ThemeContext = createContext({});

const TooltipDisplay = ({ id, children, title }: TooltipDisplayProps) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    {children}
  </OverlayTrigger>
);

function App() {
  const [theme, setTheme] = useState('dark');

  const appStyles = {
    backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    minHeight: '100vh',
    padding: '20px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const navbarStyles = theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-info';

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <div style={appStyles}>
          <nav className={`navbar navbar-expand-lg ${navbarStyles} mb-3`}>
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <Link to="/articles" className="navbar-brand">
              Articles
            </Link>
            <Link to="/todo" className="navbar-brand">
              Todo
            </Link>
            <TooltipDisplay
              title={theme === 'light' ? 'Switch To Dark Theme' : 'Switch to Light Theme'}
              id="t-1"
            >
              <div
                className="ml-auto"
                onClick={toggleTheme}
                style={{ cursor: 'pointer' }}
              >
                {theme === 'light' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-moon-stars-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-brightness-high"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                  </svg>
                )}
              </div>
            </TooltipDisplay>
          </nav>

          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/create" element={<ArticleForm />} />
            <Route path="/articles/edit/:id" element={<ArticleForm />} />
            <Route path="/todo" element={<TodoComponent />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;