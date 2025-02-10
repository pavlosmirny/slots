import { useState } from "react";

// Keep the LEDDigit component unchanged...
// eslint-disable-next-line react/prop-types
const LEDDigit = ({ value }) => {
  const segments = {
    0: [1, 1, 1, 1, 1, 1, 0],
    1: [0, 1, 1, 0, 0, 0, 0],
    2: [1, 1, 0, 1, 1, 0, 1],
    3: [1, 1, 1, 1, 0, 0, 1],
    4: [0, 1, 1, 0, 0, 1, 1],
    5: [1, 0, 1, 1, 0, 1, 1],
    6: [1, 0, 1, 1, 1, 1, 1],
    7: [1, 1, 1, 0, 0, 0, 0],
    8: [1, 1, 1, 1, 1, 1, 1],
    9: [1, 1, 1, 1, 0, 1, 1],
  };

  const active = segments[value] || segments[0];

  return (
    <svg viewBox="0 0 60 100" className="w-20 h-32">
      {" "}
      {/* Increased size */}
      {/* The segments are the same, but with a brighter red color */}
      <path
        d="M 10,10 L 50,10 L 45,15 L 15,15 Z"
        fill={active[0] ? "#ff1a1a" : "#330000"}
      />
      <path
        d="M 50,10 L 55,15 L 55,45 L 50,50 L 45,45 L 45,15 Z"
        fill={active[1] ? "#ff1a1a" : "#330000"}
      />
      <path
        d="M 50,50 L 55,55 L 55,85 L 50,90 L 45,85 L 45,55 Z"
        fill={active[2] ? "#ff1a1a" : "#330000"}
      />
      <path
        d="M 10,90 L 50,90 L 45,85 L 15,85 Z"
        fill={active[3] ? "#ff1a1a" : "#330000"}
      />
      <path
        d="M 10,50 L 15,55 L 15,85 L 10,90 L 5,85 L 5,55 Z"
        fill={active[4] ? "#ff1a1a" : "#330000"}
      />
      <path
        d="M 10,10 L 15,15 L 15,45 L 10,50 L 5,45 L 5,15 Z"
        fill={active[5] ? "#ff1a1a" : "#330000"}
      />
      <path
        d="M 10,50 L 50,50 L 45,45 L 15,45 Z"
        fill={active[6] ? "#ff1a1a" : "#330000"}
      />
    </svg>
  );
};

