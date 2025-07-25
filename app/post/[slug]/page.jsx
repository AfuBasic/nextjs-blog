import { apiBaseUrl } from "@/utils/constants";
import ClientBlogDetails from "./ClientBlogDetailsPage";

export const runtime = "edge";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const response = await fetch(`${apiBaseUrl}/post/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer 3|3RQwOo6YVLoJpdb5lu1H7B8bEH7JL4YirvtGrIUkf2fed752",
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
