import React, { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Scholarship Program",
    description: "Providing financial aid to deserving students to pursue higher education.",
    link: "/projects/scholarship-program",
    status: "Ongoing",
    progress: 75,
    color: "from-blue-600 to-blue-800",
    accentColor: "bg-blue-600",
    category: "Education"
  },
  {
    title: "Educational Resources Initiative",
    description: "Distributing books and learning materials to underprivileged schools.",
    link: "/projects/educational-resources",
    status: "Completed",
    progress: 100,
    color: "from-green-600 to-green-800",
    accentColor: "bg-green-600",
    category: "Resources"
  },
  {
    title: "Community Mentorship",
    description: "Connecting students with mentors for career guidance and support.",
    link: "/projects/community-mentorship",
    status: "Upcoming",
    progress: 0,
    color: "from-gray-600 to-gray-800",
    accentColor: "bg-gray-600",
    category: "Community"
  },
  {
    title: "Digital Literacy Program",
    description: "Teaching essential computer skills to bridge the digital divide.",
    link: "/projects/digital-literacy",
    status: "Ongoing",
    progress: 45,
    color: "from-blue-700 to-blue-900",
    accentColor: "bg-blue-700",
    category: "Technology"
  },
  {
    title: "STEM Workshops",
    description: "Hands-on science and engineering workshops for young minds.",
    link: "/projects/stem-workshops",
    status: "Ongoing",
    progress: 60,
    color: "from-green-700 to-green-900",
    accentColor: "bg-green-700",
    category: "Science"
  },
  {
    title: "Sustainable Schools",
    description: "Creating eco-friendly learning environments for the future.",
    link: "/projects/sustainable-schools",
    status: "Planning",
    progress: 15,
    color: "from-green-500 to-green-700",
    accentColor: "bg-green-500",
    category: "Environment"
  }
];

const statusColors = {
  "Ongoing": "bg-blue-600",
  "Completed": "bg-green-600",
  "Upcoming": "bg-gray-600",
  "Planning": "bg-black"
};

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-96 h-96 bg-green-100/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-gray-100/50 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <main className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming communities through innovative initiatives and collaborative impact
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Card Container */}
              <motion.div
                className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl overflow-hidden h-full shadow-lg"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 2
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  damping: 20
                }}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Animated Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`}></div>

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Category Badge */}
                  <motion.div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${project.accentColor} mb-4 w-fit`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {project.category}
                  </motion.div>

                  {/* Status Badge */}
                  <motion.div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white ${statusColors[project.status]} mb-6 w-fit shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    {project.status}
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-green-700 group-hover:bg-clip-text transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.title}
                  </motion.h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6">
                    {project.description}
                  </p>

                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Progress</span>
                      <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${project.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1.5, delay: idx * 0.2 }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href={project.link}
                    className={`inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${project.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explore Project</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: hoveredIndex === idx ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      →
                    </motion.div>
                  </motion.a>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${project.color} rounded-full blur-sm animate-bounce`}></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="flex items-center"
              whileHover={{ x: 5 }}
            >
              Get Involved
              <motion.div
                className="ml-2"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                ✨
              </motion.div>
            </motion.span>
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Projects;