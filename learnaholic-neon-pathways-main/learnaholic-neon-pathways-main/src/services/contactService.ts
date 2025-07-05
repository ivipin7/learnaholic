
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface NewsletterSubscription {
  email: string;
  createdAt: Date;
}

const API_URL = 'http://localhost:5000/api';

export async function submitContactForm(formData: Omit<ContactFormData, 'createdAt'>) {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    const response = await fetch(`${API_URL}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

export async function getContactSubmissions() {
  try {
    const response = await fetch(`${API_URL}/contact`);
    
    if (!response.ok) {
      throw new Error('Failed to get contact submissions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting contact submissions:', error);
    throw error;
  }
}

export async function getNewsletterSubscriptions() {
  try {
    const response = await fetch(`${API_URL}/newsletter`);
    
    if (!response.ok) {
      throw new Error('Failed to get newsletter subscriptions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting newsletter subscriptions:', error);
    throw error;
  }
}
