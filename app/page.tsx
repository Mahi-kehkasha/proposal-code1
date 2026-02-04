import ValentineExperience from "@/components/valentine/ValentineExperience";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-aurora bg-aurora-drift opacity-80"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10 sm:max-w-4xl sm:px-8 sm:py-14">
        <div className="w-full">
          <ValentineExperience />
        </div>
      </div>
    </main>
  );
}
