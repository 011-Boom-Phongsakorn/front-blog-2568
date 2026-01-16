import { useState, useRef } from "react";
import PostService from "../services/post.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Editor from "../components/Editor.jsx";

const Create = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPost({ ...post, [name]: e.target.files[0] });
    } else {
      setPost((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPost({ ...post, content: content });
  };

  const resetForm = () => {
    setPost({
      title: "",
      summary: "",
      content: "",
      file: "null",
    });
  };

  // const handleSubmit = async () => {
  //   e.preventDefault();

  //   try {
  //     const res = await PostService.createPost(post);

  //     if (res.status === 201 || res.status === 200) {
  //       await Swal.fire({
  //         title: "Add new post",
  //         text: "Post created successfully!",
  //         icon: "success",
  //       });
  //       resetForm();
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     await Swal.fire({
  //       title: "Add new post",
  //       text: error.response?.data?.message || "Request failed",
  //       icon: "error",
  //     });
  //     console.error("Create post error:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", post.title);
      data.append("summary", post.summary);
      data.append("content", post.content);
      data.append("file", post.file);

      const response = await PostService.createPost(data);

      if (response.status === 200) {
        Swal.fire({
          title: "Create Post",
          text: "Create post Successfully",
          icon: "success",
        }).then(() => {
          setPost({
            title: "",
            sammary: "",
            content: "",
            file: null,
          });
          navigate("/");
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Update Post",
        icon: "error",
        text: error.message || "Request failed",
      });
      console.error("Update post error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="w-full max-w-6xl">
        <div className="card bg-base-100 shadow-xl rounded-lg">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-8">Create Post</h1>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* LEFT: COVER */}
              <div className="md:col-span-1">
                <label className="label">
                  <span className="label-text font-semibold">Cover Image</span>
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />

                <div className="mt-4">
                  <img
                    src={
                      post.file
                        ? URL.createObjectURL(post.file)
                        : "https://vaultproducts.ca/cdn/shop/products/4454FC90-DAF5-43EF-8ACA-A1FF04CE802D.jpg?v=1656626547"
                    }
                    alt="cover preview"
                    className="object-contain h-56 w-full rounded-lg border"
                  />
                </div>
              </div>

              {/* RIGHT: FORM FIELDS */}
              <div className="md:col-span-2 grid grid-cols-1 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Summary</span>
                  </label>
                  <textarea
                    name="summary"
                    value={post.summary}
                    onChange={handleChange}
                    placeholder="Short summary..."
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Content</span>
                  </label>
                  <Editor
                    value={content}
                    onChange={handleContentChange}
                    ref={editorRef}
                  />
                  {/* <textarea
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    placeholder="Write your post content here..."
                    className="textarea textarea-bordered w-full"
                    rows={6}
                    required
                  /> */}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="md:col-span-3 flex justify-center gap-4 mt-6">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
