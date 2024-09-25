import { Router } from "express";
import { agentPosition } from "../../models/agentPosition";
import {
  startOfToday,
  endOfToday,
  startOfDay,
  toDate,
  endOfDay,
} from "date-fns";

export const agentPositionRouter = Router();

// agentPositionRouter.get("", async (req, res) => {
//   try {
//     return res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//   }
// });

agentPositionRouter.get("", async (req, res) => {
  try {
    const date = req.query.date;

    let dateFilter = {};
    if (!date) {
      dateFilter = {
        timestamp: { $gte: startOfToday(), $lt: endOfToday() },
      };
    } else {
      dateFilter = {
        timestamp: {
          $gte: startOfDay(toDate(date as string)),
          $lt: endOfDay(toDate(date as string)),
        },
      };
    }

    const ap = await agentPosition.find({ ...dateFilter });
    return res.status(200).json(ap);
  } catch (error) {
    console.log(error);
  }
});

agentPositionRouter.post("", async (req, res) => {
  try {
    const { agentId, timestamp, meta } = req.body;
    // console.log(agentId, timestamp, meta);
    const ap = await (
      await agentPosition.create({ agentId, timestamp, meta })
    ).save();
    // console.log(ap);
    // return res.sendStatus(201);
    return res.status(201).json(ap);
  } catch (error) {
    console.log(error);
  }
});
