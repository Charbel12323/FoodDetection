const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.analyzeImage = async (req, res) => {
  try {
    const { photo } = req.body;
    if (!photo) return res.status(400).json({ error: 'No photo provided.' });

    const dataUrl = `data:image/jpeg;base64,${photo}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Identify food ingredients from an image and return only a structured JSON object."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "List all food ingredients visible in this image as a JSON object." },
            { type: "image_url", image_url: { url: dataUrl } }
          ]
        }
      ],
      response_format: { type: "json_object" },
      store: true,
    });

    res.json(response.choices[0]);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
