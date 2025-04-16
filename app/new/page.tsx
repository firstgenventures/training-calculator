"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { DatePicker } from './DatePicker';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// Utility functions for 1RM calculation
function calculate1RM(weight: number, reps: number): number {
  // Epley formula
  return Math.round(weight * (1 + reps / 30));
}

// Timeline warning range
function getTimelineWarningRange(weeksNeeded: number, expLevel: string, gender: string) {
  // Use progressRates for best/worst case
  const rates = progressRates[gender as keyof typeof progressRates][expLevel as keyof typeof progressRates["male"]];
  const best = Math.floor(weeksNeeded * 0.9);
  const worst = Math.ceil(weeksNeeded * 1.15);
  return { best, worst };
}


// Format height for display
function formatHeightDisplay(totalInches: number) {
  const { feet, inches } = inchesToFeetInches(totalInches);
  return `${feet}'${inches}\"`;
}

// Experience level determination
function getExperienceLevel(total: number, bodyweight: number, gender: string): 'beginner' | 'intermediate' | 'advanced' {
  const ratio = total / bodyweight;
  if (gender === 'male') {
    if (ratio < 2.5) return 'beginner';
    if (ratio < 4) return 'intermediate';
    return 'advanced';
  } else {
    if (ratio < 1.8) return 'beginner';
    if (ratio < 3) return 'intermediate';
    return 'advanced';
  }
}

// Weekly progress rates by experience
const progressRates = {
  male: {
    beginner: 12.5,
    intermediate: 6.5,
    advanced: 2,
  },
  female: {
    beginner: 8,
    intermediate: 4.5,
    advanced: 1.5,
  },
};

