import { apiBaseUrl } from "@/lib/constants";
import ClientBlogDetails from "./ClientBlogDetailsPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const response = await fetch(`${apiBaseUrl}/post/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return;
  }

  const post = await response.json();

  return {
    title: post.data.title || "Blog Post",
    description: post.data.title || "",
    openGraph: {
      title: post.data.title,
      description: post.data.title || "",
    },
  };
}

export default function BlogDetails() {
  return <ClientBlogDetails />;
}
