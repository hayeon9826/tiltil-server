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
  { name: "계정 설정", href: "#", current: true },
  { name: "나의 TIL", href: "/users/posts", current: false },
  { name: "저장한 TIL", href: "/users/likes", current: false },
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
        <div className="min-h-screen w-full bg-gray-900 pb-32">
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

                      {/* Description list with inline editing */}
                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg leading-6 font-medium text-gray-200">
                            프로필
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-400">
                            프로필 정보를 설정해주세요.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-400">
                                이름
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">
                                  {currentUser?.name || "-"}
                                </span>
                                <span className="ml-4 flex-shrink-0">
                                  <Link href="/users/edit">
                                    <button
                                      type="button"
                                      className=" rounded-md font-medium text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    >
                                      수정
                                    </button>
                                  </Link>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-400">
                                사진
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src={`${API_URL}/image/profile.png`}
                                    alt=""
                                  />
                                </span>
                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      toast("서비스 준비중입니다.")
                                    }
                                    className=" rounded-md font-medium text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    수정
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-400">
                                이메일
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">
                                  {currentUser?.email || "-"}
                                </span>
                                {/* <span className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    className=" rounded-md font-medium text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    Update
                                  </button>
                                </span> */}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg leading-6 font-medium text-gray-200">
                            계정
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-400">
                            계정을 관리해주세요.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-400">
                                계정 생성일
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">
                                  {currentUser?.created_at
                                    ? moment(currentUser?.created_at).format(
                                        "YYYY-MM-DD HH:mm"
                                      )
                                    : "-"}
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-400">
                                로그아웃
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow"></span>
                                <span className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    onClick={handleLogout}
                                    className=" rounded-md font-medium text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    로그아웃
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-400">
                                계정 탈퇴
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow"></span>
                                <span className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      toast("서비스 준비중입니다.")
                                    }
                                    className=" rounded-md font-medium text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    탈퇴하기
                                  </button>
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
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
