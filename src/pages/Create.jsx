import { useState, useRef } from "react";
import PostService from "../services/post.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Editor from "../components/Editor.jsx";

const Create = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
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
    setPost({ ...post, content: value });
  };

  const resetForm = () => {
    setPost({
      title: "",
      summary: "",
      content: "",
      file: null,
    });
    setContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append("title", post.title);
      data.append("summary", post.summary);
      data.append("content", post.content);
      data.append("file", post.file);

      const response = await PostService.createPost(data);

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Post created successfully",
          icon: "success",
        }).then(() => {
          resetForm();
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error?.response?.data?.message || error.message || "Request failed",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Create New Post</h1>
          <p className="text-base-content/60 mt-2">Share your thoughts with the community</p>
        </div>

        {/* Form */}
        <div className="card bg-base-200/80 backdrop-blur-lg shadow-2xl border border-base-300 animate-fadeIn">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Cover Image</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      accept="image/*"
                      className="file-input file-input-bordered w-full"
                    />
                  </div>
                </div>
                {/* Preview */}
                <div className="mt-4 aspect-video rounded-xl overflow-hidden bg-base-300 flex items-center justify-center">
                  {post.file ? (
                    <img
                      src={URL.createObjectURL(post.file)}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-base-content/40">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>Upload a cover image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  placeholder="Enter post title"
                  className="input input-bordered w-full text-lg input-glow"
                  required
                />
              </div>

              {/* Summary */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Summary</span>
                </label>
                <textarea
                  name="summary"
                  value={post.summary}
                  onChange={handleChange}
                  placeholder="Brief summary of your post..."
                  className="textarea textarea-bordered w-full input-glow"
                  rows={3}
                />
              </div>

              {/* Content */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Content</span>
                </label>
                <Editor
                  value={content}
                  onChange={handleContentChange}
                  ref={editorRef}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  className="btn btn-ghost flex-1"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className={`btn btn-gradient flex-1 ${saving ? "loading" : ""}`}
                  disabled={saving}
                >
                  {saving ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Publish Post
                    </>
                  )}
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
