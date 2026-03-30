function ServiceListing({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/900x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl bg-slate-950 p-10 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Service Listing Layout</p>
          <h1 className="mt-4 text-4xl font-semibold">{vendor.shopName}</h1>
          <p className="mt-3 text-slate-300">{vendor.description}</p>
          <div className="mt-8 space-y-4 rounded-3xl bg-slate-800 p-6">
            <div>
              <p className="font-semibold">Primary Service</p>
              <p className="text-slate-300">Best in class support and local delivery.</p>
            </div>
            <div>
              <p className="font-semibold">Category</p>
              <p className="text-slate-300">{vendor.category}</p>
            </div>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-6 inline-flex rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Chat on WhatsApp
          </a>
        </div>
        <div className="rounded-3xl bg-slate-100 p-6">
          <img src={image} alt={vendor.shopName} className="h-full w-full rounded-3xl object-cover" />
        </div>
      </div>
    </section>
  );
}

export default ServiceListing;
