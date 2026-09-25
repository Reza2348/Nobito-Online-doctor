"use client";

import { FaChevronDown } from "react-icons/fa";

import { useComments } from "@/hooks/useCommen";
import CommentItem from "@/components/Comments/CommentItem/CommentItem";

const Comments = () => {
  const { comments, loading, errorMessage } = useComments();

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-400">
        در حال بارگذاری نظرات...
      </div>
    );
  }

  if (errorMessage) {
    return <div className="py-10 text-center text-red-500">{errorMessage}</div>;
  }

  return (
    <section dir="rtl" className="mt-10 space-y-5">
      {comments.map((item) => (
        <CommentItem key={item.id} comment={item} />
      ))}

      <button
        className="
        group
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-teal-600
        py-3
        font-bold
        text-teal-700
        transition-all
        hover:bg-teal-600
        hover:text-white
        "
      >
        مشاهده بیشتر
        <FaChevronDown
          className="
          transition-transform
          group-hover:translate-y-1
          "
        />
      </button>
    </section>
  );
};

export default Comments;
