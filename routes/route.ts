import { getAll } from "../controllers/getAll";

export const AppRoutes = [
  { path: "/get", method: "get", action: "" },

  { path: "/post", method: "post", action: "" },

  { path: "/", method: "get", action: getAll },
];

// Router.get('/',function(req,res){

// })
