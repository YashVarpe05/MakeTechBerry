import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  TrendingUp,
  Users,
  Briefcase,
  FileText,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  Search,
  Calendar,
  LogOut,
  Trash2,
} from "lucide-react";
import { getMessages, deleteMessage } from "../../services/admin.service.js";
import { useToast } from "../../hooks/useToast.js";
import Toast from "../../components/forms/Toast.jsx";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: TrendingUp, label: "Dashboard", path: "/admin/dashboard", active: false },
    { icon: Users, label: "Internships", path: "/admin/internships", active: false },
    { icon: Briefcase, label: "Projects", path: "/admin/projects", active: false },
    { icon: FileText, label: "Reports", path: "/admin/reports", active: false },
    { icon: Mail, label: "Messages", path: "/admin/messages", active: true },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`${isCollapsed ? "w-20" : "w-64"
          } fixed left-0 top-0 h-screen bg-white border-r border-[#FFFFFF] transition-all duration-300 ease-in-out flex flex-col z-50
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
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
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

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

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await getMessages(token);
        setMessages(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token, navigate]);

  const filteredMessages = messages.filter((msg) => {
    const term = searchTerm.toLowerCase();
    return (
      msg.fullName?.toLowerCase().includes(term) ||
      msg.email?.toLowerCase().includes(term) ||
      msg.phone?.toLowerCase().includes(term) ||
      msg.subject?.toLowerCase().includes(term) ||
      msg.message?.toLowerCase().includes(term)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteMessage(id, token);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      showToast("Message deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete message", error);
      showToast("Failed to delete message. Please try again.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#9062FF] border-t-[#9062FF] border-opacity-30 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading messages...</p>
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
        ${isCollapsed ? "lg:ml-20" : "lg:ml-64"} 
        transition-all duration-300 hide-scrollbar`}>

        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-[#9062FF] hover:bg-[#9062FF] hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-between animate-slide-down flex-wrap gap-4 mt-12 lg:mt-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-black from-black via-[#9062FF] to-[#c9a7ff] bg-clip-text text-transparent">
              Messages
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2 text-sm sm:text-base">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="sm:hidden">
                {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9062FF] rounded-full flex items-center justify-center shadow-md">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9062FF] rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Messages</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">{messages.length}</h2>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Unique Contacts</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mt-2">{new Set(messages.map((m) => m.email)).size}</h2>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Newest Received</p>
            <h2 className="text-lg sm:text-xl font-bold text-black mt-2">
              {messages[0]?.createdAt ? formatDate(messages[0].createdAt) : "No messages"}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 w-full sm:min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9062FF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, index) => (
              <div
                key={msg._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#9062FF] rounded-xl flex items-center justify-center shadow-sm">
                      <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-1">{msg.fullName || "Unknown"}</h3>
                      <p className="text-sm text-gray-500">{msg.subject || "No subject"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-700">
                      Received {formatDate(msg.createdAt)}
                    </span>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      disabled={deletingId === msg._id}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === msg._id ? (
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                      <p className="text-sm sm:text-base text-gray-800 font-medium">{msg.email || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Phone</p>
                      <p className="text-sm sm:text-base text-gray-800 font-medium">{msg.phone || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#9062FF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Submitted</p>
                      <p className="text-sm sm:text-base text-gray-800 font-medium">{formatDate(msg.createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-1">Message</p>
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center animate-slide-up">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                {searchTerm
                  ? "No messages match your search."
                  : "No messages yet."}
              </p>
            </div>
          )}
        </div>

        {filteredMessages.length > 0 && (
          <div className="text-sm text-gray-600 text-center pb-4">
            Showing {filteredMessages.length} of {messages.length} messages
          </div>
        )}
      </div>

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

export default Messages;
