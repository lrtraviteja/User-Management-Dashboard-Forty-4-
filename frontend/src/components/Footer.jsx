export default function Footer() {
  return (
    <footer className="mt-auto bg-white dark:bg-gray-800 border-t dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm flex items-center justify-between text-gray-500 dark:text-gray-400">
        <span>© {new Date().getFullYear()} Forty4 Tech</span>
        <span>Built with React, Vite & Tailwind</span>
      </div>
    </footer>
  )
}

