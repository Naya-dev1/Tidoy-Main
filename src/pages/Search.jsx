import React from "react";
import SearchResult from "../components/SearchComp/SearchResult";
import NavBar from "../components/NavBar";

const Search = () => {
  return (
    <div className=" ">
      <div className="  backdrop-blur-[10px] bg-[#FBFBFB59]  fixed w-full top-0 px-6 md:px-[100px] ">
        <NavBar />
      </div>{" "}
      <SearchResult />
    </div>
  );
};

export default Search;
