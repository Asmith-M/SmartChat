import React from 'react';
import { SmartChatLogo, AboutIcon, UserIcon } from '../components/icons';

const AboutPage = () => {
  const sectionStyle = {
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    padding: '24px',
    margin: '16px 0',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    transition: 'var(--transition)'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const iconStyle = {
    marginRight: '10px',
    verticalAlign: 'middle'
  };

  const contactStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center'
  };

  const linkStyle = {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    transition: 'var(--transition)',
    fontWeight: '500'
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={headerStyle}>
        <SmartChatLogo />
        <h1 style={{ margin: '10px 0', fontSize: '2.5em' }}>About SmartChat</h1>
      </div>

      <section style={sectionStyle}>
        <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <UserIcon style={iconStyle} />
          The Creator
        </h2>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
          Hello! I'm Asmith, the creator behind SmartChat. My journey into technology was driven by a fascination with how we can build tools that not only solve problems but also interact with us in intuitive ways.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <AboutIcon style={iconStyle} />
          The Project's Journey
        </h2>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
          Building SmartChat was an exciting process filled with learning and overcoming challenges, especially debugging backend issues to ensure smooth and reliable chat interactions.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <AboutIcon style={iconStyle} />
          Technology Stack
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1em' }}>
          <li style={{ margin: '5px 0' }}>• React</li>
          <li style={{ margin: '5px 0' }}>• Node.js</li>
          <li style={{ margin: '5px 0' }}>• Express</li>
          <li style={{ margin: '5px 0' }}>• OpenRouter API</li>
          <li style={{ margin: '5px 0' }}>• MongoDB</li>
          <li style={{ margin: '5px 0' }}>• Vercel</li>
          <li style={{ margin: '5px 0' }}>• Render</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <UserIcon style={iconStyle} />
          Contact Me
        </h2>
        <div style={contactStyle}>
          <a href="https://github.com/Asmith-M" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <span>🐙</span> GitHub
          </a>
          <a href="https://www.linkedin.com/in/asmith-mahendrakar-955204311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <span>💼</span> LinkedIn
          </a>
          <a href="https://x.com/asmith__M?t=pwsEIUGhsaJcGgp-EmokKQ&s=09" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <span>🐦</span> X (Twitter)
          </a>
          <a href="mailto:asmithmahendrakar@gmail.com" style={linkStyle}>
            <span>📧</span> Gmail
          </a>
        </div>
      </section>
      </div>
    </div>
  );
};

export default AboutPage;
