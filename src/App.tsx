import { useState } from "react";
import axios from "axios";
import { Masof, KEY, PassP } from "../env.ts";

const Info = "test";
const UTF8 = "True";
const UTF8out = "True";
const UserId = "203269535";
const ClientName = "matan";
const Tash = "1";
const Order = "1";

export default function PaymentPage() {
  const [Amount, setAmount] = useState("100");
  const [email, setEmail] = useState("t@t.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getSignature = async () => {
    try {
      const signResponse = await axios.get("/api/", {
        params: {
          action: "APISign",
          What: "SIGN",
          KEY,
          PassP,
          Masof,
          Order,
          Info,
          Amount,
          UTF8,
          UTF8out,
          UserId,
          ClientName,
          Tash,
          // FixTash: "False",
          // ShowEngTashText: "False",
          // Coin: "1",
          // Postpone: "False",
          // J5: "False",
          // Sign: "True",
          // MoreData: "True",
          // sendemail: "True",
          // SendHesh: "True",
          // heshDesc: "[0~Item 1~1~8][0~Item 2~2~1]",
          // Pritim: "True",
          // PageLang: "HEB",
          tmp: "7",
        },
      });
      console.log(signResponse);
      console.log(signResponse.data);

      return signResponse.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to generate signature");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const signature = await getSignature();
      const response = await axios.get("/api/", { params: signature });

      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.log(err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
// https://icom.yaad.net/p/?Amount=100&ClientName=matan&Info=test&Masof=0010299529&Order=1&Tash=1&UTF8=True&UTF8out=True&UserId=203269535&action=pay&tmp=7&signature=5bd39062333034e6c841dc64f0feec675d5414badec537f2bd1cdab7abf2bbd6

// action=pay&Amount=100&ClientName=matan&Info=test&Masof=0010299529&Order=1&Tash=1&UTF8=True&UTF8out=True&UserId=203269535&action=pay&tmp=1&signature=a314ad352ec4fcf7809f3870d98081139e993a8c1a99c1afe5459f46f086a755
