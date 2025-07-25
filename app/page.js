import ClientBlogPage from "./ClientBlogPage";

export const runtime = "edge";

export const metadata = {
  title: "Welcome to AI Blog. Generating Blog content with AI",
};

export default function Blog() {
  return <ClientBlogPage />;
}
