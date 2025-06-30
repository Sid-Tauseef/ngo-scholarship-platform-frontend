import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  UserIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  BellIcon,
  MegaphoneIcon,
  EnvelopeIcon,
  BookOpenIcon,
  ArrowRightIcon,
  HeartIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LightBulbIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRole } from "../../contexts/RoleContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Simple Modal
function Modal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

const Landing = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const notificationRef = useRef(null);

  // Core state
  const [notifications, setNotifications] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [email, setEmail] = useState("");

  // Final stats (static) & animated stats (for count-up)
  const finalStats = { scholarships: 523, students: 10427, partners: 68 };
  const [animated, setAnimated] = useState({
    scholarships: 0,
    students: 0,
    partners: 0,
  });

  // Partner modal + form
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    reason: "",
    phone: "",
    location: "",
  });

  // Testimonials data
  const testimonials = [
    {
      quote:
        "The scholarship allowed me to pursue my dream of becoming a doctor. Without this support, I wouldn't have been able to afford medical school. Today, I'm serving in a rural hospital and paying it forward.",
      name: "Dr. Aisha Khan",
      role: "Medical Graduate, 2023",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQey3S6VQ4qIppedXehx8CQYDshaMBwU1UwpQ&s",
    },
    {
      quote:
        "As a first-generation college student, I faced many financial barriers. The vocational scholarship enabled me to complete my engineering degree. I'm now working at a tech firm and supporting my family.",
      name: "Rahul Sharma",
      role: "Software Engineer, 2024",
      image:
        "https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg",
    },
  ];

