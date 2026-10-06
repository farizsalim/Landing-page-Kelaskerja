"use client";

import {faqs} from "@/data/faq";
import type {FaqCategory} from "@/data/faq";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  motion,
} from "../motion-wrapper";
import {useState} from "react";
import {AnimatePresence} from "framer-motion";
import {ChevronDown, Sparkles} from "lucide-react";
import ConsultationQuiz from "./ConsultationQuiz";

/** Shared accordion item — extracted to avoid duplication */
function FaqItem({
  faq,
  index,
  activeFaq,
  setActiveFaq,
}: {
  faq: {id: number; question: string; answer: string};
  index: number;
  activeFaq: number | null;
  setActiveFaq: (v: number | null) => void;
}) {
  const open = activeFaq === index;
  return (
    <article className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
      <motion.button
        whileHover={{backgroundColor: "rgba(248,250,252,1)"}}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        onClick={() => setActiveFaq(open ? null : index)}
        aria-expanded={open}>
        <span className="text-lg font-semibold text-slate-900">
          {faq.question}
        </span>
        <motion.span
          animate={{rotate: open ? 180 : 0}}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}>
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{height: 0, opacity: 0}}
            animate={{height: "auto", opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {duration: 0.25, delay: 0.05},
            }}
            className="px-6 pb-6">
            <div className="prose prose-slate max-w-none text-slate-700">
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

type FaqProps = {
  whatsappLink: string;
};

const FAQ_GROUPS: {key: FaqCategory; label: string}[] = [
  {key: "umum", label: "Sebelum kamu daftar"},
  {key: "pelaksanaan", label: "Saat kamu mulai belajar"},
];

const featuredFaqIds = new Set([1, 2, 3, 4, 6, 9, 10, 15]);

const Faq = ({whatsappLink}: FaqProps) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <section id="faq" className="section-light border-y border-slate-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Hal yang perlu kamu tahu sebelum mulai
            </h2>
          </div>
        </FadeInUp>

        {/* Grouped FAQ sections */}
        <div className="mt-10 space-y-12">
          {FAQ_GROUPS.map((group) => {
            const groupFaqs = faqs.filter(
              (f) => f.category === group.key && (showAllFaqs || featuredFaqIds.has(f.id))
            );
            if (groupFaqs.length === 0) return null;

            return (
              <div key={group.key}>
                <FadeInUp>
                  <h3 className="mb-6 text-xl font-semibold text-slate-800">
                    {group.label}
                  </h3>
                </FadeInUp>
                <StaggerContainer
                  key={`${group.key}-${showAllFaqs ? "all" : "featured"}`}
                  className="space-y-4"
                >
                  {groupFaqs.map((faq, index) => {
                    // Use a globally unique index for accordion state
                    const globalIndex = faqs.findIndex((f) => f.id === faq.id);
                    return (
                      <StaggerItem key={faq.id}>
                        <FaqItem
                          faq={faq}
                          index={globalIndex}
                          activeFaq={activeFaq}
                          setActiveFaq={setActiveFaq}
                        />
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowAllFaqs((current) => !current)}
          className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-500 hover:text-brand-700"
        >
          {showAllFaqs ? "Tampilkan lebih sedikit" : "Lihat pertanyaan lainnya"}
          <ChevronDown
            size={16}
            className={`transition-transform ${showAllFaqs ? "rotate-180" : ""}`}
          />
        </button>

        {/* Quiz CTA */}
        <FadeInUp delay={0.1}>
          <div className="mt-12 text-center">
            <p className="mb-4 text-lg text-slate-600">
              Masih bingung memilih kelas?
            </p>
            <button
              type="button"
              onClick={() => setIsQuizOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-[#1e2024] transition hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/30"
            >
              <Sparkles size={19} className="transition-transform group-hover:rotate-12" />
              Coba quiz rekomendasi
            </button>
          </div>
        </FadeInUp>
      </div>
      <ConsultationQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        whatsappLink={whatsappLink}
      />
    </section>
  );
};

export default Faq;
