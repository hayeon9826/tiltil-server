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

const tabs = [
  { name: "계정 설정", href: "/users/mypage", current: false },
  { name: "나의 TIL", href: "/users/posts", current: false },
  { name: "저장한 TIL", href: "#", current: true },
];

const posts = [
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "1",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "2",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "3",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "4",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "5",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function mypage() {
  const { currentUser, isAuthenticated, authenticateUser, unAuthenticateUser } =
    useAuth();
  const router = useRouter();

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
    <>
      <div>
        {/* Static sidebar for desktop */}

        {/* Content area */}
        <Header />
        <div className="w-full">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-extrabold text-gray-900">
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
                                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
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
                        {posts.map((post) => (
                          <li
                            key={post.id}
                            className="col-span-1 bg-white rounded-lg border divide-y divide-gray-200"
                          >
                            <div className="w-full flex items-center justify-between p-6 space-x-6">
                              <div className="flex-1">
                                <p className="mt-1 text-gray-500 text-sm truncate">
                                  {post.user}
                                </p>
                                <div className="flex items-center space-x-3 mt-2">
                                  <h3 className="text-gray-900 text-sm font-medium whitespace-normal">
                                    {post.question}
                                  </h3>
                                </div>

                                <div className="mt-4">
                                  <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full mr-2">
                                    {post.category}
                                  </span>
                                  <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full mr-2">
                                    {post.category}
                                  </span>
                                  <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full mr-2">
                                    {post.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
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