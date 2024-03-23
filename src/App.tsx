import { Outlet } from "react-router-dom";
import NavBar from './components/NavBar.tsx';

function App() {
  return (
    <div className="main">
      <NavBar/>
      <div className="page-container">
        <Outlet/>
      </div>
    </div>
  );
}
export default App;
