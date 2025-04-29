"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { getShowList } from "@/services/tmdb/api";

export default function Home() {
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState("");

  const handleShowSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const showName = e.target.value;
    setShowName(showName);
    setLoading(true);
    if (showName) {
      const data = await getShowList(showName);
      setShowList(data.results);
    } else {
      setShowList([]); // Clear show list if input is empty
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <p className="text-6xl">Welcome to EpisodeScore</p>
        <p className="text-center text-3xl">
          Enter a tv show and see its episode ratings
        </p>
        <Input
          placeholder="Search a tv show..."
          value={showName}
          onChange={handleShowSearch}
        />
        {loading && <p>Loading...</p>} {/* Show loading text when fetching */}
        <div className="h-64 overflow-y-auto">
          {showList.length > 0 ? (
            <ul>
              {showList.map((show: any, index) => (
                <a key={index} href={`/show/${show.id}`}>
                  <li className="flex p-4 hover:bg-primary" key={show.name}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={`${show.name} Poster`}
                      className="h-12 w-8 rounded"
                    />
                    <p className="my-auto mx-2">
                      {show.name} ({show.first_air_date})
                    </p>
                  </li>
                </a>
              ))}
            </ul>
          ) : (
            <p>No shows found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
