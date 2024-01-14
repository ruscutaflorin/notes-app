import React from "react";
import { Link } from "react-router-dom";
import "../../styles/landingPage.css";

const LandingPage = () => {
  return (
    <div className="wrapper">
      <div className="landing-page">
        <header>
          <h1>Your Study Organizer</h1>
          <p>Organize your notes and study efficiently.</p>
        </header>
        <main>
          <section>
            <h2>Features</h2>
            <ul>
              <li>View, add, edit, and delete course notes</li>
              <li>Attach images and documents to notes</li>
              <li>Organize notes by subjects, date, tags, and keywords</li>
              <li>Share notes with classmates</li>
              <li>Integrate content from various sources</li>
              <li>Create and manage study groups</li>
            </ul>
          </section>
          <section>
            <h2>Get Started</h2>
            <p>
              Start organizing your study materials today. Create an account or
              log in to get started.
            </p>
            <Link to="/notes" className="cta-button">
              ADD NOTES
            </Link>
          </section>
        </main>
        <footer>
          <p>&copy; 2024 Your Study Organizer</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
