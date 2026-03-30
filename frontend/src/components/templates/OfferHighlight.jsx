function OfferHighlight({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1200x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl bg-slate-900 p-10 text-white">
          <span className="text-sm uppercase tracking-[0.3em] text-amber-400">Offer Highlight</span>
          <h1 className="mt-4 text-4xl font-semibold">{vendor.shopName}</h1>
          <p className="mt-4 text-slate-300">{vendor.description}</p>
          <div className="mt-8 rounded-3xl bg-slate-800 p-6">
            <h2 className="font-semibold text-white">Special Offer</h2>
            <p className="mt-2 text-slate-300">Book now for priority service and local discounts.</p>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-6 inline-flex rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            WhatsApp Offer
          </a>
        </div>
        <img src={image} alt={vendor.shopName} className="h-full w-full rounded-3xl object-cover" />
      </div>
    </section>
  );
}

export default OfferHighlight;
