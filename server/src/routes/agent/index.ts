import { Router } from "express";
import { agentPosition } from "../../models/agentPosition";
import {
  startOfToday,
  endOfToday,
  startOfDay,
  toDate,
  endOfDay,
} from "date-fns";
import { officeFence } from "../../models";
import { computePointInsidePolygon } from "../../services/compute/compute";
import { Schema, Types } from "mongoose";

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
    const { date, agentId } = req.query;
    console.log({ date, agentId });

    let filter = {};
    if (!date) {
      filter = {
        timestamp: { $gte: startOfToday(), $lt: endOfToday() },
        // agentId: new Schema.ObjectId(agentId as string),
      };
    } else {
      filter = {
        timestamp: {
          $gte: startOfDay(toDate(date as string)),
          $lt: endOfDay(toDate(date as string)),
        },
        agentId: new Types.ObjectId(agentId as string),
      };
    }

    const ap = await agentPosition.find({ ...filter });
    return res.status(200).json(ap);
  } catch (error) {
    console.log(error);
  }
});

agentPositionRouter.get("/checkpoints", async (req, res) => {
  try {
    const { date, companyId, officeId, officeFenceId } = req.query;

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

    if (!officeFenceId)
      return res.status(400).json({ message: "Invalid officeFenceId" });

    const ap = await agentPosition.find({ ...dateFilter });
    // console.log(ap);

    // Single Office scenario
    // const of = await officeFence.findById(officeFenceId);
    // Multiple Office Fences schenario
    const of = await officeFence.find({ officeId: officeId });
    // console.log(of);

    let results: any = [];

    let prev = false;
    ap.forEach((_ap) => {
      const { coords } = _ap.meta.position;
      of.forEach((_of) => {
        const { polygon } = _of;
        let curr = computePointInsidePolygon(coords, polygon);
        if (curr !== prev) {
          prev = curr;
          const data = {
            officeFenceId: _of._id,
            agentPositionId: _ap._id,
            at: _ap.timestamp?.toISOString(),
            inside: curr,
          };
          results.push(data);
          return;
        }
      });
    });

    return res.status(200).json(results);
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
