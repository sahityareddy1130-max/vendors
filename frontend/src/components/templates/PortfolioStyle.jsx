function PortfolioStyle({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1000x800?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <div className="p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Portfolio Style</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">{vendor.shopName}</h1>
            <p className="mt-4 text-slate-600">{vendor.description}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Contact</h2>
            <p className="mt-2 text-slate-600">+91 {vendor.phone}</p>
            <p className="mt-2 text-slate-600">{vendor.address}</p>
            <a
              href={`https://wa.me/91${vendor.phone}`}
              className="mt-6 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Message Now
            </a>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <img src={image} alt={vendor.shopName} className="h-72 w-full rounded-3xl object-cover" />
          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <h2 className="font-semibold">Featured Work</h2>
            <p className="mt-3 text-slate-300">Showcase your services and expertise with a strong portfolio layout.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioStyle;
