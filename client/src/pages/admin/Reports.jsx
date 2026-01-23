import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, FileText, TrendingUp, Users, Briefcase, ChevronRight, Search, Filter, Calendar, Mail, Phone, Clock, LogOut, GraduationCap, Building2, DollarSign, Calendar as CalendarIcon, Code, CheckCircle, XCircle, Download, ExternalLink, Trash2 } from "lucide-react";
import { getReports, getReportsByType, getReportsByAction, deleteReport } from "../../services/admin.service.js";
import { useToast } from "../../hooks/useToast.js";
import Toast from "../../components/forms/Toast.jsx";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: TrendingUp, label: "Dashboard", path: "/admin/dashboard", active: false },
    { icon: Users, label: "Internships", path: "/admin/internships", active: false },
    { icon: Briefcase, label: "Projects", path: "/admin/projects", active: false },
    { icon: FileText, label: "Reports", path: "/admin/reports", active: true },
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

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        const reportsRes = await getReports(token);
        setReports(reportsRes.data.data || []);
      } catch (error) {
        console.error("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const data = report.data || {};
    const matchesSearch =
      (report.type === "Internship" && (
        data.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
      (report.type === "Project" && (
        data.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesAction = filterAction === "all" || report.action === filterAction;
    return matchesSearch && matchesType && matchesAction;
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate days until expiration
  const getDaysUntilExpiration = (approvedAt) => {
    if (!approvedAt) return 0;
    const approved = new Date(approvedAt);
    const twoMonthsLater = new Date(approved);
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    const today = new Date();
    const diffTime = twoMonthsLater - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper function to construct resume URL
  const getResumeUrl = (resumePath) => {
    if (!resumePath) return null;
    const normalizedPath = resumePath.replace(/\\/g, '/');
    const path = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    return `http://localhost:5000${path}`;
  };

  // Delete report
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteReport(id, token);
      setReports(reports.filter(report => report._id !== id));
      showToast("Report deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete report");
      showToast("Failed to delete report. Please try again.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#9062FF] border-t-[#9062FF] border-opacity-30 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading reports...</p>
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
              Reports
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
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9062FF] rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Reports</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">{reports.length}</h2>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Approved</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">{reports.filter(r => r.action === "Approved").length}</h2>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Rejected</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">{reports.filter(r => r.action === "Rejected").length}</h2>
          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 w-full sm:min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, project title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9062FF] focus:border-transparent"
              />
            </div>
            <div className="relative w-full sm:min-w-[150px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9062FF] focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="Internship">Internship</option>
                <option value="Project">Project</option>
              </select>
            </div>
            <div className="relative w-full sm:min-w-[150px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9062FF] focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Actions</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* REPORT CARDS */}
        <div className="space-y-4 sm:space-y-6">
          {filteredReports.length > 0 ? (
            filteredReports.map((report, index) => {
              const data = report.data || {};
              const daysUntilExpiration = getDaysUntilExpiration(report.approvedAt);
              const isExpiringSoon = daysUntilExpiration <= 7 && daysUntilExpiration > 0;

              return (
                <div
                  key={report._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-sm ${
                        report.type === "Internship" ? "bg-[#9062FF]" : "bg-blue-500"
                      }`}>
                        {report.type === "Internship" ? (
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        ) : (
                          <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-black mb-1">
                          {report.type === "Internship" ? (data.fullName || "N/A") : (data.projectTitle || "N/A")}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {report.type} #{index + 1}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        report.action === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {report.action}
                      </span>
                      {isExpiringSoon && (
                        <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-700">
                          Expires in {daysUntilExpiration} days
                        </span>
                      )}
                      <button
                        onClick={() => handleDelete(report._id)}
                        disabled={deletingId === report._id}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === report._id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Internship Details */}
                  {report.type === "Internship" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.email || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Phone</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.phone || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Briefcase className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Domain</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">
                              <span className="px-3 py-1 bg-[#9062FF] text-white text-xs sm:text-sm font-medium rounded-full">
                                {data.domain || "N/A"}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Duration</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.duration || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <GraduationCap className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">College</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.college || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CalendarIcon className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Action Date</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{formatDate(report.approvedAt)}</p>
                          </div>
                        </div>
                      </div>

                      {data.resume && (
                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                          <a
                            href={getResumeUrl(data.resume)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#9062FF] text-white rounded-lg hover:bg-opacity-80 transition-all duration-200 font-medium text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span>View Resume</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </>
                  )}

                  {/* Project Details */}
                  {report.type === "Project" && (
                    <>
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 font-medium mb-2">Project Description</p>
                        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{data.projectDescription || "N/A"}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="flex items-start gap-3">
                          <Building2 className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Company Name</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.companyName || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Contact Person</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.contactPerson || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.email || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Phone</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.phone || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Code className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Tech Stack</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.techStack || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <DollarSign className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Budget</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.budget || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Timeline</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{data.timeline || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CalendarIcon className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Action Date</p>
                            <p className="text-sm sm:text-base text-gray-800 font-medium">{formatDate(report.approvedAt)}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center animate-slide-up">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                {searchTerm || filterType !== "all" || filterAction !== "all"
                  ? "No results found. Try adjusting your filters."
                  : "No reports yet"}
              </p>
            </div>
          )}
        </div>

        {/* Results count */}
        {filteredReports.length > 0 && (
          <div className="text-sm text-gray-600 text-center pb-4">
            Showing {filteredReports.length} of {reports.length} reports
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

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
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Reports;
