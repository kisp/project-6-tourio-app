import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  if (request.method === "GET") {
    if (!id) {
      return;
    }

    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    try {
      const { name, description, location } = request.body;

      await dbConnect();

      const updatedPlace = await Place.findByIdAndUpdate(
        id,
        { name, description, location },
        { new: true }
      );

      response.status(200).json(updatedPlace);
    } catch (error) {
      response.status(500).json({ error: "Internal server error" });
    }
  }
}
