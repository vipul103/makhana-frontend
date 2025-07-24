import SearchAreaMain from "@components/search-area";

export const metadata = {
  title: "Search Product - Harri Shop",
};

export default function SearchPage({searchParams:{query}}) {
  return (
    <SearchAreaMain searchText={query} />
  );
}
