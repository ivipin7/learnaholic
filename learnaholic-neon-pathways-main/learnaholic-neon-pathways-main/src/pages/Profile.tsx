import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, User, Mail, Phone, MapPin, GraduationCap, Briefcase, Calendar, Link as LinkIcon } from "lucide-react";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  mobileNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  bio?: string;
  qualifications?: string[];
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  dateOfBirth?: string;
  gender?: string;
  occupation?: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    bio: '',
    qualifications: [''],
    skills: [''],
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      website: ''
    },
    dateOfBirth: '',
    gender: '',
    occupation: ''
  });
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/signin');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      const data = await response.json();

      if (data.success) {
        const userData = {
          ...data.user,
          profilePicture: data.user.profilePicture ? `http://localhost:5000${data.user.profilePicture}` : undefined
        };
        setProfile(userData);
        setFormData(prev => ({
          ...prev,
          name: data.user.name || '',
          email: data.user.email || '',
          mobileNumber: data.user.mobileNumber || '',
          address: data.user.address || '',
          city: data.user.city || '',
          state: data.user.state || '',
          country: data.user.country || '',
          zipCode: data.user.zipCode || '',
          bio: data.user.bio || '',
          qualifications: data.user.qualifications || [''],
          skills: data.user.skills || [''],
          socialLinks: data.user.socialLinks || {
            linkedin: '',
            github: '',
            twitter: '',
            website: ''
          },
          dateOfBirth: data.user.dateOfBirth || '',
          gender: data.user.gender || '',
          occupation: data.user.occupation || ''
        }));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch profile');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayInputChange = (index: number, value: string, field: 'qualifications' | 'skills') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'qualifications' | 'skills') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'qualifications' | 'skills') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/users/${userId}/profile-picture`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Profile picture updated successfully",
        });
        fetchProfile();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to upload profile picture');
      console.error('Error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        setIsEditing(false);
        fetchProfile();
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
        }));
      } else {
        setError(Array.isArray(data.errors) ? data.errors.join('\n') : data.message);
      }
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!deletePassword) {
      setError('Please enter your password to confirm deletion');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem('userId');
        toast({
          title: "Success",
          description: "Profile deleted successfully",
        });
        navigate('/signin');
      } else {
        setError(data.message);
        setIsDeleting(false);
        setDeletePassword('');
      }
    } catch (error) {
      setError('Failed to delete profile');
      console.error('Error:', error);
      setIsDeleting(false);
      setDeletePassword('');
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="animate-pulse text-xl text-muted-foreground"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-primary"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                      <User className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                  <label
                    htmlFor="profile-picture"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                  </label>
                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                {profile.occupation && (
                  <p className="text-sm text-muted-foreground mt-1">{profile.occupation}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main Profile Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mobile Number</label>
                    <Input
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Occupation</label>
                    <Input
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date of Birth</label>
                    <Input
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Gender</label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country</label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code</label>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Qualifications</h3>
                  {formData.qualifications.map((qualification, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={qualification}
                        onChange={(e) => handleArrayInputChange(index, e.target.value, 'qualifications')}
                        disabled={!isEditing}
                        placeholder="Enter qualification"
                      />
                      {isEditing && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeArrayItem(index, 'qualifications')}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addArrayItem('qualifications')}
                    >
                      Add Qualification
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => handleArrayInputChange(index, e.target.value, 'skills')}
                        disabled={!isEditing}
                        placeholder="Enter skill"
                      />
                      {isEditing && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeArrayItem(index, 'skills')}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addArrayItem('skills')}
                    >
                      Add Skill
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">LinkedIn</label>
                      <Input
                        name="socialLinks.linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="LinkedIn URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">GitHub</label>
                      <Input
                        name="socialLinks.github"
                        value={formData.socialLinks.github}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="GitHub URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter</label>
                      <Input
                        name="socialLinks.twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Twitter URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <Input
                        name="socialLinks.website"
                        value={formData.socialLinks.website}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Personal website URL"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <Input
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <Input
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  {!isEditing ? (
                    <>
                      <Button type="button" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="py-4">
                            <label className="block text-sm font-medium mb-2">Enter your password to confirm</label>
                            <Input
                              type="password"
                              value={deletePassword}
                              onChange={(e) => setDeletePassword(e.target.value)}
                              className="w-full"
                              placeholder="Enter your password"
                            />
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => {
                              setDeletePassword('');
                              setError('');
                            }}>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleDelete} 
                              className="bg-destructive hover:bg-destructive/90"
                              disabled={!deletePassword}
                            >
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <>
                      <Button type="submit">Save Changes</Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData(prev => ({
                            ...prev,
                            currentPassword: '',
                            newPassword: '',
                          }));
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
} 