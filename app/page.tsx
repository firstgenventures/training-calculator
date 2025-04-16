"use client";
import React, { useState } from "react";

import Head from 'next/head';

const HeroAndNav = () => (
  <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Anton:wght@700;800&family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
      <title>1000 Pound Club Powerlifting Calculator</title>
    </Head>
    {/* NAVIGATION BAR */}
    <nav className="navbar raw-steel-navbar">
      <div className="navbar-logo">1000 POUND CLUB</div>
      <div className="navbar-links">
        <a className="navbar-link" href="#">HOME</a>
        <a className="navbar-link" href="#">WARM UP</a>
        <a className="navbar-link" href="#">NUTRITION</a>
        <a className="navbar-link" href="#">GEAR</a>
      </div>
    </nav>
    {/* HERO SECTION */}
    <section className="hero raw-steel-hero">
      <h1 className="hero-title">BREAKTHROUGH YOUR LIMITS: THE 1000 POUND CLUB</h1>
      <p className="hero-copy"><b>THE ULTIMATE TEST OF STRENGTH</b> awaits those bold enough to pursue it. While some athletes chase the glory of conquering 26.2 miles in a marathon and others dive into the flashy worlds of CrossFit or Hyrox competitions, there's something fundamentally different about pure strength—something raw and primal that speaks to our deepest nature.</p>
      <p className="hero-copy"><b>WHAT DEFINES GREATNESS</b> in the strength world? Simple but monumental: a combined one-rep max of 1000 pounds across the squat, bench press, and deadlift. This prestigious benchmark represents not just physical power but the mental fortitude required to push beyond perceived limitations.</p>
      <p className="hero-copy"><b>THE JOURNEY TO 1000</b> isn't reserved for genetic freaks or pros. With proper training, nutrition, and dedication, it's attainable for everyday athletes willing to commit to the process. Elite lifters might reach it in 1-2 years, but for most of us mortals, it's about consistency and unwavering dedication—the reward is joining a brotherhood and sisterhood of strength that few will ever experience.</p>
      <p className="hero-copy"><b>IMAGINE THE MOMENT</b> when the bar bends under your final lift, completing your 1000-pound total. The culmination of countless early mornings, callused hands, and personal battles fought under the barbell. This isn't just about moving iron—it's about proving that limitations exist only in the mind.</p>
      <p className="hero-copy"><b>ARE YOU READY</b> to transform your training from routine to remarkable? Train. Plan. Succeed. The 1000 Pound Club awaits—not with a thousand pounds, but with your very next rep.</p>
    </section>
  </>
);

