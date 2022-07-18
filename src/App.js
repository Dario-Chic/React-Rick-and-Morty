import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ModalWindow from "./components/ModalWindow";
import { ActiveNavProvider } from "./context/ActiveNavContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ScrollProvider } from "./context/ScrollContext";
import { ThemeProvider } from "./context/ThemeContext";
import Characters from "./pages/Characters";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <LanguageProvider>
        <ThemeProvider>
          <ScrollProvider>
            <ActiveNavProvider>
              {/* -- */}
              <HashRouter>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route
                      path="character/:id"
                      element={<ModalWindow type={"character"} url="/" />}
                    />
                  </Route>
                  <Route path="characters" element={<Characters />}>
                    <Route
                      path="character/:id"
                      element={
                        <ModalWindow type={"character"} url="/characters" />
                      }
                    />
                  </Route>
                  <Route
                    path="episodes"
                    element={
                      <>
                        <h2>Episodes</h2>
                      </>
                    }
                  />
                </Routes>
                <Footer />
              </HashRouter>
              {/* -- */}
            </ActiveNavProvider>
          </ScrollProvider>
        </ThemeProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
