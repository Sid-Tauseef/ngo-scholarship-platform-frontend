import React, { useState } from "react";
import { Shield, Share2, Heart, Users, BookOpen, GraduationCap } from "lucide-react";

const Donation = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    amount: "", 
    receipt: "" 
  });
  const [hoveredImpact, setHoveredImpact] = useState(null);
  const [shareClicked, setShareClicked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShare = () => {
    setShareClicked(true);
    setTimeout(() => setShareClicked(false), 1000);
    
    if (navigator.share) {
      navigator.share({
        title: "Support Education for All",
        text: "I just donated to Maulana Zahid Educational Trust. Join me in supporting their mission!",
        url: window.location.href,
      }).catch((err) => console.error(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const impactItems = [
    { 
      icon: GraduationCap, 
      text: "Fund scholarships for students to break poverty cycles",
      stat: "50+ students supported"
    },
    { 
      icon: BookOpen, 
      text: "Supply learning materials to rural schools",
      stat: "15 schools equipped"
    },
    { 
      icon: Users, 
      text: "Connect students with mentorship programs",
      stat: "200+ mentees guided"
    },
    { 
      icon: Heart, 
      text: "Maintain safe community learning centers",
      stat: "8 centers active"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Education for All
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Every donation
            <span className="text-blue-600"> transforms</span>
            <br />a student's future
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join our mission to provide quality education to underserved communities. 
            Your support creates lasting change.
          </p>
          
          {/* Progress indicator */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="font-semibold">₹65,000 raised</span>
              <span>₹100,000 goal</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out transform origin-left"
                style={{ width: '65%' }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">127 supporters • 65% funded</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Impact Section */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Your impact</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {impactItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredImpact(idx)}
                    onMouseLeave={() => setHoveredImpact(null)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg transition-colors duration-300 ${
                        hoveredImpact === idx ? 'bg-blue-100' : 'bg-gray-50'
                      }`}>
                        <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                          hoveredImpact === idx ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium mb-1">{item.text}</p>
                        <p className="text-sm text-blue-600 font-medium">{item.stat}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "Without this support, I wouldn't be the first in my family heading to university."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Ahmed</p>
                  <p className="text-sm text-gray-600">Scholarship Recipient</p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Make a donation</h3>
                  <p className="text-gray-600">Every contribution counts</p>
                </div>

                <div action="https://formspree.io/f/xovwkzdp" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Donation Amount (₹)
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Screenshot URL
                      </label>
                      <input
                        type="text"
                        name="receipt"
                        value={formData.receipt}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Link to your payment screenshot"
                      />
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-sm text-gray-600 mb-4">Scan to pay with Google Pay</p>
                    <img
                      src="https://res.cloudinary.com/dtjgdz8zn/image/upload/v1750753621/sidify-solutions/gpay-sid_nfs7fb.jpg"
                      alt="GPay QR Code"
                      className="w-32 h-32 mx-auto rounded-lg shadow-sm"
                    />
                    <p className="text-xs text-gray-500 mt-3">
                      Complete payment, then submit form with screenshot
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      // Handle form submission logic here
                      console.log('Form submitted:', formData);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Submit Donation
                  </button>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Shield className="w-4 h-4" />
                    Secure & encrypted submission
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Amplify your impact
            </h3>
            <p className="text-gray-600 mb-8">
              Share this campaign with friends and family to help us reach more students in need.
            </p>
            <button
              onClick={handleShare}
              className={`inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 ${
                shareClicked ? 'scale-95' : 'hover:scale-105'
              }`}
            >
              <Share2 className="w-5 h-5" />
              {shareClicked ? 'Shared!' : 'Share Campaign'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;