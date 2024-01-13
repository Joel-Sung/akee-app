import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getKeywordCollections } from "../../api/home/homeCalls";
import { paddingVerySmall, paperElevation } from "../../utils/format";
import { ETHPrice } from "./Symbols";

interface DropdownMenuProps {
  results: any[];
  onOptionClick: (option: any) => void;
}
function DropdownMenu(props: DropdownMenuProps) {
  const { results, onOptionClick } = props;

  return (
    <ul className="absolute top-[5vh] max-h-[200px] w-[100%] overflow-y-scroll">
      {results.map((result, index) => (
        <li
          key={index}
          onClick={() =>
            onOptionClick(result.name.toLowerCase().replaceAll(" ", "-"))
          }
        >
          <Paper elevation={paperElevation}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ padding: paddingVerySmall }}
            >
              <Typography>{result.name}</Typography>
              <ETHPrice
                ethPrice={
                  result.floorPrice === undefined
                    ? 0
                    : result.floorPrice.tokenPrice
                }
              />
            </Stack>
          </Paper>
        </li>
      ))}
    </ul>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      await getKeywordCollections(query).then((responseJSON) => {
        setResults(responseJSON.data.collections);
      });
    }
    fetchData();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const router = useRouter();
  const handleOptionClick = (name) => {
    setQuery("");
    router
      .push({
        pathname: `/[collection]`,
        query: { collection: name },
      })
      .then(() => router.reload());
  };

  return (
    <div
      className="flex items-center"
      style={{
        position: "relative",
      }}
    >
      <SearchIcon />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className={`border-grey-300 h-[5vh] w-[40vw] max-w-[500px] rounded-full 
          px-5 focus:border-2 focus:border-blue-500 focus:outline-none`}
      />
      {query !== "" && (
        <DropdownMenu results={results} onOptionClick={handleOptionClick} />
      )}
      <ClearIcon onClick={() => setQuery("")} />
    </div>
  );
}
