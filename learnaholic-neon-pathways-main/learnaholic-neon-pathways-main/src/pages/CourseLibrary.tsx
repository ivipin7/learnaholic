
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Filter, BookOpen, Star, Clock, ArrowUp, ArrowDown, CheckCircle } from 'lucide-react';

// Sample course data
const courses = [
  {
    id: 1,
    title: "Python for Data Science",
    category: "Programming",
    department: "AI & DS",
    level: "Beginner",
    rating: 4.8,
    duration: "8 weeks",
    instructor: "Dr. Sarah Chen",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    description: "Learn the fundamentals of Python programming with a focus on data science applications. Perfect for beginners.",
    topics: ["Python Basics", "Data Structures", "Numpy & Pandas", "Data Visualization"]
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    category: "AI & Data Science",
    department: "AI & DS",
    level: "Intermediate",
    rating: 4.9,
    duration: "10 weeks",
    instructor: "Prof. Michael Brown",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    description: "A comprehensive introduction to machine learning algorithms and techniques. Build practical models for real-world problems.",
    topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"]
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    category: "Web Development",
    department: "CSE",
    level: "Beginner",
    rating: 4.7,
    duration: "12 weeks",
    instructor: "Jennifer Lopez",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    description: "Become a full-stack web developer. Learn HTML, CSS, JavaScript, React, Node.js and MongoDB from scratch.",
    topics: ["HTML & CSS", "JavaScript", "React.js", "Node.js", "MongoDB"]
  },
  {
    id: 4,
    title: "Data Structures & Algorithms",
    category: "Computer Science",
    department: "CSE",
    level: "Intermediate",
    rating: 4.9,
    duration: "8 weeks",
    instructor: "Dr. Robert Chen",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    description: "Master the core computer science concepts. Essential for coding interviews and becoming a better programmer.",
    topics: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Dynamic Programming"]
  },
  {
    id: 5,
    title: "Digital Electronics",
    category: "Electronics",
    department: "ECE",
    level: "Beginner",
    rating: 4.6,
    duration: "6 weeks",
    instructor: "Dr. Emily Johnson",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    description: "Introduction to digital logic circuits, Boolean algebra, and digital electronics fundamentals.",
    topics: ["Boolean Logic", "Logic Gates", "Flip-Flops", "Digital Circuit Design"]
  },
  {
    id: 6,
    title: "Network Security",
    category: "Cybersecurity",
    department: "IT",
    level: "Advanced",
    rating: 4.8,
    duration: "10 weeks",
    instructor: "Prof. Alex Martinez",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    description: "Learn advanced network security concepts, vulnerability assessment, and ethical hacking techniques.",
    topics: ["Security Fundamentals", "Cryptography", "Penetration Testing", "Security Protocols"]
  },
  {
    id: 7,
    title: "Thermodynamics",
    category: "Mechanical Engineering",
    department: "Mechanical",
    level: "Intermediate",
    rating: 4.7,
    duration: "8 weeks",
    instructor: "Dr. James Wilson",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    description: "Understand the principles of thermodynamics, energy conversion, and their applications in mechanical systems.",
    topics: ["Laws of Thermodynamics", "Entropy", "Thermodynamic Cycles", "Heat Transfer"]
  },
  {
    id: 8,
    title: "Deep Learning Specialization",
    category: "AI & Data Science",
    department: "AI & DS",
    level: "Advanced",
    rating: 4.9,
    duration: "14 weeks",
    instructor: "Prof. Li Wei",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    description: "Advanced deep learning techniques including CNNs, RNNs, and transformers with hands-on projects.",
    topics: ["Neural Networks", "Convolutional Networks", "Sequence Models", "GANs"]
  },
];

