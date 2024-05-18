import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Connect from './Connect';
import Project from './Project';
import AccountInfo from './AccountInfo'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav>
          <Link to="/">Home</Link> | 
          <Link to="/project">Proiect</Link> | 
          <Link to="/accounts">Conturi</Link> 
        </nav> */}
        <Routes>
          <Route path="/" element={<Connect />} />
          <Route path="/project" element={<Project />} />
          <Route path="/accounts" element={<AccountInfo />} />  // Ruta pentru AccountInfo
        </Routes>
      </div>
    </Router>
  );
}

export default App;
