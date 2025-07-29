export default function HowJibuWorks() {
  return (
    <section className="px-4 py-8 bg-white text-center">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How Jibu Works
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base mb-8">
          Watch this video to see how Jibu uses franchising to transform
          local entrepreneurship opportunities, improve livelihoods &amp;
          wellness, and empower people &amp; communities to thrive.
        </p>

        {/* Responsive YouTube Embed */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://youtube.com/embed/eaEsiP72XBk" // Replace with actual video ID
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
