import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import Browser from "../../src/components/Browser/Browser";

const page: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { params } = router.query;
  let route = "/";

  if (params !== undefined && typeof params !== "string")
    route += params.join("/");

  return (
    <div className="App bg-[#282828] text-[#F1F1F1]">
      <Browser route={route} />
    </div>
  );
};

export default page;
