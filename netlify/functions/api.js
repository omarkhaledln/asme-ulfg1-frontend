export async function handler(event) {
  const backendUrl = "https://asme-ulfg1-backend.xo.je/api";
  const path = event.queryStringParameters?.path || "";
  const url = `${backendUrl}/${path}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: `Backend returned ${response.status}`,
          url: url
        }),
      };
    }

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
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message, url: url }),
    };
  }
}