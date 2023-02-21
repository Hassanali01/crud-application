import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Company from './components/company';
import CompanyDetails from './components/companyDetails';
import Header from './components/Header';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/company' element={<Company/>} ></Route>
        <Route path='/companyDetails' element={<CompanyDetails/>}></Route>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
