import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";

const user = {
  name: "Chelsea Hagon",
  handle: "chelseahagon",
  email: "chelseahagon@example.com",
  role: "Human Resources Manager",
  imageId: "1550525811-e5869dd03032",
  imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navLinks = [
  { title: "Home", active: true },
  { title: "Profile", active: false },
  { title: "Resources", active: false },
  { title: "Company Directory", active: false },
  { title: "Openings", active: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Popover as="header" className="pb-24 bg-gradient-to-r from-vita-700 to-vita-800">
        {({ open }) => (
          <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative py-5 flex items-center justify-center lg:justify-between">
                {/* Logo */}
                <div className="absolute left-0 flex-shrink-0 lg:static">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27.9069 3.89899C39.5312 3.89899 48.9539 13.3264 48.9539 24.9483C48.9539 36.5773 39.5312 46 27.9069 46L33.9589 24.6755L27.9069 3.89899Z" />
                      <path d="M1.30412 3.89899C12.9261 3.89899 22.3534 13.3264 22.3534 24.9483C22.3534 36.5773 12.9261 46 1.30412 46L7.35382 24.6755L1.30412 3.89899Z" />
                    </svg>
                  </a>
                </div>

                {/* Right section on desktop */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">{/* CLEARED */}</div>

                {/* Search */}
                <div className="flex-1 min-w-0 px-12 lg:hidden">Mobile</div>

                {/* Menu button */}
                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
                <div className="grid grid-cols-3 gap-8 items-center">
                  <div className="col-span-2">
                    <nav className="flex space-x-4">
                      {navLinks.map((link) => (
                        <a
                          key={link.title}
                          href="#"
                          className={classNames(
                            link.active ? "text-white" : "text-indigo-100",
                            "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                          )}
                          aria-current={link.active ? "page" : "false"}
                        >
                          {link.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div>
                    <div className="max-w-md w-full mx-auto">
                      <Link href="/">
                        <a className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-vita-800 bg-vita-200 hover:bg-vita-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500">
                          New Match
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay static className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel focus static className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                              <span className="sr-only">Close menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          <a href="#" className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Home
                          </a>
                          <a href="#" className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Profile
                          </a>
                          <a href="#" className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Resources
                          </a>
                          <a href="#" className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Company Directory
                          </a>
                          <a href="#" className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Openings
                          </a>
                        </div>
                      </div>
                      <div className="pt-4 pb-2">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="text-base font-medium text-gray-800 truncate">Rebecca Nicholas</div>
                            <div className="text-sm font-medium text-gray-500 truncate">rebecca.nicholas@example.com</div>
                          </div>
                          <button className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          <a href="#" className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Your Profile
                          </a>
                          <a href="#" className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Settings
                          </a>
                          <a href="#" className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Sign out
                          </a>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Popover>
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Section title
                </h2>
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <div className="p-6">{/* Your content */}1</div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Section title
                </h2>
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <div className="p-6">{/* Your content */}2</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <span className="block sm:inline">&copy; 2021 Tailwind Labs Inc.</span> <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
