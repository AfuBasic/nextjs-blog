"use client";
import { BlogPost } from "@/components/ui/blogpost";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { InView, useInView } from "react-intersection-observer";
import { apiService } from "@/lib/service";

async function getBlogPosts({ pageParam, queryKey }) {
  const [, category] = queryKey;
  const url = category?.trim()
    ? `/posts/${category}?page=${pageParam}`
    : `/posts?page=${pageParam}`;
  const response = await apiService(url);
  return response;
}

export default function ClientBlogPage({ category }) {
  const { ref, inView } = useInView();
  const [pageCount, setPageCount] = useState(0);
  const { data, error, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", category],
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
          Welcome to my Blog. Here, I write about my journey, my challenges and
          how I solved them. Welcome to the front row seat of my growth. you can
          send feedbacks to afutunde@gmail.com
        </p>
      </div>
      <div className="md:col-span-2 flex flex-col gap-4">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content}
        </div>
        <p ref={ref}></p>
        {isFetchingNextPage && (
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="h-[200px] bg-gray- rounded animate-pulse"></div>
            <div className="h-[200px] bg-gray-300 rounded animate-pulse"></div>
            <div className="h-[200px] bg-gray-300 rounded animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
}
