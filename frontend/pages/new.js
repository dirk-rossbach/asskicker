import Select from "../components/Select";
import axios from "axios";

const players = [
  {
    id: 1,
    name: "Dirk Rossbach",
    avatar: "https://ca.slack-edge.com/TC4REAN2E-U019E3DPLKG-933a2bc5a716-512",
  },
  {
    id: 2,
    name: "Max Eise",
    avatar: "https://ca.slack-edge.com/TC4REAN2E-U018VCHE9PS-4c71f5ae1d5b-512",
  },
  {
    id: 3,
    name: "Andreas Fendl",
    avatar: "https://ca.slack-edge.com/TC4REAN2E-UJV5TKZE0-531f5544a457-512",
  },
  {
    id: 4,
    name: "Michael Henke",
    avatar: "https://ca.slack-edge.com/TC4REAN2E-U01V2AJJJNS-6e31e0a75d86-512",
  },
];

const index = [1, 2, 3, 4];

export default function Example() {
  const axios = require("axios");
  // Get People
  axios
    .get("http://localhost:3000/roster/players")
    .then((res) => {
      players = res.data;
      console.log("res", res.data);
    })
    .catch((err) => {
      console.log("error", err);
    });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-vita-200">
      <div className="max-w-3xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-vita-800 sm:text-4xl pt-12">New Match</h2>
          <p className="mt-3 text-xl text-vita-900 sm:mt-4 pb-12">Select the players for each team</p>
        </div>
        <div className="grid grid-flow-col grid-cols-7 gap-4">
          <div className="col-span-3 bg-vita-500">
            <div className="pb-4">
              <Select players={players} index={index[0]} />
            </div>
            <div className="">
              <Select players={players} index={index[1]} />
            </div>
          </div>
          <div className=" bg-vita-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto fill-current text-vita-800" viewBox="0 0 20 20">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
          <div className="col-span-3 bg-vita-500">
            <div className="col-span-3 bg-vita-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
