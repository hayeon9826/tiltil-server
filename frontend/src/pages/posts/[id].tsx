import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import React, { useEffect } from "react";
import Link from "next/link";
import Header from "@components/Header";
import { useState } from "react";
import { postProps } from "@interface";
import { getPostQuery, DeletePostQuery } from "@postsQuery";
import { postQuery } from "@api";
import useAuth from "@auth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import styled from "@emotion/styled";
import moment from "moment";
import toast from "react-simple-toasts";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<postProps>();

  const getPost = async () => {
    const { data } = await postQuery(getPostQuery(id));
    setPost(data && data["data"] && data["data"]["posts"][0]);
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const { currentUser } = useAuth();

  const MarkDownStyle = styled.div`
    font-size: 1rem;
    line-height: 2.5rem;
    padding: 2rem;
  `;

  const Pre = styled.pre`
    background-color: #e5eaee;
    padding: 2rem;
    line-height: 1.5rem;
    margin: 2rem auto;
  `;

  const h1 = styled.pre`
    font-size: 24px !important;
    border-bottom: 1px solid gray !important;
  `;

  function CodeBlock(children: { value: React.ReactNode }) {
    return (
      <Pre>
        <code>{children.value}</code>
      </Pre>
    );
  }

  const InlineCode = styled.span`
    background: yellow;
  `;

  function InlineCodeBlock(children: { value: React.ReactNode }) {
    return <InlineCode>{children.value}</InlineCode>;
  }

  const BlockQuoteStyle = styled.blockquote`
    padding: 1rem;
    border: 1px dashed black;
  `;

  function BlockQuote(children: { value: React.ReactNode }) {
    return <BlockQuoteStyle>{children.value}</BlockQuoteStyle>;
  }

  return (
    <>
      <div className="h-screen bg-gray-900">
        <Header searchBar={false} />
        <div className="relative py-16 bg-gray-900 overflow-hidden">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto border-b pb-16">
              <h1>
                <span className="mt-8 block text-xl text-center leading-8 font-bold tracking-tight text-gray-200">
                  {post?.title}
                </span>
              </h1>
              <div className="flex justify-between mt-8 border-b pb-4 mb-4">
                <div>
                  {post?.categoryTitles?.map((category, index) => (
                    <span
                      key={index}
                      className="flex-shrink-0 inline-block px-2 py-0.5 text-purple-800 text-xs font-medium bg-purple-100 rounded-full mr-2"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm">
                  {moment(post?.createdAt).format("YYYY-MM-DD HH:mm")}
                </p>
              </div>
              {currentUser && post?.userId === currentUser?.id && (
                <>
                  <div
                    className={`text-white text-xs underline text-right p-2`}
                  >
                    <a
                      onClick={async () => {
                        try {
                          if (confirm("게시글을 삭제하시겠습니까?")) {
                            const result = await postQuery(DeletePostQuery(id));
                            toast(
                              result?.data?.data?.deletePost?.message ||
                                "다시 시도해주세요."
                            );
                            router.replace("/");
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      삭제
                    </a>
                  </div>
                </>
              )}

              <div className="markdown-body">
                <MarkDownStyle>
                  <ReactMarkdown
                    remarkPlugins={[[remarkGfm]]}
                    // renderers={{
                    //   inlineCode: InlineCodeBlock,
                    //   code: CodeBlock,
                    //   blockquote: BlockQuote,
                    // }}
                  >
                    {`${post?.content}`}
                  </ReactMarkdown>
                </MarkDownStyle>
              </div>
            </div>
            <div className="flex justify-end pt-8 max-w-prose mx-auto text-lg">
              {currentUser && post?.userId === currentUser?.id && (
                <>
                  <Link href={`/posts/${post?.id}/edit`}>
                    <button
                      className={`ml-3 inline-flex justify-center py-3 px-16 border border-transparent text-sm font-medium  text-white bg-purple-600 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                    >
                      수정
                    </button>
                  </Link>
                </>
              )}

              <button
                onClick={() => {
                  router.back();
                }}
                className={`ml-3 inline-flex justify-center py-3 px-16 border border-transparent text-sm font-medium  text-white bg-gray-600 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
              >
                목록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
