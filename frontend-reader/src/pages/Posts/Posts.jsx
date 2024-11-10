import { useEffect, useState } from "react";
import allPosts from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ postTitle: "", postText: "" });
  const [showModal, setShowModal] = useState(false);

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
      console.error("Error changing post status:", error);
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
      console.error("Error deleting post:", error);
    }

    getAllPosts();
  };

  const handlePostInputChanges = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/post/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      setShowModal(false);
      setNewPost({ postTitle: "", postText: "" });
      getAllPosts();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>All Blogs</h1>
      <button onClick={openModal}>Create Post</button>{" "}
      {/* Create Post button */}
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
            <p>{post.postText}</p>
          </div>
        ))}
      </div>
      {showModal && (
        <div className={allPosts.modal}>
          <div className={allPosts.modalContent}>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmitPost}>
              <div>
                <label htmlFor="postTitle">Title</label>
                <input
                  type="text"
                  id="postTitle"
                  name="postTitle"
                  value={newPost.title}
                  onChange={handlePostInputChanges}
                  required
                />
              </div>
              <div>
                <label htmlFor="postText">Text</label>
                <textarea
                  id="postText"
                  name="postText"
                  value={newPost.body}
                  onChange={handlePostInputChanges}
                  required
                />
              </div>
              <div className={allPosts.modalActions}>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit">Create Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
