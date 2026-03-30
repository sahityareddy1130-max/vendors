function GridBased({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1200x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft p-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-slate-950 p-8 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">{vendor.category}</p>
          <h1 className="mt-4 text-3xl font-bold">{vendor.shopName}</h1>
          <p className="mt-4 text-slate-300">{vendor.description}</p>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Message Now
          </a>
        </div>
        <div className="col-span-2 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl overflow-hidden bg-slate-50">
            <img src={image} alt="Vendor" className="h-72 w-full object-cover" />
          </div>
          <div className="grid gap-6">
            <div className="rounded-3xl bg-slate-50 p-6">
              <h2 className="font-semibold text-slate-900">Address</h2>
              <p className="mt-2 text-slate-600">{vendor.address}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <h2 className="font-semibold text-slate-900">Contact</h2>
              <p className="mt-2 text-slate-600">+91 {vendor.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GridBased;
