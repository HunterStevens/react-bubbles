import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import AxiosAuth from "../Utils/AxiosAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getColorList = () =>{
    AxiosAuth().get(`/api/colors`)
    .then(res =>{console.log("Fetched colors API: ",res)
    setColorList(res.data);
    })
    .catch(err =>{console.log("Colors API ERROR: ",err.response)})
  }

  useEffect(() =>{
    getColorList()
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={getColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
