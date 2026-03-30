function MinimalClean({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1200x600?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft overflow-hidden">
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <img src={image} alt={vendor.shopName} className="h-80 w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="absolute inset-x-0 bottom-0 p-8">
          <h1 className="text-4xl font-bold">{vendor.shopName}</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-100">{vendor.description}</p>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
      <div className="space-y-4 px-8 py-10 sm:px-12">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Address</h2>
            <p className="mt-2 text-slate-600">{vendor.address}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Category</h2>
            <p className="mt-2 text-slate-600">{vendor.category}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MinimalClean;
