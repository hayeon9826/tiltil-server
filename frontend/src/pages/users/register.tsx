import React from "react";
import Header from "@components/Header";
import { useForm } from "react-hook-form";
import { signUp } from "@api";
import { SignUpAttribute } from "@interface";

const RegisterPage = ({ changeInput, inputData, isAuth }: any) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (inputValues: SignUpAttribute) => {
    const { data } = await signUp(inputValues);
    // await setUserToken(data?.token);
    // await setAuthorizedUser({ email: data?.email, id: data?.id });
    // window.location.replace('/');
  };

  return (
    <>
      <Header isAuth={isAuth} />

      <header className="bg-white ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
        </div>
      </header>
      <div>
        <div className="min-h-full flex items-center justify-center py-12 px-12 sm:px-6 lg:px-12">
          <div className="max-w-md w-full space-y-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      이메일
                    </label>
                    <input
                      id="email-address"
                      type="email"
                      {...register("email", { required: true })}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="이메일 입력"
                      onChange={changeInput}
                      value={inputData?.email}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      비밀번호
                    </label>
                    <input
                      id="password"
                      type="password"
                      {...register("password", { required: true })}
                      autoComplete="current-password"
                      required
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    가입하기
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-gray-200"></div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
