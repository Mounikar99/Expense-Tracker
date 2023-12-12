import React from "react";
import LoaderSrc from '../images/loader.svg'

function Loader() {
  return (
    <div className="loader">
      <img
        src={LoaderSrc}
        alt="loader"
      />
    </div>
  );
}

export default Loader;
