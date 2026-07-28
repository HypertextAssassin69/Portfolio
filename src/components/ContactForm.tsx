import React, { useState } from 'react';
import './ContactForm.css';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xpwzgbbv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Auto-close after 4 seconds
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
        }, 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-form-wrapper">
      {/* Toggle Button */}
      <button
        className={`contact-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => { setIsOpen(prev => !prev); setStatus('idle'); }}
        id="contact-form-toggle"
      >
        <span className="contact-toggle-fill" />
        <span className="contact-toggle-text">
          {isOpen ? 'Close Form' : 'Send a Message'}
        </span>
        <svg
          className={`contact-toggle-arrow ${isOpen ? 'rotated' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Collapsible Form Panel */}
      <div className={`contact-form-panel ${isOpen ? 'visible' : ''}`}>
        {status === 'success' ? (
          <div className="contact-success">
            <div className="contact-success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out — I'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="What's on your mind?"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>

            {status === 'error' && (
              <p className="contact-error-msg">
                Something went wrong. Try emailing me directly at hi.aarav.arya@gmail.com
              </p>
            )}

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={status === 'sending'}
            >
              <span className="contact-submit-fill" />
              <span className="contact-submit-text">
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
