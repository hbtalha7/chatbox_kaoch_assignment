import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setname(event.target.value)}
          ></input>
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput"
            type="text"
            onChange={(event) => setroom(event.target.value)}
          ></input>
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?x=1&name=${name}&room=${room}`}
        ><button type="submit" className="button mt-20">Sign In</button></Link>
      </div>
    </div>
  );
};


export default Join;