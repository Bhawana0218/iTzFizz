import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const statsContainerRef = useRef(null);
  const heroImageRef = useRef(null);
  const imagePiecesRef = useRef([]);
  const letterRefs = useRef([]);
  const statCardRefs = useRef([]);
  
  const [stats, setStats] = useState([
    { value: 0, target: 98, label: 'Growth' },
    { value: 0, target: 85, label: 'Engagement' },
    { value: 0, target: 76, label: 'Performance' }
  ]);

  // Headline text with spaces
  const headlineText = "WELCOME ITZFIZZ";
  const heroImage =
  "https://presscenter.com/wp-content/uploads/formidable/2/itzfizz-new-logo.png";
  // "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d";



  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Animate letters to assemble
      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          const randomX = (Math.random() - 0.5) * 800;
          const randomY = (Math.random() - 0.5) * 600;
          const randomRotation = (Math.random() - 0.5) * 360;
          
          gsap.set(letter, {
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            opacity: 0,
            scale: 0.5
          });
          
          tl.to(letter, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: 'power3.out'
          }, index * 0.05);
        }
      });

      // Animate stat cards
      statCardRefs.current.forEach((card, index) => {
        if (card) {
          const randomX = (Math.random() - 0.5) * 1000;
          const randomY = (Math.random() - 0.5) * 800;
          const randomRotation = (Math.random() - 0.5) * 180;
          
          gsap.set(card, {
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            opacity: 0,
            scale: 0.3
          });
          
          tl.to(card, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'back.out(1.7)'
          }, index * 0.1 + 0.5);
        }
      });

      // Animate image pieces
      imagePiecesRef.current.forEach((piece, index) => {
        if (piece) {
          const randomX = (Math.random() - 0.5) * 600;
          const randomY = (Math.random() - 0.5) * 600;
          const randomRotation = (Math.random() - 0.5) * 360;
          
          gsap.set(piece, {
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            opacity: 0,
            scale: 0.5
          });
          
          tl.to(piece, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: 'power2.out'
          }, index * 0.1);
        }
      });

      // Parallax effect after assembly
      tl.to(heroImageRef.current, {
        y: -50,
        duration: 3,
        ease: 'none'
      }, '+=1');

      // Count up animation for stats
      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: statsContainerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      });

      statsTl.to({}, {
        duration: 2,
        onUpdate: () => {
          const progress = statsTl.progress();
          setStats(prev => prev.map(stat => ({
            ...stat,
            value: Math.floor(stat.target * progress)
          })));
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-slate-900 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative min-h-screen z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
        
        {/* Hero Image Pieces */}
        <div ref={heroImageRef} className="relative mb-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div 
            ref={el => imagePiecesRef.current[0] = el}
            className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg opacity-80"
            style={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)' }}
          />
          <div 
            ref={el => imagePiecesRef.current[1] = el}
            className="absolute inset-0 bg-gradient-to-bl from-orange-500 to-orange-700 rounded-lg opacity-80"
            style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)' }}
          />
          <div 
            ref={el => imagePiecesRef.current[2] = el}
            className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-orange-800 rounded-lg opacity-80"
            style={{ clipPath: 'polygon(0% 50%, 50% 50%, 50% 100%, 0% 100%)' }}
          />
          <div 
            ref={el => imagePiecesRef.current[3] = el}
            className="absolute inset-0 bg-gradient-to-tl from-orange-700 to-orange-900 rounded-lg opacity-80"
            style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}
          />

        </div>

        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-white text-center tracking-widest mb-14"
        >
          {headlineText.split('').map((letter, index) => (
            <span
              key={index}
              ref={el => letterRefs.current[index] = el}
              className="inline-block hover:text-orange-400 transition-colors duration-300 cursor-default"
              style={{ 
                willChange: 'transform, opacity',
                marginRight: letter === ' ' ? '1.5em' : '0.1em'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Statistics Section */}
        <div 
          ref={statsContainerRef}
          className="flex flex-col md:flex-row gap-6 md:gap-12 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => statCardRefs.current[index] = el}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 md:p-6 text-center hover:border-orange-500/50 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="text-3xl md:text-5xl font-bold text-orange-400 mb-2 group-hover:text-orange-300 transition-colors">
                {stat.value}%
              </div>
              <div className="text-slate-300 text-sm md:text-base font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
