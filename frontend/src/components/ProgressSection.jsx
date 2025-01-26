const ProgressSection = () => {
  return (
    <div className="col-span-3 bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-medium mb-4">Lorem ipsum</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Consectetur</span>
            <span>75%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-3/4 bg-[#4F46E5] rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Adipiscing</span>
            <span>60%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-3/5 bg-orange-500 rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Sit amet</span>
            <span>45%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-[45%] bg-[#4F46E5] rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2">Lorem ipsum dolor sit amet</p>
        <div className="relative pt-2">
          <div className="w-32 h-32 rounded-full border-[12px] border-[#4F46E5] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-semibold">75%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
