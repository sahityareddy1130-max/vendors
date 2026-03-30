
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import categories from '../data/categories';
import templateOptions from '../data/templateOptions';
import ThreeBackground from '../components/ThreeBackground';

const heroAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const cardAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function HomePage() {
  return (
    <section className="relative mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        className="relative overflow-hidden rounded-[40px] bg-slate-950/90 p-8 shadow-[0_45px_120px_rgba(15,23,42,0.25)] sm:p-12"
        initial="hidden"
        animate="visible"
        variants={heroAnimation}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ThreeBackground />
          <span className="emoji emoji-1">🍩</span>
          <span className="emoji emoji-2">🍰</span>
          <span className="emoji emoji-3">🧁</span>
          <span className="emoji emoji-4">✂️</span>
          <span className="emoji emoji-5">🔧</span>
          <span className="emoji emoji-6">⭐</span>
          <span className="emoji emoji-7">💻</span>
          <span className="emoji emoji-8">🛍️</span>
          <span className="emoji emoji-9">🧾</span>
          <span className="emoji emoji-10">💰</span>
        </div>
        <div className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="space-y-8">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              Premium website builder for local businesses
            </div>
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Local Vendor Website Builder
              </h1>
              <p className="text-lg leading-8 text-slate-300 sm:text-xl">
                Launch a professional business website with polished templates, smooth performance, and modern styling built for local shops, salons, restaurants, and services.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Link
                    to="/create"
                    className="inline-flex rounded-full bg-emerald-400 px-8 py-4 text-sm font-semibold text-slate-950 shadow-2xl shadow-emerald-400/20 transition duration-300 hover:bg-emerald-300"
                  >
                    Create Your Website
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <a
                    href="#templates"
                    className="inline-flex rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    Browse Templates
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {templateOptions.slice(0, 6).map((option) => (
              <motion.div
                key={option.id}
                className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.16)] backdrop-blur-lg"
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Template</p>
                <h3 className="mt-4 text-lg font-semibold text-white">{option.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Modern layout for local businesses.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid gap-6 lg:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
      >
        <div className="rounded-[32px] bg-white p-8 shadow-[0_35px_80px_rgba(15,23,42,0.08)]">
          <h2 className="text-3xl font-semibold text-slate-900">Categories</h2>
          <p className="mt-4 text-slate-600">Perfect for local shops and service providers looking for a clean digital presence.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <div key={category} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <p className="text-base font-semibold text-slate-900">{category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-950 p-8 text-white shadow-[0_35px_80px_rgba(15,23,42,0.16)]">
          <h2 className="text-3xl font-semibold">Feature Highlights</h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <p className="text-lg font-semibold">Fast Setup</p>
              <p className="mt-2 text-slate-300">Build a vendor page in minutes with simple form steps and instant preview.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <p className="text-lg font-semibold">Premium Templates</p>
              <p className="mt-2 text-slate-300">Select from modern layouts designed for local sales and customer trust.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <p className="text-lg font-semibold">Mobile Friendly</p>
              <p className="mt-2 text-slate-300">Responsive design ensures the site looks polished on every device.</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="templates"
        className="space-y-6 rounded-[32px] p-8 shadow-[0_35px_80px_rgba(15,23,42,0.08)] bg-gradient-to-tr from-purple-100 via-blue-100 to-pink-100"
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Template system</h2>
            <p className="mt-2 text-slate-700">Choose from 20+ premium templates designed for local vendor success.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templateOptions.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`rounded-[28px] border-2 p-5 shadow-lg transition duration-300 bg-white/90 border-white/60 
                ${["from-pink-200","from-purple-200","from-blue-200","from-emerald-200"][idx%4]} 
                bg-gradient-to-br`}
              whileHover={{ scale: 1.04 }}
            >
              <h3 className="font-semibold text-slate-800">{item.label}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default HomePage;
