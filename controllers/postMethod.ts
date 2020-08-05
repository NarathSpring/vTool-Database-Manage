import Express from "express";

export async function postMethods(req: Express.Request, res: Express.Response) {
  console.log(req);

  res.json({ msg: "postMethods" });
}
