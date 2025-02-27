import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Author from "./pages/Author";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/item-details/:nftid" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
}

export default App;
