import React, { useState } from "react";

interface ProgressBarProps {
  max: number; // Maximum value of the progress bar
  value: number; // Current progress value
}

const ProgressBar: React.FC<ProgressBarProps> = ({ max, value }) => {
  const progressPercentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600 text-center">
        {Math.round(progressPercentage)}% completed
      </p>
    </div>
  );
};

const UsingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(30);

  const increaseProgress = () => {
    setProgress((prev) => (prev + 10 <= 100 ? prev + 10 : 100));
  };

  const decreaseProgress = () => {
    setProgress((prev) => (prev - 10 >= 0 ? prev - 10 : 0));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-4">Progress Bar</h1>
      <ProgressBar max={100} value={progress} />
      <div className="mt-4 flex gap-4">
        <button
          onClick={decreaseProgress}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Decrease
        </button>
        <button
          onClick={increaseProgress}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Increase
        </button>
      </div>
    </div> 
  );
};

export default UsingProgressBar;
