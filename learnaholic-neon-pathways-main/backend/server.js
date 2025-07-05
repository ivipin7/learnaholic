const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://192.168.177.89:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Password validation middleware
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  if (password.length < minLength) errors.push(`Password must be at least ${minLength} characters long`);
  if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
  if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
  if (!hasNumbers) errors.push('Password must contain at least one number');
  if (!hasSpecialChar) errors.push('Password must contain at least one special character');

  return {
    isValid: errors.length === 0,
    errors
  };
};

// MongoDB Connection URI - store this in .env file in production
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/learnaholic";
let db;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("learnaholic");
    
    // Initialize collections and indexes
    await db.collection("contacts").createIndex({ email: 1 });
    await db.collection("newsletter").createIndex({ email: 1 }, { unique: true });
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// API Routes

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const result = await db.collection('contacts').insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    });
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ success: false, message: 'Failed to submit contact form' });
  }
});

// Newsletter subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if already subscribed
    const existing = await db.collection('newsletter').findOne({ email });
    if (existing) {
      return res.status(200).json({ success: true, message: 'Already subscribed' });
    }
    
    const result = await db.collection('newsletter').insertOne({
      email,
      createdAt: new Date()
    });
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ success: false, message: 'Failed to subscribe to newsletter' });
  }
});

// User registration with password validation
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password validation failed',
        errors: passwordValidation.errors
      });
    }
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    const result = await db.collection('users').insertOne({
      name,
      email,
      password, // In production, use hashedPassword
      createdAt: new Date()
    });
    
    res.status(201).json({
      success: true,
      user: {
        id: result.insertedId,
        name,
        email
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // In a real app, you would compare hashed passwords
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password;
    
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ success: false, message: 'Failed to authenticate user' });
  }
});

// Get user profile
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } } // Exclude password from response
    );
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user profile' });
  }
});

// Update user profile
app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      name, 
      email, 
      currentPassword, 
      newPassword,
      mobileNumber,
      address,
      city,
      state,
      country,
      zipCode,
      bio,
      qualifications,
      skills,
      socialLinks,
      dateOfBirth,
      gender,
      occupation
    } = req.body;
    
    // If updating password, validate the new password
    if (newPassword) {
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Password validation failed',
          errors: passwordValidation.errors
        });
      }
      
      // Verify current password
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (user.password !== currentPassword) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (newPassword) updateData.password = newPassword;
    if (mobileNumber) updateData.mobileNumber = mobileNumber;
    if (address) updateData.address = address;
    if (city) updateData.city = city;
    if (state) updateData.state = state;
    if (country) updateData.country = country;
    if (zipCode) updateData.zipCode = zipCode;
    if (bio) updateData.bio = bio;
    if (qualifications) updateData.qualifications = qualifications;
    if (skills) updateData.skills = skills;
    if (socialLinks) updateData.socialLinks = socialLinks;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (gender) updateData.gender = gender;
    if (occupation) updateData.occupation = occupation;
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

// Delete user profile
app.delete('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    
    // Verify password before deletion
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Password is incorrect' });
    }
    
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ success: false, message: 'Failed to delete profile' });
  }
});

// Upload profile picture
app.post('/api/users/:userId/profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const profilePictureUrl = `/uploads/${req.file.filename}`;
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { profilePicture: profilePictureUrl } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile picture updated successfully',
      profilePicture: profilePictureUrl
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ success: false, message: 'Failed to upload profile picture' });
  }
});

// Add this route before the app.listen call
app.post('/api/test/create-user', async (req, res) => {
  try {
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test@123',
      createdAt: new Date()
    };
    
    const result = await db.collection('users').insertOne(testUser);
    
    res.status(201).json({
      success: true,
      message: 'Test user created successfully',
      user: {
        id: result.insertedId,
        name: testUser.name,
        email: testUser.email
      }
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(500).json({ success: false, message: 'Failed to create test user' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});