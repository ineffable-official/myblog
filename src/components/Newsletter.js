import axios from "axios";
import { useState } from "react";

export default function Newsletter() {
  const [response, setResponse] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    axios
      .post(
        "https://us21.api.mailchimp.com/3.0/lists/2bcbb0ad9c/members",
        {
          email_address: form.get("email"),
          status: "subscribed",
        },
        {
          auth: {
            username: "anystring",
            password: "29a0efc954883d2cab4994b0d1c15c47-us21",
          },
        }
      )
      .then((response) => {
        setResponse({
          status: 1,
          message: "Thank for subscription our newsletter",
        });
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="w-full h-auto p-4 border-[1px]">
      <div className="font-semibold text-gray-600">Subscribe</div>
      {response ? (
        response.status ? (
          <div className="">{response.message}</div>
        ) : (
          ""
        )
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="text-sm text-gray-400 py-1">
            Get notification every update
          </div>
          <div className="flex">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              className="w-full h-10 border-[1px] p-2 text-sm font-medium outline-none "
            />
            <button
              type="submit"
              className="w-10 h-10 flex items-center justify-center text-gray-400"
            >
              <i className="fa-light fa-send"></i>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
