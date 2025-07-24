'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper"; // EffectFade removed

import banner1 from "@assets/img/banner/1.jpg";
import banner2 from "@assets/img/banner/2.jpg";
import banner3 from "@assets/img/banner/3.jpg";

const slider_data = [
  { id: 1, img: banner1 },
  { id: 2, img: banner2 },
  { id: 3, img: banner3 },
];

const overlayContent = [
  "Welcome to Our Website",
  "Premium Quality Services",
  "Exclusive Offers Just For You"
];

function initSnowfall({ image, flakeCount = 30, maxSize = 32 }) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight * 0.7;
  canvas.width = width;
  canvas.height = height;

  const flakes = [];
  const img = typeof window !== 'undefined' ? new window.Image() : null;
  img.src = image;

  const createFlake = () => ({
    x: Math.random() * width,
    y: Math.random() * -height,
    size: Math.random() * (maxSize - 32) + 32,
    speed: Math.random() * 1.5 + 0.5,
    sway: Math.random() * 2,
    angle: Math.random() * Math.PI * 2,
  });

  let animationFrame;

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    flakes.forEach((flake) => {
      flake.y += flake.speed;
      flake.angle += 0.01;
      flake.x += Math.sin(flake.angle) * flake.sway;

      if (flake.y > height) {
        Object.assign(flake, createFlake(), { y: 0 });
      }

      ctx.drawImage(img, flake.x, flake.y, flake.size, flake.size);
    });
    animationFrame = requestAnimationFrame(draw);
  };

  const init = () => {
    for (let i = 0; i < flakeCount; i++) {
      flakes.push(createFlake());
    }
    draw();
  };

  img.onload = init;

  const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight * 0.10;
    canvas.width = width;
    canvas.height = height;
  };
  window.addEventListener('resize', handleResize);

  const removeTimeout = setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', handleResize);
    canvas.remove();
  }, 7000);

  return () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', handleResize);
    clearTimeout(removeTimeout);
    canvas.remove();
  };
}

const HeroBanner = () => {
  const [loop, setLoop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLoop(true);

    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);

      const cleanupSnow = initSnowfall({
        image: '/assets/img/icon/foxnut.png',
        flakeCount: 40,
        maxSize: 48
      });

      return () => {
        window.removeEventListener('resize', checkMobile);
        cleanupSnow();
      };
    }
  }, []);

  return (
    <section className="slider__area" style={{ overflow: "hidden" }}>
      <Swiper
        className="slider__active full-hero-slider"
        slidesPerView={1}
        spaceBetween={0}
        loop={loop}
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
      >
        {slider_data.map((item, index) => (
          <SwiperSlide key={item.id}>
       <div
  style={{
    width: "100%",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    marginTop: "110px" // 👈 pushes the container down
  }}
>



              {/* Background Image */}
              <Image
                src={item.img}
                alt={`Hero Banner ${item.id}`}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
              />

              {/* Mobile text content */}
              {isMobile && (
                <div style={{
                  position: "absolute",
                  top: "70%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  textAlign: "center",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  width: "100%",
                  maxWidth: "90%",
                  fontSize: "clamp(20px, 6vw, 32px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  padding: "0 10px"
                }}>
                  {overlayContent[index]}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
