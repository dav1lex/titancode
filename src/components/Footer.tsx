import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 items-center justify-center ">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TITANCODE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;