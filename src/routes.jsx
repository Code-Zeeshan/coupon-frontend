import {
  TagIcon,
  ChartBarIcon,
  CreditCardIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

import {
  Home,
  Blogs,
  Coupons,
  BlogTags,
  Companies,
  CouponTags,
  Categories,
} from "@/pages/admin";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const routes = [
  {
    title: "",
    layout: "admin",
    pages: [
      {
        icon: <ChartBarIcon {...icon} />,
        name: "dashboard",
        path: "/dashboard",
        element: <Home />,
      },
      {
        icon: <BuildingOffice2Icon {...icon} />,
        name: "companies",
        path: "/companies",
        element: <Companies />,
      },
      {
        icon: <CreditCardIcon {...icon} />,
        name: "coupons",
        path: "/coupons",
        element: <Coupons />,
      },
      {
        icon: <TagIcon {...icon} />,
        name: "coupon tags",
        path: "/coupon_tags",
        element: <CouponTags />,
      },
      {
        icon: <ChatBubbleLeftRightIcon {...icon} />,
        name: "blogs",
        path: "/blogs",
        element: <Blogs />,
      },
      {
        icon: <TagIcon {...icon} />,
        name: "blog tags",
        path: "/blog_tags",
        element: <BlogTags />,
      },
      {
        icon: <TagIcon {...icon} />,
        name: "categories",
        path: "/categories",
        element: <Categories />,
      },
    ],
  },
];

export default routes;
