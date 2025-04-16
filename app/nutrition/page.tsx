"use client";
import Head from "next/head";
import Link from "next/link";

export default function NutritionPage() {
  return (
    <div className="raw-steel-theme">
      <Head>
        <title>Nutrition for Strength | 1000 Pound Club</title>
      </Head>
      {/* NAVIGATION BAR */}
      <nav className="navbar raw-steel-navbar">
        <div className="navbar-logo">1000 POUND CLUB</div>
        <div className="navbar-links">
          <Link className="navbar-link" href="/">HOME</Link>
          <Link className="navbar-link" href="/warm-up">WARM UP</Link>
          <Link className="navbar-link" href="/nutrition">NUTRITION</Link>
          <Link className="navbar-link" href="/gear">GEAR</Link>
        </div>
      </nav>
      <section className="hero raw-steel-hero" style={{ marginBottom: 0 }}>
        <h1 className="hero-title">NUTRITION</h1>
      </section>
      <main className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-8 card" style={{ background: "#232323" }}>
        <h2>Caloric Requirements</h2>
        <p>Your caloric intake should align with your training goals:</p>
        <h3>For muscle/strength gain:</h3>
        <ul>
          <li>Increase calories by approximately 15% above your maintenance level</li>
          <li>This provides the energy surplus needed to fuel muscle growth and strength gains</li>
        </ul>
        <p>During most training periods, you should increase your caloric intake by about 15% above your baseline calories in order to build lean muscle mass. This will lead to greater gains in strength.</p>
        <h2>Macronutrient Breakdown</h2>
        <h3>Protein</h3>
        <ul>
          <li>Aim for 1.4-2.0g of protein per kg of bodyweight (0.64-0.9g per pound)</li>
          <li>Higher end of the range (up to 2.0g/kg) during intense training phases</li>
          <li>Example: A 200lb lifter should consume 128-180g of protein daily</li>
        </ul>
        <p>The International Society of Sports Nutrition completed a review on current sports nutrition research and found that for building and maintaining muscle mass, the overall daily protein intake should range from 1.4-2.0g protein per kilogram of body weight, per day (0.64-0.90g per pound).</p>
        <h3>Carbohydrates</h3>
        <ul>
          <li>Aim for 5-8g per kg of bodyweight (2.3-3.6g per pound)</li>
          <li>Higher carb intake on training days, especially around workouts</li>
          <li>Carbs fuel your high-intensity lifting sessions and aid recovery</li>
        </ul>
        <p>While often getting a bad rep, carbohydrates quite literally fuel your gains. Carbs are the priority fuel source during any high-intensity effort.</p>
        <h3>Fats</h3>
        <ul>
          <li>Approximately 30% of total calories from healthy fats</li>
          <li>Never drop below 0.5g per kg of bodyweight (0.25g per pound)</li>
          <li>Essential for hormone production, including testosterone</li>
        </ul>
        <p>Your macronutrient intake should be 5-8g per kilogram bodyweight of carbohydrates, 1.4-2 gram per kilogram bodyweight of protein, and 30% of total calories from fat per day.</p>
        <h2>Nutrient Timing</h2>
        <p>While total daily intake matters most, consider these strategies:</p>
        <ul>
          <li>Pre-workout: Consume carbs and moderate protein 1-2 hours before training</li>
          <li>Post-workout: Prioritize protein and carbs within 1-2 hours after training</li>
          <li>Daily distribution: Spread protein intake throughout the day in 3-5 meals</li>
        </ul>
        <p>Nutrient timing (i.e. when you eat) is not as important as overall caloric intake. However, nutrient timing can support better muscle recovery and strength.</p>
        <hr />
        <h2>SUPPLEMENT RECOMMENDATIONS</h2>
        <p>While a solid nutrition plan forms the foundation, certain supplements can support your strength goals:</p>
        <h3>Core Supplements</h3>
        <ol>
          <li><b>Creatine Monohydrate</b>
            <ul>
              <li>Most well-researched supplement for strength gains</li>
              <li>Dosage: 5g daily (no need for loading phase)</li>
              <li>Helps increase power, strength, and muscle mass</li>
            </ul>
            <p>Besides caffeine, creatine is the most well-researched dietary supplement on the market. Creatine is known for increasing power, strength, and muscle mass when combined with resistance training.</p>
          </li>
          <li><b>Protein Powder</b>
            <ul>
              <li>Convenient way to meet protein requirements</li>
              <li>Whey isolate preferred for its high protein content and digestibility</li>
              <li>Use when whole food options aren't practical</li>
            </ul>
            <p>As you might already know, protein is the building block for your muscles. It is a natural, non-expensive way to recover your muscles, let them develop properly, and help them get in shape.</p>
          </li>
          <li><b>Caffeine</b>
            <ul>
              <li>Enhances alertness, focus, and training intensity</li>
              <li>Timing: 30-60 minutes pre-workout (100-300mg)</li>
              <li>Can improve performance in heavy strength training</li>
            </ul>
            <p>Caffeine is a chemical compound that acts as a central nervous system stimulant. Caffeine is normally found in pre-workout supplements since it quickly raises perceived energy levels, alertness, mood, and motivation.</p>
          </li>
        </ol>
        <h3>Secondary Supplements</h3>
        <ol>
          <li><b>Beta-Alanine</b>
            <ul>
              <li>Helps buffer lactic acid and delays fatigue</li>
              <li>Typical dose: 3-5g daily</li>
            </ul>
          </li>
          <li><b>Fish Oil</b>
            <ul>
              <li>Contains omega-3 fatty acids for joint health and recovery</li>
              <li>Helps reduce inflammation from intense training</li>
            </ul>
            <p>Fish oil contains omega 3 fatty acids which reduces the pain and inflammation in our bodies. It also helps to decrease our body fat and fatigue.</p>
          </li>
          <li><b>Vitamin D & Minerals</b>
            <ul>
              <li>Support hormone production and overall health</li>
              <li>Essential for optimal strength performance</li>
            </ul>
          </li>
        </ol>
        <p>Remember: Supplements should complement, not replace, a solid nutrition plan.</p>
        <hr />
        <h2>RECOVERY STRATEGIES</h2>
        <p>Strength isn't built in the gym - it's built during recovery. Prioritize:</p>
        <ol>
          <li><b>Sleep</b>
            <ul>
              <li>Aim for 7-9 hours of quality sleep per night</li>
              <li>Create a consistent sleep schedule</li>
            </ul>
          </li>
          <li><b>Active Recovery</b>
            <ul>
              <li>Light movement on rest days improves blood flow and recovery</li>
              <li>Walking, swimming, or mobility work</li>
            </ul>
          </li>
          <li><b>Stress Management</b>
            <ul>
              <li>Chronic stress impairs recovery and hormone production</li>
              <li>Practice meditation, deep breathing, or other relaxation techniques</li>
            </ul>
          </li>
        </ol>
      </main>
    </div>
  );
}
