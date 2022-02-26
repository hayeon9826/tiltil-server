import Header from "@components/Header";
import { API_URL } from "@config";
import useAuth from "@auth";
import moment from "moment";
import { LogOutUserQuery } from "src/core/query/user";
import { postQuery } from "@api";
import { useRouter } from "next/router";
import toast from "react-simple-toasts";
import { sleep } from "@utils";
import Link from "next/link";
import { getUserPostsQuery } from "@postsQuery";
import { postProps } from "@interface";
import { useState, useEffect } from "react";

const tabs = [
  { name: "계정 설정", href: "/users/mypage", current: false },
  { name: "나의 TIL", href: "#", current: true },
  { name: "저장한 TIL", href: "/users/likes", current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function myPosts() {
  const { currentUser, isAuthenticated, authenticateUser, unAuthenticateUser } =
    useAuth();

  const router = useRouter();
  const [posts, setPosts] = useState<postProps[]>([]);

  const getData = async () => {
    const { data: postsData } = await postQuery(
      getUserPostsQuery(currentUser?.user_id)
    );

    await setPosts(postsData && postsData?.data && postsData?.data?.posts);
  };

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

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuthenticated");
    }
    getData();
  }, [currentUser]);

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}

        {/* Content area */}
        <Header />
        <div className="w-full bg-gray-900">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-extrabold text-gray-200">
                      마이페이지
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      {/* Tabs */}
                      {/* <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                          defaultValue={tabs.find((tab) => tab.current).name}
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div> */}
                      <div className=" lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <Link href={tab.href} key={tab.name}>
                                <a
                                  key={tab.name}
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

                      <ul
                        role="list"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-8"
                      >
                        {posts &&
                          posts.length > 0 &&
                          posts.map((post) => (
                            <Link href={`/posts/${post.id}`} key={post.id}>
                              <li
                                key={post.id}
                                className="col-span-1 bg-gray-900 rounded-lg border border-gray-500 divide-y divide-gray-200"
                              >
                                <div className="w-full flex items-center justify-between p-6 space-x-6">
                                  <div className="flex-1">
                                    <div
                                      id={"question-content-" + post.id}
                                      className="mt-4 text-xs text-gray-400"
                                    >
                                      {moment(post?.createdAt).format(
                                        "YYYY-MM-DD HH:mm"
                                      )}
                                    </div>
                                    <p className="mt-1 text-gray-300 text-sm truncate">
                                      {post?.userName || "익명"}
                                    </p>
                                    <div className="flex items-center space-x-3 mt-2">
                                      <h3 className="text-gray-200 text-sm font-medium whitespace-normal">
                                        {post?.title}
                                      </h3>
                                    </div>

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
                                  </div>
                                </div>
                              </li>
                            </Link>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
