import { Admin } from "@/layouts";
import { UserLayout } from "@/widgets/layout/index";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Blogs,
  Shops,
  AboutUs,
  Contact,
  AllBlogs,
  BlogsShow,
  ShopsShow,
  Dashboard,
  Categories,
  CategoriesShow,
} from "./pages/user";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route exact path="/shops" element={<Shops />} />
        <Route exact path="/shops/:name" element={<ShopsShow />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/categories/:name" element={<CategoriesShow />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/all_blogs" element={<AllBlogs />} />
        <Route exact path="/blogs/:name" element={<BlogsShow />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about_us" element={<AboutUs />} />
      </Route>

      <Route exact path="/admin/*" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
