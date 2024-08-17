import { Router } from "express";
import db from "@jolt-connect/db";

const router = Router();

router.get("/available", async (req, res) => {
    const availableActions = await db.availableAction.findMany({});
    res.json({
        availableActions
    })
});

export const actionRouter : Router = router;