function PremiumCorporate({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1200x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-slate-50 shadow-soft">
      <div className="grid gap-6 rounded-3xl bg-white p-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <span className="text-sm uppercase tracking-[0.3em] text-slate-500">Premium Corporate Style</span>
          <h1 className="text-4xl font-semibold text-slate-900">{vendor.shopName}</h1>
          <p className="text-slate-600">{vendor.description}</p>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <p className="mt-2 text-slate-700">Phone: +91 {vendor.phone}</p>
            <p className="mt-2 text-slate-700">Address: {vendor.address}</p>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Contact on WhatsApp
          </a>
        </div>
        <img src={image} alt={vendor.shopName} className="h-full w-full rounded-3xl object-cover" />
      </div>
    </section>
  );
}

export default PremiumCorporate;
