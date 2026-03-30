function LocalShop({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1000x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl bg-emerald-500 p-10 text-white">
          <h1 className="text-4xl font-semibold">{vendor.shopName}</h1>
          <p className="mt-4 text-slate-100">{vendor.description}</p>
          <div className="mt-8 space-y-4 rounded-3xl bg-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Address</p>
            <p className="text-slate-100">{vendor.address}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-emerald-100">Phone</p>
            <p className="text-slate-100">+91 {vendor.phone}</p>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-slate-100"
          >
            WhatsApp Now
          </a>
        </div>
        <div className="overflow-hidden rounded-3xl bg-slate-100">
          <img src={image} alt={vendor.shopName} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

export default LocalShop;
