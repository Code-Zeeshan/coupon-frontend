import React from "react";

import { Link } from "react-router-dom";
import { Typography, IconButton } from "@material-tailwind/react";

const socialMediaIconStyles = {
  borderRadius: "50%",
  border: "1px solid black",
  backgroundColor: "transparent",
};

export function Footer() {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F9F9F9] text-white p-6 px-20">
      <div className="mb-6 md:mb-0">
        <img src="/img/app-logo.png" className="h-64 w-64" />
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row text-center md:text-left">
          <div className="md:mr-6 mb-4 md:mb-0">
            <Typography color="black" variant="small" className="font-bold">
              Phone :
            </Typography>

            <Typography variant="small" color="black">
              +442038850862
            </Typography>
          </div>

          <div className="md:mr-6 mb-4 md:mb-0">
            <Typography color="black" variant="small" className="font-bold">
              Address :
            </Typography>

            <Typography variant="small" color="black">
              128 City Road, London, United Kingdom, EC1V 2NX
            </Typography>
          </div>
          <div>
            <Typography color="black" variant="small" className="font-bold">
              Email :
            </Typography>

            <Typography variant="small" color="black">
              Info@gutsuheinekonig.com
            </Typography>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-end text-center md:text-left">
          <div className="flex flex-col md:mx-10 my-2 md:mb-0">
            <Link
              to="/"
              className="text-black hover:text-gray-400 text-sm mb-2"
            >
              HOME
            </Link>
            <Link
              to="/blogs"
              className="text-black hover:text-gray-400 text-sm  mb-2"
            >
              BLOGS
            </Link>
            <Link
              to="/shops"
              className="text-black hover:text-gray-400 text-sm  mb-2"
            >
              SHOPS
            </Link>
            <Link
              to="/categories"
              className="text-black hover:text-gray-400 text-sm  mb-2"
            >
              CATEGORIES
            </Link>
            <Link
              to="/about_us"
              className="text-black hover:text-gray-400 text-sm  mb-2"
            >
              ABOUT US
            </Link>
            <Link
              to="/contact"
              className="text-black hover:text-gray-400 text-sm mb-2"
            >
              CONTACT
            </Link>
          </div>

          <div className="flex flex-col">
            <Typography variant="small" color="black">
              STAY CONNECTED: FOLLOW US ON
            </Typography>
            <Typography variant="small" color="black">
              SOCIAL MEDIA:
            </Typography>

            <div className="flex justify-center md:justify-start space-x-4 mt-10">
              <IconButton
                color="white"
                className="hover:text-gray-400"
                style={socialMediaIconStyles}
                onClick={() =>
                  openInNewTab(
                    "https://www.facebook.com/profile.php?id=61558318250718",
                  )
                }
              >
                <i className="fab fa-facebook-f"></i>
              </IconButton>
              <IconButton
                color="white"
                className="hover:text-gray-400"
                style={socialMediaIconStyles}
              >
                <i className="fab fa-twitter"></i>
              </IconButton>
              <IconButton
                color="white"
                className="hover:text-gray-400"
                style={socialMediaIconStyles}
                onClick={() =>
                  openInNewTab(
                    "https://www.linkedin.com/in/gutscheine-konig-konig-685434302/",
                  )
                }
              >
                <i className="fab fa-linkedin-in"></i>
              </IconButton>
              <IconButton
                color="white"
                className="hover:text-gray-400"
                style={socialMediaIconStyles}
                onClick={() =>
                  openInNewTab("https://www.instagram.com/gutscheine.konig/")
                }
              >
                <i className="fab fa-instagram"></i>
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t border-gray-700 pt-6">
        <Typography variant="small" color="black" className="mb-4 md:mb-0">
          © {currentYear} WEBSITE. ALL RIGHTS RESERVED.
        </Typography>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">
          <Link to="#" className="text-black hover:text-gray-400 text-sm">
            PRIVACY POLICY
          </Link>
          <Link to="#" className="text-black hover:text-gray-400 text-sm">
            TERMS CONDITION
          </Link>
        </div>
      </div>
    </footer>
  );
}
