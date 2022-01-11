import Header from "@components/Header";
import dynamic from "next/dynamic";
import * as React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor as EditorType, EditorProps } from "@toast-ui/react-editor";
import { TuiEditorWithForwardedProps } from "./TuiEditorWrapper";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import("./TuiEditorWrapper"),
  { ssr: false }
);
const EditorWithForwardedRef = React.forwardRef<
  EditorType | undefined,
  EditorPropsWithHandlers
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

export default function PostNew() {
  return (
    <div className="w-full">
      <Header />
      <div className="lg:max-w-6xl mx-auto flex flex-col md:px-8 sm:px-2 xl:px-0 py-16">
        <form className="space-y-8 divide-y">
          <div className="space-y-8 divide-y">
            <div>
              <div>
                <h3 className="text-xl leading-6 font-semibold text-gray-900">
                  플래시카드 작성
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  문제와 답변을 작성해주세요.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 pt-4 border-t">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="username"
                    className="block text-base font-medium text-gray-700"
                  >
                    문제
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-base font-medium text-gray-700"
                  >
                    답변
                  </label>
                  <div className="mt-1">
                    <Editor
                      initialValue="플래시 카드를 작성해주세요 :)"
                      previewStyle="vertical"
                      height="1000px"
                      initialEditType="markdown"
                      useCommandShortcut={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-base font-medium text-gray-700"
                  >
                    카테고리
                  </label>
                  <div className="mt-1">
                    <Select options={options} isMulti={true} />
                  </div>
                </div>

                {/* <div className="sm:col-span-6">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-700"
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
                      <p className="text-xs text-gray-500">
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
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md border text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                취소
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
