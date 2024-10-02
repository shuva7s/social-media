export default function SpecificCommunity({
  params,
}: {
  params: { comId: string };
}) {
  return (
    <main className="flex-1 mb-24">
      <h1 className="text-3xl font-semibold mt-4 text-foreground/60">
        Specific Community
      </h1>
      <p className="text-muted-foreground">id_{params.comId}</p>
    </main>
  )
}
