function SimpleLanding({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1200x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <img src={image} alt={vendor.shopName} className="h-96 w-full rounded-t-3xl object-cover" />
      <div className="space-y-6 p-8">
        <h1 className="text-4xl font-semibold text-slate-900">{vendor.shopName}</h1>
        <p className="text-slate-600">{vendor.description}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-100 p-5">
            <h2 className="font-semibold">Category</h2>
            <p className="mt-2 text-slate-600">{vendor.category}</p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-5">
            <h2 className="font-semibold">Phone</h2>
            <p className="mt-2 text-slate-600">+91 {vendor.phone}</p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-5">
            <h2 className="font-semibold">Address</h2>
            <p className="mt-2 text-slate-600">{vendor.address}</p>
          </div>
        </div>
        <a
          href={`https://wa.me/91${vendor.phone}`}
          className="inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Connect on WhatsApp
        </a>
      </div>
    </section>
  );
}

export default SimpleLanding;
