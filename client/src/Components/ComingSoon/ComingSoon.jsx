import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  // Change the targetDate to the date you want to countdown to
  const targetDate = new Date("2025-12-31T00:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div className="min-h-screen dark:bg-slate-400 flex items-center justify-center">
      <div className="text-center animate-center-content">
        <div className="animate-spin h-10 w-10 border-t-4 border-gray-800 border-solid rounded-full mb-4 mx-auto "></div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Coming Soon!
        </h1>

        {timeLeft.days ||
        timeLeft.hours ||
        timeLeft.minutes ||
        timeLeft.seconds ? (
          <div>
            <p className="text-lg md:text-xl text-gray-600">
              We're working hard to bring you something amazing.
            </p>
            <div className="mt-6 text-xl md:text-2xl text-gray-800">
              {timeLeft.days && (
                <span className="mr-4">
                  {timeLeft.days} {timeLeft.days === 1 ? "Day" : "Days"}
                </span>
              )}
              {timeLeft.hours && (
                <span className="mr-4">
                  {timeLeft.hours} {timeLeft.hours === 1 ? "Hour" : "Hours"}
                </span>
              )}
              {timeLeft.minutes && (
                <span className="mr-4">
                  {timeLeft.minutes}{" "}
                  {timeLeft.minutes === 1 ? "Minute" : "Minutes"}
                </span>
              )}
              <span>
                {timeLeft.seconds}{" "}
                {timeLeft.seconds === 1 ? "Second" : "Seconds"}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-lg md:text-xl text-gray-600">
            Stay tuned for our exciting update!
          </p>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
