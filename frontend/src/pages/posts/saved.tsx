import React, { useState, useEffect } from "react";
import { postQuery } from "@api";
import Header from "@components/Header";
import { User } from "@interface";
import Link from "next/link";
import { getUsersQuery } from "@usersQuery";
import { Fragment } from "react";
import useAuth from "@auth";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusSmIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";

import { API_URL } from "@config";

const categories = [
  { name: "Ruby on Rails", href: "/posts" },
  { name: "Database", href: "/posts" },
  { name: "GraphQL", href: "/posts" },
  { name: "Computer Science", href: "/posts" },
  { name: "AWS", href: "/posts" },
  { name: "Operating Systems", href: "/posts" },
  { name: "Network", href: "/posts" },
  { name: "Algorithm", href: "/posts" },
  { name: "Data Structures", href: "/posts" },
  { name: "React.js", href: "/posts" },
  { name: "Javascript", href: "/posts" },
];
const tabs = [
  { name: "인기글", href: "/", current: false },
  { name: "최신글", href: "/posts/recent", current: false },
  { name: "저장됨", href: "#", current: true },
];
const questions = [
  {
    id: "81614",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
      <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
    `,
  },
  // More questions...
];
const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "What books do you have on your bookshelf just to look smarter than you actually are?",
    comments: 291,
  },
  // More posts...
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SavedPosts = ({ isAuth }: any) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const requestTest = async () => {
    const query = getUsersQuery;
    const { data } = await postQuery(query);
    setUsers(data && data["data"] && data["data"]["users"]);
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuthenticated");
    }
  });

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <Header searchBar={true} />
        <div className="py-10">
          <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-4 divide-y divide-gray-300"
              >
                <div className="">
                  <p
                    className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider"
                    id="communities-headline"
                  >
                    CATEGORY
                  </p>
                  <div
                    className="mt-3 space-y-2"
                    aria-labelledby="communities-headline"
                  >
                    {categories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href + `?category=${category.name}`}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-gray-200 hover:bg-gray-50"
                      >
                        <span className="truncate">{category.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
            <main className="lg:col-span-8 xl:col-span-9">
              <div className="px-4 sm:px-0">
                <div className="lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <Link key={tab.name} href={tab.href}>
                          <a
                            className={classNames(
                              tab.current
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-700",
                              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                            )}
                          >
                            {tab.name}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="sr-only">Recent questions</h1>
                <ul role="list" className="space-y-4">
                  <div className="px-2  flex flex-row-reverse">
                    {/* <div className="text-lg font-bold button mb-4">
                      유저 목록
                    </div> */}
                    <button
                      className="inline-flex items-center px-2.5 py-1.5 m-2 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => requestTest()}
                    >
                      목록 가져오기
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center px-2.5 py-1.5 m-2 border border-transparent text-xs font-medium rounded text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => {
                        setUsers([]);
                      }}
                    >
                      목록 리셋
                    </button>
                  </div>
                  {users &&
                    users.length > 0 &&
                    users.map((user) => (
                      <>
                        <li
                          key={user.id}
                          className="bg-gray-900 px-4 py-6 border border-gray-500 sm:p-6 sm:rounded-lg mt-4"
                        >
                          <article
                            aria-labelledby={"question-title-" + user.id}
                          >
                            <div>
                              <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`${API_URL}/image/profile.png`}
                                    alt=""
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-200">
                                    <a href={"#"} className="hover:underline">
                                      {user.name}
                                    </a>
                                  </p>
                                  <p className="text-sm text-gray-300">
                                    <a
                                      href={"#"}
                                      className="hover:underline"
                                    ></a>
                                  </p>
                                </div>
                                <div className="flex-shrink-0 self-center flex">
                                  <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                  >
                                    <div>
                                      <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-300">
                                        <span className="sr-only">
                                          Open options
                                        </span>
                                        <DotsVerticalIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
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
                                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-200"
                                                    : "text-gray-700",
                                                  "flex px-4 py-2 text-sm"
                                                )}
                                              >
                                                <StarIcon
                                                  className="mr-3 h-5 w-5 text-gray-400"
                                                  aria-hidden="true"
                                                />
                                                <span>Add to favorites</span>
                                              </a>
                                            )}
                                          </Menu.Item>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-200"
                                                    : "text-gray-700",
                                                  "flex px-4 py-2 text-sm"
                                                )}
                                              >
                                                <CodeIcon
                                                  className="mr-3 h-5 w-5 text-gray-400"
                                                  aria-hidden="true"
                                                />
                                                <span>Embed</span>
                                              </a>
                                            )}
                                          </Menu.Item>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-200"
                                                    : "text-gray-700",
                                                  "flex px-4 py-2 text-sm"
                                                )}
                                              >
                                                <FlagIcon
                                                  className="mr-3 h-5 w-5 text-gray-400"
                                                  aria-hidden="true"
                                                />
                                                <span>Report content</span>
                                              </a>
                                            )}
                                          </Menu.Item>
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </div>
                              </div>
                              <h2
                                id={"question-title-" + user.id}
                                className="mt-4 text-base font-medium text-gray-200"
                              >
                                {user.email}
                              </h2>
                            </div>
                            <div
                              className="mt-2 text-sm text-gray-200 space-y-4"
                              dangerouslySetInnerHTML={{
                                __html: user.email,
                              }}
                            />
                            <div className="mt-6 flex justify-between space-x-8">
                              <div className="flex space-x-6">
                                <span className="inline-flex items-center text-sm">
                                  <button
                                    type="button"
                                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
                                  >
                                    <ThumbUpIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <span className="font-medium text-gray-200">
                                      {user.id}
                                    </span>
                                    <span className="sr-only">likes</span>
                                  </button>
                                </span>
                                <span className="inline-flex items-center text-sm">
                                  <button
                                    type="button"
                                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
                                  >
                                    <ChatAltIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <span className="font-medium text-gray-200">
                                      {user.id}
                                    </span>
                                    <span className="sr-only">replies</span>
                                  </button>
                                </span>
                                <span className="inline-flex items-center text-sm">
                                  <button
                                    type="button"
                                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
                                  >
                                    <EyeIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <span className="font-medium text-gray-200">
                                      {user.id}
                                    </span>
                                    <span className="sr-only">views</span>
                                  </button>
                                </span>
                              </div>
                              <div className="flex text-sm">
                                <span className="inline-flex items-center text-sm">
                                  <button
                                    type="button"
                                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
                                  >
                                    <ShareIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <span className="font-medium text-gray-200">
                                      Share
                                    </span>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </article>
                        </li>
                      </>
                    ))}

                  {questions.map((question) => (
                    <li
                      key={question.id}
                      className="bg-gray-900 px-4 py-6 border border-gray-500 sm:p-6 sm:rounded-lg"
                    >
                      <article
                        aria-labelledby={"question-title-" + question.id}
                      >
                        <div>
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={question.author.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-200">
                                <a
                                  href={question.author.href}
                                  className="hover:underline"
                                >
                                  {question.author.name}
                                </a>
                              </p>
                              <p className="text-sm text-gray-300">
                                <a
                                  href={question.href}
                                  className="hover:underline"
                                >
                                  <time dateTime={question.datetime}>
                                    {question.date}
                                  </time>
                                </a>
                              </p>
                            </div>
                            <div className="flex-shrink-0 self-center flex">
                              <Menu
                                as="div"
                                className="relative inline-block text-left"
                              >
                                <div>
                                  <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-300">
                                    <span className="sr-only">
                                      Open options
                                    </span>
                                    <DotsVerticalIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
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
                                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              active
                                                ? "bg-gray-100 text-gray-200"
                                                : "text-gray-700",
                                              "flex px-4 py-2 text-sm"
                                            )}
                                          >
                                            <StarIcon
                                              className="mr-3 h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                            <span>Add to favorites</span>
                                          </a>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              active
                                                ? "bg-gray-100 text-gray-200"
                                                : "text-gray-700",
                                              "flex px-4 py-2 text-sm"
                                            )}
                                          >
                                            <CodeIcon
                                              className="mr-3 h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                            <span>Embed</span>
                                          </a>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              active
                                                ? "bg-gray-100 text-gray-200"
                                                : "text-gray-700",
                                              "flex px-4 py-2 text-sm"
                                            )}
                                          >
                                            <FlagIcon
                                              className="mr-3 h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                            <span>Report content</span>
                                          </a>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          </div>
                          <h2
                            id={"question-title-" + question.id}
                            className="mt-4 text-base font-medium text-gray-200"
                          >
                            {question.title}
                          </h2>
                        </div>
                        <div
                          className="mt-2 text-sm text-gray-200 space-y-4"
                          dangerouslySetInnerHTML={{ __html: question.body }}
                        />
                        <div className="mt-6 flex justify-between space-x-8">
                          <div className="flex space-x-6">
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
                              >
                                <ThumbUpIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span className="font-medium text-gray-200">
                                  {question.likes}
                                </span>
                                <span className="sr-only">likes</span>
                              </button>
                            </span>
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
                              >
                                <ChatAltIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span className="font-medium text-gray-200">
                                  {question.replies}
                                </span>
                                <span className="sr-only">replies</span>
                              </button>
                            </span>
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
                              >
                                <EyeIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span className="font-medium text-gray-200">
                                  {question.views}
                                </span>
                                <span className="sr-only">views</span>
                              </button>
                            </span>
                          </div>
                          <div className="flex text-sm">
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
                              >
                                <ShareIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span className="font-medium text-gray-200">
                                  Share
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

// RecentPosts.getInitialProps = async () => {
//   // 초기 데이터 비동기 호출
// }

export default React.memo(SavedPosts);
