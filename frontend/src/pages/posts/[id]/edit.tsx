import Header from "@components/Header";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor as EditorType, EditorProps } from "@toast-ui/react-editor";
import { TuiEditorWithForwardedProps } from "../TuiEditorWrapper";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { UpdatePostQuery, getCategoriesQuery, getPostQuery } from "@postsQuery";
import { postQuery } from "@api";
import { postProps } from "@interface";
import toast from "react-simple-toasts";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

interface dictionaryProps {
  value?: number | null;
  label: string;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import("../TuiEditorWrapper"),
  { ssr: false }
);
const EditorWithForwardedRef = React.forwardRef<
  EditorType | undefined,
  EditorPropsWithHandlers
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

export default function PostEdit() {
  const [categories, setCategories] = useState<dictionaryProps[]>([
    {
      value: null,
      label: "",
    },
  ]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [postCategories, setPostCategories] = useState<any>([]);

  const router = useRouter();
  const [post, setPost] = useState<any>();

  const { id } = router.query;

  const getPost = async () => {
    const { data } = await postQuery(getPostQuery(id));
    setPost(data && data["data"] && data["data"]["posts"][0]);
  };

  const getCategories = async () => {
    const { data: categoryData } = await postQuery(getCategoriesQuery(null));
    await setCategories(
      categoryData &&
        categoryData?.data &&
        categoryData?.data?.categories.map((category: any) => {
          const container: dictionaryProps = {};
          container.value = parseInt(category.id);
          container.label = category.title;

          return container;
        })
    );
  };

  const handleSelect = (values: number[]) => {
    setValue("category", values);
  };

  const editorRef: any = useRef(null);

  const [selected, setSelected] = useState<object[]>([]);

  // usestate로 담아서 사용하기

  useEffect(() => {
    getPost();
  }, [id]);

  useEffect(() => {
    if (post) {
      setValue("content", post?.content);
      setValue("title", post?.title);
      getCategories();
    }
  }, [post]);

  // console.log(postCategories);

  useEffect(() => {
    setPostCategories(
      categories.filter((category) =>
        post?.categoryIds.includes(category?.value)
      )
    );
  }, [categories]);

  return (
    <div className="w-full min-h-full bg-gray-900">
      <Header />
      <div className="lg:max-w-6xl mx-auto flex flex-col md:px-8 sm:px-2 xl:px-0 py-16">
        <form
          className="space-y-8 divide-y"
          onSubmit={handleSubmit(async (data) => {
            if (!editorRef.current) {
              return;
            }
            const editorInstance = editorRef.current.getInstance();
            // const editorHtml = editorInstance?.getHtml();
            const editorMarkdown = editorInstance?.getMarkdown();
            try {
              const query = UpdatePostQuery(
                post.id,
                data.title,
                editorMarkdown,
                data.category.map((cat) => cat.value)
              );
              const response = await postQuery(query);

              if (
                response?.data?.data?.updatePost &&
                response?.data?.data?.updatePost?.message
              ) {
                await toast(response?.data?.data?.updatePost?.message);
                await router.back();
              } else {
                await toast(
                  response?.data?.data?.updatePost?.error ||
                    "문제가 발생했습니다. 다시 시도해주세요."
                );
                // await router.back();
              }
            } catch (e) {
              console.log(e);
            }
          })}
        >
          <div className="space-y-8 divide-y">
            <div>
              <div>
                <h3 className="text-xl leading-6 font-semibold text-gray-200">
                  플래시카드 작성
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  문제와 답변을 작성해주세요.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 pt-4 border-t">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="title"
                    className="block text-base font-medium text-gray-200"
                  >
                    문제
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <input
                      type="text"
                      id="title"
                      autoComplete="title"
                      {...register("title", {
                        required: "필수 입력 사항입니다",
                      })}
                      className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="content"
                    className="block text-base font-medium text-gray-200"
                  >
                    답변
                  </label>
                  {post && post?.content && (
                    <div className="mt-1 bg-white">
                      <EditorWithForwardedRef
                        placeholder="플래시 카드를 작성해주세요 :)"
                        previewStyle="vertical"
                        ref={editorRef}
                        height="1000px"
                        onChange={(e) => {
                          setValue("content", e);
                        }}
                        initialValue={post?.content}
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        usageStatistics={false}
                      />
                    </div>
                  )}
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-base font-medium text-gray-200"
                  >
                    카테고리
                  </label>
                  {postCategories && postCategories?.length > 0 && (
                    <div className="mt-1">
                      <Select
                        options={categories}
                        defaultValue={postCategories}
                        isMulti
                        onChange={(e) => setValue("category", e)}
                      />
                    </div>
                  )}
                </div>

                {/* <div className="sm:col-span-6">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-200"
                  >
                    이미지 첨부
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className=" text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <div className="text-center">이미지 등록</div>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-300">
                        PNG, JPG, GIF (최대 10MB)
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  router.back();
                }}
                type="button"
                className="bg-white py-2 px-4 border-gray-300 rounded-md border text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                취소
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border-transparent border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                작성하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
