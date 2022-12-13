import Loading from "./Loading";
const Images = ({ promptSubmit, data, loading }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <p className="mb-8 text-center text-lg font-semibold tracking-tight text-gray-900 sm:text-xl lg:text-1xl ">
          {promptSubmit}
        </p>
        <h2 className="sr-only">Images</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data &&
            data.map((el, index) => (
              <div
                key={index}
                className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
              >
                <img
                  src={el.url}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Images;
