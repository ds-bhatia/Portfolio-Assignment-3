import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>
        <a href="https://www.linkedin.com/in/dhruv-sunil-bhatia/" target="_blank" rel="noreferrer">
          Linkedin
        </a>
      </p>
      <p><a href="mailto:dhruvsbhatia@gmail.com">Email</a></p>

      <ContactForm />
    </section>
  );
}
