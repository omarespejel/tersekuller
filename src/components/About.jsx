import { useState } from 'react';
import './About.css';

export function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="about-btn"
      >
        🧠 How it Works
      </button>
      {isOpen && (
        <div className="about-modal" onClick={() => setIsOpen(false)}>
          <div className="about-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn" 
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            
            <h2>The Science Behind TERSEKULLER</h2>
            
            <section className="research-section">
              <h3>🎓 Built on 140 Years of Memory Research</h3>
              
              <p>
                TERSEKULLER uses <strong>spaced repetition</strong>, a scientifically-proven 
                method that can increase retention by up to <span className="highlight">74%</span> 
                compared to traditional study methods.
              </p>
              <blockquote>
                <p>
                  "We tend to halve our memory of new knowledge in a matter of days or weeks, 
                  unless we make a conscious effort to review the material."
                </p>
                <cite>
                  — Hermann Ebbinghaus, pioneering psychologist (1885)
                </cite>
              </blockquote>
            </section>

            <section className="forgetting-curve">
              <h3>📉 The Forgetting Curve</h3>
              
              <p>
                In 1885, German psychologist <strong>Hermann Ebbinghaus</strong> discovered that 
                we forget <span className="highlight">50% of new information within an hour</span> 
                and <span className="highlight">70% within 24 hours</span> without review. His 
                research, successfully replicated in 2015, remains the foundation of modern 
                learning science.
              </p>
              <div className="curve-stats">
                <div className="stat">
                  <span className="time">20 min</span>
                  <span className="retention">58%</span>
                  <span className="label">remembered</span>
                </div>
                <div className="stat">
                  <span className="time">1 hour</span>
                  <span className="retention">44%</span>
                  <span className="label">remembered</span>
                </div>
                <div className="stat">
                  <span className="time">1 day</span>
                  <span className="retention">33%</span>
                  <span className="label">remembered</span>
                </div>
                <div className="stat">
                  <span className="time">1 week</span>
                  <span className="retention">25%</span>
                  <span className="label">remembered</span>
                </div>
              </div>
            </section>

            <section className="sm2-algorithm">
              <h3>🚀 The SM-2 Algorithm Revolution</h3>
              
              <p>
                In 1985, Polish researcher <strong>Dr. Piotr Woźniak</strong> created the 
                SuperMemo SM-2 algorithm, transforming Ebbinghaus's insights into a practical 
                learning system. This algorithm, now used by millions worldwide, optimally 
                spaces reviews to maximize retention with minimal effort.
              </p>
              <blockquote>
                <p>
                  "With spaced repetition, information reviewed at key points on the forgetting 
                  curve can reduce the rate of forgetting by up to 200%."
                </p>
                <cite>
                  — Dr. Piotr Woźniak, creator of SuperMemo (1985)
                </cite>
              </blockquote>
            </section>

            <section className="language-learning">
              <h3>🌎 Proven for Language Learning</h3>
              
              <p>
                Recent research (2024-2025) confirms spaced repetition's effectiveness for 
                language acquisition:
              </p>
              <ul className="research-highlights">
                <li>
                  📊 <strong>25% increase</strong> in vocabulary retention compared to 
                  traditional methods
                  <cite>(Li, 2024, Guizhou University)</cite>
                </li>
                <li>
                  🎯 <strong>86-90% retention rate</strong> when reviews occur at optimal 
                  intervals: Day 1, 2, 7, 16, and 35
                  <cite>(Traverse Learning Research, 2023)</cite>
                </li>
                <li>
                  📱 Mobile spaced repetition apps show <strong>consistent efficacy</strong> 
                  across all proficiency levels
                  <cite>(ESL Teaching Study, 2025)</cite>
                </li>
              </ul>
            </section>

            <section className="how-tersekuller-works">
              <h3>✨ How TERSEKULLER Optimizes Your Learning</h3>
              
              <div className="algorithm-steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <p>
                    <strong>Initial Learning:</strong> When you first see a phrase like 
                    {" "}<span className="spanish-text">"¿Qué onda?"</span>, it enters your 
                    short-term memory.
                  </p>
                </div>
                
                <div className="step">
                  <span className="step-number">2</span>
                  <p>
                    <strong>First Review (Day 1):</strong> Reviewing within 24 hours moves 
                    information toward long-term memory, preventing 60% of forgetting.
                  </p>
                </div>
                
                <div className="step">
                  <span className="step-number">3</span>
                  <p>
                    <strong>Expanding Intervals:</strong> Each successful review doubles the 
                    interval (1→2→4→8→16 days), following your brain's natural consolidation 
                    rhythm.
                  </p>
                </div>
                
                <div className="step">
                  <span className="step-number">4</span>
                  <p>
                    <strong>Adaptive Learning:</strong> Miss a card? It resets to Day 1. 
                    Ace it consistently? It spaces out to monthly reviews.
                  </p>
                </div>
              </div>
            </section>

            <section className="research-citations">
              <h3>📚 Research References</h3>
              
              <ul className="citations">
                <li>
                  Ebbinghaus, H. (1885). <em>Über das Gedächtnis</em>. Leipzig: Duncker & Humblot.
                  Successfully replicated by Murre & Dros (2015) in <em>PLOS ONE</em>.
                </li>
                <li>
                  Woźniak, P. (1990). "Optimization of learning." Master's Thesis, University 
                  of Technology in Poznań. The foundation of SuperMemo algorithms.
                </li>
                <li>
                  Li, X. (2024). "Spaced repetition as a basic structural method for ESL 
                  teaching." <em>Portal Linguarum</em>, 44, 45-62.
                </li>
                <li>
                  Karpicke, J. D., & Bauernschmidt, A. (2011). "Spaced retrieval: Absolute 
                  spacing enhances learning." <em>Journal of Experimental Psychology</em>, 37(5), 
                  1250-1257.
                </li>
              </ul>
            </section>

            <div className="about-footer">
              <p className="fun-fact">
                💡 <strong>Fun Fact:</strong> The same principles that help Buse learn 
                {" "}<span className="spanish-text">"¡Pinche turca guapa!"</span> are used by 
                medical students to memorize anatomy and polyglots to master 10+ languages!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

