import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getLikeIds } from "@selectors";
import { userLikes } from "@atoms";
import { postProps, Like, UserLikes } from "@interface";
import useAuth from "@auth";
import { postQuery } from "@api";
import { CreateLikeQuery, DeleteLikeQuery } from "@likesQuery";
import { HeartIcon } from "@heroicons/react/solid";
import toast from "react-simple-toasts";

interface LikeContainerProps {
  target: postProps;
  target_name: string;
  className?: string;
  likeText?: string;
}

const LikeContainer: React.FC<LikeContainerProps> = ({
  target,
  target_name = "Post",
  className,
  likeText,
}) => {
  const setUserLikes = useSetRecoilState(userLikes);
  const targetLikes: Like[] = useRecoilValue(getLikeIds(target_name));
  const { currentUser, isAuthenticated } = useAuth();

  console.log(targetLikes, "@@@targetLikes");

  const deleteLike = async () => {
    const query = DeleteLikeQuery(target.id, target_name);
    const response = await postQuery(query);

    if (response?.data?.data?.deleteLike?.message) {
      await toast("좋아요를 생성했습니다.");
    } else {
      toast(response?.data?.data?.deleteLike?.error || "다시 시도해주세요.");
    }
  };

  const createLike = async () => {
    const query = CreateLikeQuery(target.id, target_name);
    const response = await postQuery(query);
    console.log(response);
    if (response?.data?.data?.createLike?.message) {
      await toast("좋아요를 생성했습니다.");
      setUserLikes((likes: UserLikes) => {
        const likeList = likes[target_name] || [];
        return {
          ...likes,
          [target_name]: [...likeList, response?.data?.data?.createLike?.like],
        };
      });
    } else {
      toast(response?.data?.data?.createLike?.error || "다시 시도해주세요.");
    }
  };

  const onClickLike = () => {
    if (isAuthenticated) {
      const targetLike = targetLikes.find(
        (like: Like) => like.targetable_id === target.id
      );
      console.log(targetLike, "@@targetLike");

      if (targetLike) {
        // 좋아요 눌렀으면 좋아요 삭제
        deleteLike();
      } else {
        // 아니라면 좋아요 생성
        createLike();
      }
    } else {
      toast("로그인 해주세요.");
    }
  };

  return (
    <div className="mt-6 flex flex-row-reverse space-x-8">
      <div className="flex space-x-6">
        <span className="inline-flex items-center text-sm">
          <button
            type="button"
            onClick={onClickLike}
            className="inline-flex space-x-2 text-gray-400 hover:text-gray-300"
          >
            <HeartIcon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">likes</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default React.memo(LikeContainer);
