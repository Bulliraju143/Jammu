export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Tailwind + React Check
        </h1>
        <p className="text-gray-700 mb-6">
          ✅ If you see styles (colors, padding, rounded corners), Tailwind is working!
        </p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Test Button
        </button>
      </div>
    </div>
  );
}
