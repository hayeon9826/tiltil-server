import Header from "@components/Header";
import useAuth from "@auth";
import { postQuery } from "@api";
import { useRouter } from "next/router";
import { categoryProps } from "@interface";
import { useState, useEffect } from "react";
import { getCategoriesQuery } from "@postsQuery";

const tabs = [
  { name: "계정 설정", href: "/users/mypage", current: false },
  { name: "나의 TIL", href: "#", current: true },
  { name: "저장한 TIL", href: "/users/likes", current: false },
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
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "11",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "12",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "13",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "14",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur odio eget neque cursus, et consequat purus interdum? ",
    user: "__khy",
    category: "React",
    id: "15",
  },
];

export default function PostIndex() {
  const [categories, setCategories] = useState<categoryProps[]>([]);

  const getCategories = async () => {
    const { data: categoryData } = await postQuery(getCategoriesQuery);
    await setCategories(
      categoryData && categoryData?.data && categoryData?.data?.categories
    );
  };
  const { currentUser, isAuthenticated, authenticateUser, unAuthenticateUser } =
    useAuth();
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="min-h-full">
        {/* Static sidebar for desktop */}

        {/* Content area */}
        <Header />
        <div className="w-full">
          <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-4 divide-y divide-gray-300"
              >
                <div className="mt-12">
                  <p
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
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
                        key={category?.title}
                        href={`/posts?category=${category?.title}`}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">{category?.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
            <main className="lg:col-span-10">
              <div className="px-4 sm:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                      # {category ? category : "Ruby On Rails"}
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-4">
                      <ul
                        role="list"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
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
