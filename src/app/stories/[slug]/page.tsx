import Image from "next/image";

type WPPost = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
};

async function getPost(slug: string): Promise<WPPost> {
  const res = await fetch(
    `https://jibuco.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch post");

  const data = await res.json();
  return data[0];
}

export default async function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1
        className="text-3xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <time className="block text-gray-500 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </time>

      {image && (
        <Image
          src={image}
          alt={post.title.rendered}
          width={800}
          height={500}
          className="mb-6 w-full h-auto object-cover"
        />
      )}

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </main>
  );
}
