/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../constants";

// import allyn from "../../assets/images/allyn-antoine.png";
// import phoebe from "../../assets/images/phoebe-ash.png";
// import san from "../../assets/images/san-junipero.png";
// import bookmark from "../../assets/images/book-mark.png";
// import bookmarkfilled from "../../assets/images/bookmark-filled.png";
// import play from "../../assets/images/play-btn.svg";
import videos from "../isLoggedInLearn/videoData";
import SideBarComponent from "../sidebar/sidebar";
import TabRouteComponent from "./tabRouteComponent";

function LearnMoreTabComponent() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
        <SideBarComponent active="learn" />

        <div className="ml-80 bg-white px-10 pt-14 w-full">
          <div>
            <TabRouteComponent active="videos" />
          </div>
          <div className="my-20">
            <div className="">
              <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
                Hair styling
              </h2>
              <div className=" ">
                <div className="cursor-grab carousel overflow-x-hidden">
                  <div className="flex space-x-8">
                    {videos.map((video) => {
                      return (
                        <div
                          onClick={() => navigate(AuthRoutes.videoContent)}
                          className="cursor-pointer item video-content min-w-30"
                        >
                          <img
                            src={video}
                            alt=""
                            className="w-full h-full object-covcontain"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
                Illustration
              </h2>
              <div className="">
                <div className="cursor-grab carousel overflow-x-hidden">
                  <div className="flex space-x-8">
                    {videos.map((video) => {
                      return (
                        <div
                          className="cursor-pointer item video-content min-w-30"
                          onClick={() => navigate(AuthRoutes.videoContent)}
                        >
                          <img
                            src={video}
                            alt=""
                            className="w-full h-full object-covcontain"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnMoreTabComponent;
