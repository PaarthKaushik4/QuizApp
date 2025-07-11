import { Outlet, useLocation } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import NavBar from "./HomePage/NavBar";

const RootLayout = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ["/login", "/signup"];
  const hideHeaderFooter = noHeaderFooterPaths.includes(location.pathname);


  return (
    <div>
      {!hideHeaderFooter && (
        <header>
          <NavBar />
        </header>
      )}
      <main>
        <Outlet />
        <ScrollRestoration />
      </main>
      {!hideHeaderFooter && (
        <footer>
          {/* <Footer setedLanguage={setedLanguage}/> */}
        </footer>
      )}
    </div>
  );
};

export default RootLayout;
