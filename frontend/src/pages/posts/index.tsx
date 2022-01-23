import Header from "@components/Header";
import useAuth from "@auth";
import { postQuery } from "@api";
import { useRouter } from "next/router";
import { categoryProps, postProps } from "@interface";
import { getCategoriesQuery, getPostsQuery } from "@postsQuery";
import moment from "moment";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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
  const [posts, setPosts] = useState<postProps[]>([]);

  const { currentUser, isAuthenticated, authenticateUser, unAuthenticateUser } =
    useAuth();
  const router = useRouter();
  const { category, categoryId } = router.query;
  console.log(category, categoryId);

  const getData = async () => {
    const { data: categoryData } = await postQuery(getCategoriesQuery);
    const { data: postsData } = await postQuery(
      getPostsQuery(false, categoryId)
    );
    await setCategories(
      categoryData && categoryData?.data && categoryData?.data?.categories
    );
    await setPosts(postsData && postsData?.data && postsData?.data?.posts);
  };
  console.log(posts);

  useEffect(() => {
    getData();
  }, [categoryId]);

  return (
    <>
      <div className="min-h-screen bg-gray-900">
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
                    className="px-3 text-xs font-semibold text-gray-200 uppercase tracking-wider"
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
                        href={`/posts?category=${category?.title}&categoryId=${category?.id}`}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-200 rounded-md hover:text-gray-300 hover:bg-gray-50"
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
                    <h1 className="text-3xl font-extrabold text-gray-300">
                      # {category ? category : "Ruby On Rails"}
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-4">
                      <ul
                        role="list"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
                      >
                        {posts &&
                          posts.length > 0 &&
                          posts.map((post) => (
                            <Link href={`/posts/${post.id}`}>
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
