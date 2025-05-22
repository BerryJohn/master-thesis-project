const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 py-6">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left">
        <span className="font-semibold">
          Uniwersytet Ekonomiczny w Krakowie
        </span>
        <span className="block text-sm">
          © {new Date().getFullYear()} UEK Kraków. All rights reserved.
        </span>
      </div>
      <div className="mt-4 md:mt-0 text-center md:text-right">
        <span className="text-sm">Created by Jan Bak</span>
      </div>
    </div>
  </footer>
);

export default Footer;
