import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PreviewPost from "./components/Post/PreviewPost";
import "./styles/btn-border.css";
import { AddPostWithLayout, CategoriesWithLayout, DashboardWithLayout, EditPostWithLayout, PostsWithLayout } from "./utils/componentWithLayout";

const AdminBlogs = () => {
  useEffect(() => {
    const html = document.querySelector("html");
    const body = document.querySelector("body");

    // Theme setup
    const isLightTheme = localStorage.theme === "light" || !("theme" in localStorage);
    html.classList.toggle("light", isLightTheme);
    html.style.colorScheme = isLightTheme ? "light" : "dark";

    // Sidebar setup
    const isSidebarExpanded = localStorage.getItem("sidebar-expanded") === "true";
    body.classList.toggle("sidebar-expanded", isSidebarExpanded);

    return () => {
      // Cleanup logic
      localStorage.removeItem("theme");
      localStorage.removeItem("sidebar-expanded");
      localStorage.removeItem("previewPost");
      html.classList.remove("light");
      html.style.colorScheme = "";
      body.classList.remove("sidebar-expanded");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DashboardWithLayout />} />
      <Route path="/danh-muc" element={<CategoriesWithLayout />} />
      <Route path="/bai-viet" element={<PostsWithLayout />} />
      <Route path="/bai-viet/add" element={<AddPostWithLayout />} />
      <Route path="/bai-viet/edit/:id" element={<EditPostWithLayout />} />
      <Route path="/bai-viet/preview/:titlePost/:idPost" element={<PreviewPost />} />
    </Routes>
  );
};

export default AdminBlogs;
