function gpt(prompt, model = "gpt-4o-mini", openai_api_key = "") {
  // ALLOWED_MODELS_STR="gpt-4o-mini,gpt-4o,gpt-3.5-turbo"
  const allowed_models = PropertiesService.getScriptProperties()
    .getProperty("ALLOWED_MODELS_STR")
    .split(",");

  if (!allowed_models.includes(model)) {
    return "ERROR: Invalid model";
  }

  if (api_key === "") {
    openai_api_key =
      PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY");
    if (openai_api_key === null) {
      return "ERROR: Please set the OPENAI_API_KEY property";
    }
  }

  //GAS内でAPIを叩く
  const response = UrlFetchApp.fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      payload: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prompt }], // Correct parameter
      }),
      muteHttpExceptions: true, // This will help to see the full error message if there's a problem
    }
  );

  //レスポンスをJSONに変換
  const data = JSON.parse(response.getContentText());

  //生成された文章を返す
  return data.choices[0].message.content;
}
