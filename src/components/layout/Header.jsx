import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Search, MapPin } from "lucide-react";
import { StatesContext } from "../../context/StatesContext";
import axios from "axios";

const Header = () => {
  const { states } = useContext(StatesContext); // ✅ use context
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = ["Products", "Industries", "Resources", "Company", "Pricing"];

  const filteredStates = states.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Updated handleSelect to fetch laws on click
  const handleSelect = async (slug) => {
    try {
      // Call backend to get laws of clicked state
      const res = await axios.get(`http://localhost:5000/api/laws/${slug}`);
      const lawsData = res.data;

      // Navigate to details page with laws data
      navigate(`/aed-laws/${slug}`, { state: { lawsData } });

      // Reset search/dropdown
      setDropdownOpen(false);
      setSearchTerm("");
    } catch (err) {
      console.error("Failed to fetch laws:", err);
      // Fallback: navigate with empty laws array
      navigate(`/aed-laws/${slug}`, { state: { lawsData: [] } });
    }
  };

  return (
    <div className="w-full">
      {/* TOP BANNER */}
      <div
        className="w-full py-6 border-b"
        style={{ backgroundColor: "#d6dcea", borderColor: "#0A1A33" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="../src/assets/logo.png"
              alt="AED Logo"
              className="w-60 h-auto object-contain"
            />
          </Link>

          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <div
              className="flex items-center bg-white rounded-lg shadow-md px-3 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Search className="text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search States..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setDropdownOpen(true);
                }}
                className="w-full px-3 py-2 bg-transparent outline-none text-gray-800"
              />
            </div>

            {/* Dropdown */}
            {dropdownOpen && searchTerm && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {filteredStates.length > 0 ? (
                  filteredStates.map((s) => (
                    <div
                      key={s.slug}
                      onClick={() => handleSelect(s.slug)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {s.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No states found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header
        className="border-b"
        style={{ backgroundColor: "#111686", borderColor: "#0A1A33" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: menu */}
            <div className="flex items-center space-x-4">
              <div className="flex md:hidden space-x-2">
                <button className="px-3 py-1 text-sm font-medium rounded-lg border border-white text-white hover:bg-white hover:text-[#111686] transition">
                  Contact
                </button>
                <button className="px-3 py-1 text-sm font-medium rounded-lg border border-white text-white hover:bg-white hover:text-[#111686] transition">
                  Store
                </button>
              </div>
              <nav className="hidden md:flex space-x-10">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm font-medium text-white relative after:block after:h-[2px] after:w-full after:bg-[#d6dcea] after:absolute after:-bottom-1 after:left-0 after:opacity-0 hover:after:opacity-100"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right: buttons */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <button className="px-4 py-2 text-sm font-medium rounded-lg border border-white text-white hover:bg-white hover:text-[#111686] transition">
                  Contact
                </button>
                <button className="px-4 py-2 text-sm font-medium rounded-lg border border-white text-white hover:bg-white hover:text-[#111686] transition">
                  Store
                </button>
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white text-2xl"
                >
                  {isOpen ? "✖" : "☰"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#111686] border-t border-[#0A1A33]">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white text-base font-medium relative after:block after:h-[2px] after:w-0 after:bg-[#d6dcea] after:absolute after:-bottom-1 after:left-0 after:transition-all hover:after:w-full"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
