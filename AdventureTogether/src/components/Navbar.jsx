import React, { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon, MenuIcon, XIcon, LoginIcon,
} from '@heroicons/react/outline';
import { useUser } from 'reactfire';

const navigationLoggedIn = [
  { name: 'Discover', href: '/discover', current: true },
  { name: 'Profile', href: '/user-profile', current: false },
  { name: 'Interests', href: '/outdoor-interests', current: false },
  { name: 'Friends', href: '/my-friends', current: false },
  { name: 'Inbox', href: '/inbox', current: false },
];

const navigationLoggedOut = [
  { name: 'Log In', href: '/login', current: true },
  { name: 'Create Account', href: '/age', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { status, data: user } = useUser();
  const navState = user ? navigationLoggedIn : navigationLoggedOut;
  const [loggedInCur, setLoggedInCur] = useState(navigationLoggedIn);
  const [loggedOutCur, setLoggedOutCur] = useState(navigationLoggedOut);

  function setCurrent(item) {
    let tempCur;
    if (user) tempCur = loggedInCur;
    else tempCur = loggedOutCur;

    tempCur.forEach((i) => {
      const curIndex = tempCur.indexOf(i);
      if (i.name === item.name) tempCur[curIndex].current = true;
      else tempCur[curIndex].current = false;
    });
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <svg className="block lg:hidden h-8 w-auto" width="24px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <clipPath id="clip-path">
                        <rect className="cls-1" x="0.13" width="24" height="24" />
                      </clipPath>
                    </defs>
                    <g className="cls-2">
                      <path d="M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z" />
                      <path d="M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z" />
                      <path d="M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z" />
                      <path d="M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z" />
                    </g>
                  </svg>
                  <svg className="hidden lg:block h-8 w-auto" width="24px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <clipPath id="clip-path">
                        <rect className="cls-1" x="0.13" width="24" height="24" />
                      </clipPath>
                    </defs>
                    <g className="cls-2">
                      <path d="M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z" />
                      <path d="M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z" />
                      <path d="M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z" />
                      <path d="M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z" />
                    </g>
                  </svg>
                  <h1 className="hidden lg:block h-8 w-auto inline-flex text-2xl mb-2 md:text-2xl font-bold text-white tracking-thin align-middle">
                    Adventure Together&nbsp;&nbsp;|
                  </h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navState.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setCurrent(item)}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user
                  ? (
                    <>
                      <button type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/user-profile"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/logout"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  )
                  : (
                    <button type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <LoginIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navState.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
