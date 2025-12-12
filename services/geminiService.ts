import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const refinePrintIdea = async (userIdea: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Είστε τεχνικός σύμβουλος στην ALBERT A.E., μια εταιρεία εμπορικών εκτυπώσεων και παραγωγής καλλυντικών στην Ελλάδα.
      Μετατρέψτε την ακόλουθη ασαφή ιδέα του χρήστη σε μια επαγγελματική προδιαγραφή για συσκευασία ή εκτύπωση.
      Συμπεριλάβετε λεπτομέρειες κατάλληλες για βιομηχανική παραγωγή: Χαρτί/Υλικό (folding carton, αυτοκόλλητο), Τεχνική Εκτύπωσης (Offset, Flexo, Θερμοτυπία), και Φινίρισμα.
      Διατηρήστε τον τόνο επαγγελματικό, αποτελεσματικό και βιομηχανικό. Απαντήστε στα Ελληνικά. Κρατήστε το κάτω από 150 λέξεις.
      
      Ιδέα Χρήστη: "${userIdea}"`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "Οι ειδικοί μας εξετάζουν τις προδιαγραφές. Παρακαλώ προσπαθήστε ξανά.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Δεν είναι δυνατή η πρόσβαση στη μηχανή προδιαγραφών αυτή τη στιγμή.";
  }
};