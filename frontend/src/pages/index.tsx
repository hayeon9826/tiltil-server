import React, { useState, useEffect } from "react";
import { postQuery } from "@api";
import Header from "@components/Header";
import { User } from "@interface";
import Link from "next/link";
import useAuth from "@auth";
import { ChatAltIcon, HeartIcon, PlusSmIcon } from "@heroicons/react/solid";
import { getCategoriesQuery, getPostsQuery } from "@postsQuery";
import { getUsersQuery } from "@usersQuery";
import { getLikesQuery } from "@likesQuery";
import { API_URL } from "@config";
import { userLikes } from "@atoms";
import { useSetRecoilState } from "recoil";
import { categoryProps, postProps } from "@interface";
import moment from "moment";
import LikeContainer from "@components/LikeContainer";
import { groupBy } from "lodash";

const tabs = [
  { name: "인기글", href: "#", current: true },
  { name: "최신글", href: "/posts/recent", current: false },
  { name: "저장됨", href: "/posts/saved", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Home = ({ isAuth }: any) => {
  const setUserLike = useSetRecoilState(userLikes);
  const { currentUser, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [posts, setPosts] = useState<postProps[]>([]);

  const getData = async () => {
    const { data: categoryData } = await postQuery(getCategoriesQuery(null));
    const { data: postsData } = await postQuery(getPostsQuery(true, null));
    const { data: usersData } = await postQuery(getUsersQuery(true));
    const { data: likesData } = await postQuery(getLikesQuery());

    await setCategories(
      categoryData && categoryData?.data && categoryData?.data?.categories
    );
    await setPosts(postsData && postsData?.data && postsData?.data?.posts);

    await setUsers(usersData && usersData?.data && usersData?.data?.users);
    await setUserLike(groupBy(likesData?.data?.likes, "targetableType"));
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
                    {categories &&
                      categories?.map((category) => (
                        <a
                          key={category?.title}
                          href={`/posts?category=${category?.title}&categoryId=${category?.id}`}
                          className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        >
                          <span className="truncate">{category?.title}</span>
                        </a>
                      ))}
                  </div>
                </div>
              </nav>
            </div>
            <main className="lg:col-span-9 xl:col-span-6">
              <div className="px-4 sm:px-0">
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
                  <div className="px-2  flex flex-row-reverse">
                    {/* <div className="text-lg font-bold button mb-4">
                      유저 목록
                    </div> */}
                    <button
                      className="inline-flex items-center px-2.5 py-1.5 m-2 text-xs font-medium rounded text-gray-100 bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => getData()}
                    >
                      랜덤 목록
                    </button>
                  </div>
                  {posts &&
                    posts.length > 0 &&
                    posts.map((post) => (
                      <li
                        key={post.id}
                        className="bg-gray-900 border border-gray-500  px-4 py-6 sm:p-6 sm:rounded-lg mt-4"
                      >
                        <article aria-labelledby={"question-title-" + post.id}>
                          <Link href={`/posts/${post.id}`}>
                            <>
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
                                    {post?.userName || "익명"}
                                  </p>
                                </div>
                              </div>
                              <div
                                id={"question-content-" + post.id}
                                className="mt-4 text-xs text-gray-400"
                              >
                                {moment(post?.createdAt).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
                              </div>
                              <div
                                className="mt-2 text-sm text-gray-300 space-y-4"
                                dangerouslySetInnerHTML={{
                                  __html: post?.title,
                                }}
                              />
                              {/* mapping 해야함. */}
                              <div className="mt-4">
                                {post?.categoryTitles?.map(
                                  (category, index) => (
                                    <span
                                      key={index}
                                      className="flex-shrink-0 inline-block px-2 py-0.5 text-purple-800 text-xs font-medium bg-purple-100 rounded-full mr-2"
                                    >
                                      {category}
                                    </span>
                                  )
                                )}
                              </div>
                            </>
                          </Link>
                          <LikeContainer target={post} />
                        </article>
                      </li>
                    ))}

                  {/* {questions.map((question) => (
                    <li
                      key={question.id}
                      className="bg-white px-4 py-6 border sm:p-6 sm:rounded-lg"
                    >
                      <article
                        aria-labelledby={"question-title-" + question.id}
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
                              <p className="text-sm font-medium text-gray-900">
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
                          </div>
                          <h2
                            id={"question-title-" + question.id}
                            className="mt-4 text-base font-medium text-gray-900"
                          >
                            {question.title}
                          </h2>
                        </div>
                        <div
                          className="mt-2 text-sm text-gray-700 space-y-4"
                          dangerouslySetInnerHTML={{ __html: question.body }}
                        />
                      </article>
                    </li>
                  ))} */}
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
                {/* <section aria-labelledby="trending-heading">
                  <div className=" rounded-sm bg-gray-900 border border-gray-500">
                    <div className="p-6">
                      <h2
                        id="trending-heading"
                        className="text-base font-medium text-gray-200"
                      >
                        게시글 추천
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-4 divide-y divide-gray-200"
                        >
                          {trendingPosts.map((post) => (
                            <li key={post.id} className="flex py-4 space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={post.user.imageUrl}
                                  alt={post.user.name}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-200">
                                  {post.body}
                                </p>
                                <div className="mt-2 flex">
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
                                        {post.comments}
                                      </span>
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="w-full block text-center px-4 py-2 border border-gray-300  text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section> */}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

// Home.getInitialProps = async () => {
//   // 초기 데이터 비동기 호출
// }

export default React.memo(Home);
