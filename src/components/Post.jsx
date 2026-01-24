import React from "react";

const Post = ({ title, author, summary, cover, createdAt, _id, index = 0 }) => {
  const isEven = index % 2 === 0;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      className={`card card-side bg-base-200/50 shadow-xl card-hover border border-base-300/50 overflow-hidden animate-fadeIn ${isEven ? "flex-row" : "flex-row-reverse"
        }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Cover Image */}
      <figure className="relative w-1/3 min-h-[200px] sm:min-h-[250px] overflow-hidden">
        <img
          src={cover || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
      </figure>

      {/* Content */}
      <div className="card-body w-2/3 gap-3 p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl lg:text-2xl font-bold line-clamp-2 hover:text-primary transition-colors">
          <a href={`/post/${_id}`}>{title}</a>
        </h2>

        <div className="flex items-center gap-2 text-sm text-base-content/60">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-6">
              <span className="text-xs">{author?.username?.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <span className="font-medium text-primary">@{author?.username}</span>
          <span>•</span>
          <span>{formatDate(createdAt)}</span>
        </div>

        <p className="text-base-content/70 line-clamp-2 sm:line-clamp-3">{summary}</p>

        <div className="card-actions justify-end mt-auto">
          <a
            href={`/post/${_id}`}
            className="btn btn-gradient btn-sm gap-2 group"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
