import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";
import {motion} from "framer-motion";

const BootcampJourney = () => {
  return (
    <section className="px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Bootcamp Journey
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Langkah menuju karier yang siap kerja
            </h2>
          </div>
        </FadeInUp>
        <div className="mx-auto mt-14 max-w-4xl px-2 sm:px-6">
          <StaggerContainer className="relative">
            {/* Garis vertikal penghubung */}
            <div className="absolute bottom-8 left-6.5 top-8 w-1 rounded-full bg-brand-100 sm:left-9.5" />
            
            <div className="flex flex-col gap-8 sm:gap-10">
              {[
                {
                  title: "Intensive Learning",
                  subtitle: "2 bulan • 9 pertemuan • 30+ sesi",
                  body: "Kurikulum terupdate sesuai kebutuhan industri 2026, full berbahasa Indonesia. Live session via Zoom, modul Notion, dan materi di Google Drive — termasuk post test, study case, dan live demo. Konsultasi di luar kelas bersama fasilitator.",
                },
                {
                  title: "Konsultasi & Mentoring",
                  subtitle: "24/7 Pendampingan Online",
                  body: "Pendampingan fasilitator dan mentor secara online kapan saja. Portal kontak cepat dan sistem penjadwalan untuk memudahkan peserta terhubung di luar jam kelas reguler.",
                },
                {
                  title: "Bootcamp Project",
                  subtitle: "Minggu ke-8 • Real-based Project",
                  body: "Proyek individu berbasis real-based project. Mitra perusahaan disediakan sehingga peserta dapat fokus menjalankan project. 1 minggu masa pengerjaan — hasil project langsung menjadi portofolio resmi untuk melamar kerja.",
                },
                {
                  title: "Bootcamp Graduation",
                  subtitle: "Sertifikasi & Komunitas Alumni",
                  body: "Sertifikasi penyelesaian bootcamp meliputi Rapor, Keterangan Kompetensi, dan Portofolio. Akses komunitas alumni untuk info eksklusif terkait event, peluang kerja, dan projek dari hiring partner maupun alumni.",
                },
              ].map((step, index) => (
                <StaggerItem key={step.title} className="relative flex gap-4 sm:gap-6">
                  {/* Number Indicator (Lingkaran di atas garis) */}
                  <motion.div
                    whileHover={{scale: 1.1, rotate: 5}}
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-brand-600 shadow-md sm:h-20 sm:w-20 sm:border-8">
                    <span className="text-lg font-bold text-white sm:text-2xl">
                      0{index + 1}
                    </span>
                  </motion.div>

                  {/* Card Content (Di sebelah kanan angka) */}
                  <motion.div
                    whileHover={{
                      y: -4,
                      boxShadow: "0 20px 40px -12px rgba(37, 99, 235, 0.1)",
                    }}
                    transition={{type: "spring", stiffness: 300, damping: 20}}
                    className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-brand-600 sm:text-base">
                        {step.subtitle}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {step.body}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default BootcampJourney;
