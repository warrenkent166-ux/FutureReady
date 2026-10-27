import React from 'react';
import { ShieldCheck, Lock, FileText, UserCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full">
          <span>Republic Act No. 10173 Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#14243A] dark:text-white tracking-tight">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated & Certified: January 2026 · Compliant with the National Privacy Commission (NPC)
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Statement of Commitment</h2>
          <p>
            FutureReady PH respects the privacy of every Filipino student, parent, educator, and school administrator. In strict compliance with the <strong>Philippine Data Privacy Act of 2012 (Republic Act No. 10173)</strong> and its Implementing Rules and Regulations (IRR), this policy articulates how we collect, process, safeguard, and retain educational information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Minor Protection & Parental / Guardian Consent</h2>
          <p>
            A substantial portion of our users are minors between the ages of 12 and 17 enrolled in Philippine Junior and Senior High Schools. In accordance with Section 12 of RA 10173:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Student onboarding requires verified parental or legal guardian notification and consent.</li>
            <li>No behavioral advertising, commercial telemetry, or third-party profiling trackers are permitted on student workspaces.</li>
            <li>Student project artifacts and self-reflections remain strictly private by default unless the learner explicitly opts into a school science fair showcase.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Data Minimization (What We Process)</h2>
          <p>We collect only the bare minimum data necessary to deliver personalized educational guidance:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Identification & School Context:</strong> Full Name, DepEd Learner Reference Number (LRN), Grade Level, Senior High School Track/Strand, School Name.</li>
            <li><strong>Diagnostic Responses:</strong> Answers to formative pattern matrices, quantitative problems, and RIASEC self-reported interest questionnaires.</li>
            <li><strong>Academic Artifacts:</strong> Science Investigatory Project (SIP) notes, prototype logs, and growth goal checklists.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Data Subject Rights under RA 10173</h2>
          <p>You and your parents/guardians retain unconditional rights to:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Right to be Informed:</strong> Transparent explanations of how assessment models score responses.</li>
            <li><strong>Right of Access & Portability:</strong> Instantly download your full diagnostic and portfolio records in JSON format via your student settings.</li>
            <li><strong>Right to Rectification & Erasure:</strong> Request immediate correction of erroneous details or complete deletion of your account and responses.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Data Protection Officer (DPO) Contact</h2>
          <p>
            For privacy inquiries, rights enforcement, or compliance verification, contact our registered Data Protection Officer at <strong>dpo@futureready.ph</strong> or via registered post to: FutureReady PH DPO Office, Ortigas Center, Pasig City, Metro Manila.
          </p>
        </section>

      </div>

    </div>
  );
};
