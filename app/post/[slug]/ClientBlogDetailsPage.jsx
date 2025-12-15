import { BlogPost } from "@/components/ui/blogpost";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaUser } from "react-icons/fa";
import sanitizeHtml from "sanitize-html";

export default async function BlogDetailsPage({ data }) {
  const cleanHtml = sanitizeHtml(data.content);

  return (
    <div className="max-w-dvw md:max-w-[1200px] mx-4 md:mx-10 xl:mx-auto my-8 flex flex-col">
      {/* Cover Image */}
      <div className="mb-8">
        <Image
          src={data.image_url}
          width={1200}
          height={700}
          className="w-full h-auto rounded-lg"
          alt={data.title}
          priority
        />
      </div>

      {/* Meta */}
      <div className="border-b border-border/50 pb-4">
        <h1 className="text-3xl font-bold mb-3">{data.title}</h1>

        <p className="flex text-gray-400 text-sm gap-2 items-center">
          <FaUser />
          {data.author}
        </p>

        <p className="flex text-gray-400 text-sm gap-2 items-center mt-1">
          <FaCalendar />
          {data.post_date}
        </p>
      </div>

      {/* Content */}
      <article
        className="prose dark:prose-invert max-w-none pt-6"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />

      {/* Related Posts */}
      {data.related_posts?.length > 0 && (
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Read More Posts</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.related_posts.map((post) => (
              <Link key={post.slug} href={`/post/${post.slug}`}>
                <BlogPost
                  postCategory={post.category_name}
                  previewImage={post.preview_image_url}
                  author={post.author}
                  dated={post.post_date}
                  title={post.title}
                  excerpt={post.content}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
