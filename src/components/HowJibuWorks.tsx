export default function HowJibuWorks({ videoId = "eaEsiP72XBk" }) {
  return (
    <section className="px-6 md:px-12 py-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          How Jibu Works
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base mb-8 max-w-2xl mx-auto">
          Watch this video to see how Jibu uses franchising to transform
          local entrepreneurship opportunities, improve livelihoods &amp;
          wellness, and empower people &amp; communities to thrive.
        </p>

        {/* Responsive YouTube Embed */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="How Jibu Works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
