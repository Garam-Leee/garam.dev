 
import PostsHeader from "@/components/posts/PostsHeader";
import LenisProvider from "@/components/providers/LenisProvider";
import { getAllPosts } from "@/lib/posts";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllPosts();

  return (
    <LenisProvider>
      <div className="min-h-screen bg-white text-[#191f28]">
        <PostsHeader postsCount={posts.length} />
        <main className="pt-14">{children}</main>
      </div>
    </LenisProvider>
  );
}