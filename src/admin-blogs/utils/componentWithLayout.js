import AddPost from "../components/Post/AddPost";
import EditPost from "../components/Post/EditPost";
import Categories from "../partials/blogs/Categories";
import Dashboard from "../partials/blogs/Dashboard";
import Posts from "../partials/blogs/Posts";
import withLayout from "./withLayout";

// Gói các component bằng HOC
const DashboardWithLayout = withLayout(Dashboard);
const CategoriesWithLayout = withLayout(Categories);
const PostsWithLayout = withLayout(Posts);
const AddPostWithLayout = withLayout(AddPost);
const EditPostWithLayout = withLayout(EditPost);

export {
  DashboardWithLayout,
  CategoriesWithLayout,
  PostsWithLayout,
  AddPostWithLayout,
  EditPostWithLayout,
};
