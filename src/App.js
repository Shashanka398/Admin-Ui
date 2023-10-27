import logo from './logo.svg';
import Table from './components/Table';
import {useState} from 'react'
import SearchBar from './components/SearchBar'
import './App.css';

function App() {

  const [searchInput, setSearchInput] = useState("");
  return (
    <div className='app'>
      <SearchBar setSearchInput={setSearchInput}/>
      <Table searchInput={searchInput}/>

    </div>
  );
}

export default App;
