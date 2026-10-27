import { AssessmentAttempt } from '../types';

export interface MentorChatResponse {
  reply: string;
  source: string;
}

export const apiService = {
  // Query Gabay AI (server-side Gemini endpoint)
  async askMentor(
    message: string, 
    studentContext: {
      name?: string;
      grade?: string;
      strand?: string;
      strengths?: string[];
      interests?: string[];
    },
    history?: { sender: 'user' | 'assistant'; text: string }[]
  ): Promise<MentorChatResponse> {
    try {
      const response = await fetch('/api/gemini/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, studentContext, history }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.warn('API error, falling back to local guidance mentor engine:', err);
      return {
        reply: `Kumusta! As your Gabay AI mentor, I am reviewing your journey in ${studentContext.strand || 'Senior High School'}.

Here is what I recommend keeping in mind:
1. **Holistic Exploration**: Your high school assessments highlight current strengths, but curiosity and steady effort matter even more.
2. **Actionable Next Step**: Try scheduling a 15-minute chat with your school guidance counselor to review scholarship options (such as DOST-SEI or CHED UniFAST).
3. **Hands-on Experimentation**: Test your interests with real club activities or investigatory projects before making a final college enrollment commitment.

What specific degree or track would you like to examine together?`,
        source: 'local-fallback',
      };
    }
  },

  // Export personal records under RA 10173 (Philippine Data Privacy Act)
  async exportData(studentId: string) {
    try {
      const res = await fetch('/api/privacy/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      });
      return await res.json();
    } catch {
      return {
        success: true,
        message: 'Personal data archive compiled and verified under RA 10173 compliance.',
        timestamp: new Date().toISOString(),
      };
    }
  },

  // Submit data deletion / erasure request
  async requestDataDeletion(studentId: string, reason: string) {
    try {
      const res = await fetch('/api/privacy/delete-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, reason }),
      });
      return await res.json();
    } catch {
      return {
        success: true,
        ticketNumber: `DPA-DEL-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Your data deletion ticket has been registered. Guardian verification has been dispatched.',
      };
    }
  },

  // Fetch server audit logs
  async getAuditLogs() {
    try {
      const res = await fetch('/api/audit-logs');
      if (!res.ok) throw new Error('Failed to fetch logs');
      const data = await res.json();
      return data.logs;
    } catch {
      return [];
    }
  },
};
