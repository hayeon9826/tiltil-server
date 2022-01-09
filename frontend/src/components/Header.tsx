import Link from "next/link";
import { Fragment } from "react";
import { Popover, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { getToken, destroyToken } from "@store";
import React, { useEffect, useState } from "react";
import useAuth from "@auth";
import { sleep } from "@utils";
import { postQuery } from "@api";
import { API_URL } from "@config";
import { LogOutUserQuery } from "src/core/query/user";
import toast from "react-simple-toasts";
import { useRouter } from "next/router";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser, isAuthenticated, authenticateUser, unAuthenticateUser } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    (async function checkToken() {
      console.log(getToken, "@@@getToken header");
      try {
        // TODO Check Token 구현 필요

        // const response = await refresh();
        // saveToken(response.data);
        authenticateUser(getToken());
      } catch {
        destroyToken();
        unAuthenticateUser();
      } finally {
        await sleep(700);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    const query = await LogOutUserQuery(currentUser?.email);
    const response = await postQuery(query);
    if (response.data?.data?.logOutUser) {
      toast("잠시 후 로그아웃 됩니다.");
      await sleep(1000);
      unAuthenticateUser();
      await sleep(200);
      await router.push("/");
    } else {
      toast("로그아웃 오류입니다. 문제가 계속되면 관리자에게 문의해주세요.");
    }
  };
  return (
    <Popover
      as="header"
      className={({ open }) =>
        classNames(
          open ? "fixed inset-0 z-40 overflow-y-auto" : "",
          "bg-white shadow-sm lg:static lg:overflow-y-visible"
        )
      }
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8 h-14">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/">
                    <img
                      className="block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=purple&shade=600"
                      alt="Workflow"
                    />
                  </a>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  {/* <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                        placeholder="검색"
                        type="search"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                {/* <a
                  href="#"
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  Go Premium
                </a> */}
                <a
                  href="#"
                  className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </a>

                {/* Profile dropdown */}
                <Menu as="div" className="flex-shrink-0 relative ml-5">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`${API_URL}/image/profile.png`}
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
                    <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                      <>
                        {isAuthenticated ? (
                          <>
                            <Menu.Item key="logout">
                              {({ active }) => (
                                <>
                                  <a
                                    href="/users/mypage"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block py-2 px-4 text-sm text-gray-700"
                                    )}
                                  >
                                    마이페이지
                                  </a>
                                </>
                              )}
                            </Menu.Item>
                            <Menu.Item key="logout">
                              {({ active }) => (
                                <>
                                  <a
                                    href="#"
                                    onClick={handleLogout}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block py-2 px-4 text-sm text-gray-700"
                                    )}
                                  >
                                    로그아웃
                                  </a>
                                </>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <>
                            <Menu.Item key="login">
                              {({ active }) => (
                                <a
                                  href="/users/login"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  로그인
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item key="register">
                              {({ active }) => (
                                <a
                                  href="/users/register"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  회원가입
                                </a>
                              )}
                            </Menu.Item>
                          </>
                        )}
                      </>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <a
                  href="#"
                  className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  TIL 작성하기
                </a>
              </div>
            </div>
          </div>
          <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="border-t border-gray-200 pt-4">
              <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`${API_URL}/image/profile.png`}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">
                    {currentUser ? currentUser?.email : ""}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                <>
                  {isAuthenticated ? (
                    <>
                      <a
                        key="mypage_mobile"
                        href="/users/mypage"
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        마이페이지
                      </a>
                      <a
                        key="logout_mobile"
                        onClick={handleLogout}
                        href="#"
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        로그아웃
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        key="login_mobile"
                        href="/users/login"
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        로그인
                      </a>
                      <a
                        key="register_mobile"
                        href="/users/register"
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        회원가입
                      </a>
                    </>
                  )}
                </>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default Header;
