import { Search, User } from 'lucide-react';

export default function DealerNavbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8 dark:bg-[#0a0a0a] dark:border-gray-800">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative">
            <button className="-m-1.5 flex items-center p-1.5 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6" aria-hidden="true">
                  Dealer Portal
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
