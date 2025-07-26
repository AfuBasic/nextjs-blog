import Image from "next/image";

export default function CategoryItem({ name, image }) {
  return (
    <div className="rounded-md overflow-hidden group relative h-[250px] ">
      <div className="">
        <Image
          src={image}
          alt={name}
          fill
          objectFit="cover"
          className="group-hover:scale-110  transition-all duration-300 h-full"
        />
      </div>
      <div className="w-full h-full bg-black/50 absolute top-0 left-0"></div>
      <div className="absolute w-full h-full flex text-3xl text-center justify-center items-center font-semibold text-white">
        {name}
      </div>
    </div>
  );
}
