import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, User, LogOut, Settings } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  _id?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
  const [roadmapDropdownOpen, setRoadmapDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Fetch user data from the backend
      fetch(`http://localhost:5000/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
          } else {
            console.error('Error fetching user data:', data.message);
            localStorage.removeItem('userId');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('userId');
        });
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    setUserDropdownOpen(false);
    navigate('/');
  };

  const departments = [
    { name: 'AI & DS', path: '/college-guide/ai-ds' },
    { name: 'CSE', path: '/college-guide/cse' },
    { name: 'IT', path: '/college-guide/it' },
    { name: 'ECE', path: '/college-guide/ece' },
    { name: 'Mechanical', path: '/college-guide/mechanical' },
  ];

  return (
    <nav className="bg-card/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-neon-purple" />
              <span className="font-display text-2xl font-bold neon-text">Learnaholic</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="navbar-item navbar-item-active">Home</Link>
            
            <div className="relative" 
                onMouseEnter={() => setDepartmentDropdownOpen(true)}
                onMouseLeave={() => setDepartmentDropdownOpen(false)}>
              <button className="navbar-item flex items-center">
                College Guide <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {departmentDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-card border border-white/10 py-1 z-50">
                  {departments.map((dept) => (
                    <Link
                      key={dept.name}
                      to={dept.path}
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/10"
                    >
                      {dept.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative"
                onMouseEnter={() => setRoadmapDropdownOpen(true)}
                onMouseLeave={() => setRoadmapDropdownOpen(false)}>
              <button className="navbar-item flex items-center">
                Career Roadmaps <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {roadmapDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-card border border-white/10 py-1 z-50">
                  {departments.map((dept) => (
                    <Link
                      key={dept.name}
                      to={`/career-roadmap/${dept.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/10"
                    >
                      {dept.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/courses" className="navbar-item">Course Library</Link>
            <Link to="/about" className="navbar-item">About Us</Link>
            <Link to="/contact" className="navbar-item">Contact</Link>
            
            {user ? (
              <div className="relative"
                  onMouseEnter={() => setUserDropdownOpen(true)}
                  onMouseLeave={() => setUserDropdownOpen(false)}>
                <button className="navbar-item flex items-center text-neon-purple">
                  <User className="h-4 w-4 mr-2" />
                  {user.name} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-card border border-white/10 py-1 z-50">
                    <Link
                      to="/profile"
                      className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-white/10 flex items-center"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" /> Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-white/10 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="navbar-item">Sign In</Link>
                <Link to="/signup" className="btn-neon">Sign Up</Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card/90 backdrop-blur-md border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="navbar-item block">Home</Link>
            
            <div className="space-y-1">
              <button 
                onClick={() => setDepartmentDropdownOpen(!departmentDropdownOpen)}
                className="navbar-item block w-full text-left flex items-center justify-between"
              >
                College Guide <ChevronDown className={`h-4 w-4 transition-transform ${departmentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {departmentDropdownOpen && (
                <div className="pl-4 space-y-1">
                  {departments.map((dept) => (
                    <Link
                      key={dept.name}
                      to={dept.path}
                      className="navbar-item block"
                      onClick={() => setIsOpen(false)}
                    >
                      {dept.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <button 
                onClick={() => setRoadmapDropdownOpen(!roadmapDropdownOpen)}
                className="navbar-item block w-full text-left flex items-center justify-between"
              >
                Career Roadmaps <ChevronDown className={`h-4 w-4 transition-transform ${roadmapDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {roadmapDropdownOpen && (
                <div className="pl-4 space-y-1">
                  {departments.map((dept) => (
                    <Link
                      key={dept.name}
                      to={`/career-roadmap/${dept.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="navbar-item block"
                      onClick={() => setIsOpen(false)}
                    >
                      {dept.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/courses" className="navbar-item block" onClick={() => setIsOpen(false)}>Course Library</Link>
            <Link to="/about" className="navbar-item block" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" className="navbar-item block" onClick={() => setIsOpen(false)}>Contact</Link>
            
            {user ? (
              <>
                <div className="navbar-item block text-neon-purple flex items-center">
                  <User className="h-4 w-4 mr-2" /> {user.name}
                </div>
                <Link 
                  to="/profile" 
                  className="navbar-item block w-full text-left flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" /> Profile Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="navbar-item block w-full text-left flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="navbar-item block" onClick={() => setIsOpen(false)}>Sign In</Link>
                <Link to="/signup" className="navbar-item block" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
