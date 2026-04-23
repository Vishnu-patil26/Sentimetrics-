import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Sentimetrics | Precision Smartphone Discovery',
  description: 'The professional web builder for stunning smartphone recommendations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="navbar-wrapper">
          <nav className="navbar glass">
            <div className="nav-container">
              <Link href="/" className="logo">
                <span className="logo-icon">S</span>
                <span className="logo-text">Sentimetrics</span>
              </Link>
              
              <div className="nav-links">
                <Link href="/precision-pick" className="nav-link">Discover</Link>
                <Link href="/compare" className="nav-link">Compare</Link>
                <Link href="/chatbot" className="nav-link">Assistant</Link>
              </div>

              <div className="nav-actions">
                <button className="btn-login">Login</button>
                <Link href="/precision-pick" className="btn-signup">Get Started</Link>
              </div>
            </div>
          </nav>
        </header>
        {children}


      </body>
    </html>
  );
}
