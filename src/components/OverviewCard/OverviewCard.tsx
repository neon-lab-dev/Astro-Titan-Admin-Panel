/* eslint-disable @typescript-eslint/no-explicit-any */

const OverviewCard = ({ isLoading, data }: any) => {
  const Icon = data.icon;
  return (
    <div
      className={`dashboard-card bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 cursor-pointer`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">{data.title}</p>
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-800">
              {data.value.toLocaleString()}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${data.bgColor}`}>
          <Icon className={`h-6 w-6 ${data.color}`} />
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
