import React from 'react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-primary mt-12 py-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-300">
        <p>&copy; {new Date().getFullYear()} Detalles Pro. All rights reserved.</p>
        <p className="text-sm mt-1">Crafting Quality with Precision</p>
      </div>
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 bg-accent text-primary p-3 rounded-full shadow-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition-transform transform hover:scale-110"
        aria-label="Volver al principio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;