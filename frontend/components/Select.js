/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({ players, number }) {
  const people = players;
  const [selected, setSelected] = useState(people[0]);
  const player_number = number;
  // console.log(selected);

  const selection = [];

  function changeHandler() {
    console.log(selected);
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Player {player_number}</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-vita-500 focus:border-vita-500 sm:text-sm">
              <span className="flex items-center">
                <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) => classNames(active ? "text-white bg-vita-600" : "text-gray-900", "cursor-default select-none relative py-2 pl-3 pr-9")}
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                          <span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>{person.name}</span>
                        </div>

                        {selected ? (
                          <span className={classNames(active ? "text-white" : "text-vita-600", "absolute inset-y-0 right-0 flex items-center pr-4")}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
