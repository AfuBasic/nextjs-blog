"use client";
import { BlogPost } from "@/components/ui/blogpost";
import { apiBaseUrl } from "@/lib/constants";
import { apiService } from "@/lib/service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaCalendar, FaUser } from "react-icons/fa";
import sanitizeHtml from "sanitize-html";

async function getBlogPost(slug) {
  const response = await apiService(`/post/${slug}`);
  return response;
}

export default function ClientBlogDetails() {
  const { slug } = useParams();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getBlogPost"],
    queryFn: () => getBlogPost(slug),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;
  console.log(data.data);

  const cleanHtml = sanitizeHtml(data.data.content);

  return (
    <div className="max-w-dvw md:max-w-[1200px] mx-4 md:mx-10 xl:mx-auto my-8 flex flex-col">
      <div className="mb-8">
        <Image
          src={data.data.image_url}
          width={700}
          height={700}
          className="w-full"
          alt={data.data.title}
        />
      </div>
      <div className="border-b border-border/50">
        <h2 className="text-3xl font-bold mb-5">{data.data.title}</h2>
        <p className="flex dark:text-mute text-gray-400 text-sm gap-2 items-center">
          <FaUser />
          {data.data.author}
        </p>
        <p className="flex dark:text-mute text-gray-400 text-sm gap-2 items-center mb-5">
          <FaCalendar />
          {data.data.post_date}
        </p>
      </div>
      <div className="border-b">
        <p
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
          className="text-sm text-left md:text-justify pt-5 max-w-none prose dark:prose-invert"
        ></p>
      </div>
      {data.data.related_posts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold">Read More Posts</h3>

          <div className="flex flex-col gap-4 md:grid md:grid-cols-3 mt-5">
            {data.data.related_posts.map((post, key) => {
              return (
                <Link key={key} href={`/post/${post.slug}`}>
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
            })}
          </div>
        </div>
      )}
    </div>
  );
}
