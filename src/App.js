import "./App.css";
import About from "./Component/About";
import Progress from "./Component/Progress";
import Create from "./Component/Create";
import Home from "./Component/Home";
import Quiz from "./Component/Quiz";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import InputHighlight from "./Component/Input_highlight";

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/quiz" exact element={<Quiz />} />
        <Route path="/test" exact element={<InputHighlight />} />
        <Route path="/create" exact element={<Create />} />
        <Route path="/progress" exact element={<Progress />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </PageTransition>
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