const LuxurySlotMachine = () => {
  // Create audio elements
  const spinSound = new Audio("/sounds/spin.mp3");

  spinSound.loop = true; // The spin sound will repeat

  const winSound = new Audio("/sounds/win.mp3");
  const jackpotSound = new Audio("/sounds/jackpot.mp3");
  const buttonSound = new Audio("/sounds/button.mp3");
  // States remain the same...
  const [numbers, setNumbers] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(10);
  const [message, setMessage] = useState("You have 10 free spins!");
  const [totalWins, setTotalWins] = useState(0);
  const [lastWin, setLastWin] = useState(0);

  // The win checking logic remains the same...
  const checkWin = (nums) => {
    const firstTwoMatch = (n) => nums[0] === n && nums[1] === n;

    if (nums[0] === 7 && nums[1] === 7 && nums[2] === 7)
      return {
        win: true,
        amount: 200,
        message: "🌟 MEGA JACKPOT! 777! Win X200! 🌟",
      };
    if (nums[0] === 9 && nums[1] === 9 && nums[2] === 9)
      return {
        win: true,
        amount: 100,
        message: "💎 SUPER! 999! Win X100! 💎",
      };
    if (nums[0] === 3 && nums[1] === 3 && nums[2] === 3)
      return { win: true, amount: 50, message: "🎰 333! Win X50! 🎰" };
    if (nums[0] === 8 && nums[1] === 8 && nums[2] === 8)
      return { win: true, amount: 25, message: "✨ 888! Win X25! ✨" };
    if (nums[0] === 5 && nums[1] === 5 && nums[2] === 5)
      return { win: true, amount: 25, message: "🎯 555! Win X25! 🎯" };
    if (nums[0] === 4 && nums[1] === 4 && nums[2] === 4)
      return { win: true, amount: 20, message: "🎲 444! Win X20! 🎲" };
    if (nums[0] === 2 && nums[1] === 2 && nums[2] === 2)
      return { win: true, amount: 15, message: "🎪 222! Win X15! 🎪" };
    if (nums[0] === 1 && nums[1] === 1 && nums[2] === 1)
      return { win: true, amount: 10, message: "🎨 111! Win X10! 🎨" };

    if (firstTwoMatch(9))
      return {
        win: true,
        amount: 5,
        message: "✨ Two nines! Win X5! ✨",
      };
    if (firstTwoMatch(8))
      return {
        win: true,
        amount: 5,
        message: "✨ Two eights! Win X5! ✨",
      };
    if (firstTwoMatch(7))
      return {
        win: true,
        amount: 5,
        message: "✨ Two sevens! Win X5! ✨",
      };
    if (firstTwoMatch(5))
      return {
        win: true,
        amount: 5,
        message: "✨ Two fives! Win X5! ✨",
      };
    if (firstTwoMatch(4))
      return {
        win: true,
        amount: 3,
        message: "🎲 Two fours! Win X3! 🎲",
      };
    if (firstTwoMatch(3))
      return { win: true, amount: 3, message: "🎲 Two threes! Win X3! 🎲" };
    if (firstTwoMatch(2))
      return { win: true, amount: 3, message: "🎲 Two twos! Win X3! 🎲" };
    if (firstTwoMatch(1))
      return {
        win: true,
        amount: 3,
        message: "🎲 Two ones! Win X3! 🎲",
      };
    if (firstTwoMatch(0))
      return { win: true, amount: 3, message: "🎲 Two zeros! Win X3! 🎲" };

    if (nums[0] === 0)
      return { win: true, amount: 2, message: "🎲 Zero! Win X2! 🎲" };
    if (nums[0] === 7)
      return { win: true, amount: 1, message: "🎲 Seven! Win X1! 🎲" };

    return { win: false, amount: 0, message: "Try again! 🎰" };
  };

  // The spin logic remains the same...
  const spin = () => {
    if (spinning || spinsLeft <= 0) return;

    // Play the button sound
    buttonSound.play();

    setSpinning(true);
    setMessage("🎰 Spinning... 🎰");

    // Start the spin sound
    spinSound.currentTime = 0;
    spinSound.play();

    let counter = 0;
    const interval = setInterval(() => {
      setNumbers([
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ]);

      counter++;
      if (counter > 20) {
        clearInterval(interval);
        const finalNumbers = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ];
        setNumbers(finalNumbers);
        setSpinning(false);
        setSpinsLeft((prev) => prev - 1);

        // Stop the spin sound
        spinSound.pause();
        spinSound.currentTime = 0;

        const result = checkWin(finalNumbers);
        setMessage(result.message);
        if (result.win) {
          setLastWin(result.amount);
          setTotalWins((prev) => prev + result.amount);

          // Play the win sound
          if (result.amount >= 100) {
            // Special sound for jackpot
            jackpotSound.currentTime = 0;
            jackpotSound.play();
          } else {
            // For regular wins
            winSound.currentTime = 0;
            winSound.play();
          }
        } else {
          setLastWin(0);
        }
      }
    }, 100);
  };

  const resetGame = () => {
    // Play the button sound
    buttonSound.play();

    setSpinsLeft(10);
    setNumbers([0, 0, 0]);
    setMessage("You have 10 free spins! 🎰");
    setTotalWins(0);
    setLastWin(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        {/* Main body of the slot machine */}
        {/* Main body of the slot machine */}
        <div className="relative bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 rounded-3xl p-8 shadow-2xl border-8 border-yellow-600">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-yellow-400 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-yellow-400 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-yellow-400 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-yellow-400 rounded-br-3xl"></div>

          {/* Slot machine name */}
          <div className="bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900 rounded-xl p-6 mb-8 border-4 border-yellow-400 shadow-lg">
            <div className="bg-black rounded-lg p-4">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 text-transparent bg-clip-text animate-pulse">
                GOLDEN FORTUNE
              </h2>
            </div>
          </div>

          {/* Display with digits */}
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-xl p-8 mb-6 border-4 border-yellow-600 shadow-inner">
            <div className="flex justify-center gap-6 bg-black p-6 rounded-lg">
              {numbers.map((num, index) => (
                <div
                  key={index}
                  className="bg-black rounded-lg shadow-inner transform hover:scale-105 transition-transform"
                >
                  <LEDDigit value={num} />
                </div>
              ))}
            </div>
          </div>

          {/* Information panel */}
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-xl p-6 mb-6 border-2 border-yellow-600">
            <p className="text-xl text-yellow-400 text-center mb-3 font-bold">
              Spins left: {spinsLeft}
            </p>
            <p className="text-xl font-bold text-center mb-3 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 text-transparent bg-clip-text min-h-8">
              {message}
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-black rounded-lg p-3 border border-yellow-600">
                <p className="text-yellow-400">Last win</p>
                <p className="text-2xl font-bold text-yellow-300">X{lastWin}</p>
              </div>
              <div className="bg-black rounded-lg p-3 border border-yellow-600">
                <p className="text-yellow-400">Total wins</p>
                <p className="text-2xl font-bold text-yellow-300">
                  X{totalWins}
                </p>
              </div>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={spin}
              disabled={spinning || spinsLeft <= 0}
              className={`
                px-12 py-6 rounded-full text-2xl font-bold
                transform transition-all active:scale-95
                ${
                  spinning || spinsLeft <= 0
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500"
                }
                text-white border-4 border-yellow-400 shadow-lg
                hover:shadow-xl hover:scale-105
              `}
            >
              {spinning ? "🎰 SPIN... 🎰" : "🎰 SPIN! 🎰"}
            </button>

            {spinsLeft <= 0 && (
              <button
                onClick={resetGame}
                className="
                  px-12 py-6 rounded-full
                  bg-gradient-to-r from-green-600 via-green-500 to-green-600
                  hover:from-green-500 hover:via-green-400 hover:to-green-500
                  text-white font-bold text-2xl
                  shadow-lg hover:shadow-xl
                  transform hover:scale-105 active:scale-95 transition-all
                  border-4 border-yellow-400
                "
              >
                🎮 NEW GAME 🎮
              </button>
            )}
          </div>

          {/* Decorative elements */}
          <div className="flex justify-between mb-6">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50"></div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50"></div>
              <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
            </div>
          </div>

          {/* Winning combinations table */}
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-xl p-6 border-2 border-yellow-600">
            <h3 className="text-center font-bold text-2xl mb-4 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 text-transparent bg-clip-text">
              WINNING COMBINATIONS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="bg-black bg-opacity-50 p-2 rounded border border-yellow-600">
                  <span className="text-yellow-400">777</span>
                  <span className="text-white float-right">X200</span>
                </div>
                <div className="bg-black bg-opacity-50 p-2 rounded border border-yellow-600">
                  <span className="text-yellow-400">999</span>
                  <span className="text-white float-right">X100</span>
                </div>
                <div className="bg-black bg-opacity-50 p-2 rounded border border-yellow-600">
                  <span className="text-yellow-400">333</span>
                  <span className="text-white float-right">X50</span>
                </div>
                <div className="bg-black bg-opacity-50 p-2 rounded border border-yellow-600">
                  <span className="text-yellow-400">888/555</span>
                  <span className="text-white float-right">X25</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-black bg-opacity-50 p-2 rounded border border-yellow-600">
                  <span className="text-yellow-400">444</span>
                  <span className="text-white float-right">X20</span>
                </div>
                <div className="bg-black bg-opacity-50 p-2 rounded border border-yellow-600">
                  <span className="text-yellow-400">222</span>
                  <span className="text-white float-right">X15</span>
                </div>
                <div className="bg-black bg-opacity-50 p-2 rounded border border-yellow-600">
                  <span className="text-yellow-400">111</span>
                  <span className="text-white float-right">X10</span>
                </div>
                <div className="bg-black bg-opacity-50 p-2 rounded border border-yellow-600">
                  <span className="text-yellow-400">XX-</span>
                  <span className="text-white float-right">X3-5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxurySlotMachine;
