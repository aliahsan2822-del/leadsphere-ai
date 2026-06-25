"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Music,
  BookOpen,
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Menu,
  X,
  Star,
  Cross,
} from "lucide-react";

const NAV_LINKS = ["Home", "About", "Services", "Events", "Sermons", "Give", "Contact"];

const SERVICES = [
  { day: "Sunday", time: "8:00 AM", name: "Early Morning Worship" },
  { day: "Sunday", time: "10:30 AM", name: "Main Sunday Service" },
  { day: "Wednesday", time: "7:00 PM", name: "Midweek Bible Study" },
  { day: "Friday", time: "6:30 PM", name: "Youth Night" },
];

const EVENTS = [
  {
    date: "Jul 4",
    title: "Community Cookout",
    desc: "Join us for food, fun, and fellowship in our church grounds.",
    tag: "Community",
  },
  {
    date: "Jul 12",
    title: "Vacation Bible School",
    desc: "A week of learning, crafts, and worship for kids ages 5–12.",
    tag: "Kids",
  },
  {
    date: "Jul 20",
    title: "Marriage Enrichment Retreat",
    desc: "Strengthen your marriage through biblical principles and connection.",
    tag: "Family",
  },
  {
    date: "Aug 3",
    title: "Back-to-School Drive",
    desc: "Help us bless local students with school supplies this fall.",
    tag: "Outreach",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    quote:
      "Grace Fellowship has been my spiritual home for 10 years. The community here is unlike anything I've ever experienced.",
  },
  {
    name: "James T.",
    quote:
      "The Sunday sermons always speak directly to what I'm going through. God's word is alive in this church.",
  },
  {
    name: "Linda & Robert K.",
    quote:
      "We got married here, dedicated our kids here, and we'll grow old here. This is family.",
  },
];

const MINISTRIES = [
  { icon: Music, title: "Worship Ministry", desc: "Lifting voices in praise every week." },
  { icon: BookOpen, title: "Bible Study", desc: "Deep dives into Scripture for all ages." },
  { icon: Heart, title: "Outreach", desc: "Serving the local community with love." },
  { icon: Users, title: "Youth Ministry", desc: "Building faith in the next generation." },
];

