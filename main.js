class LINE_Assistant {
  constructor(access_token) {
    this.ACCESS_TOKEN = access_token;
  }

  parse_events(e) {
    /*
    Function to parse the event object from the webhook
    Parameters:
      e: Object - The event object from the webhook
    Returns:
      Object - The parsed event object
    */
    let json = e.postData.getDataAsString();
    let object = JSON.parse(json);

    const reply_token = object.events[0].replyToken;
    const type = object.events[0].type;
    const user_id = object.events[0].source.userId;
    const message = object.events[0].message.text;

    PropertiesService.getScriptProperties().setProperty("user_id", user_id);

    return {
      reply_token: reply_token,
      type: type,
      user_id: user_id,
      message: message,
    };
  }

  // Function to send a reply message
  reply_send(message, reply_token) {
    let url = "https://api.line.me/v2/bot/message/reply";
    const res = UrlFetchApp.fetch(url, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + this.ACCESS_TOKEN,
      },
      method: "post",
      payload: JSON.stringify({
        replyToken: reply_token,
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      }),
      muteHttpExceptions: true,
    });
    return res.getResponseCode();
  }

  // Function to send a push message
  pushMessage_send(to, message) {
    let url = "https://api.line.me/v2/bot/message/push";
    let headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + this.ACCESS_TOKEN,
    };
    let postData = {
      to: to,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    };
    let options = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(postData),
    };
    return UrlFetchApp.fetch(url, options);
  }

  // Function to broadcast a message
  broadcastMessage_send(message) {
    let url = "https://api.line.me/v2/bot/message/broadcast";
    let headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + this.ACCESS_TOKEN,
    };
    let postData = {
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
      notificationDisabled: false,
    };
    let options = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(postData),
    };
    return UrlFetchApp.fetch(url, options);
  }

  // Function to get user profile
  get_profile(userId) {
    const url = `https://api.line.me/v2/bot/profile/${userId}`;
    var options = {
      method: "GET",
      headers: { Authorization: `Bearer ${this.ACCESS_TOKEN}` },
    };
    const response_json = JSON.parse(UrlFetchApp.fetch(url, options));
    return response_json;
  }

  // Function to get m4a content
  get_m4a(message_id) {
    const url = `https://api-data.line.me/v2/bot/message/${message_id}/content`;
    var options = {
      method: "GET",
      headers: { Authorization: `Bearer ${this.ACCESS_TOKEN}` },
    };
    return UrlFetchApp.fetch(url, options)
      .getBlob()
      .setName(`${message_id}.m4a`);
  }

  // Function to send a Flex Message reply
  reply_send_flex(reply_token, flex_message) {
    let url = "https://api.line.me/v2/bot/message/reply";
    const res = UrlFetchApp.fetch(url, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + this.ACCESS_TOKEN,
      },
      method: "post",
      payload: JSON.stringify({
        replyToken: reply_token,
        messages: [
          {
            type: "flex",
            altText: "This is a Flex Message",
            contents: flex_message,
          },
        ],
      }),
      muteHttpExceptions: true,
    });
    return res.getResponseCode();
  }

  // Function to send a Flex Message push
  pushMessage_send_flex(to, flex_message) {
    let url = "https://api.line.me/v2/bot/message/push";
    let headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + this.ACCESS_TOKEN,
    };
    let postData = {
      to: to,
      messages: [
        {
          type: "flex",
          altText: "This is a Flex Message",
          contents: flex_message,
        },
      ],
    };
    let options = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(postData),
    };
    return UrlFetchApp.fetch(url, options);
  }

  // Function to broadcast a Flex Message
  broadcastMessage_send_flex(flex_message) {
    let url = "https://api.line.me/v2/bot/message/broadcast";
    let headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + this.ACCESS_TOKEN,
    };
    let postData = {
      messages: [
        {
          type: "flex",
          altText: "This is a Flex Message",
          contents: flex_message,
        },
      ],
      notificationDisabled: false,
    };
    let options = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(postData),
    };
    return UrlFetchApp.fetch(url, options);
  }
}
