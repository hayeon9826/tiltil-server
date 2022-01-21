import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import React, { useEffect } from "react";
import Link from "next/link";
import Header from "@components/Header";
import { useState } from "react";
import { postProps } from "@interface";
import { getPostQuery } from "@postsQuery";
import { postQuery } from "@api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import styled from "@emotion/styled";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [post, setPost] = useState<postProps>();

  const getPost = async () => {
    const { data } = await postQuery(getPostQuery(id));
    console.log(data, "@data");
    setPost(data && data["data"] && data["data"]["posts"][0]);
  };

  useEffect(() => {
    getPost();
  }, [id]);

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
      <div className="min-h-full ">
        <Header searchBar={false} />
        <div className="relative py-16 bg-white overflow-hidden">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto border-b pb-16">
              <h1>
                <span className="mt-8 block text-xl text-center leading-8 font-bold tracking-tight text-gray-900">
                  {post?.title}
                </span>
              </h1>
              <div className="flex justify-between mt-8 border-b pb-4 mb-4">
                <div>
                  {post?.categoryTitles?.map((category, index) => (
                    <span
                      key={index}
                      className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full mr-2"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{post?.createdAt}</p>
              </div>
              {/* <div
                className={`whitespace-pre-line text-xs pt-8  ${
                  post?.content ? "text-gray-900" : "text-gray-400"
                } md:text-sm mt-1 md:mt-2 `}
                dangerouslySetInnerHTML={{
                  __html: post?.content || "내용이 없습니다.",
                }}
              /> */}
              <div className="markdown-body">
                <MarkDownStyle>
                  <ReactMarkdown
                    remarkPlugins={[[remarkGfm]]}
                    renderers={{
                      inlineCode: InlineCodeBlock,
                      code: CodeBlock,
                      blockquote: BlockQuote,
                    }}
                  >
                    {`${post?.content}`}
                  </ReactMarkdown>
                </MarkDownStyle>
              </div>
            </div>
            <div className="flex justify-end pt-8 max-w-prose mx-auto text-lg">
              <Link href="/posts">
                <button
                  className={`ml-3 inline-flex justify-center py-3 px-16 border border-transparent text-sm font-medium  text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                >
                  목록
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
