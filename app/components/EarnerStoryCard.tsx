// components/EarnerStoryCard.tsx
import Image from "next/image";
import { useState } from "react";

interface EarningsStories {
  name: string;
  location: string;
  story: string;
  earned: string;
  image: {
    actualImage?: string;
    fallback?: string;
  };
}

interface EarnerStoryCardProps {
  data: EarningsStories;
  layout?: "horizontal" | "vertical"; // optional layout variant
}

function SmartImage({ src, fallback, alt, fill, width, height, className, sizes, priority }: {
  src: string; fallback: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; sizes?: string; priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const props = { src: imgSrc, alt, className, onError: () => setImgSrc(fallback), sizes, priority };
  return fill ? <Image {...props} fill unoptimized alt="" /> : <Image {...props} width={width ?? 400} height={height ?? 300} unoptimized alt=""/>;
}

export default function EarnerStoryCard({ data, layout = "horizontal" }: EarnerStoryCardProps) {
  if (layout === "vertical") {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        <div className="relative h-48 w-full">
          <SmartImage 
            src={data.image.actualImage || data.image.fallback || ""} 
            fallback={data.image.fallback || ""}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{data.name}</h3>
              <p className="text-sm text-gray-500">{data.location}</p>
            </div>
            <div className="bg-green-100 text-green-700 font-semibold text-sm px-3 py-1 rounded-full">
              {data.earned}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed italic">&quot;{data.story}&quot;</p>
        </div>
      </div>
    );
  }

  // Default horizontal layout
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="grid md:grid-cols-[auto,1fr] gap-6 p-6">
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 mx-auto md:mx-0">
          <SmartImage 
            src={data.image.actualImage || data.image.fallback || ""} 
            fallback={data.image.fallback || ""}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{data.name}</h3>
              <p className="text-sm text-gray-500">{data.location}</p>
            </div>
            <div className="bg-violet-100 text-violet-700 font-bold text-sm px-3 py-1 rounded-full inline-block md:inline-block">
              {data.earned}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">&quot;{data.story}&quot;</p>
        </div>
      </div>
    </div>
  );
}