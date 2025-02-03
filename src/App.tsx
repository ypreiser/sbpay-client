import { useState } from "react";
import axios from "axios";

const Masof = "ENV";
const KEY = "ENV";
const PassP = "ENV";

const PAYMENT_API_URL = "https://icom.yaad.net/p/";
const SIGN_API_URL = "https://icom.yaad.net/p/?action=APISign";
const Info = "test";
const UTF8 = "True";
const UTF8out = "True";
const UserId = "203269535";
const ClientName = "matan";

export default function PaymentPage() {
  const [Amount, setAmount] = useState("100");
  const [Order, setOrder] = useState("1");
  const [email, setEmail] = useState("t@t.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Tash, setTash] = useState("1");
  const [tashType, settashType] = useState("1");

  const getSignature = async () => {
    try {
      const signResponse = await axios.get("/api/", {
        params: {
          action: "APISign",
          What: "SIGN",
          KEY,
          PassP,
          Masof,
          Order: "12345678910",
          Info: "test-api",
          Amount: "10",
          UTF8,
          UTF8out,
          UserId,
          ClientName: "Israel",
          ClientLName: "Isareli",
          street: "levanon 3",
          city: "netanya",
          zip: "42361",
          phone: "098610338",
          cell: "050555555555",
          email: "test@yaad.net",
          Tash: "1",
          FixTash: "False",
          ShowEngTashText: "False",
          Coin: "1",
          Postpone: "False",
          J5: "False",
          Sign: "True",
          MoreData: "True",
          sendemail: "True",
          SendHesh: "True",
          heshDesc: "[0~Item 1~1~8][0~Item 2~2~1]",
          Pritim: "True",
          PageLang: "HEB",
          tmp: "1",
        },
      });
      console.log(signResponse);

      return signResponse.data.Sign;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to generate signature");
    }
  };

  // const handlePayment = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const signature = await getSignature();
  //     const response = await axios.post(PAYMENT_API_URL, {
  //       Masof,
  //       KEY,
  //       sum: amount,
  //       email,
  //       Sign: signature,
  //       // Additional parameters as required by YaadPay
  //     });

  //     if (response.data.redirectUrl) {
  //       window.location.href = response.data.redirectUrl;
  //     } else {
  //       throw new Error("Invalid response from server");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setError("Payment failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Secure Payment</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded mt-1"
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={getSignature}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
