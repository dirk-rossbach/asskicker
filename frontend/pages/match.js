import Layout from "../components/Layout";
import { PlusIcon as PlusIconSolid } from "@heroicons/react/solid";
import { MinusIcon as MinusCircleIconSolid } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Define AXIOS for POST Requests
const axios = require("axios");

// Endpoint for GET Players
const endpoint = "http://localhost:3000/roster/players";

// Get players from endpoint and pass into props
export async function getServerSideProps() {
  const res = await fetch(endpoint);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

// Recieve props and data
export default function Match({ data }) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  //console.log(data);

  // Handle Goals on Button clicks
  const AddGoal = (team) => {
    console.log("Goal for team ", team);
    // POST Goal with team either 0 or 1
    axios
      .post("http://localhost:3000/match/goal", {
        team: team,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (team === "1") {
      //setScore1(score1 + 1);
    } else if (team === "2") {
      //setScore2(score2 + 1);
    } else {
      console.log("Error in Team number");
    }
  };

  // Handles Remove goals on Button Clicks
  const UnGoal = (team) => {
    console.log("Ungoal for team ", team);
    // POST Ungoal
    axios
      .post("http://localhost:3000/match/ungoal", {
        team: team,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (team === "1" && score1[0] >= 0) {
      //setScore1(score1 - 1);
    } else if (team === "2" && score2[0] >= 0) {
      //setScore2(score1 - 1);
    } else {
      console.log("Error in Team number");
    }
  };

  // Handles End & Reset Match
  const ResetMatch = () => {
    axios
      .post("localhost:3000/match/reset", {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const EndMatch = () => {
    axios
      .post("localhost:3000/match/end", {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Open Websocket
  const client = new W3CWebSocket("ws://localhost:3000/score");

  // Fire if error
  client.onerror = () => {
    console.log("Connection Error");
  };

  // When connection is established
  client.onopen = () => {
    console.log("Client connected");
    // Send inital score value
    client.send("0");
  };

  client.onmessage = (e) => {
    if (typeof e.data === "string") {
      setScore1(e.data[1]);
      setScore2(e.data[3]);
      console.log("Received: ", e.data);
    }
  };

  return (
    <div className="antialiased container mx-auto px-4 sm:px-6 lg:px-8 bg-vita-100">
      <div className="">
        {/* Description */}
        <div className="grid grid-flow-col grid-cols-7 gap-4 pb-8">
          <div className="col-span-3 bg-gray-200">
            <div className="pt-6 mx-auto">
              <div className="flex flex-wrap justify-center">
                <img className="relative z-30 inline-block h-12 w-12 rounded-full ring-0 ring-white" src={data[0].avatar} alt="" />
                <img className="relative z-20 inline-block h-12 w-12 rounded-full ring-0 ring-white" src={data[1].avatar} alt="" />
              </div>
              <h3 className="text-xl font-bold text-center text-vita-800 pb-3">
                {data[0].name} & {data[1].name}
              </h3>
            </div>
          </div>
          <div className="bg-gray-200">
            <div className="flex flex-wrap justify-center">
              <div className="text-xl font-bold text-center text-vita-800">vs.</div>
            </div>
          </div>
          <div className="col-span-3 bg-gray-200">
            <div className="pt-6 mx-auto">
              <div className="flex flex-wrap justify-center">
                <img className="relative z-30 inline-block h-12 w-12 rounded-full ring-0 ring-white" src={data[2].avatar} alt="" />
                <img className="relative z-20 inline-block h-12 w-12 rounded-full ring-0 ring-white" src={data[3].avatar} alt="" />
              </div>
              <h3 className="text-xl font-bold text-center text-vita-800 pb-3">
                {data[2].name} & {data[3].name}
              </h3>
            </div>
          </div>
        </div>
        {/* Score */}
        <div className="grid grid-flow-col grid-cols-7 gap-4 pb-6">
          <div className="col-span-3 bg-gray-200">
            <div className="pt-6 mx-auto">
              <h1 className="score font-extrabold text-gradient text-center bg-gradient-to-r from-vita-400 to-vita-800">{score1}</h1>
            </div>
          </div>
          <div className="bg-gray-200">
            <h1 className="score font-extrabold text-gradient text-center bg-gradient-to-br from-vita-400 to-vita-800">:</h1>
          </div>
          <div className="col-span-3 bg-gray-200">
            <h1 className="score font-extrabold text-gradient text-center bg-gradient-to-tr from-vita-400 to-vita-800">{score2}</h1>
          </div>
        </div>
        {/* Controls */}
        <div className="grid grid-flow-col grid-cols-7 gap-4 pb-8">
          <div className="col-span-3 bg-gray-200">
            <div className="pt-2 mx-auto">
              <div className="flex flex-wrap justify-center">
                <div className="px-5 py-5">
                  <button
                    type="button"
                    onClick={() => {
                      AddGoal("0");
                    }}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-vita-600 hover:bg-vita-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500"
                  >
                    <PlusIconSolid className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-5 py-5">
                  <button
                    type="button"
                    onClick={() => {
                      UnGoal("1");
                    }}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-vita-600 hover:bg-vita-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500"
                  >
                    <MinusCircleIconSolid className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200"></div>
          <div className="col-span-3 bg-gray-200">
            <div className="flex flex-wrap justify-center">
              <div className="px-5 py-5">
                <button
                  type="button"
                  onClick={() => {
                    AddGoal("1");
                  }}
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-vita-600 hover:bg-vita-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500"
                >
                  <PlusIconSolid className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="px-5 py-5">
                <button
                  type="button"
                  onClick={() => {
                    UnGoal("2");
                  }}
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-vita-600 hover:bg-vita-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500"
                >
                  <MinusCircleIconSolid className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="grid grid-flow-col grid-cols-10 gap-4 pb-6">
          <div className="bg-vita-200 col-span-2">1</div>
          <div className="bg-vita-200 col-span-3">
            <div className="flex flex-wrap justify-center">
              <button
                type="button"
                onClick={ResetMatch}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-vita-700 bg-vita-100 hover:bg-vita-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500"
              >
                Reset Match
              </button>
            </div>
          </div>
          <div className="bg-vita-200 col-span-3">
            <div className="flex flex-wrap justify-center">
              <button
                type="button"
                onClick={EndMatch}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-vita-600 hover:bg-vita-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500"
              >
                End Match
              </button>
            </div>
          </div>
          <div className="bg-vita-200 col-span-2">4</div>
        </div>
      </div>
    </div>
  );
}
