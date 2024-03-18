import { Outlet } from "react-router-dom";
import NavBar from './components/NavBar.tsx';

function App() {

  return (
    <>
      <NavBar/>
      <div className="page-container">
        <Outlet/>
      </div>
    </>
  )
}

export default App
