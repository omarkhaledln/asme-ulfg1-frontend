export async function handler(event) {
  const backendUrl = "https://asme-ulfg1-backend.xo.je/api";
  const path = event.queryStringParameters?.path || "";
  const url = `${backendUrl}/${path}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}