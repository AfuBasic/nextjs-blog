import ClientBlogPage from "./ClientBlogPage";

export async function generateMetadata({ searchParams }) {
  const category = searchParams?.category;

  const baseTitle =
    "Afuwape Tunde’s Blog — Engineering, Backend, and Problem Solving";

  const title = category
    ? `${category} Articles | Afuwape Tunde’s Blog`
    : baseTitle;

  const description = category
    ? `Read articles about ${category}. Insights on software engineering, backend development, Node.js, Laravel, and real-world problem solving.`
    : "Documenting my journey to becoming a reliable, problem-solving engineer. Writing about Node.js, Laravel, system design, and backend engineering.";

  const url = category
    ? `https://blog.afuwapetunde.com/blog?category=${encodeURIComponent(
        category
      )}`
    : "https://blog.afuwapetunde.com/";

  return {
    title,
    description,

    keywords: [
      "Afuwape Tunde",
      "software engineering blog",
      "backend engineering",
      "Node.js",
      "ReactJs",
      "JavaScript",
      "system design",
      "APIs",
      category,
    ].filter(Boolean),

    authors: [{ name: "Afuwape Tunde" }],
    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Afuwape Tunde Blog",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "https://pbs.twimg.com/profile_banners/450616810/1762858256/600x200",
      ],
      creator: "@devtunde1",
    },
  };
}

export default function Blog({ searchParams }) {
  const category = searchParams?.category ?? "";
  return <ClientBlogPage category={category} />;
}
