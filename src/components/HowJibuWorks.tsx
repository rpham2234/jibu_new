export default function HowJibuWorks({ videoId = "eaEsiP72XBk" }) {
  return (
    <section className="relative w-full z-[15]">
      {/* Refined Smooth Wave Edge (Transparent Top, Blue Bottom via rotate-180) */}
      <div className="w-full overflow-hidden leading-none z-0 relative">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] lg:h-[120px] rotate-180">
          <path
            d="M0,0V120c150-100,350,100,600,0s450-100,600,0V0Z"
            fill="#005499"
          />
        </svg>
      </div>

      <div className="bg-[#005499] px-6 md:px-12 pb-20 pt-4 overflow-hidden relative z-10 w-full">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-semibold mb-6 text-white">
            How Jibu Works
          </h2>

          {/* Description */}
          <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Watch this video to see how Jibu uses franchising to transform
            local entrepreneurship opportunities, improve livelihoods &amp;
            wellness, and empower people &amp; communities to thrive.
          </p>

          {/* Responsive YouTube Embed */}
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="How Jibu Works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
