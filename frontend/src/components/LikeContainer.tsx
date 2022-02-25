import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getLikeIds } from "@selectors";
import { userLikes } from "@atoms";
import { postProps, Like } from "@interface";
import useAuth from "@auth";
import { postQuery } from "@api";
import { HeartIcon } from "@heroicons/react/solid";

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
  const targetLike: Like[] = useRecoilValue(getLikeIds(target_name));
  console.log(targetLike);
  const { currentUser } = useAuth();

  const onClickLike = () => {
    console.log("like");
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
