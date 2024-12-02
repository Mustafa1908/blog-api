import { useEffect, useState } from "react";
import allPosts from "./Posts.module.css";
import { getUserInfo } from "../../utils/getUserInfo";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Posts = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ postTitle: "", postText: "" });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const navigate = useNavigate();

  if (user !== null) {
    if (user.userRole !== "author") {
      navigate("/blog");
    }
  }

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
    document.title = "Edit Posts";
    getUserInfo(setUser);
    getAllPosts();
  }, []);

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

    getAllPosts();
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

    // Check if the post title is longer than 84 characters
    if (newPost.postTitle.length > 84) {
      setErrorMessage("Post title cannot exceed 84 characters.");
      return; // Prevent form submission
    } else {
      setErrorMessage(""); // Clear the error if title is valid
    }

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
    <main className={allPosts.main}>
      <aside className={allPosts.createPostContainer}>
        <Button
          buttonText="Create Post"
          buttonColor={"#008000"}
          onClickFunction={openModal}
        />
      </aside>
      <section className={allPosts.postsSection}>
        {posts.map((post) => (
          <article className={allPosts.articleContainer} key={post.id}>
            <a href={`/blog/post/${post.id}`}>
              <span className={allPosts.postTime}>{post.createdAt}</span>
              <h2 className={allPosts.postHeader}>{post.postTitle}</h2>
              <p className={allPosts.postText}>{post.postText}</p>
            </a>
            <section className={allPosts.postsButtonsSection}>
              {post.published ? (
                <>
                  <span className={allPosts.publishedStatusText}>
                    Published
                  </span>{" "}
                  <div className={allPosts.buttonsContainer}>
                    <Button
                      buttonText="Hide"
                      buttonColor={"#2b313a"}
                      onClickFunction={changePublicationStatus}
                      buttonWidth={"2rem"}
                      functionArgument={post.id}
                    />
                    <Button
                      buttonText="Delete"
                      buttonColor={"#c70000"}
                      onClickFunction={deletePost}
                      buttonWidth={"2rem"}
                      functionArgument={post.id}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className={allPosts.publishedStatusText}>
                    Unpublished
                  </span>
                  <div className={allPosts.buttonsContainer}>
                    <Button
                      buttonText="Publish"
                      buttonColor={"#3b82f6"}
                      onClickFunction={changePublicationStatus}
                      buttonWidth={"1rem"}
                      functionArgument={post.id}
                    ></Button>
                    <Button
                      buttonText="Delete"
                      buttonColor={"#c70000"}
                      onClickFunction={deletePost}
                      buttonWidth={"1rem"}
                      functionArgument={post.id}
                    />
                  </div>
                </>
              )}
            </section>
          </article>
        ))}
      </section>
      {showModal && (
        <section className={allPosts.formSection}>
          <article className={allPosts.modalContent}>
            <h2>Create New Post</h2>
            {errorMessage && (
              <p className={allPosts.errorText}>{errorMessage}</p>
            )}
            <form
              className={allPosts.createPostForm}
              onSubmit={handleSubmitPost}
            >
              <Input
                inputIdName="postTitle"
                inputType="text"
                placeholderText="Post Title..."
                inputValue={newPost.postTitle}
                onChangeFunction={handlePostInputChanges}
                labelText={"Post Title"}
              />
              <label htmlFor="postText" className={allPosts.textareaLabel}>
                Message:{" "}
              </label>
              <textarea
                name="postText"
                id="postText"
                className={allPosts.postTextArea}
                placeholder="Post Text..."
                value={newPost.postText}
                onChange={handlePostInputChanges}
                required
              ></textarea>
              <footer className={allPosts.modalActionsFooter}>
                <Button
                  buttonText="Cancel"
                  buttonColor={"#c70000"}
                  onClickFunction={closeModal}
                />
                <Button buttonText="Create Post" buttonColor={"#4bc970"} />
              </footer>
            </form>
          </article>
        </section>
      )}
    </main>
  );
};

export default Posts;
