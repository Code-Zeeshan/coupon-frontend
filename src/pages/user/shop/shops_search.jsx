import { useState } from "react";

import { Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const groups = ["0123456789", "ABCDEFGH", "IJKLMNOPQR", "STUVWXYZ"];
const suggestions = ["Exclusive", "Exclusive", "Exclusive", "Exclusive"];

export function ShopsSearch({ search, setSearch }) {
  const [selectedChar, setSelectedChar] = useState("");

  const handleCharClick = (char) => {
    setSelectedChar(char);
  };

  const handleSuggestionClick = (suggestion) => {
    // Handle suggestion click here
  };

  return (
    <div className="bg-[#EE7C231A] rounded-2xl p-4 sm:p-8 mt-4">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col justify-between lg:w-1/2 w-full mb-4 lg:mb-0">
          <div className="flex flex-col items-start">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.6667 18.6663C33.6667 19.5497 33.3167 20.3997 32.6834 21.0163L32 21.7163C31.9316 19.4363 31.0862 17.2482 29.604 15.5144C28.1217 13.7806 26.0916 12.6052 23.85 12.183L15.3334 3.66634H3.66671V15.333L12.1834 23.8497C13.0334 28.3997 16.95 31.8497 21.7167 31.9997L21.0167 32.683C20.4 33.3163 19.55 33.6663 18.6667 33.6663C17.7834 33.6663 16.95 33.3163 16.3167 32.6997L1.31671 17.6997C0.683374 17.0663 0.333374 16.2163 0.333374 15.333V3.66634C0.333374 1.83301 1.83337 0.333008 3.66671 0.333008H15.3334C16.2167 0.333008 17.0667 0.683008 17.6834 1.29967L32.6834 16.2997C33.3167 16.933 33.6667 17.783 33.6667 18.6663ZM5.33337 7.83301C5.33337 9.21634 6.45004 10.333 7.83337 10.333C9.21671 10.333 10.3334 9.21634 10.3334 7.83301C10.3334 6.44967 9.21671 5.33301 7.83337 5.33301C6.45004 5.33301 5.33337 6.44967 5.33337 7.83301ZM22.1834 14.683C18.0167 14.683 14.6834 18.0163 14.6834 22.183C14.6834 26.3497 18.0167 29.683 22.1834 29.683C23.6667 29.683 25 29.2663 26.1667 28.5497L31.35 33.6663L33.6667 31.3497L28.5334 26.1663C29.2667 25.033 29.6834 23.6663 29.6834 22.183C29.6834 18.0163 26.35 14.683 22.1834 14.683ZM22.1834 18.0163C24.5 18.0163 26.35 19.883 26.35 22.183C26.35 24.483 24.5 26.3497 22.1834 26.3497C19.8667 26.3497 18.0167 24.4997 18.0167 22.183C18.0167 19.8663 19.8834 18.0163 22.1834 18.0163Z"
                fill="#EE7C23"
              />
            </svg>

            <Typography
              variant="h5"
              className="ml-2 mt-5"
              style={{ color: "#EE7C23" }}
            >
              Search coupons
            </Typography>
          </div>

          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border-none rounded-l-xl outline-none"
            />

            <MagnifyingGlassIcon className="h-10 w-10 text-white cursor-pointer bg-[#EE7C23] rounded-r-xl p-2" />
          </div>

          <div className="mt-4 flex flex-col">
            <Typography
              variant="small"
              className="mt-2 text-xs"
              style={{ color: "#92929D" }}
            >
              Suggested searches
            </Typography>

            <div className="mt-4 flex flex-wrap space-x-2">
              {suggestions.map((text, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(text)}
                  className="border border-[#EE7C23] text-[#EE7C23] p-2 flex justify-center items-center w-20 h-8 cursor-pointer rounded-lg m-2"
                >
                  <Typography variant="small">{text}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex flex-col p-4 items-center">
          {groups.map((group, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-center space-x-2 my-4"
            >
              {group.split("").map((char, charIndex) => (
                <Typography
                  variant="lead"
                  key={charIndex}
                  style={{
                    color: selectedChar === char ? "#EE7C23" : "#92929D",
                  }}
                  onClick={() => handleCharClick(char)}
                  className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200"
                >
                  {char}
                </Typography>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
