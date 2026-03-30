function ElegantBusiness({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1100x650?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col justify-center rounded-l-3xl bg-slate-50 p-10">
          <span className="text-sm uppercase tracking-[0.3em] text-rose-500">Elegant Style</span>
          <h1 className="mt-5 text-4xl font-semibold text-slate-900">{vendor.shopName}</h1>
          <p className="mt-4 text-slate-600">{vendor.description}</p>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Address</p>
              <p className="mt-2 text-slate-700">{vendor.address}</p>
            </div>
            <a
              href={`https://wa.me/91${vendor.phone}`}
              className="inline-flex rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
        <img src={image} alt={vendor.shopName} className="h-full w-full rounded-r-3xl object-cover" />
      </div>
    </section>
  );
}

export default ElegantBusiness;
