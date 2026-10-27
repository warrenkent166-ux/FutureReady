import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  Flag,
  BookOpen
} from 'lucide-react';
import { mockAssessments } from '../../data/mockData';
import { AssessmentDefinition, AssessmentQuestion } from '../../types';

interface AssessmentCenterProps {
  initialAssessmentId?: string;
  onAskMentorAboutResult: (assessmentTitle: string, scoreStr: string) => void;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({
  initialAssessmentId,
  onAskMentorAboutResult,
}) => {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentDefinition | null>(
    mockAssessments.find((a) => a.id === initialAssessmentId) || null
  );

  // Taking state
  const [isTaking, setIsTaking] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTaking && secondsRemaining > 0 && !isCompleted) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTaking, secondsRemaining, isCompleted]);

  const startAssessment = (assessment: AssessmentDefinition) => {
    setSelectedAssessment(assessment);
    setAnswers({});
    setFlagged({});
    setCurrentQIndex(0);
    setSecondsRemaining(assessment.durationMinutes * 60);
    setIsTaking(true);
    setIsCompleted(false);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleFinish = () => {
    setIsTaking(false);
    setIsCompleted(true);
  };

  // Calculate score & dimension breakdown
  const calculateResults = () => {
    if (!selectedAssessment) return null;

    let totalScore = 0;
    const dimensionScores: Record<string, { total: number; correct: number }> = {};

    selectedAssessment.questions.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const isCorrect = q.correctOptionId ? selectedOptionId === q.correctOptionId : true;

      if (!dimensionScores[q.dimension]) {
        dimensionScores[q.dimension] = { total: 0, correct: 0 };
      }
      dimensionScores[q.dimension].total += 1;

      if (isCorrect) {
        totalScore += 1;
        dimensionScores[q.dimension].correct += 1;
      }
    });

    const percent = Math.round((totalScore / selectedAssessment.questions.length) * 100);

    return {
      totalScore,
      maxScore: selectedAssessment.questions.length,
      percent,
      dimensionScores,
    };
  };

  const results = isCompleted ? calculateResults() : null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. VIEW: ASSESSMENT CATALOG */}
      {!isTaking && !isCompleted && (
        <div className="space-y-8">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full">
              <span>Formative Diagnostics & Cognitive Reflection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
              Assessment Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Diagnostic modules calibrated for Philippine High School students (Grades 7–12). Practice reasoning, discover work styles, and identify areas for deliberate practice.
            </p>
          </div>

          {/* Ethical Disclaimer Banner */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 text-[#3267D5] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Ethical Growth Assurance</p>
              <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                These assessments measure specific practiced skills and self-reported vocational interests. They are never clinical intelligence tests, nor do they define what careers you can accomplish. Retakes are supported and encouraged.
              </p>
            </div>
          </div>

          {/* Assessment List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-[#3267D5]">{assessment.version}</span>
                    <span>{assessment.durationMinutes} mins · {assessment.questionCount} Items</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {assessment.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {assessment.shortDescription}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                    <p><strong className="text-slate-700 dark:text-slate-300">Measures:</strong> {assessment.whatItMeasures}</p>
                    <p><strong className="text-slate-700 dark:text-slate-300">Does Not Measure:</strong> {assessment.whatItDoesNotMeasure}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-[#168C80] font-medium">Free & Retakeable</span>
                  <button
                    onClick={() => startAssessment(assessment)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    Start Module →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. VIEW: INTERACTIVE ASSESSMENT PLAYER */}
      {isTaking && selectedAssessment && (
        <div className="space-y-6">
          
          {/* Top Bar with Timer and Progress */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs text-slate-500">{selectedAssessment.title}</span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                Item {currentQIndex + 1} of {selectedAssessment.questions.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-700 dark:text-amber-300 text-xs font-semibold tabular-nums">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              <button
                onClick={handleFinish}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
              >
                Finish Assessment
              </button>
            </div>
          </div>

          {/* Question Index Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {selectedAssessment.questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentQIndex;
              const isFlagged = !!flagged[q.id];

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all relative shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#3267D5] text-white shadow-sm ring-2 ring-[#3267D5]/30'
                      : isAnswered
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Question Card */}
          {(() => {
            const currentQ = selectedAssessment.questions[currentQIndex];
            const currentAnswer = answers[currentQ.id];

            return (
              <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
                
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span>Dimension: <strong className="text-slate-800 dark:text-slate-200">{currentQ.dimension}</strong></span>
                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`flex items-center gap-1 cursor-pointer transition-colors ${
                      flagged[currentQ.id] ? 'text-amber-500 font-semibold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{flagged[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-base font-medium text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                    {currentQ.text}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {currentQ.options.map((option, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isSelected = currentAnswer === option.id;

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectOption(currentQ.id, option.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? 'border-[#3267D5] bg-[#3267D5]/5 dark:bg-[#3267D5]/10 text-slate-900 dark:text-white font-medium shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected ? 'bg-[#3267D5] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {letter}
                          </span>
                          <span className="text-xs sm:text-sm leading-relaxed">{option.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Navigation Controls */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((prev) => prev - 1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  {currentQIndex < selectedAssessment.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex((prev) => prev + 1)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Item</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Complete & Submit</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            );
          })()}

        </div>
      )}

      {/* 3. VIEW: TRANSPARENT RESULTS BREAKDOWN */}
      {isCompleted && selectedAssessment && results && (
        <div className="space-y-8 animate-in fade-in">
          
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#168C80] uppercase tracking-wider">Diagnostic Performance Summary</span>
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                  {selectedAssessment.title}
                </h2>
                <p className="text-xs text-slate-500">
                  Version {selectedAssessment.version} · Completed just now
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-3xl font-display font-extrabold text-[#3267D5] dark:text-[#60A5FA] tabular-nums">
                    {results.percent}%
                  </p>
                  <p className="text-xs text-slate-500">
                    {results.totalScore} of {results.maxScore} items observed
                  </p>
                </div>
              </div>
            </div>

            {/* Dimension Breakdown Cards */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Competency Dimensions Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(results.dimensionScores).map(([dim, data]) => {
                  const dimPercent = Math.round((data.correct / data.total) * 100);
                  return (
                    <div
                      key={dim}
                      className="p-3 bg-[#F5F7FB] dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs font-medium text-slate-800 dark:text-slate-200">
                        <span>{dim}</span>
                        <span className="font-bold tabular-nums">{dimPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-[#168C80] h-full rounded-full"
                          style={{ width: `${dimPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Item-by-Item Review */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Transparent Item-by-Item Explanations
              </h4>

              <div className="space-y-4">
                {selectedAssessment.questions.map((q, idx) => {
                  const userOptId = answers[q.id];
                  const isCorrect = q.correctOptionId ? userOptId === q.correctOptionId : true;

                  return (
                    <div
                      key={q.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-slate-900 dark:text-white">Item {idx + 1}: {q.dimension}</span>
                        <span className={isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                          {isCorrect ? '✓ Correct Deduction' : '✗ Missed Concept'}
                        </span>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {q.text}
                      </p>

                      {q.explanation && (
                        <div className="pt-2 text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60">
                          <strong>Pedagogical Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  setIsCompleted(false);
                  setIsTaking(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                ← Return to Catalog
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => startAssessment(selectedAssessment)}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Module</span>
                </button>

                <button
                  onClick={() => onAskMentorAboutResult(selectedAssessment.title, `${results.percent}%`)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Discuss Results with Gabay AI</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