// Filter options
const categories = ["All", "Programming", "AI & Data Science", "Web Development", "Computer Science", "Electronics", "Cybersecurity", "Mechanical Engineering"];
const departments = ["All", "AI & DS", "CSE", "IT", "ECE", "Mechanical"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const durations = ["All", "Less than 8 weeks", "8-12 weeks", "More than 12 weeks"];

const CourseLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter courses
  const filteredCourses = courses.filter((course) => {
    // Search query
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category
    if (selectedCategory !== "All" && course.category !== selectedCategory) {
      return false;
    }
    
    // Department
    if (selectedDepartment !== "All" && course.department !== selectedDepartment) {
      return false;
    }
    
    // Level
    if (selectedLevel !== "All" && course.level !== selectedLevel) {
      return false;
    }
    
    // Duration
    if (selectedDuration !== "All") {
      const weeks = parseInt(course.duration);
      if (selectedDuration === "Less than 8 weeks" && weeks >= 8) {
        return false;
      } else if (selectedDuration === "8-12 weeks" && (weeks < 8 || weeks > 12)) {
        return false;
      } else if (selectedDuration === "More than 12 weeks" && weeks <= 12) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    
    if (sortBy === "rating") {
      return multiplier * (a.rating - b.rating);
    } else if (sortBy === "title") {
      return multiplier * a.title.localeCompare(b.title);
    } else if (sortBy === "duration") {
      return multiplier * (parseInt(a.duration) - parseInt(b.duration));
    }
    
    return 0;
  });
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-card/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-4">Course <span className="neon-text">Library</span></h1>
            <p className="text-gray-300 text-lg max-w-3xl">
              Browse our collection of courses designed to help you master new skills and advance your career. Filter by category, department, or difficulty level.
            </p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-card/30 border-b border-white/10 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="block w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-neon-purple"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  className="bg-black/30 border border-white/10 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-neon-purple"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Rating</option>
                  <option value="title">Title</option>
                  <option value="duration">Duration</option>
                </select>
                <button
                  className="p-2 bg-black/30 border border-white/10 rounded-lg text-white hover:bg-white/10"
                  onClick={toggleSortDirection}
                >
                  {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </button>
              </div>
              
              {/* Filter Toggle Button */}
              <button
                className="flex items-center space-x-2 bg-neon-purple/20 text-neon-purple px-4 py-2 rounded-lg hover:bg-neon-purple/30 transition-colors md:hidden"
                onClick={toggleFilters}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden mt-4 p-4 bg-card rounded-lg border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <select
                      className="w-full bg-black/30 border border-white/10 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-neon-purple"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Department</label>
                    <select
                      className="w-full bg-black/30 border border-white/10 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-neon-purple"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      {departments.map((department) => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Level</label>
                    <select
                      className="w-full bg-black/30 border border-white/10 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-neon-purple"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Duration</label>
                    <select
                      className="w-full bg-black/30 border border-white/10 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-neon-purple"
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                    >
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Course Grid with Sidebar Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-card/50 rounded-xl border border-white/10 p-6 sticky top-28">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                
                {/* Category */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-300 mb-2">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="mr-2 accent-neon-purple"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Department */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-300 mb-2">Department</h4>
                  <div className="space-y-2">
                    {departments.map((department) => (
                      <label key={department} className="flex items-center">
                        <input
                          type="radio"
                          name="department"
                          checked={selectedDepartment === department}
                          onChange={() => setSelectedDepartment(department)}
                          className="mr-2 accent-neon-purple"
                        />
                        <span className="text-sm">{department}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Level */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-300 mb-2">Level</h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="level"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                          className="mr-2 accent-neon-purple"
                        />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Duration */}
                <div>
                  <h4 className="font-medium text-sm text-gray-300 mb-2">Duration</h4>
                  <div className="space-y-2">
                    {durations.map((duration) => (
                      <label key={duration} className="flex items-center">
                        <input
                          type="radio"
                          name="duration"
                          checked={selectedDuration === duration}
                          onChange={() => setSelectedDuration(duration)}
                          className="mr-2 accent-neon-purple"
                        />
                        <span className="text-sm">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters Button */}
                <button
                  className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDepartment("All");
                    setSelectedLevel("All");
                    setSelectedDuration("All");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Course Grid */}
            <div className="flex-grow">
              {/* Results Count */}
              <p className="text-gray-400 mb-6">Showing {sortedCourses.length} of {courses.length} courses</p>
              
              {sortedCourses.length === 0 ? (
                <div className="bg-card/50 rounded-xl border border-white/10 p-10 text-center">
                  <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                  <button
                    className="py-2 px-4 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 transition-colors"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setSelectedDepartment("All");
                      setSelectedLevel("All");
                      setSelectedDuration("All");
                    }}
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedCourses.map((course) => (
                    <div key={course.id} className="neon-card group overflow-hidden flex flex-col">
                      {/* Course Image */}
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                        
                        {/* Course Category and Level */}
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                          <span className="bg-neon-purple/80 text-white text-xs px-2 py-1 rounded-md">
                            {course.category}
                          </span>
                          <span className={`text-white text-xs px-2 py-1 rounded-md ${
                            course.level === "Beginner" ? "bg-green-600/80" :
                            course.level === "Intermediate" ? "bg-blue-600/80" : "bg-red-600/80"
                          }`}>
                            {course.level}
                          </span>
                        </div>
                        
                        {/* Department Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                            {course.department}
                          </span>
                        </div>
                      </div>
                      
                      {/* Course Details */}
                      <div className="flex-grow flex flex-col p-4">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-neon-purple transition-colors duration-300 line-clamp-2">
                          {course.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {course.description}
                        </p>
                        
                        {/* Instructor */}
                        <p className="text-sm text-gray-300 mt-auto mb-2">Instructor: {course.instructor}</p>
                        
                        {/* Rating and Duration */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span>{course.rating.toFixed(1)}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        
                        {/* Course Topics */}
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {course.topics.slice(0, 3).map((topic, index) => (
                              <span key={index} className="bg-white/5 text-xs px-2 py-1 rounded">
                                {topic}
                              </span>
                            ))}
                            {course.topics.length > 3 && (
                              <span className="bg-white/5 text-xs px-2 py-1 rounded">
                                +{course.topics.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Enroll Button */}
                        <button className="mt-6 py-2 w-full bg-gradient-to-r from-neon-purple to-neon-magenta text-white rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(155,135,245,0.5)] transition-all duration-300">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseLibrary;
