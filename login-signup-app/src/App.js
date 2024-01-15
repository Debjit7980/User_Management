import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './Components/AddUser';
import UpdateUser from './Components/UpdateUser';
import Delete from './Components/Delete';
import './Components/style.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/addUser" element={<AddUser/>}></Route>
          <Route path="/updateUser/:id" element={<UpdateUser/>} ></Route>
          <Route path="/deleteUser" element={<Delete/>}/>
        </Routes>
      </Router>

    </div>

  );
}

export default App;
