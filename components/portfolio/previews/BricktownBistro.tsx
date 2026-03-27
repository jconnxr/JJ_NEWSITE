"use client";

import type { PreviewProps } from "./types";

export function BricktownBistroPreview({ variant = 0 }: PreviewProps) {
  switch (variant % 4) {
    case 1:
      return <BricktownBrightDay />;
    case 2:
      return <BricktownTerracottaEditorial />;
    case 3:
      return <BricktownMinimalOnePage />;
    default:
      return <BricktownDarkSupper />;
  }
}

function BricktownDarkSupper() {
  return (
    <div className="min-h-[520px] bg-[#141110] text-[#faf7f2]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-8">
        <div className="font-serif text-xl italic text-[#e7d5c4]">Bricktown Bistro</div>
        <nav className="flex gap-5 text-sm text-[#a8a29e]">
          <span className="cursor-default">Menu</span>
          <span className="cursor-default">Wine</span>
          <span className="cursor-default">Events</span>
        </nav>
        <button
          type="button"
          className="rounded-full border border-[#c4a574] bg-[#c4a574]/10 px-5 py-2 text-sm font-medium text-[#e7d5c4]"
        >
          Reserve
        </button>
      </header>

      <section className="relative px-4 py-12 sm:px-10 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141110] via-[#141110]/60 to-transparent" />
        <div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10"
          style={{
            minHeight: 220,
            background: "linear-gradient(135deg, #3d2a1f 0%, #1a1410 50%, #2c1810 100%)",
          }}
        >
          <div className="flex min-h-[220px] flex-col justify-end p-8">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#c4a574]">Oklahoma City · Bricktown</p>
            <h1 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">Supper, uncrowded.</h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-400">
              Gulf seafood, wood-grilled steaks, and a wine list short enough to trust. Walk-ins welcome—reservations for
              Friday & Saturday.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-10 sm:px-8">
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
          {[
            { n: "Wood-grilled ribeye", p: "Herb butter · crispy shallots" },
            { n: "Gulf redfish", p: "Brown butter · capers · lemon" },
            { n: "Burnt cheesecake", p: "Seasonal jam · whipped créme" },
          ].map((item) => (
            <div key={item.n} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="h-24 rounded-lg bg-gradient-to-br from-white/10 to-transparent" />
              <h3 className="mt-3 font-medium text-[#e7d5c4]">{item.n}</h3>
              <p className="mt-1 text-xs text-stone-500">{item.p}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky bottom-0 border-t border-white/10 bg-[#141110]/95 px-4 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-stone-400">
            Tonight: <span className="text-[#e7d5c4]">Open · kitchen until 10</span>
          </div>
          <button type="button" className="rounded-full bg-[#c4a574] px-6 py-2.5 text-sm font-semibold text-[#141110]">
            Reserve a table
          </button>
        </div>
      </div>

      <div className="py-4 text-center text-[10px] text-stone-600">Mock concept · Not a real restaurant</div>
    </div>
  );
}

function BricktownBrightDay() {
  return (
    <div className="min-h-[520px] bg-[#fffefb] text-stone-800">
      <header className="border-b border-amber-100 bg-white px-4 py-4 shadow-sm sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div className="font-serif text-2xl font-bold text-[#9a3412]">Bricktown Bistro</div>
          <nav className="flex gap-6 text-sm font-medium text-stone-600">
            <span>Brunch</span>
            <span>Lunch</span>
            <span>Dinner</span>
          </nav>
          <button type="button" className="rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white shadow-md">
            Book table
          </button>
        </div>
      </header>

      <section className="px-4 py-10 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Oklahoma City · Bricktown</p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
              Patio brunch &amp; coffee
            </h1>
            <p className="mt-4 text-stone-600">
              Sunny plates, local eggs, and a kids menu that isn’t an afterthought. Open daily from 8am.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 p-6 shadow-inner">
              <p className="text-xs font-bold text-amber-900">Chef’s pick</p>
              <p className="mt-2 font-serif text-lg font-semibold">Shakshuka &amp; sourdough</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-white p-6 shadow-inner ring-1 ring-sky-100">
              <p className="text-xs font-bold text-sky-800">Drinks</p>
              <p className="mt-2 font-serif text-lg font-semibold">Cold brew &amp; mimosas</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-amber-100 bg-amber-50/50 px-4 py-4 text-center text-[10px] text-stone-500">
        Mock concept · Sample layout
      </div>
    </div>
  );
}

function BricktownTerracottaEditorial() {
  return (
    <div className="min-h-[520px] bg-[#e8d5c4] text-[#3d2817]">
      <div className="border-b-4 border-[#c45c3e] px-4 py-6 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#c45c3e]">Bricktown · Oklahoma City</p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-light italic leading-[1.15] sm:text-5xl">
            A room that feels like Friday every night.
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-0 px-4 sm:grid-cols-12 sm:px-10">
        <div className="border-b border-[#3d2817]/15 py-8 sm:col-span-5 sm:border-b-0 sm:border-r sm:py-12 sm:pr-8">
          <p className="text-sm leading-relaxed text-[#3d2817]/85">
            Seasonal menu. Oklahoma beef. Gulf catch when it’s running. Reservations recommended after 6.
          </p>
          <button
            type="button"
            className="mt-8 w-full border-2 border-[#3d2817] bg-transparent py-3 text-sm font-bold uppercase tracking-widest text-[#3d2817]"
          >
            View menu PDF
          </button>
        </div>
        <div className="py-8 sm:col-span-7 sm:py-12 sm:pl-8">
          <div className="space-y-6">
            {[
              { course: "First", item: "Charred okra · lemon aioli" },
              { course: "Main", item: "Ribeye · chimichurri · frites" },
              { course: "Sweet", item: "Olive oil cake · berries" },
            ].map((row) => (
              <div key={row.item} className="flex gap-4 border-b border-[#3d2817]/10 pb-6">
                <span className="w-16 shrink-0 text-xs font-bold uppercase tracking-wide text-[#c45c3e]">{row.course}</span>
                <p className="font-serif text-xl text-[#3d2817]">{row.item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-6 text-center text-[10px] text-[#3d2817]/60">Mock concept · Not a real restaurant</div>
    </div>
  );
}

function BricktownMinimalOnePage() {
  return (
    <div className="min-h-[520px] bg-white text-neutral-900">
      <div className="mx-auto max-w-lg px-6 py-12">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">Bricktown Bistro</p>
        <h1 className="mt-8 text-center font-sans text-3xl font-light tracking-tight sm:text-4xl">
          Simple food.
          <br />
          <span className="font-medium">Serious hospitality.</span>
        </h1>

        <ul className="mt-12 space-y-4 border-y border-neutral-200 py-8">
          {[
            { name: "Steak frites", price: "34" },
            { name: "Whole fish", price: "MP" },
            { name: "Chocolate pot", price: "12" },
          ].map((line) => (
            <li key={line.name} className="flex items-baseline justify-between text-sm">
              <span className="text-neutral-800">{line.name}</span>
              <span className="tabular-nums text-neutral-500">{line.price}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <p className="text-xs text-neutral-500">111 E Sheridan · OKC</p>
          <button type="button" className="mt-4 w-full border border-neutral-900 py-3 text-xs font-semibold uppercase tracking-widest">
            Reserve
          </button>
        </div>
      </div>
      <p className="pb-6 text-center text-[10px] text-neutral-400">Mock concept · Sample layout</p>
    </div>
  );
}
