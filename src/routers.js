import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/home";
import AboutComponent from "./components/about";

import { NonAuthRoutes } from "./constants";

function Routers() {
  return (
    <div className="dark:bg-slate-800">
      <Suspense
        fallback={
          <div className="flex justify-center mt-60">
            {/* <LoadingIcon className="btn-loading" /> */}
            loading...
          </div>
        }
      >
        <Routes>
          <Route exact path={NonAuthRoutes.home} element={<HomeComponent />} />
          <Route
            exact
            path={NonAuthRoutes.about}
            element={<AboutComponent />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Routers;
