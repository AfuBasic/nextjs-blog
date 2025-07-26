"use client";
import { BlogPost } from "@/components/ui/blogpost";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiBaseUrl } from "@/utils/constants";
import { useEffect, useState } from "react";
import { InView, useInView } from "react-intersection-observer";

async function getBlogPosts({ pageParam }) {
  const response = await fetch(`${apiBaseUrl}/posts?page=${pageParam}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer 3|3RQwOo6YVLoJpdb5lu1H7B8bEH7JL4YirvtGrIUkf2fed752",
    },
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({})); // try to read error body
    throw new Error(
      errorBody.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
}

export default function ClientBlogPage() {
  const { ref, inView } = useInView();
  const [pageCount, setPageCount] = useState(0);
  const { data, error, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: getBlogPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => allPage.length + 1,
    });

  const totalRecords = data?.pages[0].data.total;

  useEffect(() => {
    const items_per_page = 6;
    const pc = data?.pages.length * items_per_page;
    setPageCount(pc);
  }, [data]);

  useEffect(() => {
    if (InView && pageCount < totalRecords) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <p>Error: {error.message}</p>;

  const content = data.pages.map((data) =>
    data.data.data.map((post, index) => {
      return (
        <Link key={index} href={`/post/${post.slug}`}>
          <BlogPost
            postCategory={post.category_name}
            previewImage={post.preview_image_url}
            author={post.author}
            dated={post.post_date}
            title={post.title}
            excerpt={post.content}
          />
        </Link>
      );
    })
  );

  return (
    <div className="max-w-dvw md:max-w-[1200px] mx-4 md:mx-10 xl:mx-auto my-8 flex flex-col  gap-5">
      <div className="card self-start">
        <h3 className="text-black dark:text-white text-lg font-medium">
          About AI Blog
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This is a simple blog application built with Next.js and Tailwind CSS.
          It features a dark mode toggle, responsive design, and a clean layout
          for reading articles. The blog is designed to be user-friendly and
          visually appealing, making it easy to navigate and read content.
        </p>
      </div>
      <div className="md:col-span-2 flex flex-col gap-4">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content}
        </div>
        {pageCount >= totalRecords && (
          <div className="text-center text-stone-900 dark:text-gray-200">
            No more content
          </div>
        )}
        <p ref={ref}></p>
        {isFetchingNextPage && <div>Loading...</div>}
      </div>
    </div>
  );
}