const TrainingCalculatorNew = () => {
  // Step state: 1 = current, 2 = show target, 3 = training details, 4 = plan
  const [step, setStep] = useState<number>(1);

  // State for current lift values
  const [currentSquat, setCurrentSquat] = useState<string>("");
  const [currentBench, setCurrentBench] = useState<string>("");
  const [currentDeadlift, setCurrentDeadlift] = useState<string>("");
  const [currentSquatReps, setCurrentSquatReps] = useState<string>("");
  const [currentBenchReps, setCurrentBenchReps] = useState<string>("");
  const [currentDeadliftReps, setCurrentDeadliftReps] = useState<string>("");

  // State for target lift values (1RM only, no reps for targets)
  const [targetSquat, setTargetSquat] = useState<string>("");
  const [targetBench, setTargetBench] = useState<string>("");
  const [targetDeadlift, setTargetDeadlift] = useState<string>("");
  
  // Suggest target 1RMs with proper powerlifting proportions (20% bench, 35% squat, 45% deadlift)
  // and aiming for the 1000 pound club
  const suggestTargets = (currentSquat: number, currentBench: number, currentDeadlift: number) => {
    const currentTotal = currentSquat + currentBench + currentDeadlift;
    if (currentTotal <= 0) return { squat: 0, bench: 0, deadlift: 0 };
    
    // If already at or above 1000, suggest modest 5% increase
    if (currentTotal >= 1000) {
      return {
        squat: Math.round(currentSquat * 1.05),
        bench: Math.round(currentBench * 1.05),
        deadlift: Math.round(currentDeadlift * 1.05)
      };
    }
    
    // Calculate increase needed to reach 1000 pounds
    const increaseNeeded = 1000 - currentTotal;
    
    // Distribute increases according to powerlifting proportions
    return {
      squat: Math.round(currentSquat + (increaseNeeded * 0.35)),
      bench: Math.round(currentBench + (increaseNeeded * 0.20)),
      deadlift: Math.round(currentDeadlift + (increaseNeeded * 0.45))
    };
  };


  // State for training frequency, timeframe, and target date
  const [frequency, setFrequency] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  // New fields for advanced program generation
  const [age, setAge] = useState<string>("");
  // Height now in feet/inches
  const [heightFeet, setHeightFeet] = useState<string>("");
  const [heightInches, setHeightInches] = useState<string>("");
  // Bodyweight in lbs
  const [bodyweight, setBodyweight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [split, setSplit] = useState<string>("");

  // Section reveal state
  const [showCurrent, setShowCurrent] = useState(true);
  const [show1RM, setShow1RM] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  // Calculate estimated 1RM using Brzycki formula
  const calculate1RM = (weight: string, reps: string) => {
    const weightNum = weight === "" ? 0 : Number.parseInt(weight);
    const repsNum = reps === "" ? 1 : Number.parseInt(reps);
    if (repsNum <= 0 || weightNum <= 0) return 0;
    if (repsNum === 1) return weightNum;
    return Math.round(weightNum * (36 / (37 - repsNum)));
  };

  const estimatedSquat1RM = calculate1RM(currentSquat, currentSquatReps);
  const estimatedBench1RM = calculate1RM(currentBench, currentBenchReps);
  const estimatedDeadlift1RM = calculate1RM(currentDeadlift, currentDeadliftReps);

  // Total and progress toward 1000 lb club (current)
  const total1RM = estimatedSquat1RM + estimatedBench1RM + estimatedDeadlift1RM;
  const progressPercent = Math.min(100, (total1RM / 1000) * 100);

  // Target lifts are already 1RMs (no need to calculate from reps)
  const estimatedTargetSquat1RM = targetSquat === "" ? 0 : Number.parseInt(targetSquat);
  const estimatedTargetBench1RM = targetBench === "" ? 0 : Number.parseInt(targetBench);
  const estimatedTargetDeadlift1RM = targetDeadlift === "" ? 0 : Number.parseInt(targetDeadlift);
  const totalTarget1RM = estimatedTargetSquat1RM + estimatedTargetBench1RM + estimatedTargetDeadlift1RM;
  const targetProgressPercent = Math.min(100, (totalTarget1RM / 1000) * 100);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2em" }}>
      <h2>Training Calculator</h2>

      {/* Step 1: Current Lifts */}
      {showCurrent && (
        <section>
          <h3>Current Lifts</h3>
          <div>
            <label>
              Squat (lbs):
              <input
                type="number"
                value={currentSquat}
                onChange={e => setCurrentSquat(e.target.value)}
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                value={currentSquatReps}
                onChange={e => setCurrentSquatReps(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Bench (lbs):
              <input
                type="number"
                value={currentBench}
                onChange={e => setCurrentBench(e.target.value)}
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                value={currentBenchReps}
                onChange={e => setCurrentBenchReps(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Deadlift (lbs):
              <input
                type="number"
                value={currentDeadlift}
                onChange={e => setCurrentDeadlift(e.target.value)}
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                value={currentDeadliftReps}
                onChange={e => setCurrentDeadliftReps(e.target.value)}
              />
            </label>
          </div>
          <button
            style={{ marginTop: "1em" }}
            onClick={() => setShow1RM(true)}
            disabled={
              !currentSquat || !currentSquatReps ||
              !currentBench || !currentBenchReps ||
              !currentDeadlift || !currentDeadliftReps
            }
          >
            See Estimated 1RMs
          </button>
        </section>
      )}

      {/* Step 2: Show estimated 1RMs for current lifts */}
      {show1RM && (
        <section>
          <h3>Estimated 1 Rep Max (Current)</h3>
          <ul>
            <li>Squat: <b>{estimatedSquat1RM}</b> lbs</li>
            <li>Bench: <b>{estimatedBench1RM}</b> lbs</li>
            <li>Deadlift: <b>{estimatedDeadlift1RM}</b> lbs</li>
          </ul>
          <div style={{ marginTop: "1em" }}>
            <button onClick={() => {
              setTargetSquat(suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).squat.toString());
              setTargetBench(suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).bench.toString());
              setTargetDeadlift(suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).deadlift.toString());
              setShowTarget(true);
            }}>
              See Target Lifts
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Target Lifts (prefilled) */}
      {showTarget && (
        <section>
          <h3>Set Your Target 1-Rep Max Goals</h3>
          {/* Suggested targets based on 1000 pound club and proper powerlifting proportions */}
          {estimatedSquat1RM > 0 && estimatedBench1RM > 0 && estimatedDeadlift1RM > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm font-medium text-blue-800 mb-2">Suggested targets for 1000 lb club:</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Squat:</span> {suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).squat} lbs
                </div>
                <div>
                  <span className="font-medium">Bench:</span> {suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).bench} lbs
                </div>
                <div>
                  <span className="font-medium">Deadlift:</span> {suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).deadlift} lbs
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">These targets distribute gains proportionally (35% squat, 20% bench, 45% deadlift)</p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="targetSquat" className="block text-sm font-medium">Target Squat 1RM</label>
              <div className="flex">
                <input
                  id="targetSquat"
                  type="number"
                  value={targetSquat}
                  onChange={(e) => setTargetSquat(e.target.value)}
                  placeholder={estimatedSquat1RM > 0 ? suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).squat.toString() : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <span className="ml-2 py-1.5 px-3 bg-gray-100 rounded-md text-sm text-gray-700">lbs</span>
              </div>
            </div>
            <div>
              <label htmlFor="targetBench" className="block text-sm font-medium">Target Bench 1RM</label>
              <div className="flex">
                <input
                  id="targetBench"
                  type="number"
                  value={targetBench}
                  onChange={(e) => setTargetBench(e.target.value)}
                  placeholder={estimatedBench1RM > 0 ? suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).bench.toString() : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <span className="ml-2 py-1.5 px-3 bg-gray-100 rounded-md text-sm text-gray-700">lbs</span>
              </div>
            </div>
            <div>
              <label htmlFor="targetDeadlift" className="block text-sm font-medium">Target Deadlift 1RM</label>
              <div className="flex">
                <input
                  id="targetDeadlift"
                  type="number"
                  value={targetDeadlift}
                  onChange={(e) => setTargetDeadlift(e.target.value)}
                  placeholder={estimatedDeadlift1RM > 0 ? suggestTargets(estimatedSquat1RM, estimatedBench1RM, estimatedDeadlift1RM).deadlift.toString() : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <span className="ml-2 py-1.5 px-3 bg-gray-100 rounded-md text-sm text-gray-700">lbs</span>
              </div>
            </div>
          </div>
          {/* Display total and progress toward 1000 lb club */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progress to 1000 lb Club:</span>
              <span className="text-sm font-medium">{estimatedTargetSquat1RM + estimatedTargetBench1RM + estimatedTargetDeadlift1RM} / 1000 lbs</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, ((estimatedTargetSquat1RM + estimatedTargetBench1RM + estimatedTargetDeadlift1RM) / 1000) * 100)}%` }}
              ></div>
            </div>
          </div>
          <button onClick={() => setShowDetails(true)} style={{ marginTop: "1em" }}>
            Enter Training Details
          </button>
        </section>
      )}

      {/* Step 4: Training Details */}
      {showDetails && (
        <section>
          <h3>Training Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', maxWidth: 400 }}>
            <label>
              Age:
              <input
                type="number"
                min={10}
                max={100}
                value={age}
                onChange={e => setAge(e.target.value)}
                style={{ width: 80, marginLeft: 8 }}
                required
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                min={4}
                max={7}
                value={heightFeet}
                onChange={e => setHeightFeet(e.target.value)}
                style={{ width: 40, marginLeft: 8 }}
                required
                placeholder="ft"
              />
              <span style={{ margin: '0 4px' }}>ft</span>
              <input
                type="number"
                min={0}
                max={11}
                value={heightInches}
                onChange={e => setHeightInches(e.target.value)}
                style={{ width: 40 }}
                required
                placeholder="in"
              />
              <span style={{ marginLeft: 4 }}>in</span>
            </label>
            <label>
              Weight (lbs):
              <input
                type="number"
                min={60}
                max={600}
                value={bodyweight}
                onChange={e => setBodyweight(e.target.value)}
                style={{ width: 80, marginLeft: 8 }}
                required
              />
            </label>
            <label>
              Gender:
              <select value={gender} onChange={e => setGender(e.target.value)} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              Training Frequency (days/week):
              <select value={frequency} onChange={e => setFrequency(e.target.value)} required>
                <option value="">Select</option>
                {[2,3,4,5,6].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label>
              Training Split Preference:
              <select value={split} onChange={e => setSplit(e.target.value)} required>
                <option value="">Select</option>
                <option value="together">Upper/Lower Together</option>
                <option value="separate">Upper/Lower Separate</option>
              </select>
            </label>
            <label>
              Timeframe (weeks):
              <input
                type="number"
                min={1}
                value={timeframe}
                onChange={e => setTimeframe(e.target.value)}
                placeholder="Enter number of weeks"
                style={{ width: 100 }}
              />
              <span style={{ marginLeft: 8, fontSize: '0.9em', color: '#888' }}>(Optional)</span>
            </label>
            <label>
              Target Date (optional):
              <input
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                style={{ width: 150 }}
              />
              <span style={{ marginLeft: 8, fontSize: '0.9em', color: '#888' }}>(Optional)</span>
            </label>
          </div>
          <button
            style={{ marginTop: "1em" }}
            onClick={() => {
              if (age && heightFeet && heightInches && bodyweight && gender && frequency && split) {
                setShowPlan(true);
              }
            }}
            disabled={!age || !heightFeet || !heightInches || !bodyweight || !gender || !frequency || !split}
          >
            Generate Workout Plan
          </button>
        </section>
      )}

      {/* Step 5: Plan Generator - Collapsible Weeks */}
      {showPlan && (
        <section>
          <h3>Your Personalized Workout Plan</h3>
          <PlanAccordion
            weeks={parseInt(timeframe) || 1}
            startDate={targetDate ? new Date() : null}
            endDate={targetDate ? new Date(targetDate) : null}
            showDates={!!(targetDate)}
            squatStart={estimatedSquat1RM}
            squatEnd={estimatedTargetSquat1RM}
            benchStart={estimatedBench1RM}
            benchEnd={estimatedTargetBench1RM}
            deadliftStart={estimatedDeadlift1RM}
            deadliftEnd={estimatedTargetDeadlift1RM}
            frequency={parseInt(frequency) || 3}
            split={split}
            accessoriesConfig={{ gender, experience: null /* will be calculated in PlanAccordion */, bodyweight: parseFloat(bodyweight || "0") }}
          />
        </section>
      )}
     </div>
   );
};

// --- PlanAccordion: Collapsible Week-by-Week Plan ---
// Already imported useState at the top, so remove duplicate import here.

// Add index signature so TS knows keys are strings
const ACCESSORY_POOL: Record<string, string[]> = {
  squat: [
    "Front Squat", "Pause Squat", "Box Squat", "Hack Squat", "Leg Extension", "Good Morning", "RDL", "Glute-Ham Raise"
  ],
  bench: [
    "Close-Grip Bench", "Incline Bench", "Dumbbell Press", "Rows", "Face Pulls", "Pull-Ups", "Tricep Pushdown", "Dips"
  ],
  deadlift: [
    "Deficit Deadlift", "Rack Pull", "Snatch-Grip Deadlift", "Back Extension", "Farmer's Walk", "Static Hold", "High-Rep Deadlift"
  ]
};

function getRandomAccessories(lift: string, n: number) {
  const pool = ACCESSORY_POOL[lift] || [];
  // For bench, always include close-grip bench if possible
  if (lift === "bench" && n > 0 && pool.includes("Close-Grip Bench")) {
    const otherAccessories = pool.filter(acc => acc !== "Close-Grip Bench")
      .sort(() => 0.5 - Math.random())
      .slice(0, n - 1);
    return ["Close-Grip Bench", ...otherAccessories];
  }
  
  // For other lifts, randomize as before
  const shuffled = pool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function getExperienceLevel(total: number, bodyweight: number, gender: string) {
  if (!bodyweight || !gender) return "beginner";
  const ratio = total / bodyweight;
  if (gender === "male") {
    if (ratio < 2.5) return "beginner";
    if (ratio < 4) return "intermediate";
    return "advanced";
  } else {
    if (ratio < 1.8) return "beginner";
    if (ratio < 3) return "intermediate";
    return "advanced";
  }
}

function PlanAccordion({
  weeks,
  startDate,
  endDate,
  showDates,
  squatStart,
  squatEnd,
  benchStart,
  benchEnd,
  deadliftStart,
  deadliftEnd,
  frequency,
  split,
  accessoriesConfig
}: any) {
  const [openWeek, setOpenWeek] = useState<number | null>(0);
  // Calculate experience
  const total = squatStart + benchStart + deadliftStart;
  const experience = getExperienceLevel(total, accessoriesConfig.bodyweight, accessoriesConfig.gender);

  // Deload logic
  let deloadEvery = 6;
  if (experience === "intermediate") deloadEvery = 4;
  if (experience === "advanced") deloadEvery = 3;

  // Progression rates with proper powerlifting proportions
  const totalIncrease = (squatEnd + benchEnd + deadliftEnd) - (squatStart + benchStart + deadliftStart);
  const squatInc = totalIncrease > 0 ? ((squatEnd - squatStart) / weeks) : 0;
  const benchInc = totalIncrease > 0 ? ((benchEnd - benchStart) / weeks) : 0;
  const deadliftInc = totalIncrease > 0 ? ((deadliftEnd - deadliftStart) / weeks) : 0;

  // Define a type for our workout scheme
  type WorkoutScheme = {
    scheme: string;
    sets: number;
    reps: number;
    pct: number;
    isDeload?: boolean;
  };

  // Periodization by experience
  function getPeriodization(week: number, totalWeeks: number): WorkoutScheme {
    // Determine which phase of training we're in (early, mid, late)
    const phase = week < totalWeeks * 0.3 ? "early" : 
                 week < totalWeeks * 0.7 ? "mid" : "late";
    
    // Is this a deload week?
    const isDeload = (week % deloadEvery) === 0;
    
    // Create more varied workout patterns based on phase, experience, and day of week
    if (isDeload) {
      return {
        scheme: "deload",
        sets: 3,
        reps: 5,
        pct: 0.6,
        isDeload: true
      };
    }
    
    // Different schemes based on experience and phase
    const schemes: Record<string, Record<string, WorkoutScheme[]>> = {
      beginner: {
        early: [
          { scheme: "volume", sets: 4, reps: 8, pct: 0.65, isDeload: false },
          { scheme: "strength", sets: 5, reps: 5, pct: 0.7, isDeload: false }
        ],
        mid: [
          { scheme: "volume", sets: 3, reps: 10, pct: 0.65, isDeload: false },
          { scheme: "strength", sets: 4, reps: 6, pct: 0.75, isDeload: false }
        ],
        late: [
          { scheme: "strength", sets: 5, reps: 5, pct: 0.75, isDeload: false },
          { scheme: "power", sets: 3, reps: 3, pct: 0.85, isDeload: false }
        ]
      },
      intermediate: {
        early: [
          { scheme: "volume", sets: 4, reps: 8, pct: 0.7, isDeload: false },
          { scheme: "strength", sets: 5, reps: 5, pct: 0.75, isDeload: false },
          { scheme: "technique", sets: 3, reps: 3, pct: 0.8, isDeload: false }
        ],
        mid: [
          { scheme: "strength", sets: 4, reps: 6, pct: 0.75, isDeload: false },
          { scheme: "power", sets: 3, reps: 3, pct: 0.85, isDeload: false },
          { scheme: "technique", sets: 5, reps: 2, pct: 0.9, isDeload: false }
        ],
        late: [
          { scheme: "strength", sets: 3, reps: 5, pct: 0.8, isDeload: false },
          { scheme: "power", sets: 5, reps: 3, pct: 0.85, isDeload: false },
          { scheme: "peaking", sets: 2, reps: 2, pct: 0.92, isDeload: false }
        ]
      },
      advanced: {
        early: [
          { scheme: "volume", sets: 5, reps: 5, pct: 0.75, isDeload: false },
          { scheme: "strength", sets: 4, reps: 4, pct: 0.8, isDeload: false },
          { scheme: "technique", sets: 3, reps: 3, pct: 0.85, isDeload: false }
        ],
        mid: [
          { scheme: "strength", sets: 5, reps: 3, pct: 0.85, isDeload: false },
          { scheme: "power", sets: 3, reps: 2, pct: 0.9, isDeload: false },
          { scheme: "technique", sets: 2, reps: 1, pct: 0.95, isDeload: false }
        ],
        late: [
          { scheme: "strength", sets: 3, reps: 3, pct: 0.87, isDeload: false },
          { scheme: "power", sets: 4, reps: 2, pct: 0.92, isDeload: false },
          { scheme: "peaking", sets: 2, reps: 1, pct: 0.97, isDeload: false }
        ]
      }
    };
    
    // Get schemes for this experience level and phase
    const availableSchemes = schemes[experience][phase];
    
    // Pick a scheme based on the week number (rotate through available schemes)
    const schemeIndex = (week % availableSchemes.length);
    return availableSchemes[schemeIndex];
  }

  // Split logic: returns array of days, each with main lift(s)
  function getWeekDays(weekNum: number) {
    const days = [];
    const freq = frequency;
    if (split === "together") {
      // Full body: rotate main lift focus
      for (let d = 0; d < freq; ++d) {
        const lifts = ["squat", "bench", "deadlift"].filter((_, idx) => (idx + d) % freq === 0 || freq >= 3);
        days.push(lifts);
      }
    } else {
      // Separate: alternate upper/lower
      for (let d = 0; d < freq; ++d) {
        if (freq === 2) {
          days.push(d === 0 ? ["squat", "bench"] : ["deadlift"]);
        } else if (freq === 3) {
          days.push(d === 0 ? ["squat"] : d === 1 ? ["bench"] : ["deadlift"]);
        } else if (freq === 4) {
          days.push(d % 2 === 0 ? ["squat", "deadlift"] : ["bench"]);
        } else {
          // 5-6 days: rotate
          days.push(["squat"].filter(() => d % 3 === 0));
          days.push(["bench"].filter(() => d % 3 === 1));
          days.push(["deadlift"].filter(() => d % 3 === 2));
        }
      }
    }
    return days;
  }

  // Generate plan - use useMemo to prevent regeneration on each render
  const plan = React.useMemo(() => {
    return Array.from({ length: weeks }, (_, i) => {
      const weekNum = i + 1;
      const squat1RM = Math.round(squatStart + squatInc * weekNum);
      const bench1RM = Math.round(benchStart + benchInc * weekNum);
      const deadlift1RM = Math.round(deadliftStart + deadliftInc * weekNum);
      const period = getPeriodization(weekNum, weeks);
      const days = getWeekDays(weekNum);
      let weekDate = null;
      if (showDates && startDate && endDate) {
        const msPerWeek = (endDate.getTime() - startDate.getTime()) / (weeks - 1 || 1);
        weekDate = new Date(startDate.getTime() + i * msPerWeek);
      }
      return {
        week: weekNum,
        date: weekDate,
        squat: squat1RM,
        bench: bench1RM,
        deadlift: deadlift1RM,
        days,
        period
      };
    });
  }, [weeks, squatStart, squatInc, benchStart, benchInc, deadliftStart, deadliftInc, showDates, startDate, endDate]);

  return (
    <div style={{ margin: '2em 0' }}>
      {plan.map((week, i) => (
        <div key={week.week} style={{ border: '1px solid #ccc', borderRadius: 8, marginBottom: 16, background: '#fafbfc' }}>
          <div
            style={{ cursor: 'pointer', padding: '1em', fontWeight: 600, fontSize: '1.1em', background: openWeek === i ? '#e6f0fa' : '#f6f8fa', borderBottom: openWeek === i ? '1px solid #b3d1f7' : '1px solid #eee' }}
            onClick={() => setOpenWeek(openWeek === i ? null : i)}
          >
            Week {week.week} {week.date ? ` (${week.date.toLocaleDateString()})` : ''} {((week.period.isDeload) ? ' - Deload' : '')}
          </div>
          {openWeek === i && (
            <div style={{ padding: '1em 1.5em' }}>
              {week.days.map((lifts: string[], d: number) => (
                <div key={d} style={{ marginBottom: 18 }}>
                  <div style={{ fontWeight: 500, marginBottom: 2 }}>Day {d + 1}</div>
                  {lifts.length === 0 ? <div style={{ fontStyle: 'italic', color: '#888' }}>Rest/Accessory Only</div> : null}
                  {lifts.map((lift: string) => {
                    let lift1RM = lift === 'squat' ? week.squat : lift === 'bench' ? week.bench : week.deadlift;
                    let period = week.period;
                    return (
                      <div key={lift} style={{ margin: '4px 0 8px 0' }}>
                        <b>{lift.charAt(0).toUpperCase() + lift.slice(1)}</b> - {period.scheme}: {period.sets}x{period.reps} @ <b>{Math.round(lift1RM * period.pct)}</b> lbs
                        {period.isDeload ? <span style={{ color: '#2b78e4', marginLeft: 8 }}>(Deload Week)</span> : null}
                      </div>
                    );
                  })}
                  {/* Accessories */}
                  <div style={{ marginLeft: 8, color: '#444', fontSize: '0.96em' }}>
                    Accessories: {lifts.length > 0 ? 
                      // Use a stable seed for accessory selection based on week and day
                      getRandomAccessories(lifts[0], 2 + ((week.week + d) % 2)).join(', ') 
                      : 'Mobility/Recovery'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const HomePage = () => (
  <div className="raw-steel-theme">
    <HeroAndNav />
    <TrainingCalculatorNew />
  </div>
);

export default HomePage;