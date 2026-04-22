import { Outlet, useLocation } from "react-router-dom"
import { NavBar } from "../components/shared/NavBar"
import { Footer } from "../components/shared/Footer"
import { Banner } from "../components/home/Banner";
import { NewsLetter } from "../components/home/NewsLetter";
import { Sheet } from "../components/shared/Sheet";
import { useGlobalStore } from "../store/global.store";


export const RootLayout = () => {
  
    const {pathname} = useLocation();

    const isSheetOpen = useGlobalStore(state => state.isSheetOpen);
    const activeNavMobile = useGlobalStore(state => state.activeNavMobile);
  
  return (
    <main className="h-screen flex flex-col font-montserrat">
        <NavBar></NavBar>

        {
          pathname === "/" && <Banner></Banner>
        }
        <section className="container my-8 flex-1">
          <Outlet></Outlet>
        </section>

        {
          pathname==="/" &&<NewsLetter></NewsLetter>
        }

        {
          isSheetOpen && <Sheet></Sheet>
        }

        {
          activeNavMobile && <p>Movil</p>
        }
        
        <Footer></Footer>
    </main>
  )
}
