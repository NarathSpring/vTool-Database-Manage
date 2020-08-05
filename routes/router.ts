import * as express from "express";

import { CustomRoutes } from "./routes";

let Router = express.Router();

CustomRoutes.map((route) => {
  // const method: string = i.method;
  Router[route.method](
    route.path,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      route
        .action(req, res)
        .then(() => {
          next;
        })
        .catch((err) => {
          next(err);
        });
    }
  );
});

export default Router;
