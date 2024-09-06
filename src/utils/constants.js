export const ADMIN_API = {
  LOGIN: "admin/login",

  // ADMIN CATEGORIES...
  GET_CATEGORIES: "admin/categories",
  UPDATE_CATEGORY: "admin/categories",
  DELETE_CATEGORY: "admin/categories",
  CREATE_CATEGORY: "admin/categories",
  GET_ALL_CATEGORIES: "admin/all_categories",
  GET_RELATED_CATEGORIES: "admin/related_categories",

  // ADMIN COMPANIES...
  GET_COMPANIES: "admin/companies",
  CREATE_COMPANY: "admin/companies",
  UPDATE_COMPANY: "admin/companies",
  DELETE_COMPANY: "admin/companies",
  GET_ALL_COMPANIES: "admin/all_companies",

  // ADMIN BLOGS...
  GET_BLOGS: "admin/blogs",
  CREATE_BLOGS: "admin/blogs",
  UPDATE_BLOGS: "admin/blogs",
  DELETE_BLOGS: "admin/blogs",

  // ADMIN BLOG TAGS...
  GET_BLOG_TAGS: "admin/blog_tags",
  CREATE_BLOG_TAG: "admin/blog_tags",
  UPDATE_BLOG_TAG: "admin/blog_tags",
  DELETE_BLOG_TAG: "admin/blog_tags",
  GET_ALL_BLOG_TAGS: "admin/all_blog_tags",

  // ADMIN COUPONS...
  GET_COUPONS: "admin/coupons",
  CREATE_COUPON: "admin/coupons",
  UPDATE_COUPON: "admin/coupons",
  DELETE_COUPON: "admin/coupons",

  // ADMIN COUPON TAGS...
  GET_COUPON_TAGS: "admin/coupon_tags",
  CREATE_COUPON_TAG: "admin/coupon_tags",
  UPDATE_COUPON_TAG: "admin/coupon_tags",
  DELETE_COUPON_TAG: "admin/coupon_tags",
  GET_ALL_COUPON_TAGS: "admin/all_coupon_tags",
};

export const USER_API = {
  // USER CATEGORIES...
  GET_CATEGORIES: "user/categories",
  GET_CATEGORY_BY_NAME: "user/category",
  GET_HEADER_CATEGORIES: "user/header_categories",
  GET_POPULAR_CATEGORIES: "user/popular_categories",
  GET_LATEST_CATEGORIES_COUPONS: "user/latest_categories_coupons",
  GET_POPULAR_CATEGORIES_COUPONS: "user/popular_categories_coupons",
  GET_CLOSING_CATEGORIES_COUPONS: "user/closing_categories_coupons",

  // USER COMPANIES...
  GET_COMPANIES: "user/companies",
  GET_HEADER_COMPANIES: "user/header_companies",
  GET_POPULAR_COMPANIES: "user/popular_companies",
  GET_COMPANIES_INFORMATION: "user/companies_information",
  GET_SHOW_ON_HOME_COMPANIES: "user/show_on_home_companies",

  // USER BLOGS...
  GET_BLOG_BY_NAME: "user/blog",
  GET_ALL_BLOGS: "user/all_blogs",
  GET_TOP_BLOGS: "user/top_blogs",
  GET_LATEST_BLOGS: "user/latest_blogs",
  GET_BLOGS_WITH_TAGS: "user/blogs_with_tags",
};
