import { useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(data.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setErrors(validate(updated));
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message. Please try again.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setStatus(result.message || "Message sent successfully");
    } catch (error) {
      setStatus(error.message || "Unable to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      {status && <p className="form-status">{status}</p>}
      <button type="submit" disabled={!isValid || submitting}>{submitting ? "Sending..." : "Send Message"}</button>
    </form>
  );
}
