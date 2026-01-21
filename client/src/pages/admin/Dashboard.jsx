import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Users, Briefcase, TrendingUp, FileText, ChevronRight, Search, Download, Filter, Calendar, Mail, Phone, MapPin, ExternalLink, Clock, LogOut } from "lucide-react";
import { getInternships, getProjects } from "../../services/admin.service.js";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: TrendingUp, label: "Dashboard", path: "/admin/dashboard", active: true },
    { icon: Users, label: "Internships", path: "/admin/internships", active: false },
    { icon: Briefcase, label: "Projects", path: "/admin/projects", active: false },
    { icon: FileText, label: "Reports", path: "/admin/reports", active: false },
    { icon: Mail, label: "Messages", path: "/admin/messages", active: false },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`${isCollapsed ? "w-20" : "w-64"
          } fixed left-0 top-0 h-screen bg-white border-r border-[#FFFFFF] transition-all duration-300 ease-in-out flex flex-col z-50
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
      {/* Logo Section */}
      <div className="p-4 sm:p-6 border-b border-[#FFFFFF] flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 animate-fade-in">
            <img
              src="/images/logo.png"
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-md"
              alt="MakeTechBerry Logo"
              onError={(e) => {
                e.target.src = "/images/logo-no_bg.png";
              }}
            />
            <span className="text-lg sm:text-2xl font-bold text-[#373771] tracking-tight">
              MakeTechBerry
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto">
            <img
              src="/images/logo.png"
              className="w-8 h-8 object-contain drop-shadow-md"
              alt="MakeTechBerry Logo"
              onError={(e) => {
                e.target.src = "/images/logo-no_bg.png";
              }}
            />
          </div>
        )}
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto hide-scrollbar">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => item.path !== "#" && navigate(item.path)}
            className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-start"
              } space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.active
                ? "bg-[#9062FF] text-white font-semibold shadow-sm"
                : "text-gray-600 hover:bg-[#9062FF] hover:bg-opacity-50 hover:text-white"
              }`}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && (
              <span className="font-medium animate-fade-in">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#FFFFFF]">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-start"
            } space-x-3 px-4 py-3 rounded-lg transition-all duration-200 bg-red-50 text-red-600 hover:bg-red-100 font-medium`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && (
            <span className="animate-fade-in">Logout</span>
          )}
        </button>
      </div>

      {/* Collapse Button - Desktop Only */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:block absolute -right-3 top-20 bg-white border border-[#9062FF] rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[#9062FF]"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronRight
          className={`w-4 h-4 text-[#9062FF] transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"
            }`}
        />
      </button>
    </div>
    </>
  );
};

const Dashboard = () => {
  const [internships, setInternships] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internshipsRes = await getInternships(token);
        const projectsRes = await getProjects(token);

        setInternships(internshipsRes.data.data);
        setProjects(projectsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Filter internships
  const filteredInternships = internships.filter((intern) => {
    const matchesSearch =
      intern.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      filterDomain === "all" || intern.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.projectTitle?.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
      project.companyName?.toLowerCase().includes(projectSearchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get unique domains and statuses for filters
  const uniqueDomains = [...new Set(internships.map((i) => i.domain))];
  const uniqueStatuses = [...new Set(projects.map((p) => p.status))];

  // Helper function to construct resume URL
  const getResumeUrl = (resumePath) => {
    if (!resumePath) return null;
    // Normalize path: replace backslashes with forward slashes
    const normalizedPath = resumePath.replace(/\\/g, '/');
    // Ensure path starts with /uploads
    const path = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    return `http://localhost:5000${path}`;
  };

  // Export to CSV function
  const exportToCSV = (data, filename) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).join(","));
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#9062FF] border-t-[#9062FF] border-opacity-30 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className={`flex-1 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 overflow-y-auto h-screen 
        ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'} 
        transition-all duration-300 hide-scrollbar`}>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-[#9062FF] hover:bg-[#9062FF] hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* PAGE HEADER */}
        <div className="flex items-center justify-between animate-slide-down flex-wrap gap-4 mt-12 lg:mt-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-black from-black via-[#9062FF] to-[#c9a7ff] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2 text-sm sm:text-base">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="sm:hidden">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9062FF] rounded-full flex items-center justify-center shadow-md">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9062FF] rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Registrations</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">{internships.length}</h2>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9062FF] rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Projects</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">{projects.length}</h2>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9062FF] rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Pending Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">{filteredProjects.filter(p => p.status === "pending").length}</h2>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9062FF] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">This month</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Completion Rate</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">87%</h2>
          </div>
        </div>

        {/* INTERNSHIP TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#9062FF] rounded-lg flex items-center justify-center shadow-sm">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-black bg-clip-text text-transparent">
                Internship Registrations
              </h2>
            </div>
            <button
              onClick={() => exportToCSV(internships, "internships")}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#9062FF] text-white rounded-lg hover:bg-opacity-80 transition-all duration-200 font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6">
            <div className="flex-1 w-full sm:min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9062FF] focus:border-transparent"
              />
            </div>
            <div className="relative w-full sm:min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9062FF] focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Domains</option>
                {uniqueDomains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">Domain</th>
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">Duration</th>
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">Resume</th>
                </tr>
              </thead>
              <tbody>
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((intern) => (
                    <tr
                      key={intern._id}
                      className="border-b border-gray-100 hover:bg-[#E7DEFE] hover:bg-opacity-10 transition-colors duration-150"
                    >
                      <td className="p-3 sm:p-4 text-gray-800 font-medium text-sm">{intern.fullName}</td>
                      <td className="p-3 sm:p-4 text-gray-600 flex items-center gap-2 text-xs sm:text-sm">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{intern.email}</span>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="px-2 sm:px-3 py-1 bg-[#9062FF] text-white text-xs sm:text-sm font-medium rounded-full">
                          {intern.domain}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-gray-600 text-sm">{intern.duration}</td>
                      <td className="p-3 sm:p-4">
                        {intern.resume ? (
                          <a
                            href={getResumeUrl(intern.resume)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-[#9062FF] font-medium hover:text-[#9062FF] hover:opacity-80 transition-colors text-xs sm:text-sm"
                          >
                            <span className="hidden sm:inline">View Resume</span>
                            <span className="sm:hidden">View</span>
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          </a>
                        ) : (
                          <span className="text-gray-400">No resume</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      {searchTerm || filterDomain !== "all"
                        ? "No results found. Try adjusting your filters."
                        : "No internship registrations yet"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Results count */}
          {filteredInternships.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredInternships.length} of {internships.length} registrations
            </div>
          )}
        </div>

        {/* PROJECTS LIST */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#9062FF] rounded-lg flex items-center justify-center shadow-sm">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-black bg-clip-text text-transparent">
                Project Submissions
              </h2>
            </div>
            <button
              onClick={() => exportToCSV(projects, "projects")}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#9062FF] text-white rounded-lg hover:bg-opacity-80 transition-all duration-200 font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6">
            <div className="flex-1 w-full sm:min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by project title or company..."
                value={projectSearchTerm}
                onChange={(e) => setProjectSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9062FF] focus:border-transparent"
              />
            </div>
            <div className="relative w-full sm:min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9062FF] focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Statuses</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-[#FFFFFF] hover:shadow-md transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-black">{project.projectTitle}</h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${project.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-[#9062FF] text-white"
                      }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <p className="text-gray-600 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <strong className="text-black">Company:</strong> {project.companyName}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <strong className="text-black">Tech Stack:</strong> {project.techStack}
                    </p>
                    <p className="text-gray-600">
                      <strong className="text-black">Budget:</strong> {project.budget}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-xl">
                {projectSearchTerm || filterStatus !== "all"
                  ? "No results found. Try adjusting your filters."
                  : "No project submissions yet"}
              </div>
            )}
          </div>

          {/* Results count */}
          {filteredProjects.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
};

export default Dashboard;