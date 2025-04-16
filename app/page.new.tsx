import React, { useState } from 'react';

// Utility functions for 1RM calculation
function calculate1RM(weight: number, reps: number): number {
  // Epley formula
  return Math.round(weight * (1 + reps / 30));
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

// Main component
const TrainingCalculatorNew = () => {
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
    height: '',
    weight: '',
    gender: 'male',
    targetDate: '',
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
      return { ...prev, [name]: value };
    });
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
    let timelineWarning = '';
    if (inputs.targetDate) {
      const today = new Date();
      const target = new Date(inputs.targetDate);
      const weeksAvailable = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7));
      if (weeksNeeded > weeksAvailable) {
        timelineWarning = `Target date is aggressive. Estimated time needed: ${weeksNeeded} weeks.`;
      } else {
        timelineWarning = `Timeline is realistic. Estimated time needed: ${weeksNeeded} weeks.`;
      }
    }
    // Generate week-by-week plan (simplified for now)
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
    setProgram({ weeks, expLevel, timelineWarning });
    setFeedback(timelineWarning);
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h1>Powerlifting Program Generator</h1>
      <div style={{ marginBottom: 16 }}>
        <label>Bench Press (weight × reps): </label>
        <input name="bench.weight" type="number" value={inputs.bench.weight} onChange={handleInputChange} placeholder="Weight" style={{ width: 80 }} /> ×
        <input name="bench.reps" type="number" value={inputs.bench.reps} onChange={handleInputChange} placeholder="Reps" style={{ width: 60, marginLeft: 4 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Squat (weight × reps): </label>
        <input name="squat.weight" type="number" value={inputs.squat.weight} onChange={handleInputChange} placeholder="Weight" style={{ width: 80 }} /> ×
        <input name="squat.reps" type="number" value={inputs.squat.reps} onChange={handleInputChange} placeholder="Reps" style={{ width: 60, marginLeft: 4 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Deadlift (weight × reps): </label>
        <input name="deadlift.weight" type="number" value={inputs.deadlift.weight} onChange={handleInputChange} placeholder="Weight" style={{ width: 80 }} /> ×
        <input name="deadlift.reps" type="number" value={inputs.deadlift.reps} onChange={handleInputChange} placeholder="Reps" style={{ width: 60, marginLeft: 4 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Target Bench 1RM: </label>
        <input name="targetBench" type="number" value={inputs.targetBench} onChange={handleInputChange} placeholder="Bench 1RM" style={{ width: 80 }} />
        <label style={{ marginLeft: 16 }}>Target Squat 1RM: </label>
        <input name="targetSquat" type="number" value={inputs.targetSquat} onChange={handleInputChange} placeholder="Squat 1RM" style={{ width: 80 }} />
        <label style={{ marginLeft: 16 }}>Target Deadlift 1RM: </label>
        <input name="targetDeadlift" type="number" value={inputs.targetDeadlift} onChange={handleInputChange} placeholder="Deadlift 1RM" style={{ width: 80 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Days per week: </label>
        <select name="daysPerWeek" value={inputs.daysPerWeek} onChange={handleInputChange}>
          {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <label style={{ marginLeft: 16 }}>Split: </label>
        <select name="split" value={inputs.split} onChange={handleInputChange}>
          <option value="upperLower">Upper/Lower</option>
          <option value="together">Upper+Lower Together</option>
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Age: </label>
        <input name="age" type="number" value={inputs.age} onChange={handleInputChange} style={{ width: 60 }} />
        <label style={{ marginLeft: 16 }}>Height (cm): </label>
        <input name="height" type="number" value={inputs.height} onChange={handleInputChange} style={{ width: 80 }} />
        <label style={{ marginLeft: 16 }}>Weight (kg): </label>
        <input name="weight" type="number" value={inputs.weight} onChange={handleInputChange} style={{ width: 80 }} />
        <label style={{ marginLeft: 16 }}>Gender: </label>
        <select name="gender" value={inputs.gender} onChange={handleInputChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Target Date: </label>
        <input name="targetDate" type="date" value={inputs.targetDate} onChange={handleInputChange} />
        <label style={{ marginLeft: 16 }}>
          <input type="checkbox" checked={inputs.autoTimeline} onChange={() => setInputs(prev => ({ ...prev, autoTimeline: !prev.autoTimeline }))} /> Auto-calculate timeline
        </label>
      </div>
      <button onClick={generateProgram} style={{ marginBottom: 24, padding: '8px 16px', fontWeight: 'bold' }}>Generate Program</button>
      {feedback && <div style={{ color: 'orange', marginBottom: 16 }}>{feedback}</div>}
      {program && (
        <div>
          <h2>Training Plan ({program.expLevel.charAt(0).toUpperCase() + program.expLevel.slice(1)})</h2>
          {program.weeks.map((week: any) => (
            <div key={week.week} style={{ marginBottom: 12, border: '1px solid #ccc', padding: 12, borderRadius: 6, background: week.isDeload ? '#f8f8e0' : '#f9f9f9' }}>
              <strong>Week {week.week} {week.isDeload && '(Deload Week)'}</strong>
              <ul>
                {week.lifts.map((lift: any) => (
                  <li key={lift.name}>{lift.name}: {lift.weight} lbs × {lift.sets} sets × {lift.reps} reps</li>
                ))}
              </ul>
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            <h3>RPE & Auto-Regulation Guidelines</h3>
            <ul>
              <li>RPE 10: Max effort, no reps left</li>
              <li>RPE 9: Could do 1 more rep</li>
              <li>RPE 8: Could do 2 more reps</li>
              <li>RPE 7: Could do 3 more reps</li>
              <li>RPE 6: Could do 4 more reps</li>
            </ul>
            <p>Adjust weights up/down 2.5-5% if sets feel easier/harder than target RPE. If recovery is poor, consider extra rest or deloading early.</p>
            <p>Deload early if: soreness >72h, performance drops, sleep/motivation issues.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCalculatorNew;
