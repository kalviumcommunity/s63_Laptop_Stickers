# 🎨 Most Bizarre Laptop Stickers Seen in College

A fun and interactive platform where college students can share, discover, and vote on the most bizarre and creative laptop stickers spotted on campus. This project combines humor with technical skills, celebrating creativity and college culture.

## 🌟 Project Overview

The "Most Bizarre Laptop Stickers Seen in College" project is a full-stack web application that allows users to upload photos of quirky laptop stickers, add captions and tags, and engage with the community through voting and commenting systems. The platform features user authentication, content management, and a dynamic interface built with modern web technologies.

## ✨ Key Features

### 🔐 User Authentication
- **Secure Registration & Login**: Email/password authentication with JWT tokens
- **Demo Login**: Quick access for testing purposes
- **HTTP-Only Cookies**: Secure token storage
- **Password Hashing**: bcrypt encryption for user security
- **User Profiles**: Personalized accounts with profile management

### 📸 Content Management
- **Sticker Uploads**: Users can upload photos of bizarre laptop stickers
- **Image Validation**: Supports JPG, JPEG, PNG, and GIF formats
- **Captions & Tags**: Add descriptions and categorize stickers
- **User Attribution**: Track who uploaded each sticker
- **CRUD Operations**: Full create, read, update, delete functionality

### 🏆 User Engagement
- **Voting System**: Upvote/downvote stickers (planned feature)
- **Leaderboards**: Weekly, monthly, and all-time rankings (planned)
- **Commenting System**: Share reactions and insights (planned)
- **User Statistics**: Track uploads, votes received, and badges

### 🔍 Discovery Features
- **Search & Filter**: Find stickers by keywords, tags, or popularity (planned)
- **Gallery View**: Browse all stickers in an organized layout
- **User-specific Views**: See stickers uploaded by specific users
- **Responsive Design**: Works seamlessly on all devices

### 🛡️ Security & Moderation
- **Input Validation**: Server-side validation for all user inputs
- **CORS Protection**: Secure cross-origin requests
- **Helmet Security**: Additional security headers
- **Admin Panel**: Content moderation tools (planned)

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern React with latest features
- **React Router DOM**: Client-side routing
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Hot Toast**: Beautiful notification system
- **Axios**: HTTP client for API calls
- **Vite**: Fast build tool and development server

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger
- **Cookie Parser**: Cookie handling middleware

### Development Tools
- **ESLint**: Code linting and formatting
- **Nodemon**: Auto-restart development server
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 📁 Project Structure

```
s63_Laptop_Stickers/
├── Backend/
│   ├── models/
│   │   ├── User.js          # User schema and model
│   │   └── schema.js        # Sticker schema and model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── routes.js        # Sticker CRUD routes
│   ├── middlewares/
│   │   └── validation.js    # Input validation middleware
│   ├── server.js            # Main server file
│   ├── database.js          # Database configuration
│   └── package.json         # Backend dependencies
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx           # Authentication component
│   │   │   ├── LandingPage.jsx    # Main landing page
│   │   │   ├── Profile.jsx        # User profile page
│   │   │   ├── StickerGallery.jsx # Sticker display gallery
│   │   │   └── Stickercard.jsx    # Individual sticker card
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Authentication context
│   │   ├── services/
│   │   │   ├── authService.js     # Authentication API calls
│   │   │   └── stickerService.js  # Sticker API calls
│   │   ├── pages/
│   │   │   ├── AddSticker.jsx     # Add new sticker page
│   │   │   ├── Login.jsx          # Login page
│   │   │   └── UpdateSticker.jsx  # Edit sticker page
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # App entry point
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kalviumcommunity/s63_Laptop_Stickers.git
   cd s63_Laptop_Stickers
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   
   # Create .env file with the following variables:
   # MONGO_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret_key
   # PORT=6001
   
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:6001

## 🔧 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /demo-login` - Demo account login
- `GET /me` - Get current user info

### Sticker Routes (`/api`)
- `GET /stickers` - Get all stickers
- `GET /stickers/user/:userId` - Get stickers by user
- `POST /stickers` - Create new sticker
- `PUT /stickers/:id` - Update sticker
- `DELETE /stickers/:id` - Delete sticker
- `GET /users` - Get all users

## 🎯 Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  profilePicture: String,
  bio: String,
  role: String (user/admin),
  stickersUploaded: Number,
  votesReceived: Number,
  badge: String,
  createdAt: Date
}
```

### Sticker Model
```javascript
{
  title: String (required),
  imageUrl: String (required),
  caption: String,
  tags: [String],
  created_by: ObjectId (ref: User),
  createdAt: Date
}
```



### Deployment Platforms
- **Frontend**: Netlify (Automatic deployment from GitHub)
- **Backend**: Render (Automatic deployment from GitHub)
- **Database**: MongoDB Atlas (Cloud database)

## 🔮 Future Enhancements

### Planned Features
- **Voting System**: Implement upvote/downvote functionality
- **Leaderboards**: Weekly, monthly, and all-time rankings
- **Advanced Search**: Filter by tags, popularity, date
- **Commenting System**: User interactions on stickers
- **Mobile App**: React Native mobile application
- **Gamification**: Badges and achievements system
- **Social Features**: Follow users, share stickers
- **Admin Dashboard**: Content moderation tools

### Technical Improvements
- **Image Upload**: Direct file upload with cloud storage
- **Real-time Updates**: WebSocket integration
- **Performance**: Pagination and lazy loading
- **Testing**: Unit and integration tests
- **CI/CD**: Automated testing and deployment
- **Monitoring**: Error tracking and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Institution**: Kalvium Community
- **Project Type**: Full Stack Web Application

## 🙏 Acknowledgments

- Kalvium Community for project guidance
- MongoDB for database solutions
- React team for the amazing framework
- All contributors and testers

## 🌐 Deployment

### Live Deployment Links
- **Frontend**: [https://laptop-stickers.netlify.app/](https://laptop-stickers.netlify.app/)
- **Backend API**: [https://s63-laptop-stickers-2-skyt.onrender.com](https://s63-laptop-stickers-2-skyt.onrender.com)


