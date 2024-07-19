import { api } from "@/api";

async function getData() {
  const res = await api({
    method: "GET",
    url: "/games",
  });

  return res.data;
}

export default async function Games() {
  const data = await getData();

  console.log("Games data: ", data.count);

  return (
    <div>
      <h2 className="text-xl">Games</h2>
      <div>games count: {data.count}</div>
    </div>
  );
}