// Helper: Group days array into weeks (array of arrays)
function groupDaysByWeek(days: any[]) {
  const weeks: any[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

// Helper: Get accessories for a day's lifts
function getAccessoriesForDay(lifts: any[]): string {
  const accessories = new Set<string>();
  for (const lift of lifts) {
    if (lift.name.toLowerCase().includes('bench')) {
      accessories.add('Shoulder exercise');
      accessories.add('Triceps exercise');
    }
    if (lift.name.toLowerCase().includes('squat')) {
      accessories.add('Quad exercise');
      accessories.add('Core exercise');
    }
    if (lift.name.toLowerCase().includes('deadlift')) {
      accessories.add('Hamstring exercise');
      accessories.add('Back exercise');
    }
  }
  return Array.from(accessories).join(', ');
}

// Main component
// Helper: Convert inches to feet/inches
function inchesToFeetInches(totalInches: number) {
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
}

// Helper: Convert feet/inches to inches
function feetInchesToInches(feet: number, inches: number) {
  return feet * 12 + inches;
}

function parseHeightInputs(feet: string, inches: string) {
  const f = parseInt(feet, 10) || 0;
  const i = parseInt(inches, 10) || 0;
  return feetInchesToInches(f, i);
}

export default function TrainingCalculatorNew() {
  // User input states
  const [inputs, setInputs] = useState({
    bench: { weight: '', reps: '' },
    squat: { weight: '', reps: '' },
    deadlift: { weight: '', reps: '' },
    targetBench: '',
    targetSquat: '',
    targetDeadlift: '',
    daysPerWeek: '3',
    split: 'upperLower',
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    gender: 'male',
    targetDate: '',
    startDate: new Date().toISOString().split('T')[0],
    autoTimeline: true,
  });
  const [program, setProgram] = useState<any>(null);
  const [feedback, setFeedback] = useState('');

  // Handle input changes
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setInputs(prev => {
      if (name.startsWith('bench') || name.startsWith('squat') || name.startsWith('deadlift')) {
        const [lift, field] = name.split('.');
        return { ...prev, [lift]: { ...prev[lift as 'bench' | 'squat' | 'deadlift'], [field]: value } };
      }
      // Support new startDate field
      if (name === 'startDate') {
        return { ...prev, startDate: value };
      }
      return { ...prev, [name]: value };
    });
  }

  // Calculate estimated 1RMs for current lifts
  const estimatedCurrentSquat = calculate1RM(Number(inputs.squat.weight), Number(inputs.squat.reps));
  const estimatedCurrentBench = calculate1RM(Number(inputs.bench.weight), Number(inputs.bench.reps));
  const estimatedCurrentDeadlift = calculate1RM(Number(inputs.deadlift.weight), Number(inputs.deadlift.reps));
  const currentTotal = estimatedCurrentSquat + estimatedCurrentBench + estimatedCurrentDeadlift;

  // Calculate target lifts to add up to exactly 1000 lbs with specified distribution (mirroring main page)
  function calculateTargetLifts() {
    const currentTotal = estimatedCurrentSquat + estimatedCurrentBench + estimatedCurrentDeadlift;
    if (currentTotal >= 1000) {
      return {
        squat: estimatedCurrentSquat,
        bench: estimatedCurrentBench,
        deadlift: estimatedCurrentDeadlift
      };
    }
    const totalIncrease = 1000 - currentTotal;
    let squatIncrease = Math.round(totalIncrease * 0.35);
    let benchIncrease = Math.round(totalIncrease * 0.20);
    let deadliftIncrease = Math.round(totalIncrease * 0.45);
    let squat = estimatedCurrentSquat + squatIncrease;
    let bench = estimatedCurrentBench + benchIncrease;
    let deadlift = estimatedCurrentDeadlift + deadliftIncrease;
    const roundToNearest5 = (num: number) => Math.round(num / 5) * 5;
    squat = roundToNearest5(squat);
    bench = roundToNearest5(bench);
    deadlift = roundToNearest5(deadlift);
    const total = squat + bench + deadlift;
    if (total !== 1000) {
      deadlift += (1000 - total);
      if (deadlift < estimatedCurrentDeadlift) {
        deadlift = estimatedCurrentDeadlift;
        squat += (1000 - (deadlift + bench));
        if (squat < estimatedCurrentSquat) {
          squat = estimatedCurrentSquat;
          bench = 1000 - (squat + deadlift);
        }
      }
    }
    return {
      squat: Math.max(estimatedCurrentSquat, squat),
      bench: Math.max(estimatedCurrentBench, bench),
      deadlift: Math.max(estimatedCurrentDeadlift, deadlift)
    };
  }

  // Set Target Lifts logic
  function handleSetTargetLifts() {
    const targets = calculateTargetLifts();
    setInputs(prev => ({
      ...prev,
      targetSquat: targets.squat.toString(),
      targetBench: targets.bench.toString(),
      targetDeadlift: targets.deadlift.toString(),
    }));
  }

  // Main plan generation logic
  function generateProgram() {
    // Parse numbers
    const benchW = parseFloat(inputs.bench.weight);
    const benchR = parseInt(inputs.bench.reps);
    const squatW = parseFloat(inputs.squat.weight);
    const squatR = parseInt(inputs.squat.reps);
    const deadliftW = parseFloat(inputs.deadlift.weight);
    const deadliftR = parseInt(inputs.deadlift.reps);
    const bodyweight = parseFloat(inputs.weight);
    const gender = inputs.gender;
    // 1RM calculations
    const bench1RM = calculate1RM(benchW, benchR);
    const squat1RM = calculate1RM(squatW, squatR);
    const deadlift1RM = calculate1RM(deadliftW, deadliftR);
    const total = bench1RM + squat1RM + deadlift1RM;
    // Experience level
    const expLevel = getExperienceLevel(total, bodyweight, gender);
    // Progress rate
    const weeklyProgress = progressRates[gender][expLevel];
    // Timeline calculation
    const targetTotal = parseFloat(inputs.targetBench) + parseFloat(inputs.targetSquat) + parseFloat(inputs.targetDeadlift);
    let weeksNeeded = Math.ceil((targetTotal - total) / weeklyProgress);
    
    // Generate week-by-week plan (with date mapping and rest days)
    const daysPerWeek = Number(inputs.daysPerWeek) || 3;
    const totalDays = weeksNeeded * 7;
    const startDate = new Date(inputs.startDate || new Date().toISOString().split('T')[0]);
    const weeks = [];
    let currBench = bench1RM, currSquat = squat1RM, currDead = deadlift1RM;
    for (let week = 1; week <= weeksNeeded; ++week) {
      // Linear progression towards target
      const weekBench = Math.min(currBench + (parseFloat(inputs.targetBench) - bench1RM) / weeksNeeded * week, parseFloat(inputs.targetBench));
      const weekSquat = Math.min(currSquat + (parseFloat(inputs.targetSquat) - squat1RM) / weeksNeeded * week, parseFloat(inputs.targetSquat));
      const weekDead = Math.min(currDead + (parseFloat(inputs.targetDeadlift) - deadlift1RM) / weeksNeeded * week, parseFloat(inputs.targetDeadlift));
      // Sets/reps/intensity by experience
      let sets = 4, reps = 6, intensity = 0.7;
      if (expLevel === 'beginner') { sets = 4; reps = 6; intensity = 0.7; }
      else if (expLevel === 'intermediate') { sets = 5; reps = 4; intensity = 0.75; }
      else { sets = 6; reps = 3; intensity = 0.8; }
      // Deload week logic
      let isDeload = false;
      if ((expLevel === 'beginner' && week % 6 === 0) || (expLevel === 'intermediate' && week % 5 === 0) || (expLevel === 'advanced' && week % 4 === 0)) {
        isDeload = true;
        sets = Math.round(sets * 0.6);
        reps = Math.round(reps * 0.6);
        intensity *= 0.6;
      }
      weeks.push({
        week,
        isDeload,
        lifts: [
          { name: 'Bench Press', weight: Math.round(weekBench * intensity / 5) * 5, sets, reps },
          { name: 'Squat', weight: Math.round(weekSquat * intensity / 5) * 5, sets, reps },
          { name: 'Deadlift', weight: Math.round(weekDead * intensity / 5) * 5, sets, reps },
        ],
      });
    }
    // Special warnings for 1 or 7 days/week
    if (daysPerWeek === 1) {
      setFeedback('Training only once per week is not frequent enough for meaningful progress. Consider increasing your training frequency.');
      return;
    }
    if (daysPerWeek === 7) {
      setFeedback('Training every day is too much for most lifters and will not allow for adequate recovery. Consider adding rest days.');
      return;
    }

    // Build days array with mapped dates and rest days (evenly distribute training days)
    const days = [];
    let dayIdx = 0;
    let lastType: 'upper' | 'lower' | null = null;
    for (let weekIdx = 0; weekIdx < weeks.length; ++weekIdx) {
      const week = weeks[weekIdx];
      // Calculate training day indices (evenly spaced)
      const trainingDayIndices: number[] = [];
      const used = new Set<number>();
      const interval = 7 / daysPerWeek;
      for (let d = 0; d < daysPerWeek; ++d) {
        let idx = Math.round(d * interval);
        // Avoid duplicates
        while (idx > 6 || used.has(idx)) idx--;
        while (idx < 0 || used.has(idx)) idx++;
        if (idx >= 0 && idx < 7) {
          trainingDayIndices.push(idx);
          used.add(idx);
        }
      }
      // Fill week
      let splitOrder: ('upper' | 'lower')[] = [];
      if (inputs.split === 'upperLower') {
        let next: 'upper' | 'lower' = lastType === 'upper' ? 'lower' : 'upper';
        for (let d = 0; d < daysPerWeek; ++d) {
          splitOrder.push(next);
          next = next === 'upper' ? 'lower' : 'upper';
        }
      }
      for (let i = 0; i < 7; ++i) {
        const dateObj = new Date(startDate.getTime());
        dateObj.setDate(startDate.getDate() + dayIdx);
        let dateString = dateObj.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
        if (trainingDayIndices.includes(i)) {
          let lifts;
          if (inputs.split === 'upperLower') {
            const type = splitOrder[trainingDayIndices.indexOf(i)];
            lifts = type === 'upper'
              ? week.lifts.filter(lift => lift.name.toLowerCase().includes('bench'))
              : week.lifts.filter(lift => lift.name.toLowerCase().includes('squat') || lift.name.toLowerCase().includes('deadlift'));
            lastType = type;
          } else {
            lifts = week.lifts; // full body
          }
          days.push({
            dateString,
            isRest: false,
            isDeload: week.isDeload,
            lifts
          });
        } else {
          days.push({
            dateString,
            isRest: true,
            isDeload: false,
            lifts: []
          });
        }
        dayIdx++;
      }
    }
    // Timeline warning logic
    let timelineWarning = '';
    if (inputs.targetDate) {
      const msPerWeek = 7 * 24 * 60 * 60 * 1000;
      const start = new Date(inputs.startDate || new Date());
      const target = new Date(inputs.targetDate);
      const weeksAvailable = Math.max(1, Math.round((target.getTime() - start.getTime()) / msPerWeek));
      const { best, worst } = getTimelineWarningRange(weeks.length, expLevel, inputs.gender);
      if (weeksAvailable < best) {
        timelineWarning = `Target date is aggressive. Estimated time needed: ${best}–${worst} weeks based on your experience and progress rates. Consider adjusting your target or expectations for sustainable progress.`;
      }
    }

  return (
    <div className="raw-steel-theme">
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
      {/* MAIN CONTENT (CALCULATOR, ETC.) */}
      <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-8">
        {/* Calculator and other content here */}
        <Card>
          {/* Calculator UI */}
        </Card>
      </div>
    </div>
  );
}

export default TrainingCalculatorNew;
