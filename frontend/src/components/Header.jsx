import { useSpring, animated } from "@react-spring/web";
const Header = () => {
  const style = useSpring({
    from: { opacity: 0, y: -300 },
    to: { opacity: 1, y: 0 },
  });
  return (
    <animated.div style={style}>
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-violet-600">
            Artificial Intelligence
          </h2>
          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Open AI Image Generator
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Create realistic images and art from a description in natural
            language.
          </p>
        </div>
      </div>
    </animated.div>
  );
};
export default Header;
