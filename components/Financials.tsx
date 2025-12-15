import React, { useState, useRef } from 'react';
import { CompanyDetail, FinancialDoc, DocType } from '../types';
import { FileText, MapPin, Building2, UserCheck, Lock, Plus, X, FileBarChart, FileSpreadsheet, Download, Upload, Trash2 } from 'lucide-react';

const details: CompanyDetail[] = [
  { label: 'Επωνυμία', value: 'ALBERT ΕΜΠΟΡΙΚΗ ΕΚΤΥΠΩΤΙΚΗ ΒΙΟΤΕΧΝΙΚΗ ΚΑΛΛΥΝΤΙΚΩΝ Α.Ε.' },
  { label: 'Διακριτικός Τίτλος', value: 'ALBERT A.E.' },
  { label: 'ΑΦΜ', value: '094535608' },
  { label: 'Αρ. ΓΕΜΗ', value: '122041201000' },
  { label: 'Νομική Μορφή', value: 'Ανώνυμη Εταιρεία (Α.Ε.)' },
  { label: 'Ημερομηνία Ίδρυσης', value: '1998' },
  { label: 'Πρόεδρος', value: 'Αγγελική Προδρόμου' },
  { label: 'Μέλος Δ.Σ.', value: 'Ιωάννης Χουτοχρήστος' },
];

// Pre-populate with data from the previous version (2015-2019)
const initialDocs: FinancialDoc[] = [
  { id: 'b2019', year: '2019', type: 'balance', title: 'Ισολογισμός 2019', url: '#' },
  { id: 'i2019', year: '2019', type: 'income', title: 'Αποτελέσματα 2019', url: '#' },
  { id: 'b2018', year: '2018', type: 'balance', title: 'Ισολογισμός 2018', url: '#' },
  { id: 'i2018', year: '2018', type: 'income', title: 'Αποτελέσματα 2018', url: '#' },
  { id: 'b2017', year: '2017', type: 'balance', title: 'Ισολογισμός 2017', url: '#' },
  { id: 'i2017', year: '2017', type: 'income', title: 'Αποτελέσματα 2017', url: '#' },
  { id: 'b2016', year: '2016', type: 'balance', title: 'Ισολογισμός 2016', url: '#' },
  { id: 'i2016', year: '2016', type: 'income', title: 'Αποτελέσματα 2016', url: '#' },
  { id: 'b2015', year: '2015', type: 'balance', title: 'Ισολογισμός 2015', url: '#' },
  { id: 'i2015', year: '2015', type: 'income', title: 'Αποτελέσματα 2015', url: '#' },
];

