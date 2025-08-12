import React, { useState } from 'react';
import axios from 'axios';
import './contact.scss';
import { toastAlert } from '../../utils/toastAlert';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    const { fullName, email, subject, message } = formData;

    if (!fullName || !email || !message) {
      toastAlert({
        type: 'error',
        message: 'Please fill in all required fields.',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/notification`,
        {
          title: subject || `Message from ${fullName}`,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      toastAlert({
        type: 'success',
        message: 'Message sent successfully!',
      });

      setFormData({ fullName: '', email: '', subject: '', message: '' });

    } catch (error) {
      toastAlert({
        type: 'error',
        message: error?.response?.data?.message || 'Something went wrong.',
      });
    }
  };

  return (
    <div className="contactPage">
      <div className="contactForm">
        <h1>Contact Us</h1>
        <div className="form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            autoComplete="off"
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="button" onClick={handleSubmit}>Send Message</button>
        </div>
      </div>

      <div className="contactInfo">
        <h2>Get in Touch</h2>
        <p><strong>Email:</strong> support@cosmetics.com</p>
        <p><strong>Phone:</strong> +92 300 1234567</p>
        <p><strong>Address:</strong> Saddar, Karachi, Pakistan</p>
      </div>
    </div>
  );
};

export default Contact;
