// components/EarnerStoriesCarousel.tsx (with react-slick)
"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import EarnerStoryCard from "./EarnerStoryCard";

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

interface EarnerStoriesCarouselProps {
  stories: EarningsStories[];
  layout?: "horizontal" | "vertical";
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  slidesToShow?: number;
  centerMode?: boolean;
}

export default function EarnerStoriesCarousel({ 
  stories, 
  layout = "horizontal",
  autoPlay = true,
  autoPlaySpeed = 5000,
  showDots = true,
  showArrows = true,
  slidesToShow = 1,
  centerMode = false
}: EarnerStoriesCarouselProps) {
  
  const settings = {
    dots: showDots,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: autoPlaySpeed,
    arrows: showArrows,
    centerMode: centerMode,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  return (
    <div className="carousel-container px-4">
      <Slider {...settings}>
        {stories.map((story, index) => (
          <div key={index} className="px-2">
            <EarnerStoryCard data={story} layout={layout} />
          </div>
        ))}
      </Slider>
    </div>
  );
}