export const Financials: React.FC = () => {
  const [docs, setDocs] = useState<FinancialDoc[]>(initialDocs);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  
  // Form State
  const [newDocYear, setNewDocYear] = useState(new Date().getFullYear().toString());
  const [newDocType, setNewDocType] = useState<DocType>('balance');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'petridis') {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Λάθος κωδικός.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Παρακαλώ επιλέξτε ένα αρχείο PDF ή εικόνας.");
      return;
    }

    // Create a fake URL for the uploaded file so it works in the browser session
    const objectUrl = URL.createObjectURL(selectedFile);

    const titleBase = newDocType === 'balance' ? 'Ισολογισμός' : 'Αποτελέσματα Χρήσης';
    
    const newDoc: FinancialDoc = {
      id: Math.random().toString(36).substr(2, 9),
      year: newDocYear,
      type: newDocType,
      title: `${titleBase} ${newDocYear}`,
      url: objectUrl
    };

    // Add to top of list
    setDocs([newDoc, ...docs]);
    
    // Reset Form
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteDoc = (id: string) => {
    if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το έγγραφο;')) {
      setDocs(docs.filter(doc => doc.id !== id));
    }
  };

  const balanceSheets = docs.filter(d => d.type === 'balance');
  const incomeStatements = docs.filter(d => d.type === 'income');

  return (
    <div className="bg-charcoal py-32 px-6 md:px-12 relative overflow-hidden text-cream border-t border-white/5">
       {/* Texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 relative">
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-4">Εταιρική Διαφάνεια</h2>
          <p className="text-cream/50 font-mono text-xs md:text-sm max-w-2xl mx-auto tracking-wide">
            Λειτουργούμε με πλήρη διαφάνεια και συμμόρφωση με το Ελληνικό Εταιρικό Δίκαιο.
          </p>
          
          {/* Admin Trigger */}
          <button 
            onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)}
            className="absolute right-0 top-0 text-charcoal hover:text-terracotta transition-colors p-2"
            title={isAdmin ? "Έξοδος Διαχειριστή" : "Είσοδος Διαχειριστή"}
          >
            {isAdmin ? <UserCheck size={20} className="text-terracotta" /> : <Lock size={20} className="text-white/10" />}
          </button>
        </div>

        {/* --- OFFICIAL DETAILS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
          <div className="bg-white/5 p-8 border border-white/10 border-t-4 border-t-cream/20 h-full backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-terracotta" size={24} />
              <h3 className="font-serif text-2xl text-cream">Ταυτότητα Εταιρείας</h3>
            </div>
            <dl className="space-y-4">
              {details.slice(0, 5).map((detail) => (
                <div key={detail.label} className="border-b border-white/10 pb-3 last:border-0">
                  <dt className="text-xs uppercase tracking-wider text-cream/40 mb-1 font-mono">{detail.label}</dt>
                  <dd className="text-cream font-medium font-serif">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white/5 p-8 border border-white/10 border-t-4 border-t-terracotta h-full backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
              <UserCheck className="text-cream" size={24} />
              <h3 className="font-serif text-2xl text-cream">Διοίκηση & Έδρα</h3>
            </div>
            <dl className="space-y-4">
              {details.slice(5).map((detail) => (
                <div key={detail.label} className="border-b border-white/10 pb-3 last:border-0">
                  <dt className="text-xs uppercase tracking-wider text-cream/40 mb-1 font-mono">{detail.label}</dt>
                  <dd className="text-cream font-medium font-serif">{detail.value}</dd>
                </div>
              ))}
              <div className="mt-6 pt-4">
                <div className="flex items-start space-x-2 text-cream/60 text-sm font-sans">
                  <MapPin size={16} className="mt-1 flex-shrink-0 text-terracotta" />
                  <span>Χειμάρρας 22, Μοσχάτο,<br/>18345, Αττική</span>
                </div>
                  <div className="flex items-start space-x-2 text-cream/60 text-sm mt-2 font-sans">
                  <FileText size={16} className="mt-1 flex-shrink-0 text-terracotta" />
                  <span>Αρμόδια ΔΟΥ: ΦΑΕ ΠΕΙΡΑΙΑ</span>
                </div>
              </div>
            </dl>
          </div>
        </div>

        {/* --- FINANCIAL STATEMENTS (GEMI STYLE) --- */}
        <div className="max-w-5xl mx-auto border-t border-white/10 pt-16">
          <h3 className="font-serif text-3xl text-cream mb-1">Δημοσιεύσεις Γ.Ε.ΜΗ.</h3>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-0.5 w-10 bg-terracotta"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-cream/40 uppercase">Επίσημα Οικονομικά Στοιχεία</span>
          </div>
          
          {/* Admin Add Panel */}
          {isAdmin && (
            <div className="mb-12 bg-white/5 p-6 border border-white/10 animate-pulse relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Lock size={100} className="text-cream" />
                </div>
              <h4 className="font-bold text-cream mb-4 flex items-center gap-2 relative z-10">
                <Plus size={20} className="text-terracotta" /> Προσθήκη Νέας Δημοσίευσης
              </h4>
              <form onSubmit={handleAddDoc} className="flex flex-col md:flex-row gap-4 items-end relative z-10">
                <div className="w-full md:w-auto">
                  <label className="block text-xs font-bold text-cream/50 mb-1">Έτος Χρήσης</label>
                  <input 
                    type="number" 
                    value={newDocYear}
                    onChange={e => setNewDocYear(e.target.value)}
                    className="p-2 border border-white/20 bg-charcoal rounded w-full md:w-32 text-cream focus:border-terracotta outline-none"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <label className="block text-xs font-bold text-cream/50 mb-1">Τύπος Εγγράφου</label>
                  <select 
                    value={newDocType}
                    onChange={e => setNewDocType(e.target.value as DocType)}
                    className="p-2 border border-white/20 bg-charcoal rounded w-full md:w-64 text-cream focus:border-terracotta outline-none"
                  >
                    <option value="balance">Ισολογισμός</option>
                    <option value="income">Αποτελέσματα Χρήσης</option>
                  </select>
                </div>
                <div className="w-full md:w-auto flex-grow">
                    <label className="block text-xs font-bold text-cream/50 mb-1">Αρχείο PDF/Εικόνα</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="w-full p-1.5 bg-charcoal border border-white/20 rounded text-sm text-cream/60 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-cream hover:file:bg-white/20 cursor-pointer"
                      />
                    </div>
                </div>
                <button type="submit" disabled={!selectedFile} className="bg-terracotta text-cream px-6 py-2 rounded hover:bg-terracotta/80 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center font-bold">
                  <Upload size={16} /> Δημοσίευση
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Balance Sheets Column */}
            <div className="bg-white/5 p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <FileSpreadsheet className="text-terracotta" size={24} />
                <h4 className="font-serif text-xl text-cream font-bold">Ισολογισμοί</h4>
              </div>
              <div className="space-y-3">
                {balanceSheets.map(doc => (
                  <div key={doc.id} className="flex items-center gap-2 group">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-between p-3 bg-charcoal hover:bg-white/5 transition-colors border border-white/10 hover:border-terracotta/50 text-cream/80 hover:text-cream">
                      <span className="text-sm font-medium font-serif">{doc.title}</span>
                      <Download size={16} className="text-cream/40 group-hover:text-terracotta" />
                    </a>
                    {isAdmin && (
                      <button 
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-3 text-cream/50 hover:text-terracotta hover:bg-charcoal border border-transparent hover:border-red-900 transition-colors"
                        title="Διαγραφή"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                {balanceSheets.length === 0 && <p className="text-sm text-cream/40 italic font-mono border-l-2 border-white/10 pl-3">Δεν υπάρχουν καταχωρημένοι ισολογισμοί.</p>}
              </div>
            </div>

            {/* Income Statements Column */}
            <div className="bg-white/5 p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <FileBarChart className="text-cream" size={24} />
                <h4 className="font-serif text-xl text-cream font-bold">Αποτελέσματα Χρήσης</h4>
              </div>
              <div className="space-y-3">
                {incomeStatements.map(doc => (
                  <div key={doc.id} className="flex items-center gap-2 group">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-between p-3 bg-charcoal hover:bg-white/5 transition-colors border border-white/10 hover:border-terracotta/50 text-cream/80 hover:text-cream">
                      <span className="text-sm font-medium font-serif">{doc.title}</span>
                      <Download size={16} className="text-cream/40 group-hover:text-terracotta" />
                    </a>
                    {isAdmin && (
                      <button 
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-3 text-cream/50 hover:text-terracotta hover:bg-charcoal border border-transparent hover:border-red-900 transition-colors"
                        title="Διαγραφή"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                {incomeStatements.length === 0 && <p className="text-sm text-cream/40 italic font-mono border-l-2 border-white/10 pl-3">Δεν υπάρχουν καταχωρημένα αποτελέσματα.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-charcoal p-8 border border-white/20 shadow-2xl max-w-sm w-full relative">
              <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-cream/40 hover:text-cream">
                <X size={20} />
              </button>
              <h3 className="font-serif text-xl mb-6 text-center font-bold text-cream">Περιοχή Διαχειριστή</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-cream/50 mb-1 font-mono">ΚΩΔΙΚΟΣ ΠΡΟΣΒΑΣΗΣ</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 bg-black/50 border border-white/20 focus:border-terracotta outline-none text-cream font-mono"
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="w-full bg-cream text-charcoal py-2 hover:bg-terracotta hover:text-cream transition-colors font-bold uppercase tracking-wider">
                  Είσοδος
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};