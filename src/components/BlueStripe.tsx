type Props = {
  text?: string;
};

/**
 * Thick blue horizontal stripe used as a section divider (momi's red bar).
 * Pass `text` to embed a label inside the stripe in reverse type.
 */
export function BlueStripe({ text }: Props) {
  return (
    <div
      className="bg-accent text-on-accent w-full"
      role="separator"
      aria-hidden={text ? undefined : true}
    >
      <div className="mx-auto flex h-10 max-w-6xl items-center px-4 sm:h-12">
        {text && (
          <span className="font-display text-lg tracking-widest uppercase sm:text-xl">
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
