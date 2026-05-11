export const SentenceCounter = ({ sentence }: { sentence: string }) => {
  const length = sentence.length;
  const words = sentence.trim().split(/\s+/);
  const wordsCount = words[0] === "" ? 0 : words.length;

  return (
    <div className="flex items-center gap-2">
      <small className="text-neutral-500">Comprimento: {length}</small>
      <small className="text-neutral-500">Palavras: {wordsCount}</small>
    </div>
  );
};
