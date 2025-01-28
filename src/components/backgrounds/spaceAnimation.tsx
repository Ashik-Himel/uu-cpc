"use client";

import { useEffect } from "react";
import "./spaceAnimation.css";

export default function SpaceAnimation() {
  useEffect(() => {
    function createStars(): void {
      const background = document.getElementById("spaceBackground");
      if (!background) return;

      const numberOfStars = 100;
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.className = "star";

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);

        background.appendChild(star);
      }
    }

    function createParticles(x: number, y: number, color: string): void {
      const container = document.querySelector(
        ".spinner-container"
      ) as HTMLElement;
      if (!container) return;

      const numberOfParticles = 10;
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.width = "4px";
        particle.style.height = "4px";
        particle.style.backgroundColor = color;
        particle.style.borderRadius = "50%";
        particle.style.pointerEvents = "none";
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        container.appendChild(particle);

        let opacity = 1;
        let scale = 1;

        function animate(): void {
          if (opacity <= 0) {
            particle.remove();
            return;
          }

          const currentLeft = parseFloat(particle.style.left);
          const currentTop = parseFloat(particle.style.top);

          particle.style.left = `${currentLeft + vx}px`;
          particle.style.top = `${currentTop + vy}px`;

          opacity -= 0.02;
          scale += 0.02;

          particle.style.opacity = opacity.toString();
          particle.style.transform = `scale(${scale})`;

          requestAnimationFrame(animate);
        }

        animate();
      }
    }

    function createComet(): void {
      const background = document.getElementById("spaceBackground");
      if (!background) return;

      const comet = document.createElement("div");
      comet.className = "comet";

      const startPos = Math.random() * 100;
      comet.style.left = `${startPos}%`;
      comet.style.top = "0";

      background.appendChild(comet);

      setTimeout(() => comet.remove(), 3000);
    }

    function initComets(): void {
      setInterval(createComet, 4000);
    }

    function initSphereInteractions(): void {
      const dots = document.querySelectorAll(".dot");

      dots.forEach((dot) => {
        const dotElement = dot as HTMLElement;
        dotElement.addEventListener("click", (e: MouseEvent) => {
          const sphere = dotElement.querySelector(".sphere") as HTMLElement;
          if (!sphere) return;

          sphere.style.animationDirection =
            sphere.style.animationDirection === "reverse"
              ? "normal"
              : "reverse";

          const color = window.getComputedStyle(
            dotElement.querySelector(".sphere-surface") as Element
          ).backgroundColor;
          createParticles(e.clientX, e.clientY, color);
        });

        dotElement.addEventListener("mouseenter", () => {
          const sphere = dotElement.querySelector(".sphere") as HTMLElement;
          if (!sphere) return;

          sphere.style.animationDuration = "20s";

          const audio = new Audio(
            "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"
          );
          audio.volume = 0.1;
          audio.play().catch(() => {
            /* Ignore auto-play restrictions */
          });
        });

        dotElement.addEventListener("mouseleave", () => {
          const sphere = dotElement.querySelector(".sphere") as HTMLElement;
          if (!sphere) return;

          sphere.style.animationDuration = "12s";
        });
      });
    }

    function initContainerInteractions(): void {
      const container = document.querySelector(
        ".spinner-container"
      ) as HTMLElement;
      if (!container) return;

      let isRotating = false;
      let startX = 0;
      let startY = 0;

      container.addEventListener("mousedown", (e: MouseEvent) => {
        isRotating = true;
        startX = e.clientX;
        startY = e.clientY;
        container.style.transition = "none";
      });

      document.addEventListener("mousemove", (e: MouseEvent) => {
        if (!isRotating) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const rotationY = deltaX * 0.5;
        const rotationX = -deltaY * 0.5;

        container.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      });

      document.addEventListener("mouseup", () => {
        if (!isRotating) return;
        isRotating = false;

        container.style.transition =
          "transform 1s cubic-bezier(0.4, 0, 0.2, 1)";
        container.style.transform = "rotateX(0deg) rotateY(0deg)";

        setTimeout(() => {
          container.style.transform = "rotateX(2deg) rotateY(2deg)";
          setTimeout(() => {
            container.style.transform = "rotateX(0deg) rotateY(0deg)";
          }, 150);
        }, 1000);
      });
    }

    createStars();
    initComets();
    initSphereInteractions();
    initContainerInteractions();
  }, []);

  return (
    <div className="space-container">
      <div className="background-overlap"></div>
      <div className="space-background" id="spaceBackground">
        <div className="nebula"></div>
      </div>

      <div className="container flex justify-center md:justify-end items-center h-[calc(100vh-72px)] sm:h-[calc(100vh-88px)] mt-[66.56px] xsm:mt-[72px] sm:mt-[88px]">
        <div className="w-[95vw] max-w-[450px] sm:max-w-[500px] aspect-square spinner-container">
          <div className="portal-effect"></div>
          <div className="energy-field"></div>

          <div className="ring0 ring1"></div>
          <div className="ring0 ring2"></div>
          <div className="ring0 ring3"></div>
          <div className="ring0 ring4"></div>
          <div className="ring0 ring5"></div>

          <div className="center-circle"></div>
        </div>
      </div>
    </div>
  );
}
