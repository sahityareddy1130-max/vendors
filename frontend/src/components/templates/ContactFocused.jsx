function ContactFocused({ vendor }) {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-950 text-white shadow-soft">
      <div className="grid gap-6 p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Contact Focused Layout</p>
          <h1 className="text-4xl font-bold">{vendor.shopName}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{vendor.description}</p>
          <div className="mt-8 rounded-3xl bg-slate-900/60 p-6">
            <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400">Get in touch</h2>
            <p className="mt-3 text-lg font-semibold">+91 {vendor.phone}</p>
            <p className="mt-2 text-slate-400">{vendor.address}</p>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            WhatsApp Contact
          </a>
        </div>
        <div className="rounded-3xl bg-slate-800 p-10">
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Category</p>
              <p className="mt-2">{vendor.category}</p>
            </div>
            <div className="rounded-3xl bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Address</p>
              <p className="mt-2">{vendor.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFocused;
