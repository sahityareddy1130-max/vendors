function OnePageScroll({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1000x600?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <div className="space-y-8 p-8">
        <div className="rounded-3xl bg-slate-950 p-10 text-white">
          <h1 className="text-4xl font-bold">{vendor.shopName}</h1>
          <p className="mt-3 text-slate-300">{vendor.description}</p>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Start WhatsApp Chat
          </a>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Services</h2>
            <p className="mt-2 text-slate-600">Find the best services for {vendor.category} and local customers.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Contact</h2>
            <p className="mt-2 text-slate-600">Phone: +91 {vendor.phone}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Location</h2>
            <p className="mt-2 text-slate-600">{vendor.address}</p>
          </div>
        </div>
        <img src={image} alt={vendor.shopName} className="w-full rounded-3xl object-cover" />
      </div>
    </section>
  );
}

export default OnePageScroll;
