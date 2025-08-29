import PageButton from "@/components/stories/pagination";
import Image from "next/image";
import Link from "next/link";

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  date: string;
  _embedded?: { "wp:featuredmedia"?: { source_url: string }[] };
};

type StoriesPageProps = {
  searchParams: { page?: string };
};

async function getPosts(
  page: number = 1,
  perPage: number = 6
): Promise<{ posts: WPPost[]; totalPosts: number; totalPages: number }> {
  const res = await fetch(
    `https://jibuco.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`,
    { next: { revalidate: 60 } } // ISR, optional
  );
  if (!res.ok) throw new Error("Failed to fetch posts");

  const totalPosts = parseInt(res.headers.get("X-WP-Total") || "0", 10);
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "0", 10);
  const posts: WPPost[] = await res.json();

  return { posts, totalPosts, totalPages };
}

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  // Safely parse ?page, fallback to 1
  const currentPageRaw = parseInt(searchParams?.page ?? "1", 10);
  const currentPage = Number.isNaN(currentPageRaw) || currentPageRaw < 1 ? 1 : currentPageRaw;

  const { posts, totalPosts, totalPages } = await getPosts(currentPage, 6);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Latest Stories</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
          return (
            <article
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              {image && (
                <Image
                  src={image}
                  alt={post.title.rendered}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              )}
              <div className="p-4">
                <h2
                  className="text-lg font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <time className="block text-gray-500 text-sm mb-2" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <Link href={`/stories/${post.slug}`} className="text-blue-600 hover:underline">
                  Read more →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pass numbers, plus current page + total pages for your dynamic component */}
      <PageButton per_page={6} results={totalPosts} currentPage={currentPage} />
      {/* If your PageButton also accepts totalPages, add: totalPage={totalPages} */}
    </main>
  );
}
