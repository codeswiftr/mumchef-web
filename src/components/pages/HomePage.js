import React, { useState, useEffect } from "react";

const HomePage = (props) => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    // firebase.initializeApp();

    return () => {
      console.log("use effect clean up");
    };
  }, []);
  return <h3> welcome home </h3>;
};

export default HomePage;
