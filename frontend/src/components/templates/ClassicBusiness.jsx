function ClassicBusiness({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1100x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-l-3xl bg-slate-950 p-10 text-white">
          <h1 className="text-4xl font-semibold">{vendor.shopName}</h1>
          <p className="mt-4 text-slate-300">{vendor.description}</p>
          <div className="mt-8 space-y-3 rounded-3xl bg-slate-800 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Address</p>
            <p>{vendor.address}</p>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Phone</p>
            <p>+91 {vendor.phone}</p>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            WhatsApp Contact
          </a>
        </div>
        <div className="overflow-hidden rounded-r-3xl">
          <img src={image} alt={vendor.shopName} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

export default ClassicBusiness;
