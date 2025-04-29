"use client";

import { Input } from "./ui/input";
import { useState } from "react";
import { getShowList } from "@/services/tmdb/api";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState("");
  const pathname = usePathname();

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

  if (pathname !== "/")
    return (
      <nav className="relative flex items-center px-4 py-3 z-10">
        {/* Left-aligned brand */}
        <a href="/" className="text-lg font-semibold z-10">
          EpisodeRating
        </a>

        {/* Centered search bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <div className="relative w-full">
            <Input
              placeholder="Search a TV show..."
              value={showName}
              onChange={handleShowSearch}
              className="w-full rounded px-4 py-2 "
            />

            {loading && (
              <div className="absolute top-full mt-1 w-full rounded bg-white p-2 text-sm text-gray-500 shadow">
                Loading...
              </div>
            )}

            {!loading && showList.length > 0 && (
              <ul className="absolute top-full mt-1 w-full max-h-80 overflow-y-auto rounded bordershadow-lg bg-background">
                {showList.map((show: any) => (
                  <li key={show.id}>
                    <a
                      href={`/show/${show.id}`}
                      className="flex items-center gap-3 p-3 transition hover:bg-primary"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${show.poster_path}`}
                        alt={show.name}
                        className="h-12 w-8 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {show.name}
                        </span>
                        <span className="text-sm">
                          {show.first_air_date?.slice(0, 4) ?? "Unknown Year"}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {!loading && showName && showList.length === 0 && (
              <div className="absolute top-full mt-1 w-full rounded bg-white p-2 text-sm text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400">
                No shows found.
              </div>
            )}
          </div>
        </div>
      </nav>
    );
}
