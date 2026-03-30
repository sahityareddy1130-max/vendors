function ModernCard({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1000x600?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-600">{vendor.category}</p>
          <h1 className="text-4xl font-semibold text-slate-900">{vendor.shopName}</h1>
          <p className="text-slate-600">{vendor.description}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/91${vendor.phone}`}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              WhatsApp Us
            </a>
            <div className="rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-600">
              {vendor.address}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-3xl overflow-hidden bg-slate-50 shadow-soft">
        <img src={image} alt={vendor.shopName} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default ModernCard;
