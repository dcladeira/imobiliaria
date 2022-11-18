import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Properties from './pages/Properties';

function App() {
  return (
    <div className="App">
     <Route>
      <Routes path='/' element = { <Properties /> } />
     </Route>
    </div>
  );
}

export default App;