const partners = [
    {
      name: "EduFuture Foundation",
      logo:
        "/google.png",
    },
    {
      name: "Global Scholars Trust",
      logo:
        "/microsoft.png",
    },
    {
      name: "NextGen Learning",
      logo:
        "/google.png",
    },
  ];

  // Fetch notifications
  useEffect(() => {
    axios
      .get("https://ngo-scholarship-platform-backend.vercel.app/api/notifications")
      .then(({ data }) => setNotifications(data.data))
      .catch(() => setNotifications([]));
  }, []);

  // Initialize blog content and the re-triggering count-up
  useEffect(() => {
    // set blog posts
    setBlogPosts([
      {
        title: "How to Apply for a Scholarship",
        excerpt: "A step-by-step guide to securing educational aid",
        link: "/blog/1",
        date: "May 15, 2025",
      },
      {
        title: "Student Success: Aisha's Journey",
        excerpt: "From scholarship recipient to medical professional",
        link: "/blog/2",
        date: "June 2, 2025",
      },
      {
        title: "The Impact of Education on Communities",
        excerpt: "How scholarships transform entire neighborhoods",
        link: "/blog/3",
        date: "April 28, 2025",
      },
    ]);

    const duration = 2000; // 2 seconds for each count-up
    const easeOutQuad = (t) => t * (2 - t);

    // encapsulated animate function
    function animate() {
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = easeOutQuad(progress);

        setAnimated({
          scholarships: Math.floor(eased * finalStats.scholarships),
          students: Math.floor(eased * finalStats.students),
          partners: Math.floor(eased * finalStats.partners),
        });

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }

    // first run immediately
    animate();
    // rerun every 7 seconds
    const intervalId = setInterval(animate, 7000);

    return () => clearInterval(intervalId);
  }, []);

  // Continuous marquee for notifications
  useEffect(() => {
    const container = notificationRef.current;
    if (!container || !notifications.length) return;
    const ul = container.querySelector("ul");
    ul.innerHTML += ul.innerHTML;
    let pos = 0,
      raf;
    const scroll = () => {
      pos = (pos + 0.5) % (ul.scrollHeight / 2);
      container.scrollTop = pos;
      raf = requestAnimationFrame(scroll);
    };
    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, [notifications]);

  // Handlers
  const handleClick = (label) => {
    setRole(label.toUpperCase());
    navigate("/login");
  };
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with ${email}!`);
    setEmail("");
  };
  const openPartnerModal = () => setModalOpen(true);
  const closePartnerModal = () => setModalOpen(false);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };
  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://formspree.io/f/xovwkzdp", formData, {
        headers: { Accept: "application/json" },
      });
      alert("Submission received—thank you!");
      setFormData({
        organization: "",
        email: "",
        reason: "",
        phone: "",
        location: "",
      });
      closePartnerModal();
    } catch {
      alert("Uh-oh, error submitting form.");
    }
  };

  // Prepare impact tiles
  const impactTiles = [
    {
      icon: AcademicCapIcon,
      value: animated.scholarships,
      label: "Scholarships Awarded",
    },
    {
      icon: UserGroupIcon,
      value: animated.students,
      label: "Students Impacted",
    },
    {
      icon: BuildingLibraryIcon,
      value: animated.partners,
      label: "Partner Institutions",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero & Login */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <h1 className="text-5xl font-extrabold text-blue-600">
              Empowering Education for All
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Providing scholarships and educational resources to underprivileged
              students since 2025. Join us in transforming lives.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {["Admin", "Member", "Institute", "Student"].map((label) => (
                <button
                  key={label}
                  onClick={() => handleClick(label)}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-tr from-white to-emerald-50 hover:from-blue-50 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{label}</h3>
                    <p className="text-sm text-gray-500">Login as {label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 lg:sticky lg:top-12">
            <div className="flex items-center gap-2 mb-4">
              <MegaphoneIcon className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-semibold">Announcements</h2>
            </div>
            <div
              ref={notificationRef}
              className="h-96 overflow-hidden relative bg-gray-50 rounded-lg p-3"
            >
              <ul className="space-y-4">
                {notifications.map((n, i) => (
                  <li
                    key={i}
                    className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <BellIcon className="w-5 h-5 text-blue-500" />
                      <p className="text-sm text-gray-700 leading-snug">
                        {n.message}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Impact in Numbers (animated every 7s) */}
        <section className="mt-16 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl shadow-lg py-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto px-6">
            {impactTiles.map((tile, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-md border border-blue-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <tile.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">
                  {tile.value.toLocaleString()}+
                </h3>
                <p className="text-gray-600 font-medium">{tile.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scholarship Programs */}
        <section className="mt-16 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Our Scholarship Programs
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We offer various scholarship programs tailored to different educational
            needs and levels
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: LightBulbIcon,
                title: "Merit Scholarships",
                desc: "For academically exceptional students pursuing higher education",
                link: "/schemes",
              },
              {
                icon: HeartIcon,
                title: "Need-Based Grants",
                desc: "Financial assistance for economically disadvantaged students",
                link: "/schemes",
              },
              {
                icon: GlobeAltIcon,
                title: "Vocational Training",
                desc: "Skill development programs for career-oriented education",
                link: "/schemes",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-600 mb-4">{p.desc}</p>
                <Link
                  to={p.link}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories Carousel */}
        <section className="mt-16 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl shadow-lg py-12 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Success Stories
          </h2>
          <Slider
            dots
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={4000}
            className="max-w-4xl mx-auto"
          >
            {testimonials.map((t, i) => (
              <div key={i} className="px-4">
                <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center gap-8">
                  <img
                    src={t.image}
                    alt={`Portrait of ${t.name}`}
                    className="rounded-full w-32 h-32 object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center mb-4">
                      {Array(5)
                        .fill()
                        .map((_, j) => (
                          <svg
                            key={j}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                    <blockquote className="text-lg text-gray-700 italic mb-6">
                      "{t.quote}"
                    </blockquote>
                    <p className="font-semibold text-gray-800">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Partners Section */}
        <section className="mt-16 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Collaborating with leading institutions to expand educational
            opportunities
          </p>
          <div className="flex flex-wrap justify-center gap-10 items-center">
            {partners.map((p, i) => (
              <div key={i} className="w-32 h-20 flex items-center justify-center">
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className="max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={openPartnerModal}
              className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition-colors font-medium"
            >
              Become a Partner
            </button>
          </div>
        </section>

        {/* Partner Modal */}
        <Modal show={isModalOpen} onClose={closePartnerModal}>
          <h3 className="text-xl font-semibold mb-4">Partner Registration</h3>
          <form onSubmit={handlePartnerSubmit} className="space-y-4">
            {[
              { name: "organization", label: "Organization Name*", type: "text" },
              { name: "email", label: "Email*", type: "email" },
              {
                name: "reason",
                label: "Reason for Partnership*",
                type: "textarea",
              },  
              { name: "phone", label: "Phone Number*", type: "text" },
              { name: "location", label: "Location (optional)", type: "text" },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-gray-700">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleFormChange}
                    required={f.name !== "location"}
                    className="w-full mt-1 p-2 border rounded-lg"
                  />
                ) : (
                  <input
                    name={f.name}
                    type={f.type}
                    value={formData[f.name]}
                    onChange={handleFormChange}
                    required={f.name !== "location"}
                    className="w-full mt-1 p-2 border rounded-lg"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </Modal>

        {/* CTA, Updates, Newsletter omitted for brevity… */}

      </main>

      {/* Enhanced Footer */}
<footer className="bg-gray-900 text-white pt-16 pb-8">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
    {/* Brand & Socials */}
    <div>
      <h3 className="text-xl font-bold mb-6">
        Maulana Zahid Educational Trust
      </h3>
      <p className="text-gray-400 mb-6">
        Empowering underprivileged students through education since 1995.
        Join us in creating a brighter future.
      </p>
      <div className="flex items-center space-x-4">
        {/* Facebook */}
        <a href="#" className="text-gray-400 hover:text-white">
          <span className="sr-only">Facebook</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2
                 6.477 2 12c0 4.991 3.657 9.128
                 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0
                 -2.506 1.492-3.89 3.777-3.89 1.094
                 0 2.238.195 2.238.195v2.46h-1.26c-1.243
                 0-1.63.771-1.63 1.562V12h2.773l-.443
                 2.89h-2.33v6.988C18.343 21.128 22
                 16.991 22 12z"
            />
          </svg>
        </a>
        {/* Twitter */}
        <a href="#" className="text-gray-400 hover:text-white">
          <span className="sr-only">Twitter</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253
                     11.675-11.675 0-.178 0-.355-.012
                     -.53A8.348 8.348 0 0022 5.92a8.19
                     8.19 0 01-2.357.646 4.118 4.118
                     0 001.804-2.27 8.224 8.224 0 01
                     -2.605.996 4.107 4.107 0 00-6.993
                     3.743 11.65 11.65 0 01-8.457-4.287
                     4.106 4.106 0 001.27 5.477A4.072
                     4.072 0 012.8 9.713v.052a4.105
                     4.105 0 003.292 4.022 4.095 4.095
                     0 01-1.853.07 4.108 4.108 0 003.834
                     2.85A8.233 8.233 0 012 18.407a11.616
                     11.616 0 006.29 1.84" />
          </svg>
        </a>
        {/* Instagram */}
        <a href="#" className="text-gray-400 hover:text-white">
          <span className="sr-only">Instagram</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06
                 1.064.049 1.791.218 2.427.465a4.902
                 4.902 0 011.772 1.153 4.902 4.902
                 0 011.153 1.772c.247.636.416 1.363
                 .465 2.427.048 1.067.06 1.407.06
                 4.123v.08c0 2.643-.012 2.987-.06
                 4.043-.049 1.064-.218 1.791-.465
                 2.427a4.902 4.902 0 01-1.153 1.772
                 4.902 4.902 0 01-1.772 1.153c-.636
                 .247-1.363.416-2.427.465-1.067.048
                 -1.407.06-4.123.06h-.08c-2.643
                 0-2.987-.012-4.043-.06-1.064-.049
                 -1.791-.218-2.427-.465a4.902 4.902
                 0 01-1.772-1.153 4.902 4.902 0
                 01-1.153-1.772c-.247-.636-.416
                 -1.363-.465-2.427-.047-1.024-.06
                 -1.379-.06-3.808v-.63c0-2.43.013
                 -2.784.06-3.808.049-1.064.218
                 -1.791.465-2.427a4.902 4.902 0
                 011.153-1.772A4.902 4.902 0 015.45
                 2.525c.636-.247 1.363-.416 2.427
                 -.465C8.901 2.013 9.256 2 11.685 2h
                 .63zm-.081 1.802h-.468c-2.456
                 0-2.784.011-3.807.058-.975.045
                 -1.504.207-1.857.344-.467.182
                 -.8.398-1.15.748-.35.35-.566.683
                 -.748 1.15-.137.353-.3.882-.344
                 1.857-.047 1.023-.058 1.351-.058
                 3.807v.468c0 2.456.011 2.784.058
                 3.807.045.975.207 1.504.344 1.857
                 .182.466.399.8.748 1.15.35.35.683
                 .566 1.15.748.353.137.882.3 1.857
                 .344 1.054.048 1.37.058 4.041.058h
                 .08c2.597 0 2.917-.01 3.96-.058
                 .976-.045 1.505-.207 1.858
                 -.344.466-.182.8-.398 1.15-.748
                 .35-.35.566-.683.748-1.15.137
                 -.353.3-.882.344-1.857.048-1.055
                 .058-1.37.058-4.041v-.08c0
                 -2.597-.01-2.917-.058-3.96-.045
                 -.976-.207-1.505-.344-1.858a3.097
                 3.097 0 00-.748-1.15 3.098 3.098
                 0 00-1.15-.748c-.353-.137-.882
                 -.3-1.857-.344-1.023-.047-1.351
                 -.058-3.807-.058zM12 6.865a5.135
                 5.135 0 110 10.27 5.135 5.135 0
                 010-10.27zm0 1.802a3.333 3.333 0
                 100 6.666 3.333 3.333 0 000-6.666zm
                 5.338-3.205a1.2 1.2 0 110 2.4 1.2
                 1.2 0 010-2.4z"
            />
          </svg>
        </a>
      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
      <ul className="space-y-4">
        <li>
          <Link to="/about" className="text-gray-400 hover:text-white">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/programs" className="text-gray-400 hover:text-white">
            Scholarship Programs
          </Link>
        </li>
        <li>
          <Link to="/impact" className="text-gray-400 hover:text-white">
            Our Impact
          </Link>
        </li>
        <li>
          <Link to="/stories" className="text-gray-400 hover:text-white">
            Success Stories
          </Link>
        </li>
        <li>
          <Link to="/partners" className="text-gray-400 hover:text-white">
            Partners
          </Link>
        </li>
      </ul>
    </div>

    {/* Get Involved */}
    <div>
      <h4 className="text-lg font-semibold mb-6">Get Involved</h4>
      <ul className="space-y-4">
        <li>
          <Link to="/donation" className="text-gray-400 hover:text-white">
            Donate
          </Link>
        </li>
        <li>
          <Link to="/volunteer" className="text-gray-400 hover:text-white">
            Volunteer
          </Link>
        </li>
        <li>
          <Link to="/partner" className="text-gray-400 hover:text-white">
            Partner With Us
          </Link>
        </li>
        <li>
          <Link to="/careers" className="text-gray-400 hover:text-white">
            Careers
          </Link>
        </li>
        <li>
          <Link to="/events" className="text-gray-400 hover:text-white">
            Events
          </Link>
        </li>
      </ul>
    </div>

    {/* Contact Us */}
    <div>
      <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
      <address className="text-gray-400 not-italic space-y-2">
        <p>123 Education Lane</p>
        <p>Mumbai, Maharashtra 400001</p>
        <p>India</p>
        <p>Email: info@educationtrust.org</p>
        <p>Phone: +91 22 1234 5678</p>
      </address>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-800 mt-12 pt-8">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Maulana Zahid Educational Trust. All rights reserved.
      </p>
      <div className="flex space-x-8 mt-4 md:mt-0">
        <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
          Privacy Policy
        </Link>
        <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
          Terms of Service
        </Link>
        <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
          FAQs
        </Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Landing;
