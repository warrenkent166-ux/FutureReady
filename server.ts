import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const rawKey = process.env.GEMINI_API_KEY;
const apiKey = rawKey && rawKey !== 'MY_GEMINI_API_KEY' && rawKey.trim() !== '' ? rawKey : undefined;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory Audit Logs
interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  details: string;
  ip: string;
}

const auditLogs: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    actor: 'Dr. Roberto Reyes',
    role: 'School Administrator',
    action: 'COHORT_REPORT_EXPORT',
    details: 'Exported Grade 11 STEM college-readiness summary for DepEd Division of Manila',
    ip: '120.28.184.22',
  },
  {
    id: 'log-002',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    actor: 'Ma\'am Elena Cruz, RGC',
    role: 'Guidance Counselor',
    action: 'CONFIDENTIAL_NOTE_ADDED',
    details: 'Updated career exploration consultation notes for student LRN 136589200451',
    ip: '120.28.184.24',
  },
  {
    id: 'log-003',
    timestamp: new Date(Date.now() - 3600000 * 0.8).toISOString(),
    actor: 'Sir Jerome Ramos',
    role: 'Teacher',
    action: 'RUBRIC_SCORE_SUBMITTED',
    details: 'Graded Innovation Milestone: Prototyping for Team Nipa-BioPlastic',
    ip: '120.28.184.18',
  },
];

// Helper to record audit logs
function logAction(actor: string, role: string, action: string, details: string) {
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor,
    role,
    action,
    details,
    ip: '127.0.0.1',
  });
  if (auditLogs.length > 100) auditLogs.pop();
}

// --- API ROUTES ---

// 1. Health check & status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    geminiConfigured: !!apiKey,
    serverTime: new Date().toISOString(),
  });
});

// 2. Audit logs endpoint
app.get('/api/audit-logs', (req: Request, res: Response) => {
  res.json({ logs: auditLogs });
});

