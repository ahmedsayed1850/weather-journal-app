import { useContext } from "react";
import "./App.css";
import Weather from "./Components/WeatherCard/Weather";
import Error404 from "./Components/Error/404";
import ForecastCard from "./Components/ForecastCard/ForecastCard";
import Highlight from "./Components/Highlight/Highlight";
import PreLoader from "./Components/PreLoader/PreLoader";

import SearchContainer from "./Components/Search/SearchContainer";
import Options from "./Components/Utils/Options";
import WeatherContext from "./Context/WeatherContext";

// interface CategoryInterface {
//   id: string;
//   name: string;
// }

// type IData = CategoryInterface[];

function App() {
  const { loading, error, theme } = useContext(WeatherContext);
  // const [state, setState] = useState<{ data: IData | null, loading: boolean }>({ data: null, loading: true });

  if (loading) {
    return <PreLoader />;
  }
  return (
    <section className="flex flex-wrap justify-start items-start h-full w-full">
      <aside className={`lg:w-1/3 lg:h-screen h-full pb-6 w-full ${theme}`}>
        {error ? (
          <>
            <SearchContainer />
            <Error404 />
          </>
        ) : (
          <>
            <SearchContainer />
            <Weather />
          </>
        )}
      </aside>
      <main
        className={`lg:w-2/3 lg:h-screen w-full flex flex-col overflow-hidden lg:overflow-y-scroll mx-auto ${theme}`}
      >
        <article className="w-11/12 flex justify-end items-center pt-6">
          <Options />
        </article>
        {error ? (
          <Error404 />
        ) : (
          <>
            <ForecastCard />
            <Highlight />{" "}
          </>
        )}
      </main>
    </section>
  );
}

export default App;
