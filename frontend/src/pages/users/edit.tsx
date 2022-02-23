import React, { useEffect } from "react";
import Header from "@components/Header";
import { useForm } from "react-hook-form";
import { postQuery } from "@api";
import { SignUpAttribute } from "@interface";
import useAuth from "@auth";
import { UpdateUserQuery } from "src/core/query/user";
import toast from "react-simple-toasts";
import { useRouter } from "next/router";

const UserEditPage = ({ changeInput, inputData, isAuth }: any) => {
  const { currentUser, authenticateUser } = useAuth();
  const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();

  const onSubmit = async (inputValues: SignUpAttribute) => {
    const query = UpdateUserQuery(inputValues.email, inputValues.name);
    const response = await postQuery(query);
    if (
      response.data?.data?.updateUser &&
      response.data?.data?.updateUser?.token
    ) {
      toast(response.data?.data?.updateUser?.errors);
      authenticateUser(response?.data?.data?.updateUser);
      router.push("/users/mypage");
    } else {
      if (response?.data?.data?.updateUser?.errors) {
        toast(response?.data?.data?.updateUser?.errors);
      } else {
        toast("다시 시도해주세요.");
      }
    }
  };

  useEffect(() => {
    setValue("name", currentUser?.name);
    setValue("email", currentUser?.email);
  }, [currentUser, setValue]);

  console.log(currentUser);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            회원 정보 수정
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 border sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <div className="mt-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    이메일
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    readOnly
                    {...register("email", { required: true })}
                    className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full border sm:text-sm border-gray-300 rounded-md"
                    placeholder="이메일 입력"
                    onChange={changeInput}
                    value={inputData?.email}
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-300"
                >
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                  onChange={changeInput}
                  value={inputData?.name}
                  className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full border sm:text-sm border-gray-300 rounded-md"
                  placeholder="이름 입력"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  수정하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditPage;
