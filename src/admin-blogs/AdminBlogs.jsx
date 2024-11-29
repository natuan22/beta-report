import React from "react";
import { Route, Routes } from "react-router-dom";
import PreviewPost from "./components/Post/PreviewPost";
import "./styles/btn-border.css";
import { AddPostWithLayout, CategoriesWithLayout, DashboardWithLayout, EditPostWithLayout, PostsWithLayout } from "./utils/componentWithLayout";

const AdminBlogs = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardWithLayout />} />
      <Route path="/danh-muc" element={<CategoriesWithLayout />} />
      <Route path="/bai-viet" element={<PostsWithLayout />} />
      <Route path="/bai-viet/add" element={<AddPostWithLayout />} />
      <Route path="/bai-viet/edit/:id" element={<EditPostWithLayout />} />
      <Route path="/bai-viet/preview/:titlePost" element={<PreviewPost />} />
    </Routes>
  );
};

export default AdminBlogs;
