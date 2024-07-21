import express from "express";
import db from "@joltconnect/db";

const app = express();
app.use(express.json());

app.post("/hooks/zap/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;
  // console.log(body);

  //store the trigger in db
  await db.$transaction(async (tx: any) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  res.json({
    message: "Webhook received",
  });
});

app.listen(8000, () => {
  console.log("hooks server started on port 8000");
});
