// Custom routes

import { getAll } from "../controllers/getAll";
import { getMethods } from "../controllers/getMethod";
import { postMethods } from "../controllers/postMethod";

export const CustomRoutes = [
  { path: "/get", method: "get", action: getMethods },

  { path: "/post", method: "post", action: postMethods },

  { path: "/", method: "get", action: getAll }
];
