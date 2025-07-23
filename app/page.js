import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { BlogPost } from "@/components/ui/blogpost";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-dvw md:max-w-[1200px] mx-4 md:mx-10 xl:mx-auto my-8 flex flex-col lg:grid md:grid-cols-3 gap-5">
      <div className="card self-start">
        <h3 className="text-black dark:text-white text-lg font-medium">
          About AI Blog
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This is a simple blog application built with Next.js and Tailwind CSS.
          It features a dark mode toggle, responsive design, and a clean layout
          for reading articles. The blog is designed to be user-friendly and
          visually appealing, making it easy to navigate and read content.
        </p>
      </div>
      <div className="md:col-span-2 flex flex-col gap-4">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
          {[...Array(2)].map((_, index) => {
            return (
              <Link key={index} href="/post/postslug">
                <BlogPost
                  postCategory="Lifestyle"
                  previewImage="/white.svg"
                  author="Tunde Idris"
                  dated={Date.now()}
                  title="The Title of the Card that might happen to get longer than
              expected in most cases"
                  excerpt="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              quod voluptatum dignissimos vitae repellat cum quo, libero debitis
              eaque accusamus nulla repellendus unde obcaecati voluptates
              quaerat! Asperiores accusamus veritatis deserunt."
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
