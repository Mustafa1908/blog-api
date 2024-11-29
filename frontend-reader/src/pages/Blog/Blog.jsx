import { useEffect, useState } from "react";
import blog from "./Blog.module.css";

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
    document.title = "Blog Api";
    getAllPosts();
  }, []);

  return (
    <main className={blog.main}>
      {posts.map((post) =>
        post.published === true ? (
          <article className={blog.articleContainer} key={post.id}>
            <a href={`/blog/post/${post.id}`}>
              <span className={blog.postTime}>{post.createdAt}</span>
              <h2 className={blog.postHeader}>{post.postTitle}</h2>
              <p className={blog.postText}>{post.postText}</p>
            </a>
          </article>
        ) : null
      )}
    </main>
  );
};

export default Blog;
