export default function ControlsPanel({
  speeds,
  setSpeeds,
  isPaused,
  setIsPaused,
}) {
  const handleChange = (planet, newSpeed) => {
    setSpeeds((prev) => ({
      ...prev,
      [planet]: parseFloat(newSpeed),
    }));
  };

  return (
    <div className="absolute top-4 left-4 z-10 bg-gradient-to-br from-gray-900/30 to-black/20 backdrop-blur-md border border-gray-700/50 text-white p-6 rounded-xl shadow-2xl w-[280px] space-y-4">
      {/* Header */}
      <div className="border-b border-gray-600/50 pb-3">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🪐 Orbital Controls
        </h2>
        <p className="text-xs text-gray-400 mt-1">Adjust planet speeds</p>
      </div>

      {/* Controls Grid */}
      <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {Object.entries(speeds).map(([planet, speed]) => (
          <div key={planet} className="group">
            {/* Planet Label */}
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {planet}
              </label>
              <span className="text-xs font-mono bg-gray-800/70 px-2 py-1 rounded-md text-blue-300">
                {speed.toFixed(4)}
              </span>
            </div>

            {/* Custom Slider */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max="0.02"
                step="0.0001"
                value={speed}
                onChange={(e) => handleChange(planet, e.target.value)}
                className="w-full h-2 bg-gray-700/70 rounded-lg appearance-none cursor-pointer slider"
              />
              {/* Progress fill */}
              <div
                className="absolute top-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg pointer-events-none transition-all duration-200"
                style={{ width: `${(speed / 0.02) * 100}%` }}
              />
              {/* Custom thumb */}
              <div
                className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 pointer-events-none transition-all duration-200 border-2 border-purple-400"
                style={{ left: `calc(${(speed / 0.02) * 100}% - 8px)` }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="bg-white text-black px-3 py-1 rounded-md font-semibold hover:bg-gray-300 transition"
      >
        {isPaused ? "Resume Animation" : "Pause Animation"}
      </button>

      {/* Footer */}
      <div className="border-t border-gray-600/50 pt-3">
        <p className="text-xs text-gray-500 text-center">
          Real-time solar system simulation
        </p>
      </div>
    </div>
  );
}
