import "./App.css";
import Contact from "./Component/Contact";
import Create from "./Component/Create";
import Home from "./Component/Home";
import Quiz from "./Component/Quiz";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputHighlight from "./Component/Input_highlight";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" exact element={<PageTransition><Home /></PageTransition>} />
        <Route path="/quiz" exact element={<PageTransition><Quiz /></PageTransition>} />
        <Route path="/test" exact element={<PageTransition><InputHighlight /></PageTransition>} />
        <Route path="/create" exact element={<PageTransition><Create /></PageTransition>} />
        <Route path="/contact" exact element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
