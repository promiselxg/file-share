export default function Home() {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="p-4 bg-gray-200 rounded shadow">
          Shared with me {i + 1}
        </div>
      ))}
    </div>
  );
}
