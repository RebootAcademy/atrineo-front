import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

function Layout(){
  return (
    <main className="h-screen">
      <Header/>
      <Outlet/>
    </main>
  )
}

export default Layout