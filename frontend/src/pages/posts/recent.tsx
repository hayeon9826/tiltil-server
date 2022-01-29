import React, { useState, useEffect } from "react";
import { postQuery } from "@api";
import Header from "@components/Header";
import { User } from "@interface";
import Link from "next/link";
import { getUsersQuery } from "@usersQuery";
import useAuth from "@auth";
import { ChatAltIcon, PlusSmIcon } from "@heroicons/react/solid";
import { getCategoriesQuery, getPostsQuery } from "@postsQuery";
import { categoryProps, postProps } from "@interface";
import { API_URL } from "@config";

const tabs = [
  { name: "인기글", href: "/", current: false },
  { name: "최신글", href: "#", current: true },
  { name: "저장됨", href: "/posts/saved", current: false },
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

const RecentPosts = ({ isAuth }: any) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [posts, setPosts] = useState<postProps[]>([]);

  const getData = async () => {
    const { data: categoryData } = await postQuery(getCategoriesQuery);
    const { data: postsData } = await postQuery(getPostsQuery(false, null));
    const { data: usersData } = await postQuery(getUsersQuery(true));
    await setCategories(
      categoryData && categoryData?.data && categoryData?.data?.categories
    );
    await setPosts(postsData && postsData?.data && postsData?.data?.posts);
    await setUsers(usersData && usersData?.data && usersData?.data?.users);
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuthenticated");
    }
    getData();
  }, []);

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
                        key={category.title}
                        href={`/posts?category=${category.title}`}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-gray-200 hover:bg-gray-50"
                      >
                        <span className="truncate">{category.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
            <main className="lg:col-span-9 xl:col-span-6">
              <div className="px-4 sm:px-0">
                {/* <div className="sm:hidden">
                  <label htmlFor="question-tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="question-tabs"
                    className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div> */}
                {/* <div className="sm:block">
                  <nav
                    className="relative z-0 rounded-sm border flex divide-x divide-gray-200"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? "page" : undefined}
                        className={classNames(
                          tab.current
                            ? "text-gray-200"
                            : "text-gray-300 hover:text-gray-700",
                          tabIdx === 0 ? "rounded-l-lg" : "",
                          tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                          "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                        )}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.current ? "bg-rose-500" : "bg-transparent",
                            "absolute inset-x-0 bottom-0 h-0.5"
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div> */}
                <div className=" lg:block">
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
                  {posts &&
                    posts.length > 0 &&
                    posts.map((post) => (
                      <>
                        <li
                          key={post.id}
                          className="bg-gray-900 px-4 py-6 border border-gray-500 sm:p-6 sm:rounded-lg mt-4"
                        >
                          <article
                            aria-labelledby={"question-title-" + post.id}
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
                                  <p className="text-sm font-medium text-gray-300 m-auto mt-2">
                                    {post?.userName}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 self-center flex"></div>
                              </div>
                              {/* <h2
                                id={"question-content-" + post.id}
                                className="mt-4 text-base font-medium text-gray-200"
                              >
                                {post?.content}
                              </h2> */}
                            </div>
                            <div
                              className="mt-2 text-sm text-gray-300 space-y-4"
                              dangerouslySetInnerHTML={{
                                __html: post?.title,
                              }}
                            />
                            {/* mapping 해야함. */}
                            <div className="mt-4">
                              {post?.categoryTitles?.map((category, index) => (
                                <span
                                  key={index}
                                  className="flex-shrink-0 inline-block px-2 py-0.5 text-purple-800 text-xs font-medium bg-purple-100 rounded-full mr-2"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          </article>
                        </li>
                      </>
                    ))}
                </ul>
              </div>
            </main>
            <aside className="hidden xl:block xl:col-span-4">
              <div className="sticky top-4 space-y-4">
                <section aria-labelledby="who-to-follow-heading">
                  <div className="rounded-sm  bg-gray-900 border border-gray-500">
                    <div className="p-6">
                      <h2
                        id="who-to-follow-heading"
                        className="text-base font-medium text-gray-200"
                      >
                        사용자 추천
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-4 divide-y divide-gray-200"
                        >
                          {users.map((user) => (
                            <li
                              key={user.id}
                              className="flex items-center py-4 space-x-3"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={`${API_URL}/image/profile.png`}
                                  alt=""
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-200">
                                  <a href={`/posts?userId=${user.id}`}>
                                    {user?.name || `사용자 #${user.id}`}
                                  </a>
                                </p>
                                <p className="text-sm text-gray-300">
                                  <a href={`/posts?userId=${user.id}`}>
                                    {"@" + user?.email}
                                  </a>
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-gray-400 hover:bg-rose-100"
                                >
                                  <PlusSmIcon
                                    className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                                    aria-hidden="true"
                                  />
                                  <span>팔로우</span>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="/users"
                          className="w-full block text-center px-4 py-2 border border-gray-300  text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          더보기
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

// RecentPosts.getInitialProps = async () => {
//   // 초기 데이터 비동기 호출
// }

export default React.memo(RecentPosts);
