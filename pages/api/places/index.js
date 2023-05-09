import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  try {
    console.log("before dbConnect");
    await dbConnect();
    console.log("after dbConnect");

    if (request.method === "GET") {
      const places = await Place.find();
      console.log("places.length: ", places.length);
      return response.status(200).json(places);
    }

    if (request.method === "POST") {
      try {
        const { name, location, image, mapURL, description } = request.body;
        const place = new Place();
        place.name = name;
        place.location = location;
        place.image = image;
        place.mapURL = mapURL;
        place.description = description;
        await place.save();
        return response.status(201).json(place);
      } catch (error) {
        return response.status(422).json(error);
      }
    }

    return response.status(404).json({ message: "not found" });
  } catch (error) {
    return response.status(500).json(error);
  }
}
