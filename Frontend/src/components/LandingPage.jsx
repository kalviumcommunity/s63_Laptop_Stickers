import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import "./LandingPage.css";

const LandingPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStickerImage, setSelectedStickerImage] = useState(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  // Upload section states
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Funny laptop stickers data
  const stickerData = [
    {
      id: 1,
      title: "TU REHNE DE BHAI 😅",
      subtitle: "Caffeine addiction confession",
      votes: 654,
      image: "https://img.drz.lazcdn.com/static/pk/p/e1a27b60c22684a335b128efe45be92f.jpg_720x720q80.jpg",
      category: "CAFFEINE"
    },
    {
      id: 2,
      title: "404 Error: Sleep Not Found",
      subtitle: "Developer's life story",
      votes: 892,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop&auto=format",
      category: "CODING"
    },
    {
      id: 3,
      title: "I Void Warranties",
      subtitle: "Hardware hacker's motto",
      votes: 423,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop&auto=format",
      category: "HACKER"
    },
    {
      id: 4,
      title: "Ctrl+Alt+Delete Life",
      subtitle: "Ultimate reset button",
      votes: 756,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&auto=format",
      category: "TECH"
    },
    {
      id: 5,
      title: "No, I Will Not Fix Your Computer",
      subtitle: "IT support nightmare",
      votes: 1205,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop&auto=format",
      category: "SUPPORT"
    },
    {
      id: 6,
      title: "sudo make me a sandwich",
      subtitle: "Terminal humor at its finest",
      votes: 943,
      image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=400&h=300&fit=crop&auto=format",
      category: "LINUX"
    },
    {
      id: 7,
      title: "I SAW THAT 😂",
      subtitle: "Ultimate security expert",
      votes: 1387,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6KY9rY9Zwp5HGxqoZFEvpz4LHCk4gs4jRlg&s",
      category: "SECURITY"
    },
    {
      id: 8,
      title: "There Are Only 10 Types of People",
      subtitle: "Those who understand binary and those who don't",
      votes: 2156,
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop&auto=format",
      category: "BINARY"
    },
    {
      id: 9,
      title: "HTML is NOT a Programming Language",
      subtitle: "Fight me!",
      votes: 3420,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&auto=format",
      category: "WEBDEV"
    },
    {
      id: 10,
      title: "In Case of Fire: git commit, git push, Leave Building",
      subtitle: "Priorities set straight",
      votes: 4567,
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop&auto=format",
      category: "GIT"
    },
    {
      id: 11,
      title: "HEY YOU DROPPED THIS,🙈",
      subtitle: "Take one down, patch it around, 117 little bugs in the code",
      votes: 2890,
      image: "https://m.media-amazon.com/images/I/71B5LTyoCYL._AC_SL1500_.jpg",
      category: "DEBUGGING"
    },
    {
      id: 12,
      title: "Semicolon; The Destroyer of Dreams",
      subtitle: "Missing semicolon killed my code",
      votes: 1876,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&auto=format",
      category: "SYNTAX"
    },
    {
      id: 13,
      title: "Pad le Bhai 🤓",
      subtitle: "Classic developer excuse",
      votes: 3245,
      image: "https://m.media-amazon.com/images/I/51fuAzzMFBL.jpg",
      category: "EXCUSE"
    },
    {
      id: 14,
      title: "Console.log('Why is this not working?')",
      subtitle: "Debugging like a pro",
      votes: 2134,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&auto=format",
      category: "JAVASCRIPT"
    },
    {
      id: 15,
      title: "Roses are Red, Violets are Blue",
      subtitle: "Unexpected '}' on line 32",
      votes: 1654,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop&auto=format",
      category: "POETRY"
    },
    {
      id: 16,
      title: "404 Brain Not Found",
      subtitle: "Monday morning vibes",
      votes: 2890,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format",
      category: "MOOD"
    },
    {
      id: 17,
      title: "Warning: May Contain Traces of Nuts",
      subtitle: "And by nuts, I mean my code",
      votes: 1567,
      image: "https://images.unsplash.com/photo-1596538464237-2ba465646c47?w=400&h=300&fit=crop&auto=format",
      category: "WARNING"
    },
    {
      id: 18,
      title: "if (tired) { coffee++; }",
      subtitle: "Infinite loop detected",
      votes: 3456,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format",
      category: "CAFFEINE"
    },
    {
      id: 19,
      title: "Talk to my Hand 🤚",
      subtitle: "Introvert programmer mood",
      votes: 2134,
      image: "https://i.pinimg.com/474x/8a/d8/1e/8ad81e0c228ca1cfd0529f1145cae8e5.jpg",
      category: "SOCIAL"
    },
    {
      id: 20,
      title: "My Code Works, Don't Touch It!",
      subtitle: "Fragile like my self-esteem",
      votes: 4123,
      image: "https://images.unsplash.com/photo-1594736797933-d0ea7f8b3134?w=400&h=300&fit=crop&auto=format",
      category: "FRAGILE"
    }
  ];

  // Filter tags
  const filterTags = ['all', 'programming', 'gaming', 'anime', 'memes', 'tech', 'crypto'];

  // Explore stickers data
  const exploreStickers = [
    {
      id: 1,
      title: "ChatGPT: 'I'm Not Human But I Code Better Than You'",
      author: "@aimaster",
      date: "25/06/2025",
      location: "AI Research Lab",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&auto=format",
      tags: ["tech", "memes"],
      votes: { up: 892, down: 24 },
      comments: 156,
      shares: 78
    },
    {
      id: 2,
      title: "HODL Bitcoin Logo with Diamond Hands 💎🙌",
      author: "@cryptobro",
      date: "24/06/2025",
      location: "Business School",
      image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=300&fit=crop&auto=format",
      tags: ["crypto", "memes"],
      votes: { up: 567, down: 12 },
      comments: 234,
      shares: 112
    },
    {
      id: 3,
      title: "sudo rm -rf /* Command on Apple Logo",
      author: "@linuxmaster",
      date: "23/06/2025",
      location: "Computer Science Lab",
      image: "https://www.aspenln.com/cdn/shop/files/Alexapasswordsticker.png?",
      tags: ["programming", "tech"],
      votes: { up: 756, down: 8 },
      comments: 198,
      shares: 89
    },
    {
      id: 4,
      title: "Gojo Satoru Domain Expansion Laptop Lid",
      author: "@jjkfan",
      date: "22/06/2025",
      location: "Anime Club Room",
      image: "https://m.media-amazon.com/images/I/813o6C7QH2L._UF894,1000_QL80_.jpg",
      tags: ["anime", "programming"],
      votes: { up: 1024, down: 5 },
      comments: 345,
      shares: 167
    },
    {
      id: 5,
      title: "GitHub Copilot: My Rubber Duck Debugger",
      author: "@debugger",
      date: "21/06/2025",
      location: "Coding Bootcamp",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs-AIo3MjPC6bbs5CrH_YCJnjBrGGMB9axWw&s",
      tags: ["programming", "memes"],
      votes: { up: 623, down: 15 },
      comments: 289,
      shares: 145
    },
    {
      id: 6,
      title: "Demon Slayer Tanjiro Kamado Water Breathing",
      author: "@demonslayer",
      date: "20/06/2025",
      location: "Library Study Room",
      image: "https://assets.techrepublic.com/uploads/2019/03/ilfullxfull-85687560942py.jpg",
      tags: ["anime", "memes"],
      votes: { up: 834, down: 11 },
      comments: 276,
      shares: 143
    },
    {
      id: 7,
      title: "Valorant Rank: Hardstuck Iron Forever",
      author: "@valorantnoob",
      date: "19/06/2025",
      location: "Gaming Lounge",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&auto=format",
      tags: ["gaming", "memes"],
      votes: { up: 445, down: 67 },
      comments: 178,
      shares: 92
    },
    {
      id: 8,
      title: "Cyberpunk 2077: Still Has Bugs in 2025",
      author: "@cyberbug",
      date: "18/06/2025",
      location: "Game Dev Studio",
      image: "https://i.ebayimg.com/images/g/nx0AAOSwYqVco7dw/s-l1200.jpg",
      tags: ["gaming", "tech"],
      votes: { up: 298, down: 45 },
      comments: 123,
      shares: 67
    },
    {
      id: 9,
      title: "React vs Angular: The Never-Ending War",
      author: "@frontenddev",
      date: "17/06/2025",
      location: "Web Dev Meetup",
      image: "https://i.etsystatic.com/58813894/r/il/9f2f1c/6859076285/il_300x300.6859076285_58my.jpg",
      tags: ["programming", "tech"],
      votes: { up: 723, down: 89 },
      comments: 456,
      shares: 234
    },
    {
      id: 10,
      title: "Attack on Titan Final Season (Really Final This Time)",
      author: "@aotfan",
      date: "16/06/2025",
      location: "Engineering Building",
      image: "https://stickershop.line-scdn.net/stickershop/v1/product/16771336/LINEStorePC/main.png?",
      tags: ["anime", "memes"],
      votes: { up: 967, down: 23 },
      comments: 389,
      shares: 198
    },
    {
      id: 11,
      title: "Stack Overflow: Copy-Paste Programming Master",
      author: "@stackoverflow",
      date: "15/06/2025",
      location: "Coding Bootcamp",
      image: "https://www.kroger.com/product/images/large/front/0072598771204",
      tags: ["programming", "memes"],
      votes: { up: 1156, down: 34 },
      comments: 567,
      shares: 289
    },
    {
      id: 12,
      title: "RTX 4090: My Laptop is Now a Heater",
      author: "@pcmasterrace",
      date: "14/06/2025",
      location: "Gaming Setup Expo",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop&auto=format",
      tags: ["gaming", "tech"],
      votes: { up: 678, down: 45 },
      comments: 234,
      shares: 123
    },
    {
      id: 13,
      title: "Spotify Wrapped: 99% Anime Openings",
      author: "@animemusicfan",
      date: "13/06/2025",
      location: "Music Studio",
      image: "https://thevervebar.com/cdn/shop/files/collecting-flowers-dog-sticker.png?v=1748149731&width=533",
      tags: ["anime", "memes"],
      votes: { up: 534, down: 12 },
      comments: 167,
      shares: 89
    },
    {
      id: 14,
      title: "Discord Light Mode User Spotted",
      author: "@discordmemer",
      date: "12/06/2025",
      location: "Gaming Community Center",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&auto=format",
      tags: ["gaming", "memes"],
      votes: { up: 423, down: 78 },
      comments: 145,
      shares: 67
    },
    {
      id: 15,
      title: "iPhone 15 Pro Max: Bankruptcy Edition",
      author: "@applesheep",
      date: "11/06/2025",
      location: "Apple Store Queue",
      image: "https://ih1.redbubble.net/image.366391471.7869/st,small,507x507-pad,600x600,f8f8f8.u3.jpg",
      tags: ["tech", "memes"],
      votes: { up: 789, down: 156 },
      comments: 298,
      shares: 134
    }
  ];

  // Scroll event listener
  // Enhanced scroll effect for premium navbar
  useEffect(() => {
    // Throttle function to limit how often the scroll handler runs
    const throttle = (callback, delay) => {
      let lastCall = 0;
      return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return callback(...args);
      };
    };

    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      // Smoother transition with lower threshold
      if (scrollTop > 50) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        if (isScrolled) setIsScrolled(false);
      }
    }, 100); // Run at most every 100ms for better performance

    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stickerData.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [stickerData.length]);

  // File upload handling functions
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFile = (file) => {
    // Check if file is an image
    if (file && file.type.match('image.*')) {
      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File is too large! Maximum size is 10MB.');
        return;
      }
      
      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file (JPG or PNG).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!uploadedImage) {
      alert('Please upload an image first!');
      return;
    }
    
    // Show uploading state
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      // In a real app, you would send the data to your backend here
      console.log({
        image: uploadedImage,
        caption,
        tags: tags.split(',').map(tag => tag.trim()),
        privacy
      });
      
      // Reset form and show success
      setIsUploading(false);
      setUploadSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setUploadedImage(null);
        setImagePreview(null);
        setCaption('');
        setTags('');
        setPrivacy('public');
        setUploadSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stickerData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stickerData.length) % stickerData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Filter stickers based on selected tag and search term
  const filteredStickers = exploreStickers.filter(sticker => {
    const matchesFilter = selectedFilter === 'all' || sticker.tags.includes(selectedFilter);
    const matchesSearch = sticker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sticker.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sticker.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Handle filter tag click
  const handleFilterClick = (tag) => {
    setSelectedFilter(tag);
  };

  // Handle search
  const handleSearch = () => {
    // Search functionality is already implemented through filteredStickers
    // Search functionality
  };

  // Image Viewer functions for TRENDING STICKERS
  const openImageViewer = (sticker) => {
    // Open image viewer with selected sticker
    setSelectedStickerImage({
      src: sticker.image,
      title: sticker.title,
      alt: sticker.title
    });
    setIsImageViewerOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeImageViewer = () => {
    setSelectedStickerImage(null);
    setIsImageViewerOpen(false);
    document.body.style.overflow = 'unset'; // Restore scroll
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to logout');
      console.error('Logout error:', error);
    }
  };

  // Close image viewer on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isImageViewerOpen) {
        closeImageViewer();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isImageViewerOpen]);

  return (
    <div className="landing-container">
      {/* Background Effects */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      
      {/* Premium Glassmorphism Navigation Bar with Enhanced Animations */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        {/* Left - Brand Title with Hover Effect */}
        <div className="brand-title">
          <span className="brand-text" data-text="Laptop Stickers">Laptop Stickers</span>
        </div>
        
        {/* Center - Menu Links with Underline Animation */}
        <div className="nav-menu">
          <a href="#home" className="nav-link">Home</a>
          <a href="#explore" className="nav-link">Explore</a>
          <a href="#upload" className="nav-link">Upload</a>
          <a href="#leaderboard" className="nav-link">Leaderboard</a>
        </div>
        
        {/* Right - Auth Buttons with Advanced Hover Effects */}
        <div className="auth-buttons">
          {user ? (
            <>
              <Link to="/profile" className="sign-in-btn">Profile</Link>
              <button onClick={handleLogout} className="sign-up-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth" className="sign-in-btn">Sign In</Link>
              <Link to="/auth" className="sign-up-btn">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="hero-section" id="home">
        <div className="hero-content">
          {/* Main Headline */}
          <div className="main-headline">
            <h1 className="headline-wildest">WILDEST</h1>
            <h1 className="headline-laptop">LAPTOP</h1>
            <h1 className="headline-stickers">STICKERS</h1>
          </div>
          
          {/* Subtitle */}
          <p className="subtitle">
            Discover, share, and vote on the most bizarre laptop stickers from around the world. 
            Join the ultimate laptop customization community.
          </p>
          
          {/* CTA Button */}
          <button className="cta-button">START EXPLORING</button>
        </div>
      </div>

      {/* Sticker Carousel Section */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h2 className="carousel-title">🔥 TRENDING STICKERS</h2>
          <p className="carousel-subtitle">Discover the wildest laptop customizations from our community</p>
        </div>
        
        <div className="carousel-container">
          <div className="carousel-wrapper">
            {/* Left Arrow */}
            <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
              <span>‹</span>
            </button>

            {/* Carousel Track */}
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {stickerData.map((sticker, index) => (
                <div key={sticker.id} className="carousel-slide">
                  <div className="sticker-card">
                    <div className="sticker-image-container">
                      <img 
                        src={sticker.image} 
                        alt={sticker.title}
                        className="sticker-image clickable-image"
                        onClick={() => openImageViewer(sticker)}
                        style={{ cursor: 'pointer' }}
                        title="Click to view large image"
                      />
                      <div className="trending-badge">#TRENDING</div>
                    </div>
                    <div className="sticker-content">
                      <h3 className="sticker-title">{sticker.title}</h3>
                      <p className="sticker-subtitle">{sticker.subtitle}</p>
                      <div className="sticker-footer">
                        <span className="category-tag">{sticker.category}</span>
                        <div className="vote-badge">
                          <span className="vote-count">{sticker.votes} votes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
              <span>›</span>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="carousel-pagination">
            {stickerData.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Explore Stickers Section */}
      <div className="explore-section" id="explore">
        <div className="explore-header">
          <h2 className="explore-title">🔍 EXPLORE STICKERS</h2>
          
          {/* Filter Row */}
          <div className="filter-row">
            <div className="filter-tags">
              {filterTags.map(tag => (
                <button
                  key={tag}
                  className={`filter-tag ${selectedFilter === tag ? 'active' : ''}`}
                  onClick={() => handleFilterClick(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
            
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search stickers..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="filter-button" onClick={handleSearch}>
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Sticker Grid */}
        <div className="sticker-grid">
          {filteredStickers.map(sticker => (
            <div key={sticker.id} className="explore-sticker-card">
              <div className="explore-sticker-image">
                <img 
                  src={sticker.image} 
                  alt={sticker.title}
                  className="clickable-image"
                  onClick={() => openImageViewer(sticker)}
                  style={{ cursor: 'pointer' }}
                  title="Click to view large image"
                />
              </div>
              
              <div className="explore-sticker-content">
                <h3 className="explore-sticker-title">{sticker.title}</h3>
                
                <div className="sticker-meta">
                  <span className="sticker-author">{sticker.author}</span>
                  <span className="sticker-date">{sticker.date}</span>
                </div>
                
                <div className="location-badge">
                  📍 {sticker.location}
                </div>
                
                <div className="sticker-tags">
                  {sticker.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="mini-tag">#{tag}</span>
                  ))}
                  {sticker.tags.length > 2 && (
                    <span className="more-tags">+{sticker.tags.length - 2} more</span>
                  )}
                </div>
                
                {/* Bottom Actions */}
                <div className="sticker-actions">
                  <div className="vote-section">
                    <button className="vote-up">
                      <span>↑</span>
                      <span>{sticker.votes.up}</span>
                    </button>
                    <button className="vote-down">
                      <span>↓</span>
                      <span>{sticker.votes.down}</span>
                    </button>
                  </div>
                  
                  <div className="interaction-icons">
                    <button className="comment-btn">
                      💬 {sticker.comments}
                    </button>
                    <button className="share-btn">
                      📤 {sticker.shares}
                    </button>
                  </div>
                  
                  <button 
                    className="view-more-btn"
                    onClick={() => openImageViewer(sticker)}
                    title="Click to view large sticker image"
                  >
                    🔍 View Image
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="load-more-container">
          <button className="load-more-btn">
            Load More Stickers
          </button>
        </div>
      </div>

      {/* Demo Content Sections for Scroll Testing */}

      <div className="upload-section" id="upload">
        <div className="upload-container">
          <h2 className="upload-title">SHARE YOUR LAPTOP</h2>
          <p className="upload-subtitle">Got bizarre stickers on your laptop? Show them off!</p>
          
          <form className="upload-form" onSubmit={handleSubmit}>
            {/* Upload Card */}
            <div 
              className={`upload-card ${imagePreview ? 'has-image' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {!imagePreview ? (
                <div className="upload-placeholder">
                  <div className="upload-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="upload-text">
                    <p className="upload-primary-text">Drag & Drop Your Laptop Photo</p>
                    <p className="upload-secondary-text">or click to browse files – JPG, PNG up to 10MB</p>
                  </div>
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="file-input" 
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={() => {
                      setUploadedImage(null);
                      setImagePreview(null);
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            
            {/* Caption & Tags */}
            <div className="form-fields">
              <div className="form-group">
                <input
                  type="text"
                  className="caption-input"
                  placeholder="Describe your laptop stickers setup…"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  className="tags-input"
                  placeholder="programming, gaming, anime, memes…"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              
              {/* Privacy Options */}
              <div className="privacy-options">
                <div className="privacy-option">
                  <input
                    type="radio"
                    id="public"
                    name="privacy"
                    value="public"
                    checked={privacy === 'public'}
                    onChange={() => setPrivacy('public')}
                  />
                  <label htmlFor="public">Public – Everyone can see this</label>
                </div>
                
                <div className="privacy-option">
                  <input
                    type="radio"
                    id="college"
                    name="privacy"
                    value="college"
                    checked={privacy === 'college'}
                    onChange={() => setPrivacy('college')}
                  />
                  <label htmlFor="college">College Only – Only students from my college</label>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className={`launch-button ${isUploading ? 'uploading' : ''} ${uploadSuccess ? 'success' : ''}`}
              disabled={isUploading || uploadSuccess}
            >
              {uploadSuccess ? (
                <>
                  <span className="button-icon">✓</span>
                  STICKER LAUNCHED!
                </>
              ) : isUploading ? (
                <>
                  <span className="button-icon loading">🚀</span>
                  LAUNCHING...
                </>
              ) : (
                <>
                  <span className="button-icon">🚀</span>
                  LAUNCH TO COMMUNITY
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="leaderboard-section" id="leaderboard">
        <div className="leaderboard-container">
          <h2 className="leaderboard-title">🏆 LEADERBOARD</h2>
          <p className="leaderboard-subtitle">Top explorers of the weirdest laptop sticker universe.</p>
          
          <div className="leaderboard-cards">
            {/* Top 3 Users - Highlighted */}
            <div className="top-users">
              {/* #1 User */}
              <div className="leaderboard-card top-card first-place">
                <div className="rank-badge">#1</div>
                <div className="trophy-icon">🏆</div>
                <div className="user-profile">
                  <div className="profile-picture">
                    <img src="https://i.pravatar.cc/150?img=68" alt="Profile" />
                  </div>
                  <div className="username">@codemaster21</div>
                  <div className="user-badge sticker-god">🥇 Sticker God</div>
                </div>
                <div className="user-stats">
                  <div className="stat votes">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-value">3,207</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat stickers">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">18</span>
                    <span className="stat-label">Stickers</span>
                  </div>
                </div>
              </div>
              
              {/* #2 User */}
              <div className="leaderboard-card top-card second-place">
                <div className="rank-badge">#2</div>
                <div className="trophy-icon">🥈</div>
                <div className="user-profile">
                  <div className="profile-picture">
                    <img src="https://i.pravatar.cc/150?img=47" alt="Profile" />
                  </div>
                  <div className="username">@techgeek</div>
                  <div className="user-badge meme-wizard">🥈 Meme Wizard</div>
                </div>
                <div className="user-stats">
                  <div className="stat votes">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-value">2,994</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat stickers">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">16</span>
                    <span className="stat-label">Stickers</span>
                  </div>
                </div>
              </div>
              
              {/* #3 User */}
              <div className="leaderboard-card top-card third-place">
                <div className="rank-badge">#3</div>
                <div className="trophy-icon">🥉</div>
                <div className="user-profile">
                  <div className="profile-picture">
                    <img src="https://i.pravatar.cc/150?img=44" alt="Profile" />
                  </div>
                  <div className="username">@animefan99</div>
                  <div className="user-badge vote-magnet">🥉 Vote Magnet</div>
                </div>
                <div className="user-stats">
                  <div className="stat votes">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-value">2,760</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat stickers">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">20</span>
                    <span className="stat-label">Stickers</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Other Top Users */}
            <div className="other-users">
              {/* #4 User */}
              <div className="leaderboard-card">
                <div className="rank-badge">#4</div>
                <div className="user-profile">
                  <div className="profile-picture">
                    <img src="https://i.pravatar.cc/150?img=33" alt="Profile" />
                  </div>
                  <div className="username">@gamelord</div>
                  <div className="user-badge rising-star">🚀 Rising Star</div>
                </div>
                <div className="user-stats">
                  <div className="stat votes">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-value">1,994</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat stickers">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">11</span>
                    <span className="stat-label">Stickers</span>
                  </div>
                </div>
              </div>
              
              {/* #5 User */}
              <div className="leaderboard-card">
                <div className="rank-badge">#5</div>
                <div className="user-profile">
                  <div className="profile-picture">
                    <img src="https://i.pravatar.cc/150?img=12" alt="Profile" />
                  </div>
                  <div className="username">@cryptoboi</div>
                  <div className="user-badge hacker-vibes">💾 Hacker Vibes</div>
                </div>
                <div className="user-stats">
                  <div className="stat votes">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-value">1,345</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat stickers">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">9</span>
                    <span className="stat-label">Stickers</span>
                  </div>
                </div>
              </div>
              
              {/* #6 User */}
              <div className="leaderboard-card">
                <div className="rank-badge">#6</div>
                <div className="user-profile">
                  <div className="profile-picture">
                    <img src="https://i.pravatar.cc/150?img=59" alt="Profile" />
                  </div>
                  <div className="username">@pixelartist</div>
                  <div className="user-badge creative-genius">🎨 Creative Genius</div>
                </div>
                <div className="user-stats">
                  <div className="stat votes">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-value">1,203</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat stickers">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">7</span>
                    <span className="stat-label">Stickers</span>
                  </div>
                </div>
              </div>
              
              {/* #7 User */}
              <div className="leaderboard-card">
                <div className="rank-badge">#7</div>
                <div className="user-profile">
                  <div className="profile-picture">
                    <img src="https://i.pravatar.cc/150?img=22" alt="Profile" />
                  </div>
                  <div className="username">@devninja</div>
                  <div className="user-badge code-warrior">⚔️ Code Warrior</div>
                </div>
                <div className="user-stats">
                  <div className="stat votes">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-value">1,056</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat stickers">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">12</span>
                    <span className="stat-label">Stickers</span>
                  </div>
                </div>
              </div>
              
              {/* #8 User */}
              <div className="leaderboard-card">
                <div className="rank-badge">#8</div>
                <div className="user-profile">
                  <div className="profile-picture">
                    <img src="https://i.pravatar.cc/150?img=17" alt="Profile" />
                  </div>
                  <div className="username">@memequeen</div>
                  <div className="user-badge meme-royalty">👑 Meme Royalty</div>
                </div>
                <div className="user-stats">
                  <div className="stat votes">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-value">987</span>
                    <span className="stat-label">Votes</span>
                  </div>
                  <div className="stat stickers">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">8</span>
                    <span className="stat-label">Stickers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* View All Button */}
          <div className="view-all-container">
            <button className="view-all-button">
              <span>View All Leaderboard</span>
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Debug Info removed */}

      {/* Simple Image Viewer */}
      {isImageViewerOpen && selectedStickerImage && (
        <div className="image-viewer-overlay" onClick={closeImageViewer}>
          {/* Close Button */}
          <button className="image-viewer-close" onClick={closeImageViewer}>
            ✕
          </button>
          
          {/* Large Image */}
          <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedStickerImage.src} 
              alt={selectedStickerImage.alt}
              className="large-sticker-image"
              title={selectedStickerImage.title}
            />
     
            {/* Image Title */}
            <div className="image-title">
              {selectedStickerImage.title}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          {/* Logo + Description */}
          <div className="footer-column logo-column">
            <h2 className="footer-logo">LAPTOP STICKERS</h2>
            <p className="footer-description">
              The ultimate platform for sharing and discovering the wildest laptop sticker setups from around the world.
            </p>
          </div>
          
          {/* Community Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Community</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Guidelines</a></li>
              <li><a href="#" className="footer-link">Report Content</a></li>
              <li><a href="#" className="footer-link">Discord</a></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Bug Reports</a></li>
            </ul>
          </div>
          
          {/* Social Media Icons */}
          <div className="footer-column social-column">
            <h3 className="footer-heading">Connect</h3>
            <div className="social-icons">
              <a href="#" className="social-icon twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="social-icon instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="social-icon whatsapp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="copyright-section">
          <div className="separator"></div>
          <p className="copyright-text">
            © 2024 Laptop Stickers. Made with <span className="skull-icon">💀</span> for sticker enthusiasts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;