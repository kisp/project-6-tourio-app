import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  if (request.method === "GET") {
    if (!id) {
      return;
    }

    const place = await Place.findOne({ _id: id });

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
  }
}
