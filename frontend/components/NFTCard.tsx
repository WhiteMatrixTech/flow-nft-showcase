/* eslint-disable @next/next/no-img-element */
import { useCallback } from "react";

interface INFTCardProps {
  isNew?: boolean;
  data: NFTMetadata;
}
export function NFTCard({ data, isNew }: INFTCardProps) {
  const renderType = useCallback(() => {
    const type = data.traits.traits.find(
      (titem) => titem.name === "type"
    )?.value;
    if (type === "bronze") {
      return <div className="text-[#8fbdca] font-bold">bronze</div>;
    } else if (type === "silver") {
      return <div className="text-[#9f86c7] font-bold">silver</div>;
    } else if (type === "gold") {
      return <div className="text-[#f7dd76] font-bold">gold</div>;
    } else if (type === "platinum") {
      return <div className="text-[#d06b68] font-bold">platinum</div>;
    } else {
      return <></>;
    }
  }, [data.traits]);
  return (
    <div className="mb-2 mx-auto max-w-[200px] bg-white border border-gray-200 rounded-lg shadow relative overflow-hidden">
      <img className="rounded-t-lg" src={data.thumbnail} alt="thumbnail" />
      <div className="p-2">
        <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
          {data.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {renderType()}
        </p>
        {isNew && (
          <div className="text-secondaryBlack absolute right-0 bottom-0 w-full h-7 bg-themeColor -rotate-45 translate-x-[40%] flex items-center justify-center pl-2 pb-1">
            new
          </div>
        )}
      </div>
    </div>
  );
}
