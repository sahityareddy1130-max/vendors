function ColorfulCreative({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1100x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-sky-500 text-white shadow-soft">
      <div className="grid gap-6 p-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{vendor.shopName}</h1>
          <p className="text-lg">{vendor.description}</p>
          <div className="rounded-3xl bg-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/80">Category</p>
            <p className="mt-2 text-xl font-semibold">{vendor.category}</p>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Chat on WhatsApp
          </a>
        </div>
        <img src={image} alt={vendor.shopName} className="h-full w-full rounded-3xl object-cover" />
      </div>
      <div className="grid gap-4 border-t border-white/10 px-8 py-8 sm:grid-cols-3">
        <div>
          <h2 className="font-semibold">Address</h2>
          <p className="mt-2 text-white/75">{vendor.address}</p>
        </div>
        <div>
          <h2 className="font-semibold">Phone</h2>
          <p className="mt-2 text-white/75">+91 {vendor.phone}</p>
        </div>
        <div>
          <h2 className="font-semibold">Template</h2>
          <p className="mt-2 text-white/75">Creative Layout</p>
        </div>
      </div>
    </section>
  );
}

export default ColorfulCreative;
