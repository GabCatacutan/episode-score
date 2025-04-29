"use client"

import { Input } from "./ui/input";
import { useState } from "react";
import { getShowList } from "@/services/tmdb/api";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState("");
  const pathname = usePathname()

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

  if(pathname !== "/")
  return (
    <nav className="flex border-black">
      <a href="/">EpisodeRating</a>
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
                <li className="flex p-4 hover:bg-gray-100" key={show.name}>
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
    </nav>
  );
}
