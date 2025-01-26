const Calendar = () => {
  return (
    <div className="col-span-3 bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-400">&lt;</button>
        <span className="font-medium">January</span>
        <button className="text-gray-400">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-sm">
        <div className="text-center text-gray-500">S</div>
        <div className="text-center text-gray-500">M</div>
        <div className="text-center text-gray-500">T</div>
        <div className="text-center text-gray-500">W</div>
        <div className="text-center text-gray-500">T</div>
        <div className="text-center text-gray-500">F</div>
        <div className="text-center text-gray-500">S</div>
        {Array.from({ length: 31 }).map((_, i) => (
          <div
            key={i}
            className={`text-center p-1 ${
              [14, 25, 28].includes(i + 1)
                ? "rounded-full bg-[#4F46E5]/10 text-[#4F46E5]"
                : ""
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
