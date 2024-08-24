import { Router, Request, Response } from "express";
import { authMiddleware } from "../utils/middleware";
import db from "@jolt-connect/db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { SigninSchema, SignupSchema } from "@jolt-connect/shared";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {

    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const userExists = await db.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        });
    }

    await db.user.create({
        data: {
            email: parsedData.data.email,
            // TODO: Don't store passwords in plaintext, hash it
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });

    // await sendEmail();

    return res.json({
        message: "Please verify your account by checking your email"
    });
});

router.post("/signin", async (req: Request, res: Response) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const user = await db.user.findFirst({
        where: {
            email: parsedData.data.email,
            password: parsedData.data.password
        }
    });

    if (!user) {
        return res.status(403).json({
            message: "Sorry credentials are incorrect"
        });
    }

    // sign the jwt
    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD);

    res.json({
        token: token,
    });
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    // TODO: Fix the type
    // @ts-ignore
    const id = req.id;
    const user = await db.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({
        user
    });
});

export const userRouter : Router = router;
