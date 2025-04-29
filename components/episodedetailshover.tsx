"use client";

import { useState } from "react";

type Episode = {
  id: number;
  vote_average: number;
  air_date: string;
  name: string;
  vote_count: string;
  episode_number: number;
  season_number: number;
  show_id: number;
};

type EpisodeRatingProps = {
  episode: Episode;
  index: number;
};

export default function EpisodeRating({ episode, index }: EpisodeRatingProps) {
  const getColor = (num: number) => {
    const greenIntensity = Math.floor(((num - 1) * 255) / 9); // Map 1-10 to 0-255
    const redIntensity = 255 - greenIntensity; // Inverse of green to get a red-green gradient
    return `rgb(${redIntensity}, ${greenIntensity}, 0)`; // RGB color
  };

  return (
    <li key={episode.id} className="flex justify-end m-2 relative group">
      <p className="mr-4">{index + 1}</p>
      <div
        style={{ backgroundColor: getColor(episode.vote_average) }}
        className="w-[50px] h-[30px] rounded-md flex justify-center items-center text-white text-2xl font-bold"
      >
        <a
          href={`https://www.themoviedb.org/tv/${episode.show_id}/season/${episode.season_number}/episode/${episode.episode_number}`}
        >
          <p>{episode.vote_average.toFixed(1)}</p>
        </a>
      </div>

      <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white border p-4 rounded shadow w-64 z-10">
        <h3 className="font-semibold text-lg text-primary">{episode.name}</h3>
        <p className="text-sm text-gray-700">{episode.air_date}</p>
        <p className="text-sm text-gray-700">Votes: {episode.vote_count}</p>
      </div>
    </li>
  );
}
