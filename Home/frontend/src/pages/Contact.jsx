import React, { useState } from 'react';
import { toast } from "react-toastify";

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the API request
    const data = {
      email,
      subject,
      text: message,
    };

    try {
      // Send a POST request to the /sendemail API endpoint
      const response = await fetch('http://localhost:5000/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, maybe show a success message to the user
        console.log('Email sent successfully!');
        toast.success("Email Sent Successfully");

        // Clear the form fields
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast.error("Network issue");
        // Handle errors, maybe show an error message to the user
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('An error occurred while sending the email:', error);
      toast.error("Network issue Found");
    }
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="form__input mt-1"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="form__input mt-1"
              placeholder="Let us know how we can help you"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="form__input mt-1"
              placeholder="Leave a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
