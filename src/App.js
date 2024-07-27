import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import AddCity from './components/AddCity';
import AddTheatre from './components/AddTheatre';
import AddCategory from './components/AddCategory';
import AddMovie from './components/AddMovie';
import AddScreen from './components/AddScreen';
import AddShow from './components/show/AddShow'

function App() {




  return (
    <div className="App">
      {/* <AddCity/> */}
      {/* <AddTheatre/> */}
      {/* <AddCategory/> */}
      {/* <AddMovie/> */}
      {/* <AddTheatre/> */}
      {/* <AddScreen/> */}
      <AddShow/>
    </div>
  );
}

export default App;
