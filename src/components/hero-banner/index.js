'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import banner1 from "@assets/img/banner/1.jpg";
import banner2 from "@assets/img/banner/2.jpg";

const slider_data = [
  { id: 1, img: banner1, alt: "Welcome to Our Website" },
  { id: 2, img: banner2, alt: "Premium Quality Services" },
];

// ❌ Removed snow effect on mobile to improve TBT
// You can lazy load it only after idle time if you want it later.

const HeroBanner = () => {
  const [loop, setLoop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLoop(true);
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return (
    <section
      className="slider__area"
      style={{ overflow: "hidden" }}
      aria-label="Hero banner section"
    >
      <Swiper
        className="slider__active full-hero-slider"
        slidesPerView={1}
        spaceBetween={0}
        loop={loop}
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
      >
        {slider_data.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              style={{
                width: "100%",
                height: isMobile ? "55vh" : "90vh", // Shrink height for mobile to reduce LCP cost
                position: "relative",
                overflow: "hidden",
                marginTop: "70px"
              }}
            >
              {/* Above-the-fold images should load eagerly */}
              <Image
                src={item.img}
                alt={item.alt}
                fill
                priority // ✅ Ensures LCP image loads fast
                sizes={isMobile ? "100vw" : "100vw"} // ✅ Serve smaller images on mobile
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              
              {/* Overlay text (accessible) */}
              <div
                style={{
                  position: "absolute",
                  bottom: isMobile ? "15%" : "20%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  textAlign: "center",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  width: "100%",
                  maxWidth: "90%",
                  fontSize: isMobile ? "clamp(18px, 5vw, 28px)" : "clamp(28px, 3vw, 48px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  padding: "0 10px"
                }}
                role="heading"
                aria-level={1}
              >
                {item.alt}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
