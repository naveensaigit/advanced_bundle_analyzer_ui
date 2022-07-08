import type { NextPage } from "next";
import Header from "../src/components/Header/Header";
import React from "react";
import { useRouter } from "next/router";

const page: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { params } = router.query;
  const pathArray : (string | string[] | undefined) = {params}.params;
//   console.log(pathArray);
  let path = 'root';

  if(pathArray !== undefined  &&  typeof pathArray !== 'string'){
    pathArray.forEach(element => {
        path += '/' + element.toString();
    });
  }


  return (
    <>
      <Header path={path}/>
      {/* <h1>ok : {params}</h1> */}
    </>
  );
};

export default page;
