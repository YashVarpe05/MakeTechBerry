import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Internships from "./pages/admin/Internships";
import ProjectProposals from "./pages/admin/ProjectProposals";
import Projects from "./pages/admin/Projects";
import Reports from "./pages/admin/Reports";
import Services from "./pages/Services";
import Project from "./pages/Project";
import Messages from "./pages/admin/Messages";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Workshop from "./pages/Workshop";

function AppContent() {
	const location = useLocation();
	const isAdminPage = location.pathname.startsWith("/admin");

	return (
		<div className={isAdminPage ? "min-h-screen" : "bg-[#E7DEFE] min-h-screen"}>
			{!isAdminPage && <Navbar />}

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/services" element={<Services />} />
				<Route path="/projects" element={<Project />} />
				<Route path="/register" element={<Register />} />
				<Route path="/about" element={<About />} />
				<Route path="/workshop" element={<Workshop />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/admin/login" element={<Login />} />
				<Route
					path="/admin/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/internships"
					element={
						<ProtectedRoute>
							<Internships />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/project-proposals"
					element={
						<ProtectedRoute>
							<ProjectProposals />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/projects"
					element={
						<ProtectedRoute>
							<Projects />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/reports"
					element={
						<ProtectedRoute>
							<Reports />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/messages"
					element={
						<ProtectedRoute>
							<Messages />
						</ProtectedRoute>
					}
				/>
			</Routes>

			{!isAdminPage && <Footer />}
		</div>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}

export default App;