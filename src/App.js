// import { Box } from "@chakra-ui/react";
import "./App.css";
import Contact from "./Component/Contact";
import Create from "./Component/Create";
// import Highlight from "./Component/Highlight";
import Home from "./Component/Home";
// import Navbar from "./Component/Navbar";
import Quiz from "./Component/Quiz";
// import Suffix from "./Component/Suffix";
// import Updated from "./Component/Updated";
// import Input from "./Component/Input";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
  // Link
} from "react-router-dom";
// import HighlightTwo from "./Component/Highlight_2";
import InputHighlight from "./Component/Input_highlight";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/quiz" exact element={<Quiz />} />
        {/* <Route path="/highlight" exact element={<Highlight />} /> */}
        {/* <Route path="/highlight" exact element={<HighlightTwo />} /> */}
        <Route path="/test" exact element={<InputHighlight />} />
        <Route path="/create" exact element={<Create />} />
        <Route path="/contact" exact element={<Contact />} />
        {/* <Route path="/input" exact element={<Input />} /> */}
        {/* <Route path="/suffix" exact element={<Suffix />} /> */}
        {/* <Route path="/updated" exact element={<Updated />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
