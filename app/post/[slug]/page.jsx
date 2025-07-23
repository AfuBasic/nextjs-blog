export default async function Post({ params }) {
  const { slug } = await params;

  return <div className="text-black">{slug}</div>;
}
