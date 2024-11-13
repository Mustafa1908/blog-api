import { useEffect, useState } from "react";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const allPosts = await fetch("http://localhost:8000/post");
      if (!allPosts.ok) {
        throw new Error("Network response was not ok");
      }
      const posts = await allPosts.json();
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <h1>Blog Component</h1>
      <h1>Blog Posts</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            {post.published === true && (
              <a href={`/blog/post/${post.id}`}>
                <span>{post.postTitle}</span>
                <p>{post.postText}</p>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
