import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/post");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [posts]);

  const changePublicationStatus = async (post) => {
    try {
      const response = await fetch(`http://localhost:8000/blog/post/${post}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to change post status");
      }
    } catch (error) {
      setError("Failed to change post status" + error);
    }
  };

  const deletePost = async (post) => {
    try {
      const response = await fetch(`http://localhost:8000/blog/post/${post}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      setError("Failed to delete post" + error);
    }

    getAllPosts();
  };

  return (
    <div>
      <h1>All Blogs</h1>
      {error && <p>{error}</p>}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <span>{post.postTitle} </span>
            {post.published ? (
              <>
                <span>Published</span>
                <button onClick={() => changePublicationStatus(post.id)}>
                  Unpublish
                </button>
              </>
            ) : (
              <>
                <span>Unpublished</span>
                <button onClick={() => changePublicationStatus(post.id)}>
                  Publish
                </button>{" "}
              </>
            )}
            <button onClick={() => deletePost(post.id)}>Delete post</button>
            <p> {post.postText}</p>
          </div> // Adjust based on your post structure
        ))}
      </div>
    </div>
  );
};

export default Posts;
