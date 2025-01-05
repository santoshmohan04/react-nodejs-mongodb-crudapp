import { useContext } from 'react';
import { ThemeContext } from '../App';
import Button from 'react-bootstrap/Button';

function GrandChildComponent() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Button type="button" variant={theme === 'light' ? 'dark' : 'light'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label={`Change to ${theme === 'light' ? 'dark' : 'light'} theme`}> Change To {theme === 'light' ? 'dark' : 'light'} Theme
        </Button> 
  );
}

export default GrandChildComponent;
