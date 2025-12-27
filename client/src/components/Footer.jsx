export function Footer() {
  return (
    <footer className="border-t border-accent/20 py-8 mt-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-small text-text/60">
            &copy; {new Date().getFullYear()} NODAYSIDLE — 2 people, 1 entity
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:info@nodaysidle.com"
              className="text-small text-text/60 hover:text-accent transition-colors"
            >
              Email
            </a>
            <a
              href="https://twitter.com/kaly_ndi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-text/60 hover:text-accent transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com/salvadalba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-text/60 hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