export default function ChurchPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xl">
            <Cross className="w-5 h-5" />
            Grace Fellowship
          </div>
          <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="hover:text-amber-700 transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-700 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16"
        style={{
          background: "linear-gradient(135deg, #78350f 0%, #92400e 40%, #b45309 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:32px_32px]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fade}
          className="relative z-10 max-w-3xl"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Cross className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
            Welcome Home
          </h1>
          <p className="text-xl text-amber-100 mb-8 max-w-xl mx-auto">
            Grace Fellowship Church — a place of worship, community, and transformation
            in the heart of our city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-3 bg-white text-amber-800 font-semibold rounded-full hover:bg-amber-50 transition"
            >
              Join Us Sunday
            </a>
            <a
              href="#about"
              className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>
        <a
          href="#about"
          className="absolute bottom-8 text-white/70 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-6 text-gray-900">
              Rooted in Faith,<br />Growing in Love
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 1978, Grace Fellowship Church has been a beacon of hope for over
              four decades. We are a diverse, welcoming congregation committed to the
              teachings of Jesus Christ and the transformation of our community.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is simple: <strong>Love God. Love People. Make Disciples.</strong>{" "}
              Whether you're new to faith or have walked with God for years, there's a
              place for you here.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              {[["1,200+", "Members"], ["45+", "Years", ], ["12", "Ministries"]].map(([val, lbl]) => (
                <div key={lbl} className="p-4 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-700">{val}</div>
                  <div className="text-sm text-gray-500">{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fade}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <div className="text-center p-12">
                <Cross className="w-24 h-24 text-amber-600 mx-auto mb-4" />
                <p className="text-amber-800 text-lg font-medium italic">
                  "For where two or three gather in my name, there am I with them."
                </p>
                <p className="text-amber-600 mt-2 text-sm">— Matthew 18:20</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-700 rounded-2xl opacity-20" />
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-widest">
            Services
          </span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">Join Us in Worship</h2>
        </div>
        <div className="max-w-3xl mx-auto grid gap-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fade}
              className="flex items-center justify-between bg-white rounded-2xl shadow-sm px-8 py-6 hover:shadow-md transition"
            >
              <div>
                <div className="font-bold text-gray-900 text-lg">{s.name}</div>
                <div className="text-gray-500 text-sm">{s.day}</div>
              </div>
              <div className="flex items-center gap-2 text-amber-700 font-semibold">
                <Clock className="w-4 h-4" />
                {s.time}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            All services held at <strong>123 Faith Avenue, Springfield</strong>
          </p>
        </div>
      </section>

      {/* ── MINISTRIES ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-widest">
            Ministries
          </span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">Get Involved</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MINISTRIES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fade}
              className="p-8 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition text-center group"
            >
              <div className="w-14 h-14 bg-amber-50 group-hover:bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition">
                <Icon className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="py-24 bg-amber-800 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-300 font-semibold text-sm uppercase tracking-widest">
              Events
            </span>
            <h2 className="text-4xl font-bold mt-2 text-white">Upcoming Events</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fade}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white hover:bg-white/20 transition"
              >
                <div className="text-amber-300 font-bold text-2xl mb-2">{ev.date}</div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full mb-3 inline-block">
                  {ev.tag}
                </span>
                <h3 className="font-bold text-lg mb-2">{ev.title}</h3>
                <p className="text-amber-100 text-sm">{ev.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERMONS ── */}
      <section id="sermons" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-widest">
            Sermons
          </span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">Latest Messages</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "Walking in Purpose",
              series: "Identity in Christ",
              speaker: "Pastor David Wells",
              date: "Jun 22, 2026",
            },
            {
              title: "The Power of Prayer",
              series: "Foundations",
              speaker: "Pastor Maria Chen",
              date: "Jun 15, 2026",
            },
            {
              title: "Forgiveness & Freedom",
              series: "Healing Journey",
              speaker: "Pastor David Wells",
              date: "Jun 8, 2026",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fade}
              className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition"
            >
              <div className="h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-amber-600" />
              </div>
              <div className="p-6">
                <span className="text-xs text-amber-700 font-semibold">{s.series}</span>
                <h3 className="font-bold text-lg text-gray-900 mt-1 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.speaker}</p>
                <p className="text-xs text-gray-400 mt-1">{s.date}</p>
                <button className="mt-4 text-sm text-amber-700 font-semibold hover:underline">
                  Watch Now →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-12 text-gray-900">
            What Our Members Say
          </h2>
          <div className="bg-white rounded-3xl shadow-sm p-10 relative">
            <div className="flex justify-center mb-4 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <motion.blockquote
              key={activeTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-gray-700 italic mb-6"
            >
              "{TESTIMONIALS[activeTestimonial].quote}"
            </motion.blockquote>
            <div className="font-bold text-gray-900">
              {TESTIMONIALS[activeTestimonial].name}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === activeTestimonial ? "bg-amber-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── GIVE ── */}
      <section id="give" className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-widest">
            Give
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900">
            Support Our Mission
          </h2>
          <p className="text-gray-500 mb-8">
            Your generosity enables us to reach more people, serve our community, and
            expand God's kingdom. Every gift matters.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {["$25", "$50", "$100"].map((amt) => (
              <button
                key={amt}
                className="py-4 rounded-2xl border-2 border-amber-200 font-bold text-amber-700 hover:bg-amber-50 transition"
              >
                Give {amt}
              </button>
            ))}
          </div>
          <button className="px-10 py-4 bg-amber-700 text-white font-bold rounded-full hover:bg-amber-800 transition shadow-lg">
            Give a Custom Amount
          </button>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-widest">
              Contact
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-8 text-gray-900">Get in Touch</h2>
            <div className="space-y-6 text-gray-600">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-700 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Address</div>
                  <div>123 Faith Avenue, Springfield, IL 62701</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-amber-700 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Phone</div>
                  <div>(217) 555-0192</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-amber-700 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div>hello@gracefellowship.church</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-amber-700 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Office Hours</div>
                  <div>Mon–Fri: 9 AM – 5 PM</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fade}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl shadow-sm">
                <Heart className="w-16 h-16 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-500">
                  We'll get back to you soon. God bless you!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-sm p-8 space-y-5"
              >
                <h3 className="text-xl font-bold text-gray-900">Send us a Message</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-700 text-white font-bold rounded-xl hover:bg-amber-800 transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Cross className="w-5 h-5 text-amber-500" />
            Grace Fellowship Church
          </div>
          <p className="text-sm text-center">
            123 Faith Avenue, Springfield, IL &nbsp;|&nbsp; (217) 555-0192
          </p>
          <p className="text-sm">© 2026 Grace Fellowship. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
