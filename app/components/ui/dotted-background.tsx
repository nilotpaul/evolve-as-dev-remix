const DottedBackground = () => {
  return (
    <div
      aria-disabled='true'
      className='fixed left-0 top-0 -z-50 flex h-[50rem] w-full items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]'
    >
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black' />
    </div>
  );
};

export default DottedBackground;
