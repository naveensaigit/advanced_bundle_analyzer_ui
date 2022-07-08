import type { NextPage } from "next";
import Homepage from '../src/components/Homepage'
import React from "react";
import { useRouter } from "next/router";

const page: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { params } = router.query;
  let path = "root/";

  if(params !== undefined  &&  typeof params !== 'string')
    path += params.join("/");

  return (
    <div className="App bg-[#282828] text-[#F1F1F1] pt-2">
      <Homepage path={path}/>
    </div>
  )
};

export default page;
