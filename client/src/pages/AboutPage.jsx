import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page container">
      <h1>About SmartChat</h1>

      <section>
        <h2>The Creator</h2>
        <p>Hello! I'm Asmith, the creator behind SmartChat. My journey into technology was driven by a fascination with how we can build tools that not only solve problems but also interact with us in intuitive ways.</p>
      </section>

      <section>
        <h2>The Project's Journey</h2>
        <p>
          Building SmartChat was an exciting process filled with learning and overcoming challenges, especially debugging backend issues to ensure smooth and reliable chat interactions.
        </p>
      </section>

      <section>
        <h2>Technology Stack</h2>
        <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>OpenRouter API</li>
          <li>MongoDB</li>
          <li>Vercel</li>
          <li>Render</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
