import { RotatingLines, Watch } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-black/80 absolute top-0 left-0 flex flex-col gap-1 items-center justify-center">
      {/* <RotatingLines
        visible={true}
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading" */}
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#fff"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className="text-white text-2xl font-bold tracking-widest">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
