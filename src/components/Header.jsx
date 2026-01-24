import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { userInfo, logOut } = useContext(UserContext);
  const username = userInfo?.username;

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-52 p-2 shadow-xl"
          >
            {username ? (
              <>
                <li>
                  <a href="/create" className="font-medium">
                    ✏️ Create Post
                  </a>
                </li>
                <li>
                  <button onClick={logOut} className="font-medium text-error">
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className="font-medium">
                    🔐 Login
                  </a>
                </li>
                <li>
                  <a href="/register" className="font-medium">
                    📝 Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl gap-2 hover:bg-transparent">
          <span className="text-2xl">📝</span>
          <span className="gradient-text font-bold hidden sm:inline">SE NPRU Blog</span>
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <a href="/" className="font-medium hover:text-primary transition-colors">
              🏠 Home
            </a>
          </li>
        </ul>
      </div>

      {username ? (
        <div className="navbar-end gap-2">
          <a
            className="btn btn-gradient btn-sm sm:btn-md gap-2"
            href="/create"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Post</span>
          </a>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-10">
                <span className="text-lg">{username?.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-52 p-2 shadow-xl"
            >
              <li className="menu-title px-4 py-2">
                <span className="text-base-content/70">Signed in as</span>
                <span className="font-semibold text-primary">{username}</span>
              </li>
              <div className="divider my-0"></div>
              <li>
                <button onClick={logOut} className="text-error font-medium">
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-2">
          <a className="btn btn-ghost btn-sm sm:btn-md" href="/login">
            Login
          </a>
          <a className="btn btn-gradient btn-sm sm:btn-md" href="/register">
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
