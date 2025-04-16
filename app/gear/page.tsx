"use client";
import Head from "next/head";
import Link from "next/link";

export default function GearPage() {
  return (
    <div className="raw-steel-theme">
      <Head>
        <title>Gear & Equipment Guide | 1000 Pound Club</title>
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
        <h1 className="hero-title">GEAR & EQUIPMENT GUIDE</h1>
      </section>
      <main className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-8 card" style={{ background: "#232323" }}>
        <p>The right equipment can make all the difference in your journey to the 1000 Pound Club. This guide breaks down essential gear by necessity and purpose.</p>
        <hr />
        <h2>HIGHLY RECOMMENDED EQUIPMENT</h2>
        <h3>Powerlifting Belt</h3>
        <p><b>Purpose:</b> Increases intra-abdominal pressure, supporting your spine during heavy lifts.</p>
        <p><b>Why it's essential:</b> Can increase squat and deadlift performance by 5-15% while reducing injury risk. Use for near-maximal squats and deadlifts.</p>
        <p><b>Recommended product:</b> <a href="https://inzer.com/collections/power-belts" target="_blank" rel="noopener noreferrer">Inzer Advance Designs Forever Lever Belt</a></p>
        <h3>Lifting Shoes</h3>
        <p><b>Purpose:</b> Provide ankle stability and elevated heel for improved squat mechanics.</p>
        <p><b>Why they're essential:</b> Allow for better depth while maintaining proper torso position, particularly for lifters with limited ankle mobility.</p>
        <p><b>Recommended product:</b> <a href="https://www.adidas.com/us/adipower-3-weightlifting-shoes/GZ0050.html" target="_blank" rel="noopener noreferrer">Adidas Adipower 3</a></p>
        <h3>Wrist Wraps</h3>
        <p><b>Purpose:</b> Stabilize wrist joints during pressing movements.</p>
        <p><b>Why they're essential:</b> Prevent wrist hyperextension under heavy loads, potentially adding pounds to your bench press.</p>
        <p><b>Recommended product:</b> <a href="https://inzer.com/collections/power-wraps/products/gripper-wrist-wraps" target="_blank" rel="noopener noreferrer">Inzer True Grippers Wrist Wraps</a></p>
        <h3>Chalk (Magnesium Carbonate)</h3>
        <p><b>Purpose:</b> Improves grip by absorbing moisture and increasing friction.</p>
        <p><b>Why it's essential:</b> Dramatically improves grip security when handling heavy weights, particularly for deadlifts.</p>
        <p><b>Recommended product:</b> <a href="https://www.roguefitness.com/rogue-gym-chalk" target="_blank" rel="noopener noreferrer">Rogue Gym Chalk</a></p>
        <h3>Flat Shoes for Deadlifts</h3>
        <p><b>Purpose:</b> Provides stable platform while minimizing distance bar travels.</p>
        <p><b>Why they're essential:</b> Can add pounds to your deadlift by reducing range of motion and preventing energy leaks.</p>
        <p><b>Recommended product:</b> <a href="https://www.converse.com/shop/p/chuck-taylor-all-star-unisex-high-top-shoe/M9160.html" target="_blank" rel="noopener noreferrer">Converse Chuck Taylor All Stars</a></p>
        <h3>Knee Sleeves</h3>
        <p><b>Purpose:</b> Provide joint warmth, compression, and mild support.</p>
        <p><b>Why they're essential:</b> Keep joints warm and can provide a slight mechanical advantage at the bottom of a squat.</p>
        <p><b>Recommended product:</b> <a href="https://us.sbdapparel.com/collections/all/knee-sleeves" target="_blank" rel="noopener noreferrer">SBD Knee Sleeves</a></p>
        <hr />
        <h2>OTHER USEFUL EQUIPMENT</h2>
        <h3>Lifting Straps</h3>
        <p><b>Purpose:</b> Take grip strength out of the equation for pulling exercises.</p>
        <p><b>Why they're beneficial:</b> Allow you to train your posterior chain beyond the limits of your grip strength.</p>
        <p><b>Recommended product:</b> <a href="https://www.gymreapers.com/collections/lifting-straps" target="_blank" rel="noopener noreferrer">Gymreapers Lifting Straps</a></p>
        <h3>Foam Roller & Lacrosse Balls</h3>
        <p><b>Purpose:</b> Self-myofascial release and tissue quality maintenance.</p>
        <p><b>Why they're beneficial:</b> Help maintain tissue quality, potentially preventing injury and improving recovery.</p>
        <p><b>Recommended product:</b> <a href="https://www.roguefitness.com/rogue-lacrosse-balls" target="_blank" rel="noopener noreferrer">Rogue Lacrosse Balls</a></p>
        <h3>Resistance Bands</h3>
        <p><b>Purpose:</b> Provide accommodating resistance and assistance for lifts.</p>
        <p><b>Why they're beneficial:</b> Versatile tools for warm-up, mobility work, and adding variable resistance to main lifts.</p>
        <p><b>Recommended product:</b> <a href="https://www.roguefitness.com/rogue-monster-bands" target="_blank" rel="noopener noreferrer">Rogue Monster Bands</a></p>
        <h3>Fractional Plates</h3>
        <p><b>Purpose:</b> Allow for smaller weight increments than standard plates.</p>
        <p><b>Why they're beneficial:</b> Enable micro-progression for consistent improvements, especially valuable for upper body lifts.</p>
        <p><b>Recommended product:</b> <a href="https://microgainz.com/collections/shop-all" target="_blank" rel="noopener noreferrer">Micro Gainz Fractional Weight Plates</a></p>
        <h3>Weightlifting Gloves or Hand Grips</h3>
        <p><b>Purpose:</b> Protect hands and enhance grip without chalk.</p>
        <p><b>Why they're beneficial:</b> Reduce callus formation and skin tears during high-volume training.</p>
        <p><b>Recommended product:</b> <a href="https://www.bearkomplex.com/products/bear-komplex-3-hole-hand-grips" target="_blank" rel="noopener noreferrer">Bear Komplex 3-Hole Hand Grips</a></p>
        <h3>Powerlifting Singlet</h3>
        <p><b>Purpose:</b> Required attire for powerlifting competitions.</p>
        <p><b>Why it's beneficial:</b> Necessary for competing and allows unrestricted movement during lifts.</p>
        <p><b>Recommended product:</b> <a href="https://us.sbdapparel.com/collections/all/singlets" target="_blank" rel="noopener noreferrer">SBD Powerlifting Singlet</a></p>
        <h3>Dip Belt</h3>
        <p><b>Purpose:</b> Allows additional loading for bodyweight exercises.</p>
        <p><b>Why it's beneficial:</b> Enables progressive overload for important accessory movements like pull-ups and dips.</p>
        <p><b>Recommended product:</b> <a href="https://www.roguefitness.com/rogue-dip-belt" target="_blank" rel="noopener noreferrer">Rogue Dip Belt</a></p>
        <h3>Grip Training Tools</h3>
        <p><b>Purpose:</b> Specifically target grip strength development.</p>
        <p><b>Why they're beneficial:</b> Help overcome grip limitations that may hold back deadlift progress.</p>
        <p><b>Recommended product:</b> <a href="https://ironmind.com/product-info/grip-strength-training-tools/captains-of-crush-grippers/" target="_blank" rel="noopener noreferrer">Captains of Crush Grippers</a></p>
        <hr />
        <p><i>Remember: While equipment can enhance performance, it doesn't replace proper technique, consistent training, and appropriate nutrition. The path to the 1000 Pound Club is primarily built through dedication and smart programming, with equipment serving as valuable support tools along the way.</i></p>
      </main>
    </div>
  );
}
