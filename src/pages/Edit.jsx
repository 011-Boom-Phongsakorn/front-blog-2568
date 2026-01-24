import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import PostService from "../services/post.service";
import Editor from "../components/Editor";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState("");

  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    cover: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
          setContent(response.data.content || "");
          if (response.data.author._id !== userInfo?.id) {
            Swal.fire("Error", "You are not allowed to edit this post", "error");
            navigate("/");
            return;
          }
        }
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.message || error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, userInfo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPost((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.content) {
      Swal.fire("Error", "Title and content are required", "error");
      return;
    }

    setSaving(true);
    try {
      const response = await PostService.updatePost(id, post);
      if (response.status === 200) {
        Swal.fire("Success", "Post updated successfully", "success").then(() => {
          navigate(`/post/${id}`);
        });
      }
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

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
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Edit Post</h1>
          <p className="text-base-content/60 mt-2">Make changes to your post</p>
        </div>

        {/* Form */}
        <div className="card bg-base-200/80 backdrop-blur-lg shadow-2xl border border-base-300 animate-fadeIn">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Preview */}
              {post.cover && (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img src={post.cover} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Cover URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Cover Image URL</span>
                </label>
                <input
                  type="text"
                  name="cover"
                  value={post.cover}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="input input-bordered w-full input-glow"
                />
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
                  placeholder="Post title"
                  className="input input-bordered w-full text-lg input-glow"
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
                  rows="3"
                  className="textarea textarea-bordered w-full input-glow"
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
                  onClick={() => navigate(-1)}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
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

export default Edit;
