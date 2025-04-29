"use client";

import { useState } from "react";

type Episode = {
  id: number;
  vote_average: number;
  air_date: string;
  name: string
  vote_count: string
};

type EpisodeRatingProps = {
  episode: Episode;
  index: number;
};

export default function EpisodeRating({ episode, index }: EpisodeRatingProps) {
  const [showTextbox, setShowTextbox] = useState(false);

    console.log(episode)
  const getColor = (num: number) => {
    const greenIntensity = Math.floor(((num - 1) * 255) / 9); // Map 1-10 to 0-255
    const redIntensity = 255 - greenIntensity; // Inverse of green to get a red-green gradient
    return `rgb(${redIntensity}, ${greenIntensity}, 0)`; // RGB color
  };

  return (
    <li key={episode.id} className="flex p-4 relative group">
      {index == 0 ? "Episode" : ""}
      <p className="mr-4">{index + 1}</p>
      <div
        style={{ backgroundColor: getColor(episode.vote_average) }}
        className="w-[50px] h-[30px] rounded-md flex justify-center items-center text-white text-2xl font-bold"
      >
        <p className="text-">{episode.vote_average.toFixed(1)}</p>
      </div>

      <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white border p-4 rounded shadow w-64 z-10">
        <h3 className="font-semibold text-lg">{episode.name}</h3>
        <p className="text-sm text-gray-700">{episode.air_date}</p>
        <p className="text-sm text-gray-700">Votes: {episode.vote_count}</p>
      </div>
    </li>
  );
}
