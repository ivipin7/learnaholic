import { connectToDatabase } from '../lib/mongodb';
// Note: bcrypt should not be used in the browser - this is just for demonstration
// In a real app, password hashing should be done on the server

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const API_URL = 'http://localhost:5000/api';

export async function registerUser(userData: Omit<User, 'createdAt'>) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register user');
    }
    
    const result = await response.json();
    return result.user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to authenticate user');
    }
    
    const result = await response.json();
    return result.user;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

export async function getCurrentUser(userId: string) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user');
    }
    
    const result = await response.json();
    return result.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
}

export async function updateUserProfile(userId: string, userData: Partial<User>) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user profile');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function deleteUser(userId: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete user');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function uploadProfilePicture(userId: string, file: File) {
  try {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    const response = await fetch(`${API_URL}/users/${userId}/profile-picture`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload profile picture');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
}
