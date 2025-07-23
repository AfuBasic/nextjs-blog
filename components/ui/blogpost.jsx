import Image from "next/image";
import { FaClock, FaUser } from "react-icons/fa";
import sanitizeHtml from "sanitize-html";

const BlogPost = function ({
  previewImage,
  postCategory,
  title,
  excerpt,
  author,
  dated,
}) {
  const cleanHtml = sanitizeHtml(excerpt, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter(
      (tag) => tag !== "img"
    ), // remove <img> tags
    allowedAttributes: {
      // Optionally allow attributes for tags like <a>
      a: ["href", "target"],
    },
  });
  return (
    <div className="dark:bg-stone-900 bg-stone-100 border rounded-sm group overflow-hidden transition-all">
      <div className="flex flex-col">
        <div className="h-[180px] overflow-hidden">
          <Image
            src={previewImage}
            alt="Placeholder Image"
            width={600}
            height={400}
            className="w-full h-auto rounded-t-sm group-hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="p-4 ">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-green-300 px-2 py-1 rounded opacity-90 text-stone-700 text-xs">
              {postCategory}
            </span>
            <span className="flex gap-2 items-center text-xs text-gray-500 dark:text-gray-400">
              <FaClock className="text-gray-500 dark:text-gray-400" /> 5 mins
              read
            </span>
          </div>
          <div className="border-b border-border/50 ">
            <h2
              title={title}
              className="text-xl font-semibold leading-tight text-foreground transition-colors duration-200 line-clamp-2 group-hover:text-gray-400"
            >
              {title}
            </h2>

            <p
              className="my-5 text-muted-foreground leading-relaxed line-clamp-3"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            ></p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="flex items-center  gap-2 px-2 py-1 rounded opacity-90 text-black dark:text-stone-300 text-xs">
              <FaUser /> {author}
            </span>
            <span className="flex gap-2 items-center text-xs text-gray-500 dark:text-gray-400">
              {dated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BlogPost };
