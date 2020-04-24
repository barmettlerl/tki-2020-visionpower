import React, { useState } from "react";

import { callApi } from "../utils/api";

const Home = () => {
  return (
    <div>
      <form>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
