import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import PostService from "../services/post.service";
import Swal from "sweetalert2";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await PostService.getAllPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Home",
          text: error?.response?.data?.message || error?.message,
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAllPost();
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <section className="hero py-16 sm:py-24">
        <div className="hero-content text-center">
          <div className="max-w-2xl animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to{" "}
              <span className="gradient-text">SE NPRU Blog</span>
            </h1>
            <p className="text-lg sm:text-xl text-base-content/70 mb-8">
              Discover stories, insights, and knowledge shared by our community.
              Explore the latest posts and join the conversation.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#posts" className="btn btn-gradient btn-lg gap-2">
                Explore Posts
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="/create" className="btn btn-outline btn-lg">
                Write a Post
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="stats stats-vertical lg:stats-horizontal glass-effect w-full">
            <div className="stat text-center">
              <div className="stat-title">Total Posts</div>
              <div className="stat-value text-primary">{posts.length}</div>
              <div className="stat-desc">Published articles</div>
            </div>
            <div className="stat text-center">
              <div className="stat-title">Authors</div>
              <div className="stat-value text-secondary">
                {[...new Set(posts.map(p => p.author?.username))].length}
              </div>
              <div className="stat-desc">Active contributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Latest Posts
          </h2>

          {/* Loading State */}
          {loading && (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card card-side bg-base-200/50 shadow-xl animate-pulse">
                  <figure className="w-1/3 min-h-[200px] bg-base-300"></figure>
                  <div className="card-body w-2/3 gap-4">
                    <div className="h-6 bg-base-300 rounded w-3/4"></div>
                    <div className="h-4 bg-base-300 rounded w-1/2"></div>
                    <div className="h-4 bg-base-300 rounded w-full"></div>
                    <div className="h-4 bg-base-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Posts List */}
          {!loading && posts.length > 0 && (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Post key={post._id || index} index={index} {...post} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold mb-2">No Posts Yet</h3>
              <p className="text-base-content/60 mb-6">
                Be the first to share your thoughts with the community!
              </p>
              <a href="/create" className="btn btn-gradient btn-lg">
                Create First Post
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
