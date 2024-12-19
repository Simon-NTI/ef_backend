import Elysia from "elysia";
import mongoose from "mongoose";

import { cors } from '@elysiajs/cors'

import { uri } from "./key";

import { EventModel } from "./schemas/eventSchema";


console.log("Attempting to connect Mongoose...");
const mongooseConnection = await mongoose.connect(uri);
console.log("Mongoose Connected");

console.log("Attempting to connect Elysia...")
const app = new Elysia()
    .use(cors())
    .get("/", async ({ set }) => {
        const events = await EventModel.find({});

        if (!events.length) {
            set.status = 404;
            return "No events found";
        }
    })

    .get("/city", async ({ set }) => {
        try {
            const events = await EventModel.find({});
            let cities = {};

            for (let i = 0; i < events.length; i++) {
                // @ts-expect-error
                cities[events[i].location.city] = "";
            }

            return Object.keys(cities);
        }
        catch (err) {
            set.status = 400;
            return err;
        }
    })

    .get("/event", async ({ query, set }) => {

        // console.log(query);

        let filter = {};

        if (query.city) {
            // @ts-expect-error
            filter["location.city"] = query.city;
        }

        console.log(filter);

        // @ts-expect-error
        filter["title"] = { "$regex": query.title, "$options": "i" };

        try {
            const events = await EventModel.find(filter);

            // console.log(events);

            return events;
        }
        catch (err) {
            set.status = 400;
            return err;
        }
    })

    .post("/event", async ({ body, set }) => {
        const newEvent = new EventModel(body);

        try {
            await newEvent.save();
        }
        catch (err) {
            set.status = 400;
            return err;
        }
    })
    .listen(3031);

console.log(`Elysia connected, live on port ${app.server?.port}`);