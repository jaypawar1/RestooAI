import React from "react";
import Hours from "./hours";

const OpeningHours = () => {
  return (
    <div className="mt-3">
      <span className="text-sm font-semibold">Opening Hours:</span>
      <div className="flex flex-col mb-2 items-center">
        <table className="table-auto">
          <tbody>
            {Object.keys(Hours).map((day) => (
              <tr key={day}>
                <td className="font-light pr-4">{day}:</td>
                <td className="pl-4">{Hours[day]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="border border-zinc-300 my-2" />
    </div>
  );
};

export default OpeningHours;
