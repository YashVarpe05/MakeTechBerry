import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, ChevronDown } from "lucide-react";
import { sendContactMessage } from "../services/contact.service.js";
import { useToast } from "../hooks/useToast.js";
import Toast from "../components/forms/Toast.jsx";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    institute: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { fullName, email, institute, phone, subject, message } = formData;

    if (!fullName || !email || !institute || !phone || !subject || !message) {
      showToast("Please fill out all fields before sending.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendContactMessage({
        fullName,
        email,
        institute,
        phone,
        subject,
        message,
      });

      showToast("Message sent! We'll get back to you soon.", "success");

      setFormData({
        fullName: "",
        email: "",
        institute: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to send message. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "How soon will I get a reply?",
      a: "We usually respond within 24–48 hours depending on the request.",
    },
    {
      q: "Can I contact for internship guidance?",
      a: "Yes! You can contact us for internship, project guidance, mentorship, and collaboration.",
    },
    {
      q: "Do you support academic and industrial projects?",
      a: "Yes, we support both academic and industrial projects with documentation and clean implementation.",
    },
  ];

  return (
    <div className="pt-28 min-h-screen bg-[#FCFBFF]">
      {/* HEADER */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
            Let’s Talk with{" "}
            <span className="text-purple-600">MakeTechBerry</span>
          </h1>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Have a project idea, internship query, or want to collaborate? Send
            us a message and we’ll connect with you.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Send us a message
            </h2>
            <p className="text-gray-600 mt-2">
              Fill the form and our team will contact you.
            </p>

            {/* divider line */}
            <div className="mt-6 h-[1px] w-full bg-gray-100" />

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              </div>

              {/* Institute / Business / Company */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Institute / Business / Company
                </label>
                <input
                  name="institute"
                  type="text"
                  placeholder="Enter your institute or company name"
                  value={formData.institute}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Internship / Project / Collaboration"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-purple-200 resize-none"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 text-white font-bold shadow-md hover:bg-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}{" "}
                <Send size={18} />
              </button>

              {/* Small helper text */}
              <p className="text-xs text-gray-500 text-center">
                Please enter valid details so we can reach you quickly.
              </p>
            </form>
          </div>

          {/* RIGHT: CLEAN CONTACT INFO */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Information
            </h2>
            <p className="text-gray-600 mt-2">
              Here are the best ways to reach us.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7F4FF] border border-purple-100">
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-purple-600 shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Email</p>
                  <p className="text-base font-bold text-gray-900">
                    maketechberry@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7F4FF] border border-purple-100">
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-purple-600 shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Phone</p>
                  <p className="text-base font-bold text-gray-900">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7F4FF] border border-purple-100">
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-purple-600 shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Location</p>
                  <p className="text-base font-bold text-gray-900">
                    Pune, Maharashtra
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7F4FF] border border-purple-100">
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-purple-600 shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">
                    Working Hours
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    Mon - Sat (10 AM - 7 PM)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button className="w-full px-5 py-3 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition shadow-sm">
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900">Quick FAQs</h2>
            <p className="text-gray-600 mt-2">
              Common questions students and interns ask us.
            </p>

            <div className="mt-6 space-y-3">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      type="button"
                    >
                      <span className="font-semibold text-gray-900">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        size={18}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
};

export default Contact;
