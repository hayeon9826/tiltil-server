import React from "react";
import Header from "@components/Header";
import { useForm } from "react-hook-form";
import { postQuery } from "@api";
import useAuth from "@auth";
import { SignInUserQuery } from "src/core/query/user";
import Link from "next/link";
import toast from "react-simple-toasts";
import { useRouter } from "next/router";

const LoginPage = ({
  changeInput,
  inputData,
  onSaveButtonClick,
  resetForm,
  isAuth,
}: any) => {
  const { handleSubmit, register } = useForm();
  const { authenticateUser } = useAuth();
  const router = useRouter();

  const onSubmit = async (inputValues: any) => {
    const query = SignInUserQuery(inputValues.email, inputValues.password);
    const response = await postQuery(query);
    if (
      response.data?.data?.signInUser &&
      response.data?.data?.signInUser?.token
    ) {
      await toast("로그인 되었습니다.");
      await authenticateUser(response?.data?.data?.signInUser);
      // await window.location.replace("/");
      await router.push("/");
    } else {
      if (response?.data?.data?.signInUser?.errors) {
        toast(response?.data?.data?.signInUser?.errors);
      } else {
        toast("사용자가 없습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-full flex items-center justify-center py-12 px-12 sm:px-6 lg:px-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              로그인
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  이메일
                </label>
                <input
                  id="email-address"
                  type="email"
                  {...register("email", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={changeInput}
                  value={inputData?.email}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <input
              type="submit"
              value="로그인 하기"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </form>
          <div className="text-sm text-center">
            <a
              href="/users/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              아직 계정이 없으신가요?
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
