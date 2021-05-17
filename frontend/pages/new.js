import Select from "../components/Select";
import Link from "next/link";

const endpoint = "http://localhost:3000/roster/players";

export async function getServerSideProps() {
  const res = await fetch(endpoint);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function NewMatch({ data }) {
  console.log(data);
  const players = data;

  function StartMatch() {
    /* Submit Team */
  }

  //TODO: Save selected value to variable and submit to db or next page

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-vita-800 sm:text-4xl pt-12">New Match</h2>
          <p className="mt-3 text-xl text-vita-900 sm:mt-4 pb-12">Select the players for each team</p>
        </div>
        {/* Teams */}
        <div className="grid grid-flow-col grid-cols-7 gap-4 pb-12">
          <div className="col-span-3">
            <div className="font-extrabold text-vita-800 text-lg text-center pb-2">Team 1</div>
            <div className="pb-4">
              <Select players={players} number={1} />
            </div>
            <div className="">
              <Select players={players} number={2} />
            </div>
          </div>
          <div className="flex flex-wrap content-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto fill-current text-vita-800" viewBox="0 0 20 20">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
          <div className="col-span-3">
            <div className="col-span-3">
              <div className="font-extrabold text-vita-800 text-lg text-center pb-2">Team 2</div>
              <div className="pb-4">
                <Select players={players} number={3} />
              </div>
              <div className="">
                <Select players={players} number={4} />
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => StartMatch()}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-vita-800 hover:bg-vita-700"
          >
            Start Match
          </button>
        </div>
      </div>
    </div>
  );
}
