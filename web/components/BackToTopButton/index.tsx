export default function BackToTopButton() {
  return (
    <>
      <div className="lg:block hidden sticky top-[calc(50%-60px)] size-16 rounded-full bg-neutral-800" />
      <div className="lg:hidden sticky left-full right-0 size-10 rounded-full bg-neutral-800" />
    </>
  );
}
