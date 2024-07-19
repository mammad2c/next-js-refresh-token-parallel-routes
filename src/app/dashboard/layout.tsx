export default function Layout({
  children,
  games,
  genres,
}: {
  children: React.ReactNode;
  games: React.ReactNode;
  genres: React.ReactNode;
}) {
  const widgets = [games, genres].filter(Boolean);

  return (
    <>
      <div className="grid grid-cols-2">
        {widgets.map((widget, index) => (
          <div className="p-4" key={index}>
            {widget}
          </div>
        ))}
      </div>

      {children}
    </>
  );
}
