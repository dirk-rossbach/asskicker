import Layout from "../components/Layout";
import { PlusIcon as PlusIconSolid } from "@heroicons/react/solid";
import { MinusIcon as MinusCircleIconSolid } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

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

// Score
const score = [0, 0];

// Handle Goals on Button clicks
const AddGoal = (team) => {
  console.log("Goal for team ", team);
  var team1 = score[0];
  var team2 = score[1];
  if (team === "1") {
    team1++;
    score[0] = team1;
  } else if (team === "2") {
    team2++;
    score[1] = team2;
  } else {
    console.log("Error in Team number");
  }
  console.log("Team 1: ", team1);
  console.log("Team 2: ", team2);
};

const UnGoal = (team) => {
  console.log("Minus goal for team ", team);
  var team1 = score[0];
  var team2 = score[1];
  if (team === "1" && score[0] >= 0) {
    team1--;
    score[0] = team1;
  } else if (team === "2" && score[0] >= 0) {
    team2--;
    score[1] = team2;
  } else {
    console.log("Error in Team number");
  }
  console.log("Team 1: ", team1);
  console.log("Team 2: ", team2);
};

// Recieve props and data
export default function Match({ data }) {
  console.log(data);

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
      console.log("Received: " + e.data);
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
              <h1 className="score font-extrabold text-gradient text-center bg-gradient-to-r from-vita-400 to-vita-800">{score[0]}</h1>
            </div>
          </div>
          <div className="bg-gray-200">
            <h1 className="score font-extrabold text-gradient text-center bg-gradient-to-br from-vita-400 to-vita-800">:</h1>
          </div>
          <div className="col-span-3 bg-gray-200">
            <h1 className="score font-extrabold text-gradient text-center bg-gradient-to-tr from-vita-400 to-vita-800">{score[1]}</h1>
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
                      AddGoal("1");
                    }}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-vita-600 hover:bg-vita-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500"
                  >
                    <PlusIconSolid className="h-5 w-5" aria-hidden="true" />
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
                    <MinusCircleIconSolid className="h-5 w-5" aria-hidden="true" />
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
                    AddGoal("2");
                  }}
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-vita-600 hover:bg-vita-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vita-500"
                >
                  <PlusIconSolid className="h-5 w-5" aria-hidden="true" />
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
                  <MinusCircleIconSolid className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
