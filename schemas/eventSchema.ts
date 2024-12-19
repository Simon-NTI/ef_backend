import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        type: {
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            streetName: { type: String, required: true }
        }, required: true
    },
    organiser: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    contactInformation: {
        phoneNumber: String,
        emailAdress: String
    }
});

export const EventModel = mongoose.model("Event", eventSchema);

/*
- Title  
- Description  
- Location, divided into the following:  

    - City / Neighbourhood  
    - Postal Code  
    - Street name  

- Organiser  
- Image  
- Start and end date/time  
- Contact information?  
*/