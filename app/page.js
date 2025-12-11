import ClientBlogPage from "./ClientBlogPage";

export const metadata = {
  title:
    "Welcome to Afuwape Tunde's Blog. Generating Tech Blog content with AI",
};

export default function Blog({ searchParams }) {
  const category = searchParams?.category ?? "";
  return <ClientBlogPage category={category} />;
}
