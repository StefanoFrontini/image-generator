const Button = ({ generateImageRequest, state }) => {
  return (
    <>
      <button
        onClick={() => generateImageRequest(state.prompt, state.size, state.n)}
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-violet-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      >
        Generate
      </button>
    </>
  );
};
export default Button;
