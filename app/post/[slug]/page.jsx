import ClientBlogDetails from "./ClientBlogDetailsPage";
import { apiService } from "@/lib/service";

async function getBlogPost(slug) {
  const response = await apiService(`/post/${slug}`);
  return response.data;
}

export async function generateMetadata({ params }) {
  console.log("asdsd", params);
  const { slug } = params;

  const post = await getBlogPost(slug);

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),

    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      url: `https://blog.afuwapetunde.com/post/${slug}`,
      siteName: "Afuwape Tunde",
      images: [
        {
          url: post.image_url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      images: [post.image_url],
    },
  };
}

export default async function BlogDetails({ params }) {
  const { slug } = params;

  const data = await getBlogPost(slug);

  return <ClientBlogDetails data={data} />;
}
