import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-12 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg font-medium mb-2">
          Made with <span className="text-red-500">❤️</span> by{' '}
          <a
            href="https://github.com/atharva-mali"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-gray-300 hover:text-gray-100 transition-colors duration-300"
          >
            Atharva Mali
          </a>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
