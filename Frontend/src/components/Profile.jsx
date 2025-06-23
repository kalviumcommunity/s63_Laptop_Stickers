import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// CSS for Profile component
const profileStyles = {
  container: `min-h-screen bg-gray-900 text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8`,
  profileCard: `max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-500 relative`,
  glowEffect: `absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 opacity-50 blur-xl`,
  cardContent: `relative z-10 p-8 flex flex-col items-center`,
  avatarContainer: `w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 mb-6 glow-effect`,
  avatarImage: `w-full h-full object-cover`,
  avatarInitials: `w-full h-full flex items-center justify-center text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500`,
  username: `text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-1`,
  email: `text-gray-300 mb-4`,
  statsContainer: `w-full grid grid-cols-3 gap-4 mb-8`,
  statCard: `bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg border border-gray-600 flex flex-col items-center`,
  statValue: `text-2xl font-bold text-cyan-400 mb-1`,
  statLabel: `text-gray-400 text-sm`,
  sectionTitle: `text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 mt-12`,
  stickerGrid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`,
  stickerCard: `bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20`,
  stickerImage: `w-full h-48 object-cover object-center`,
  stickerContent: `p-4`,
  stickerTitle: `text-lg font-bold text-white mb-2`,
  stickerCaption: `text-gray-300 text-sm mb-3`,
  tagsContainer: `flex flex-wrap gap-2 mb-3`,
  tag: `px-2 py-1 text-xs rounded-full bg-purple-900/60 text-purple-300 border border-purple-700`,
  stickerFooter: `flex justify-between items-center text-sm text-gray-400`,
  votesContainer: `flex items-center gap-1`,
  emptyState: `text-center py-12 text-gray-400`,
  emptyStateIcon: `text-5xl mb-4 text-gray-600`,
  loadingSpinner: `animate-spin h-8 w-8 text-purple-500 mx-auto`,
  authProvider: `px-3 py-1 rounded-full text-xs font-medium bg-blue-900/60 text-blue-300 border border-blue-700 mb-4`,
  dateInfo: `text-gray-400 text-sm mb-4`,
};

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      delay: 0.1
    }
  }
};

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [userStickers, setUserStickers] = useState([]);
  const [isLoadingStickers, setIsLoadingStickers] = useState(true);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error('Please sign in to view your profile');
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);

  // Fetch user stickers
  useEffect(() => {
    const fetchUserStickers = async () => {
      if (!user) return;
      
      try {
        setIsLoadingStickers(true);
        const response = await axios.get(`/api/stickers/user/${user.id}`);
        
        if (response.data) {
          setUserStickers(response.data);
        }
      } catch (error) {
        console.error('Error fetching user stickers:', error);
        toast.error('Failed to load your stickers');
      } finally {
        setIsLoadingStickers(false);
      }
    };

    if (isAuthenticated) {
      fetchUserStickers();
    }
  }, [user, isAuthenticated]);

  // Generate avatar based on user data
  const renderAvatar = () => {
    if (user?.profilePicture) {
      return (
        <img 
          src={user.profilePicture} 
          alt={user.username} 
          className={profileStyles.avatarImage}
        />
      );
    } else {
      // Generate initials from username
      const initials = user?.username
        ? user.username.substring(0, 2).toUpperCase()
        : '??';
      
      return (
        <div className={profileStyles.avatarInitials}>
          {initials}
        </div>
      );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine auth provider
  const getAuthProvider = () => {
    // This is a placeholder - in a real app, you'd have this info in the user object
    return 'Email/Password';
  };

  if (loading || !isAuthenticated) {
    return (
      <div className={profileStyles.container}>
        <div className="flex justify-center items-center h-64">
          <div className={profileStyles.loadingSpinner}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={profileStyles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Card */}
      <motion.div 
        className={profileStyles.profileCard}
        variants={cardVariants}
      >
        <div className={profileStyles.glowEffect}></div>
        <div className={profileStyles.cardContent}>
          {/* Avatar */}
          <motion.div 
            className={profileStyles.avatarContainer}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {renderAvatar()}
          </motion.div>
          
          {/* Auth Provider Badge */}
          <div className={profileStyles.authProvider}>
            {getAuthProvider()}
          </div>
          
          {/* User Info */}
          <h1 className={profileStyles.username}>{user.username}</h1>
          <p className={profileStyles.email}>{user.email}</p>
          
          {/* Join Date */}
          <p className={profileStyles.dateInfo}>
            Joined {formatDate(user.createdAt || new Date())}
          </p>
          
          {/* Stats */}
          <div className={profileStyles.statsContainer}>
            <motion.div 
              className={profileStyles.statCard}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
            >
              <p className={profileStyles.statValue}>{user.stickersUploaded || 0}</p>
              <p className={profileStyles.statLabel}>Stickers Uploaded</p>
            </motion.div>
            
            <motion.div 
              className={profileStyles.statCard}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
            >
              <p className={profileStyles.statValue}>{user.votesReceived || 0}</p>
              <p className={profileStyles.statLabel}>Votes Received</p>
            </motion.div>
            
            <motion.div 
              className={profileStyles.statCard}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
            >
              <p className={profileStyles.statValue}>{user.badge || 'Newbie'}</p>
              <p className={profileStyles.statLabel}>Badge</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Stickers Section */}
      <motion.h2 
        className={profileStyles.sectionTitle}
        variants={itemVariants}
      >
        MY STICKER UPLOADS
      </motion.h2>
      
      {isLoadingStickers ? (
        <div className="flex justify-center items-center h-64">
          <div className={profileStyles.loadingSpinner}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      ) : userStickers.length > 0 ? (
        <motion.div 
          className={profileStyles.stickerGrid}
          variants={containerVariants}
        >
          {userStickers.map((sticker) => (
            <motion.div 
              key={sticker._id} 
              className={profileStyles.stickerCard}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)',
                transition: { type: 'spring', stiffness: 300 }
              }}
            >
              <img 
                src={sticker.imageUrl} 
                alt={sticker.title} 
                className={profileStyles.stickerImage}
              />
              <div className={profileStyles.stickerContent}>
                <h3 className={profileStyles.stickerTitle}>{sticker.title}</h3>
                <p className={profileStyles.stickerCaption}>{sticker.caption}</p>
                
                <div className={profileStyles.tagsContainer}>
                  {sticker.tags && sticker.tags.map((tag, index) => (
                    <span key={index} className={profileStyles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className={profileStyles.stickerFooter}>
                  <div className={profileStyles.votesContainer}>
                    <span>🔥</span>
                    <span>{sticker.votes || 0} votes</span>
                  </div>
                  <span>{formatDate(sticker.createdAt)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className={profileStyles.emptyState}
          variants={itemVariants}
        >
          <div className={profileStyles.emptyStateIcon}>📦</div>
          <p>You haven't uploaded any stickers yet.</p>
          <p className="mt-2">Use the "Launch to Community" form to share your first sticker!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;