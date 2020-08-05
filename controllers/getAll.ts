import Express from "express";

export async function getAll(req: Express.Request, res: Express.Response) {
  // console.log(req);

  res.json({ msg: "getAll" });
}
