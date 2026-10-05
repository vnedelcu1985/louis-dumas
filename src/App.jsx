import { useState } from 'react'

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'X', href: 'https://x.com' },
]

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home">
        <span className="brand-mark" aria-hidden="true">
          LD
        </span>
        <span className="brand-name">Louis Dumas</span>
      </a>
      <nav className="site-nav" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Contractor placement</p>
        <h1>Louis Dumas</h1>
        <p className="lede">
          Louis Dumas helps businesses find contractors they can count on —
          the right person for the work, introduced with care.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
        <a className="button" href="#contact">
          Get in touch
        </a>
      </div>
      <aside className="hero-panel" aria-label="About Louis Dumas">
        <p className="panel-kicker">The practice</p>
        <p className="panel-line">Finding contractors for businesses that need the work done.</p>
        <span className="panel-rule" aria-hidden="true" />
        <p className="panel-sign">Louis Dumas</p>
      </aside>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="section-intro">
        <p className="eyebrow">About</p>
        <h2>A quieter way to hire contractors</h2>
      </div>
      <div className="about-copy">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
          ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
          accumsan lacus vel facilisis.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Integer feugiat
          scelerisque varius morbi enim nunc faucibus a pellentesque.
        </p>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="section contact">
      <div className="section-intro">
        <p className="eyebrow">Contact</p>
        <h2>Start a conversation</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Vestibulum tortor quam, feugiat vitae.
        </p>
      </div>
      <form className="contact-form" onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
          />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" required placeholder="Tell us about the work" />
        </label>
        <button className="button" type="submit">
          Send message
        </button>
        {sent && (
          <p className="form-note" role="status">
            Thank you. This form is a placeholder and does not send a message yet.
          </p>
        )}
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p className="footer-name">Louis Dumas</p>
        <p>Contractor placement for businesses ready to hire.</p>
      </div>
      <div>
        <p className="footer-label">Contact</p>
        <ul className="footer-list">
          <li>
            <a href="mailto:contact@louisdumas.example">contact@louisdumas.example</a>
          </li>
          <li>
            <a href="tel:+10000000000">+1 (000) 000-0000</a>
          </li>
          <li>100 Placeholder Street</li>
        </ul>
      </div>
      <div>
        <p className="footer-label">Social</p>
        <ul className="socials">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
