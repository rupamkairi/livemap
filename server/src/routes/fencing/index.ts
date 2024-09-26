import { Router } from "express";
import { officeFence } from "../../models/officeFence";
import { office } from "../../models/office";

export const fencingRouter = Router();

//
fencingRouter.get("/offices/:officeId", async (req, res) => {
  try {
    const { officeId } = req.params;

    let o = await office.findOne({ _id: officeId }).populate("companyId");

    return res.status(200).json(o);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

fencingRouter.post("/offices/:officeId/office-fences", async (req, res) => {});

fencingRouter.get(
  "/offices/:officeId/office-fences/:officeFenceId",
  async (req, res) => {
    try {
      const { officeId, officeFenceId } = req.params;

      const of = await officeFence.findOne({ _id: officeFenceId, officeId });

      return res.status(200).json(of);
    } catch (error) {
      console.log(error);
    }
  }
);

fencingRouter.patch(
  "/offices/:officeId/office-fences/:officeFenceId",
  async (req, res) => {
    try {
      const { officeId, officeFenceId } = req.params;
      const { polygon } = req.body;
      // console.log(polygon);

      const of = await officeFence.findOneAndUpdate(
        { _id: officeFenceId, officeId },
        { polygon },
        { new: true }
      );

      return res.status(200).json(of);
    } catch (error) {
      console.log(error);
    }
  }
);
