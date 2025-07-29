"use client";
import CategoryItem from "@/components/ui/CategoryItem";
import { apiService } from "@/lib/service";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

async function getPostCategories({ pageParam }) {
  const response = await apiService(`/categories?page=${pageParam}`);
  return response;
}

export default function PostCategories() {
  const { ref, inView } = useInView();
  const [pageCount, setPageCount] = useState(0);
  const { data, error, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["post-categories"],
      queryFn: getPostCategories,
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
    if (inView && pageCount < totalRecords) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <p>Error: {error.message}</p>;

  const content = data.pages.map((data) =>
    data.data.data.map((category, index) => {
      return (
        <Link key={index} href={`/?category=${category.slug}`}>
          <CategoryItem name={category.name} image={category.image_url} />
        </Link>
      );
    })
  );

  return (
    <div className="max-w-dvw md:max-w-[1200px] mx-4 md:mx-10 xl:mx-auto my-8 flex flex-col">
      <h3 className="text-2xl font-bold border-b border-border/70 pb-3">
        Our Post Categories
      </h3>
      <div className="mt-8 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
  );
}
