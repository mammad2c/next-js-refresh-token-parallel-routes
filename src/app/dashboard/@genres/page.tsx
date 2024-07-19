import { api } from "@/api";

async function getData() {
  const res = await api({
    method: "GET",
    url: "/genres",
  });

  return res.data;
}

export default async function Genres() {
  const data = await getData();

  console.log("Genres data: ", data.count);

  return (
    <div>
      <h2 className="text-xl">Genres</h2>
      <div>genres count: {data.count}</div>
    </div>
  );
}
