function HeroBanner({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1400x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl overflow-hidden bg-slate-900 text-white shadow-soft">
      <div className="relative">
        <img src={image} alt={vendor.shopName} className="h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-x-0 bottom-0 p-10 sm:p-14">
          <h1 className="text-5xl font-bold sm:text-6xl">{vendor.shopName}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">{vendor.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/91${vendor.phone}`}
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Chat on WhatsApp
            </a>
            <div className="rounded-full border border-white/20 px-5 py-3 text-sm">{vendor.category}</div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 bg-slate-950 px-8 py-10 sm:grid-cols-3 sm:px-12">
        <div>
          <h2 className="font-semibold text-white">Address</h2>
          <p className="mt-2 text-slate-300">{vendor.address}</p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Phone</h2>
          <p className="mt-2 text-slate-300">+91 {vendor.phone}</p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Template</h2>
          <p className="mt-2 text-slate-300">Hero Banner Style</p>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
