import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  let { id } = request.query;
  id = id.toLowerCase();

  if (!/^[a-z0-9]{24}$/.test(id)) {
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

  return response.status(404).json({ status: "Not found" });
}
