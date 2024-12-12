import { Route } from "react-router";
import { Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import AuthLayout from "./layouts/AuthLayout";
import User from "./pages/User";
import Posting from "./pages/Posting";
import PublicRoute from "./route/PublicRoute";
import PostDetail from "./pages/PostDetail";
import PrivateRoute from "./route/PrivateRoute";
import ReviewPost from "./pages/ReviewPost";
import MyPage from "./pages/MyPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/protein" element={<Home />} />
          <Route path="/routine" element={<Home />} />
          <Route path="/gymreview" element={<ReviewPost />} />

          {/* 오운완 페이지 */}
          <Route path="/records/:post_id" element={<PostDetail />} />

          <Route path="/about" element={<About />} />
          <Route path="/user/:user_id" element={<User />} />
          <Route path="*" element={<Error />} />
          <Route element={<PrivateRoute />}>
            <Route path="/posting" element={<Posting />} />
            <Route path="/myprofile" element={<MyPage />} />
          </Route>
        </Route>

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
