// app/show/[showId]/page.tsx
import { getSeasonDetails, getShowDetails } from "@/services/tmdb/api";

type Props = {
  params: { showId: string };
};

const ShowPage = async ({ params }: Props) => {
  const showId = await params.showId;

  // Fetch number of seasons for the show
  const seriesData = await getShowDetails(showId);

  const numOfSeasons = seriesData.number_of_seasons;


  // Fetch episode list from each season
  const episodeList = [];
  for (let i = 0; i < numOfSeasons; i++) {
    const episodes = await getSeasonDetails(showId, i + 1);
    episodeList.push({ season: i + 1, episodes });
  }

  console.log("Show details", seriesData);

  console.log("Episodes", episodeList)

  const getColor = (num: number) => {
    const greenIntensity = Math.floor(((num - 1) * 255) / 9); // Map 1-10 to 0-255
    const redIntensity = 255 - greenIntensity; // Inverse of green to get a red-green gradient
    return `rgb(${redIntensity}, ${greenIntensity}, 0)`; // RGB color
  };

  return (
    <div className="p-4">
      {/*Series Details Section */}
      <div>
        <h1 className="text-2xl font-bold">Show ID: {showId}</h1>
        <img
          className="h-80 w-64"
          src={`https://image.tmdb.org/t/p/w500${seriesData.poster_path}`}
        ></img>
        <h1>Number of seasons: {numOfSeasons}</h1>
      </div>

      {/*Episode List and Rating Section */}
      <div>
        <div className="flex mt-4">
          {episodeList.map((seasonData, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl">Season {seasonData.season}</h2>
              <ul className="flex flex-col flex-wrap">
                {seasonData.episodes.map((episode: any) => (
                  <li key={episode.id}>
                    <p>
                      {episode.name} - Air Date: {episode.air_date}
                    </p>
                    <p>Rating: {episode.vote_average}</p>
                    <div style={{ backgroundColor: getColor(episode.vote_average) }}
                      className="w-[150px] h-[150px] rounded-xl flex justify-center items-center text-white text-2xl font-bold"
                    >
                      {episode.vote_average}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
