import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string) => {
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

    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password complexity
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('\n'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      // Store user ID in localStorage
      localStorage.setItem('userId', data.user.id);

      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
        variant: "default",
      });

      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');

      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 neon-card">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold neon-text">Create Account</h1>
          <p className="text-muted-foreground">Join us on your learning journey</p>
        </div>

        {error && (
          <div className="bg-destructive/10 p-3 rounded-md flex items-start text-sm text-destructive">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
            <span className="whitespace-pre-line">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="pl-10"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="pl-10"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full btn-neon" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link to="/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
