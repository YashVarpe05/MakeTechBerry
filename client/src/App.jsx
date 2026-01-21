import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Internships from "./pages/admin/Internships";
import Projects from "./pages/admin/Projects";
import Reports from "./pages/admin/Reports";
import Contact from "./pages/Contact";

function AppContent() {
	const location = useLocation();
	const isAdminPage = location.pathname.startsWith("/admin");

	return (
		<div className={isAdminPage ? "min-h-screen" : "bg-[#E7DEFE] min-h-screen"}>
			{!isAdminPage && <Navbar />}
		
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
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
