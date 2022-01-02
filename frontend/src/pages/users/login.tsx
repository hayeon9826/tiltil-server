import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import Header from "@components/Header";
import { useForm } from "react-hook-form";
import { postQuery } from "@api";
import { setUserToken } from "@auth";
import { useSetRecoilState } from "recoil";
import { authenticatedUser } from "@atoms";
import { SignInUserQuery } from "src/core/query/user";
import Link from "next/link";

const LoginPage = ({
  changeInput,
  inputData,
  onSaveButtonClick,
  resetForm,
  isAuth,
}: any) => {
  const setAuthorizedUser = useSetRecoilState(authenticatedUser);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (inputValues: any) => {
    const query = SignInUserQuery(inputValues.email, inputValues.password);
    const { data } = await postQuery(query);
    await setUserToken(data?.token);
    await setAuthorizedUser({ email: data?.email, id: data?.id });

    console.log(data);
    console.log(data?.data?.signInUser?.errors);

    if (data?.data?.signInUser?.token) {
      await window.location.replace("/");
    } else {
      window.alert(data?.data?.signInUser?.errors);
    }
  };

  return (
    <>
      <Header isAuth={isAuth} />
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
