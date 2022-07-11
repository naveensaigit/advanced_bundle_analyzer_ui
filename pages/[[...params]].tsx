import type { NextPage } from "next";
import Homepage from "../src/components/Homepage";
import React from "react";
import { useRouter } from "next/router";
import Review from "../src/components/Review/Review";

const page: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { params } = router.query;
  let route = "/";

  let f = true;

  if (params !== undefined && typeof params !== "string") {
    f &&= params[params.length - 1] !== ":review";
    route += params.join("/");
  }

  if (!f) route = route.slice(0, route.lastIndexOf("/"));

  return (
    <div className="App bg-[#282828] text-[#F1F1F1]">
      {f ? <Homepage route={route} /> : <Review route={route} />}
    </div>
  );
};

export default page;
