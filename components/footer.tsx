export default function Footer() {
  return (
    <footer className="py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; 2025 EpisodeRating. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/about" className="text-sm hover:underline">
            About
          </a>
          <a href="/contact" className="text-sm hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
