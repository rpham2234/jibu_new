export default function AboutStats() {
  return (
    <section className="bg-[#005499] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <p className="uppercase tracking-widest text-sm mb-6">About Us</p>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Headline + Description */}
          <div>
            <h2 className="text-3xl md:text-5xl  leading-tight mb-4">
              Local Owners <br /> Driving Lasting <br /> Solutions
            </h2>
            <p className="text-sm md:text-base text-white/90 max-w-md">
              Jibu capitalizes, equips, and trains emerging market entrepreneurs to launch and grow essential service franchises, with drinking water as our anchor product.
            </p>
          </div>

          {/* Right: Metrics */}
          <div className="grid grid-cols-2 gap-6 text-center md:text-left">
            <div>
              <p className="text-3xl md:text-5xl">8</p>
              <p className="text-sm">Countries Served</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl">10k</p>
              <p className="text-sm">Retail Points</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl">160+</p>
              <p className="text-sm">Franchises Launched</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl">490M</p>
              <p className="text-sm">Litres Distributed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
