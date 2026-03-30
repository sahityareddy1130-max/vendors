function DarkTheme({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1200x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-slate-950 text-slate-100 shadow-soft">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-l-3xl bg-slate-900 p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">{vendor.category}</p>
          <h1 className="mt-5 text-4xl font-bold">{vendor.shopName}</h1>
          <p className="mt-6 text-slate-400">{vendor.description}</p>
          <div className="mt-8 space-y-4">
            <div>
              <h2 className="font-semibold text-white">Address</h2>
              <p className="mt-2 text-slate-400">{vendor.address}</p>
            </div>
            <a
              href={`https://wa.me/91${vendor.phone}`}
              className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Chat Now
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-r-3xl">
          <img src={image} alt={vendor.shopName} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

export default DarkTheme;
