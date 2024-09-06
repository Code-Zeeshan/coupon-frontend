import axios from "@/lib/axios";

import { useState, useEffect } from "react";
import { USER_API } from "@/utils/constants";
import { LatestBlogs, TopBlogs, BlogsWithTags } from "./blog";

export function Blogs() {
  const [topBlogs, setTopBlogs] = useState([]);
  const [isLoadingTopBlogs, setIsLoadingTopBlogs] = useState(true);

  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isLoadingLatestBlogs, setIsLoadingLatestBlogs] = useState(true);

  const [blogsWithTags, setBlogsWithTags] = useState([]);
  const [isLoadingBlogsWithTags, setIsLoadingBlogsWithTags] = useState(true);

  useEffect(() => {
    fetchTopBlogs();
  }, []);

  const fetchTopBlogs = async () => {
    try {
      const { data } = await axios.get(USER_API.GET_TOP_BLOGS);

      setTopBlogs(data);

      setIsLoadingTopBlogs(false);
      fetchLatestBlogs(data);
    } catch (error) {
      setIsLoadingTopBlogs(false);
      console.error(error);
    }
  };

  const fetchLatestBlogs = async (topBlogsData) => {
    try {
      const { data } = await axios.get(USER_API.GET_LATEST_BLOGS, {
        excludeIds: topBlogsData.map((topBlog) => topBlog._id),
      });

      setLatestBlogs(data);
      setIsLoadingLatestBlogs(false);
      fetchBlogsWithTags();
    } catch (error) {
      setIsLoadingLatestBlogs(false);
      console.error(error);
    }
  };

  const fetchBlogsWithTags = async () => {
    try {
      const { data } = await axios.get(USER_API.GET_BLOGS_WITH_TAGS);

      setBlogsWithTags(data);
      setIsLoadingBlogsWithTags(false);
    } catch (error) {
      setIsLoadingBlogsWithTags(false);
      console.error(error);
    }
  };

  return (
    <div className="py-6 px-4 md:px-20">
      <TopBlogs isLoading={isLoadingTopBlogs} topBlogs={topBlogs} />
      <LatestBlogs isLoading={isLoadingLatestBlogs} latestBlogs={latestBlogs} />

      <BlogsWithTags
        blogsWithTags={blogsWithTags}
        isLoading={isLoadingBlogsWithTags}
      />
    </div>
  );
}
