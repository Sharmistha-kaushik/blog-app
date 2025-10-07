export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-t-lg shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2025 MyBlogApp. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline hover:text-yellow-200">Privacy</a>
          <a href="#" className="hover:underline hover:text-yellow-200">Terms</a>
          <a href="#" className="hover:underline hover:text-yellow-200">Contact</a>
        </div>
      </div>
    </footer>
  );
}
