import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import PostService from "../services/post.service";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState({
    _id: "",
    title: "",
    createdAt: "",
    author: {},
    content: "",
    cover: "",
    summary: "",
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      const response = await PostService.deletePost(post._id);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success"
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || error.message,
        icon: "error"
      });
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
    <div className="min-h-screen gradient-bg animate-fadeIn">
      {/* Hero Image Section */}
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <img
          src={post.cover || "https://via.placeholder.com/1200x600?text=No+Image"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/50 to-transparent"></div>

        {/* Breadcrumb */}
        <div className="absolute top-4 left-4">
          <div className="text-sm breadcrumbs glass-effect px-4 py-2 rounded-full">
            <ul>
              <li><a href="/" className="text-base-content/70 hover:text-primary">Home</a></li>
              <li className="text-primary">Post</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 max-w-4xl -mt-32 relative z-10">
        <article className="bg-base-200/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-base-300 p-6 sm:p-10">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12">
                  <span className="text-lg">{post.author?.username?.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <div>
                <a href={`/author/${post.author?._id}`} className="font-semibold text-primary hover:underline">
                  @{post.author?.username}
                </a>
                <p className="text-sm text-base-content/60">{formatDate(post.createdAt)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            {userInfo?.id === post.author?._id && (
              <div className="flex gap-2 ml-auto">
                <a href={`/edit/${post._id}`} className="btn btn-warning btn-sm gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </a>
                <button onClick={handleDelete} className="btn btn-error btn-sm gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          {post.summary && (
            <div className="bg-base-300/50 rounded-xl p-6 mb-8 border-l-4 border-primary">
              <p className="text-lg text-base-content/80 italic">{post.summary}</p>
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-invert prose-headings:text-base-content prose-p:text-base-content/80 prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back Button */}
          <div className="mt-10 pt-6 border-t border-base-300">
            <button onClick={() => navigate(-1)} className="btn btn-ghost gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Posts
            </button>
          </div>
        </article>
      </div>

      {/* Bottom Padding */}
      <div className="h-20"></div>
    </div>
  );
};

export default PostDetail;
