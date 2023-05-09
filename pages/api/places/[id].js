import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  let { id } = request.query;
  id = id.toLowerCase();

  if (!/^[a-f0-9]{24}$/.test(id)) {
    return response.status(404).json({ status: "Not found" });
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    return response.status(200).json(place);
  }

  if (request.method === "DELETE") {
    const place = await Place.findByIdAndDelete(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    return response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    try {
      const { name, description, location } = request.body;

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

  return response.status(404).json({ status: "Not found" });
}
