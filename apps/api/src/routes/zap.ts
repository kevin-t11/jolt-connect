import { Router } from "express";
import { authMiddleware } from "../utils/middleware";
import { ZapCreateSchema } from "@jolt-connect/shared";
import db from "@jolt-connect/db";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id: string = req.id;
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);
    
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }   

    const zapId = await db.$transaction(async (tx : any) => {
        const zap = await db.zap.create({
            data: {
                userId: id,
                triggerId: "",
                actions: {
                    create: parsedData.data.actions.map((x : any, index : number) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index
                    }))
                }
            }
        })

        const trigger = await tx.trigger.create({
            data: {
                triggerId: parsedData.data.availableTriggerId,
                zapId: zap.id
            }
        });

        await tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        })

        return zap.id;

    })
    return res.json({
        zapId
    })
})

router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const zaps = await db.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zaps
    })
})

router.get("/:zapId", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;

    const zap = await db.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zap
    })

})

export const zapRouter : Router = router;