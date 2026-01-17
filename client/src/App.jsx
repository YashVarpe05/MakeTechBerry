import { BrowserRouter, Routes, Route } from "react-router-dom";
import InternshipRegister from "./pages/Register/InternshipRegister";
import CompanyProject from "./pages/ProjectRegister/CompanyProject";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Footer from './components/Footer';
function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Hero />} />
				<Route path="/register-internship" element={<InternshipRegister />} />
				<Route path="/register-project" element={<CompanyProject />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
