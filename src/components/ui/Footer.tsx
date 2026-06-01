export default function Footer() {
  return (
    <footer className="w-full py-6 bg-black/50 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm text-center md:text-left">
          © {new Date().getFullYear()} Saksham Mogha. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
          <a href="/support" className="text-gray-400 hover:text-white text-sm transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