// 3. AI Career Mentor ("Gabay AI") powered by Gemini
app.post('/api/gemini/mentor', async (req: Request, res: Response) => {
  const { message, studentContext, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  logAction(
    studentContext?.name || 'Student',
    'Student',
    'AI_MENTOR_QUERY',
    `Consulted Gabay AI on career pathways (${studentContext?.strand || 'General'})`
  );

  // If Gemini is configured, use real @google/genai
  if (aiClient) {
    try {
      const systemInstruction = `You are "Gabay AI", a supportive, encouraging, and knowledgeable educational guidance mentor for Philippine high school students (Grades 7–12) on FutureReady PH.
Your mission is to help Filipino students discover their potential, explore college degree programs (aligned with CHED and Philippine universities like UP, Ateneo, DLSU, UST, State Universities/PUP), understand DepEd K-12 tracks/strands (STEM, ABM, HUMSS, GAS, TVL-ICT, etc.), and connect skills to meaningful careers and community impact.

CRITICAL SAFEGUARDS AND GUIDELINES:
1. Minors Protection: Tone must always be warm, ethical, encouraging, and constructive. Never judge, belittle, or criticize.
2. Anti-Determinism: NEVER claim any assessment or test is a definitive measure of intelligence or that only ONE course is right. Remind students that interests evolve and multiple pathways exist.
3. Philippine Context: Understand local realities—DOST-SEI scholarships, Free Higher Education Act (RA 10931 in SUCs/LUCs), board exams (PRC), emerging industries in the Philippines (software, green tech, agri-tech, healthcare, logistics, creative arts).
4. Practical Next Steps: Always provide practical high school experiments, school club ideas, or questions for the student to ask their school guidance counselor or parents.
5. Conciseness: Use clear, friendly formatting with bullet points. Avoid overwhelming walls of text.

Current Student Context:
- Name: ${studentContext?.name || 'Student'}
- Grade Level: ${studentContext?.grade || 'Grade 11'}
- DepEd Strand: ${studentContext?.strand || 'STEM'}
- Top Strengths: ${studentContext?.strengths?.join(', ') || 'Logical Reasoning, Problem Solving'}
- Career Interests: ${studentContext?.interests?.join(', ') || 'Software Engineering, Environmental Science'}
`;

      let contentsPrompt = message;
      if (history && Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-4).map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Student' : 'Gabay AI'}: ${h.text}`).join('\n');
        contentsPrompt = `Previous Conversation:\n${recentHistory}\n\nStudent's new question: ${message}`;
      }

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contentsPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Mabuhay! I am here to help you navigate your college and career pathways. What aspect of your journey would you like to explore today?';

      return res.json({ reply, source: 'gemini-3.8-flash' });
    } catch (err: unknown) {
      console.error('Gemini API Error:', err);
      // Fallback gracefully if API rate limit or error occurs
    }
  }

  // Realistic fallback mentor response tailored to Philippine K-12 context
  const fallbackReplies: Record<string, string> = {
    strand: `Kumusta! When choosing or thriving in a Senior High School strand like ${studentContext?.strand || 'STEM'}, remember:
• **STEM** is great for Engineering, Computer Science, Health Sciences, and Natural Sciences (and aligns directly with DOST-SEI scholarships!).
• **ABM** empowers future entrepreneurs, accountants (CPA pathway), marketing strategists, and finance analysts.
• **HUMSS** develops strong critical thinking, writing, legal advocacy, psychology, and public administration.
• **TVL (e.g., ICT, Agri-Fisheries)** equips you with NC II/III certifications from TESDA and practical, hands-on skills.

Your strand does not lock you into a single destiny—many universities welcome graduates across strands with bridging programs or foundational electives. Would you like to compare specific college degrees or discover hands-on projects you can build right now?`,

    college: `Exploring Philippine colleges is an exciting step! Here are key considerations:
1. **Public State Universities (SUCs)**: Under Republic Act 10931 (Universal Access to Quality Tertiary Education Act), tuition is 100% free at institutions like UP, PUP, BatStateU, and MSU! Admissions are competitive via entrance tests (UPCAT, PUPCET, etc.).
2. **Private Universities**: Ateneo, DLSU, UST, and FEU offer high-caliber CHED Centers of Excellence/Development and extensive scholarship foundations (financial aid, academic, athletic).
3. **DOST-SEI Scholarship**: Offers tuition subsidy, monthly living allowance (approx ₱8,000/month), book allowance, and graduation thesis grant for STEM priority courses!

Would you like to examine admission schedules, prerequisite subjects, or specific course syllabi?`,

    general: `Mabuhay ${studentContext?.name || 'there'}! As your Gabay AI mentor, I am here to help you reflect on your natural gifts, explore courses, and prepare for life after high school.

Remember:
1. Skills grow with deliberate practice—any challenging subject can be mastered step-by-step.
2. What you build matters more than test scores alone; your investigatory projects and portfolio showcase who you really are.
3. Your school guidance counselor is your trusted on-campus partner—I can help you prepare questions for your next counseling session!

What would you like to explore today: your assessment breakdown, comparing two courses, or brainstorming an investigatory project?`,
  };

  const lower = message.toLowerCase();
  let selectedReply = fallbackReplies.general;
  if (lower.includes('strand') || lower.includes('stem') || lower.includes('abm') || lower.includes('humss') || lower.includes('tvl')) {
    selectedReply = fallbackReplies.strand;
  } else if (lower.includes('college') || lower.includes('university') || lower.includes('up') || lower.includes('dost') || lower.includes('scholarship') || lower.includes('tuition')) {
    selectedReply = fallbackReplies.college;
  }

  return res.json({
    reply: selectedReply,
    source: 'knowledge-base',
  });
});

// 4. Data Privacy Act (RA 10173) Export / Erasure simulation
app.post('/api/privacy/export', (req: Request, res: Response) => {
  const { studentId } = req.body;
  logAction(studentId || 'Student', 'Student', 'DATA_EXPORT_REQUESTED', 'Exported personal records under RA 10173 compliance');
  res.json({
    success: true,
    message: 'Your personal data package has been assembled according to the Philippine Data Privacy Act of 2012.',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/privacy/delete-request', (req: Request, res: Response) => {
  const { studentId, reason } = req.body;
  logAction(studentId || 'Student', 'Student', 'DATA_DELETION_SUBMITTED', `Requested data erasure: ${reason || 'User preference'}`);
  res.json({
    success: true,
    ticketNumber: `DPA-DEL-${Math.floor(100000 + Math.random() * 900000)}`,
    message: 'Your data deletion request has been submitted to the Data Protection Officer (DPO). As per RA 10173, verifiable guardian confirmation will be sent for minors.',
  });
});

// Vite server integration in dev / static serve in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Dynamic import vite in dev mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, () => {
    console.log(`[FutureReady PH] Server running on port ${port}`);
    console.log(`[FutureReady PH] Gemini AI Status: ${apiKey ? 'Configured and active' : 'API key pending (using built-in knowledge base)'}`);
  });
}

startServer();
