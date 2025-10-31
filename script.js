// --- CONSTANTS AND LOOKUP TABLES ---

// FULL MAPPING: Note name to chromatic index (0-11)
const NOTE_TO_INDEX = {
    "C": 0, "B#": 0, "Dbb": 0,
    "C#": 1, "Db": 1,
    "D": 2, "C##": 2, "Ebb": 2,
    "D#": 3, "Eb": 3, "Fbb": 3,
    "E": 4, "Fb": 4, "D##": 4,
    "F": 5, "E#": 5, "Gbb": 5,
    "F#": 6, "Gb": 6,
    "G": 7, "F##": 7, "Abb": 7,
    "G#": 8, "Ab": 8,
    "A": 9, "G##": 9, "Bbb": 9,
    "A#": 10, "Bb": 10, "Cbb": 10,
    "B": 11, "Cb": 11, "A##": 11
};

// INDEX MAPPING: Chromatic index (0-11) to all common spellings (used for fallback)
const INDEX_TO_NOTES = [
    ["C", "B#", "Dbb"],
    ["C#", "Db"],
    ["D", "C##", "Ebb"],
    ["D#", "Eb", "Fbb"],
    ["E", "Fb", "D##"],
    ["F", "E#", "Gbb"],
    ["F#", "Gb"],
    ["G", "F##", "Abb"],
    ["G#", "Ab"],
    ["A", "G##", "Bbb"],
    ["A#", "Bb", "Cbb"],
    ["B", "Cb", "A##"]
];

const notesLookup = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const letterNames = ["C", "D", "E", "F", "G", "A", "B"];

// Spelling map to resolve note indices to correct letter names (e.g., index 1 is C# for C-root, Db for F-root)
const spellingMap = {
    0: { C: "C", B: "B#", D: "Dbb" },
    1: { C: "C#", D: "Db" },
    2: { D: "D", C: "C##", E: "Ebb" },
    3: { D: "D#", E: "Eb", F: "Fbb" },
    4: { E: "E", F: "Fb" },
    5: { F: "F", E: "E#", G: "Gbb" },
    6: { F: "F#", G: "Gb" },
    7: { G: "G", F: "F##", A: "Abb" },
    8: { G: "G#", A: "Ab" },
    9: { A: "A", G: "G##", B: "Bbb" },
    10: { A: "A#", B: "Bb", C: "Cbb" },
    11: { B: "B", C: "Cb" }
};

const scaleIntervalsMajor = [0, 2, 4, 5, 7, 9, 11];
const scaleIntervalsMinor = [0, 2, 3, 5, 7, 8, 10]; 

// Chord Intervals: {int: semitones from root, deg: interval degree for correct spelling (0=1st, 1=2nd, etc)}
const chordIntervals = {
    // Triads
    'Triad (Major)': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}],
    'Triad (minor)': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 7, deg: 4}],
    'Triad (Diminished)': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 6, deg: 4}],
    'Triad (Augmented)': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 8, deg: 4}],
    // Suspended
    'sus2': [{int: 0, deg: 0}, {int: 2, deg: 1}, {int: 7, deg: 4}],
    'sus4': [{int: 0, deg: 0}, {int: 5, deg: 3}, {int: 7, deg: 4}],
    // Sixths
    '6': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 9, deg: 5}],
    'm6': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 7, deg: 4}, {int: 9, deg: 5}],
    // Sevenths
    'Major 7': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 11, deg: 6}],
    'minor 7': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 7, deg: 4}, {int: 10, deg: 6}],
    'Dominant 7': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 10, deg: 6}],
    'Half-Diminished 7': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 6, deg: 4}, {int: 10, deg: 6}],
    'Diminished 7': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 6, deg: 4}, {int: 9, deg: 6}],
    'Dominant 7sus4': [{int: 0, deg: 0}, {int: 5, deg: 3}, {int: 7, deg: 4}, {int: 10, deg: 6}],
    // Ninths
    'Major 9': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 11, deg: 6}, {int: 2, deg: 1}],
    'minor 9': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 7, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}],
    'Dominant 9': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}],
    'add9': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 2, deg: 1}],
    'madd9': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 7, deg: 4}, {int: 2, deg: 1}],
    'Half-Diminished 9': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 6, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}],
    // Elevenths
    'Major 11': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 11, deg: 6}, {int: 2, deg: 1}, {int: 5, deg: 3}],
    'minor 11': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 7, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}, {int: 5, deg: 3}],
    'Dominant 11': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}, {int: 5, deg: 3}], // Dominant 11 is rare/impractical as diatonic
    'Half-Diminished 11': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 6, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}, {int: 5, deg: 3}],
    // Thirteenths
    'Major 13': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 11, deg: 6}, {int: 2, deg: 1}, {int: 5, deg: 3}, {int: 9, deg: 5}],
    'minor 13': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 7, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}, {int: 5, deg: 3}, {int: 9, deg: 5}],
    'Dominant 13': [{int: 0, deg: 0}, {int: 4, deg: 2}, {int: 7, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}, {int: 5, deg: 3}, {int: 9, deg: 5}],
    'Half-Diminished 13': [{int: 0, deg: 0}, {int: 3, deg: 2}, {int: 6, deg: 4}, {int: 10, deg: 6}, {int: 2, deg: 1}, {int: 5, deg: 3}, {int: 9, deg: 5}],
};

const ALL_CHORD_TYPES = [
    'Triad (Major)', 'Triad (minor)', 'Triad (Diminished)', 
    'sus2', 'sus4', '6', 'm6',
    'Major 7', 'minor 7', 'Dominant 7', 'Half-Diminished 7', 'Diminished 7', 'Dominant 7sus4',
    'Major 9', 'minor 9', 'Dominant 9', 'add9', 'madd9', 'Half-Diminished 9',
    'Major 11', 'minor 11', 'Dominant 11', 'Half-Diminished 11',
    'Major 13', 'minor 13', 'Dominant 13', 'Half-Diminished 13'
];

// Harmonic function rules for Major Key
const diatonicChordsMajor = {
    "1": { quality: "Major", func: "Tonic", structure: ['Triad (Major)', 'Major 7', 'Major 9', 'Major 11', 'Major 13'] },
    "2": { quality: "minor", func: "Subdominant", structure: ['Triad (minor)', 'minor 7', 'minor 9', 'minor 11', 'minor 13'] },
    "3": { quality: "minor", func: "Tonic", structure: ['Triad (minor)', 'minor 7', 'minor 9', 'minor 11', 'minor 13'] },
    "4": { quality: "Major", func: "Subdominant", structure: ['Triad (Major)', 'Major 7', 'Major 9', 'Major 11', 'Major 13'] },
    "5": { quality: "Major", func: "Dominant", structure: ['Triad (Major)', 'Dominant 7', 'Dominant 9', 'Dominant 11', 'Dominant 13'] },
    "6": { quality: "minor", func: "Tonic/Subdominant", structure: ['Triad (minor)', 'minor 7', 'minor 9', 'minor 11', 'minor 13'] },
    "7": { quality: "Diminished", func: "Dominant", structure: ['Triad (Diminished)', 'Half-Diminished 7', 'Half-Diminished 9', 'Half-Diminished 11', 'Half-Diminished 13'] }
};

// Harmonic function rules for Minor Key (Natural/Dorian/Harmonic used for quality definition)
const diatonicChordsMinor = {
    "1": { quality: "minor", func: "Tonic", structure: ['Triad (minor)', 'minor 7', 'minor 9', 'minor 11', 'minor 13'] },
    "2": { quality: "Diminished", func: "Subdominant", structure: ['Triad (Diminished)', 'Half-Diminished 7', 'Half-Diminished 9', 'Half-Diminished 11', 'Half-Diminished 13'] },
    "3": { quality: "Major", func: "Tonic/Mediant", structure: ['Triad (Major)', 'Major 7', 'Major 9', 'Major 11', 'Major 13'] }, // Natural minor/Dorian 3
    "4": { quality: "minor", func: "Subdominant", structure: ['Triad (minor)', 'minor 7', 'minor 9', 'minor 11', 'minor 13'] },
    "5": { quality: "minor", func: "Dominant", structure: ['Triad (minor)', 'minor 7', 'minor 9', 'minor 11', 'minor 13'] }, // Natural minor 5
    "6": { quality: "Major", func: "Subdominant", structure: ['Triad (Major)', 'Major 7', 'Major 9', 'Major 11', 'Major 13'] },
    "7": { quality: "Major", func: "Dominant", structure: ['Triad (Major)', 'Dominant 7', 'Dominant 9', 'Dominant 11', 'Dominant 13'] } // Natural minor 7
    // Note: Augmented 3 and Major 5 are common alterations in Harmonic/Melodic Minor, but not included in base diatonic for simplicity.
};

// Simple chord progression rules (Functional Harmony basics)
const PROGRESSION_RULES = {
    "1": ["4", "5", "6", "2", "3"],
    "2": ["5", "7"],
    "3": ["6", "4"],
    "4": ["5", "7", "2", "6"],
    "5": ["1", "6", "4"],
    "6": ["2", "4", "5"],
    "7": ["1", "6"]
};


// --- TONE.JS INITIALIZATION & RECORDER SETUP ---
let sampler;
let recorder; // Now a native MediaRecorder object
let mediaStreamDestination;
let allGeneratedProgressions = [];
let currentProgressionData = null; // NEW: Global variable to store current progression data for filename
let isBassDropEnabled = true; // Default to ON, matching the 'checked' state in HTML
let recordStatus;
let audioChunks = []; // To hold the recorded data

function initializeAudio() {
    recordStatus = document.getElementById('recordStatus');
    if (sampler) return;

    // Sampler setup: Load a simple piano sound.
    sampler = new Tone.Sampler({
        urls: {
            "C4": "https://tonejs.github.io/audio/salamander/C4.mp3",
        },
        onload: () => {
            document.getElementById('audioStatus').textContent = "Samples Loaded! Ready.";
            document.getElementById('unlockAudio').style.backgroundColor = '#28a745';
            document.getElementById('recordButton').disabled = false;
        },
        onerror: () => {
            document.getElementById('audioStatus').textContent = "Error loading samples.";
        }
    }).toDestination();
    
    // --- NEW RECORDER SETUP (MediaRecorder Approach) ---
    mediaStreamDestination = Tone.context.createMediaStreamDestination();
    sampler.connect(mediaStreamDestination);
    
    recorder = new MediaRecorder(mediaStreamDestination.stream, {
        mimeType: 'audio/webm;codecs=opus' 
    });

    recorder.ondataavailable = event => {
        if (event.data.size > 0) {
            audioChunks.push(event.data);
        }
    };
    
    recorder.onstop = finalizeRecording;

    setTempo();
}

function setTempo() {
    const bpm = document.getElementById('tempoInput').value;
    Tone.Transport.bpm.value = parseInt(bpm);
}


// --- MEDIA RECORDER FUNCTIONS ---

function finalizeRecording() {
    try {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const downloadButton = document.getElementById('downloadButton');
        
        // --- FILENAME FIX: Use saved progression data ---
        let filename = `Progression_Export_${new Date().toISOString().slice(0, 10)}.webm`;
        if (currentProgressionData) {
            // Construct the descriptive filename
            const key = document.getElementById('keySelect').value.replace(/#/g, 'sharp').replace(/b/g, 'flat');
            const quality = document.getElementById('keyQuality').value;
            const progressionStr = currentProgressionData.map(c => c.numeral).join('-');
            
            filename = `${key}_${quality}_${progressionStr}_${new Date().toISOString().slice(0, 10)}.webm`;
        }
        // --- END FILENAME FIX ---
        
        // Update download link attributes
        downloadButton.href = url;
        downloadButton.download = filename; // Use the new descriptive filename
        
        // Update UI state
        recordStatus.textContent = "Recording stopped. Ready to download.";
        document.getElementById('recordButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
        document.getElementById('downloadButton').disabled = false;
        console.log("Recording stopped and link prepared:", filename);

        // Clear chunks array for the next recording
        audioChunks = [];
        currentProgressionData = null; // Clear data after file is prepared
        
    } catch (e) {
        console.error("Failed to finalize recording:", e);
        recordStatus.textContent = "Error finalizing recording. Try clicking Record again.";
        document.getElementById('recordButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
        document.getElementById('downloadButton').disabled = true;
    }
}

async function startRecording() {
    if (!sampler || !sampler.loaded) {
        alert("Please wait for samples to load before recording.");
        return;
    }
    
    // Safety stop for Tone.Transport
    if (Tone.Transport.state === 'started') {
        Tone.Transport.stop(); 
        Tone.Transport.cancel(); 
    }
    
    try {
        audioChunks = [];
        currentProgressionData = null; // Reset progression data at start
        recorder.start();
        
        recordStatus.textContent = "🔴 Recording... (Click Play on a progression)";
        document.getElementById('recordButton').disabled = true;
        document.getElementById('stopButton').disabled = false;
        document.getElementById('downloadButton').disabled = true;
        console.log("Native MediaRecorder started successfully. State:", recorder.state);
    } catch (e) {
        console.error("Failed to start recorder:", e);
        recordStatus.textContent = "Error starting recorder. Check console for details.";
        document.getElementById('recordButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    }
}

async function stopRecording() {
    // Check if recorder object exists and is currently recording
    if (recorder && recorder.state === 'recording') {
        recorder.stop();
    } else {
        console.log("Recorder is not currently active.");
        recordStatus.textContent = "Ready to record.";
        document.getElementById('recordButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    }
}


// --- PROGRAMMATICALLY TRIGGER THE DOWNLOAD ---
function downloadRecording() {
    const downloadButton = document.getElementById('downloadButton');
    
    if (downloadButton.href && !downloadButton.disabled) {
        const a = document.createElement('a');
        a.style.display = 'none'; 
        a.href = downloadButton.href;
        a.download = downloadButton.download;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setTimeout(() => {
            URL.revokeObjectURL(downloadButton.href);
            downloadButton.removeAttribute('href');
        }, 1000); 

    } else {
        alert("Please record and stop an audio sequence first.");
    }
}


// --- TONE.JS PLAYBACK FUNCTION ---
function convertToOctave(notesString, octave = 4) {
    const rawNotes = notesString.split('-');
    if (rawNotes.length === 0) return [];
    
    let bassOctave;

    // Check if the octave drop is enabled
    if (isBassDropEnabled) {
        // Bass note is one octave lower than the upper voices
        bassOctave = octave - 1; 
    } else {
        // Bass note is in the same octave as the upper voices
        bassOctave = octave; 
    }

    const bassNote = rawNotes[0] + bassOctave; 
    
    // The remaining notes (upper voices) are always played in the specified octave
    const upperNotes = rawNotes.slice(1).map(note => note + octave); 
    
    return [bassNote, ...upperNotes]; 
}
async function playSpecificProgression(index) {
    if (!sampler.loaded) {
        alert("Please wait for samples to load before playing.");
        return;
    }

    const progression = allGeneratedProgressions[index];
    if (!progression || progression.length === 0) {
        console.error("Invalid progression index or data.");
        return;
    }

    // NEW: SAVE DATA FOR RECORDING FILENAME
    if (recorder && recorder.state === 'recording') {
        currentProgressionData = progression;
        recordStatus.textContent = `🔴 Recording progression: ${progression.map(c => c.numeral).join('-')}`;
    }

    await Tone.start(); 
    Tone.Transport.stop(); 
    Tone.Transport.cancel(); 
    setTempo(); 

    const chordDuration = "1n"; 
    const releaseDuration = "0.8n"; 
    let startTime = 0;
    
    const button = document.getElementById(`playBtn_${index}`);
    button.style.backgroundColor = '#6c757d'; 

    progression.forEach(chord => {
        const notesToPlay = convertToOctave(chord.notes);
        
        Tone.Transport.schedule(scheduledTime => {
            sampler.triggerAttackRelease(notesToPlay, releaseDuration, scheduledTime); 
        }, startTime);
        
        startTime += Tone.Time(chordDuration).toSeconds();
    });

    const stopTimeWithRelease = startTime + 1.5; 

    Tone.Transport.scheduleOnce(time => {
        button.style.backgroundColor = '#007bff'; 
        
        if (recorder && recorder.state === 'recording') {
            Tone.Transport.stop(); 
            Tone.Transport.cancel();
            stopRecording(); 
        } else {
            Tone.Transport.stop();
            Tone.Transport.cancel();
        }
        
    }, stopTimeWithRelease); 

    Tone.Transport.start();
}


// --- UTILITY AND GENERATION FUNCTIONS ---

function getChromaticIndex(note) {
    const index = NOTE_TO_INDEX[note];
    return index !== undefined ? index : -1;
}

function getDiatonicScale(key, keyQuality) {
    const rootIndex = getChromaticIndex(key);
    if (rootIndex === -1) return [];
    
    const intervals = keyQuality === 'Major' ? scaleIntervalsMajor : scaleIntervalsMinor;
    const diatonicScale = [];
    
    let rootLetter = key.charAt(0);
    let rootLetterNum = letterNames.indexOf(rootLetter); 

    for (let i = 0; i < 7; i++) {
        const interval = intervals[i];
        const rawIndex = (rootIndex + interval) % 12;
        
        const requiredLetter = letterNames[(rootLetterNum + i) % 7];
        
        let spelledNote = spellingMap[rawIndex][requiredLetter];

        if (!spelledNote) {
            const options = INDEX_TO_NOTES[rawIndex];
            spelledNote = options.find(note => note.charAt(0) === requiredLetter);
            
            if (!spelledNote) {
                 spelledNote = INDEX_TO_NOTES[rawIndex][0];
            }
        }
        
        spelledNote = spelledNote.replace(/##/g, 'x').replace(/bb/g, 'b');
        
        diatonicScale.push(spelledNote);
    }

    return diatonicScale;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRootNote(numeral) {
    const key = document.getElementById('keySelect').value;
    const keyQuality = document.getElementById('keyQuality').value;
    const diatonicScale = getDiatonicScale(key, keyQuality); 
    const scaleDegree = parseInt(numeral) - 1;
    
    if (scaleDegree < 0 || scaleDegree >= diatonicScale.length) {
        return 'Error'; 
    }

    return diatonicScale[scaleDegree];
}

function getSpelledNote(noteIndex, numeralIntervalDegree, numeral) {
    const rootNote = getRootNote(numeral);
    if (rootNote === 'Error') return 'Error';

    const rootLetter = rootNote.charAt(0);
    const rootLetterNum = letterNames.indexOf(rootLetter);
    
    const requiredLetter = letterNames[(rootLetterNum + numeralIntervalDegree) % 7];

    let spelledNote = spellingMap[noteIndex][requiredLetter];
    
    if (!spelledNote) {
        const options = INDEX_TO_NOTES[noteIndex];
        spelledNote = options.find(note => note.charAt(0) === requiredLetter);
    }

    if (!spelledNote) {
        spelledNote = notesLookup[noteIndex] || 'ERR'; 
    }
    
    return spelledNote.replace(/##/g, 'x').replace(/bb/g, 'b'); 
}

function getChordNotes(rootNote, chordType, numeral) {
    const rootIndex = getChromaticIndex(rootNote);
    if (rootIndex === -1) return { raw: "Error: Invalid Root Note", indices: [] };

    const intervals = chordIntervals[chordType];
    
    if (!intervals) return { raw: "Error: Unknown Chord Type: " + chordType, indices: [] };

    const notes = [];
    const indices = [];

    for (const item of intervals) {
        const interval = item.int;
        const degree = item.deg;
        
        const noteIndex = (rootIndex + interval) % 12;
        
        const spelledNote = getSpelledNote(noteIndex, degree, numeral);
        
        if (spelledNote === 'Error') return { raw: "Error: Note Spelling Failure", indices: [] };

        notes.push(spelledNote);
        indices.push(noteIndex);
    }
    
    return { raw: notes.join('-'), indices: indices, notes: notes };
}

function getChordSymbolShorthand(root, typeDisplay) {
    if (typeDisplay.startsWith('Triad (Major)')) { typeDisplay = ''; }
    else if (typeDisplay.startsWith('Triad (minor)')) { typeDisplay = 'm'; }
    else if (typeDisplay.startsWith('Triad (Diminished)')) { typeDisplay = 'dim'; } 
    else if (typeDisplay === '6') { typeDisplay = '6'; }
    else if (typeDisplay === 'm6') { typeDisplay = 'm6'; }
    else if (typeDisplay === 'add9') { typeDisplay = 'add9'; } 
    else if (typeDisplay === 'madd9') { typeDisplay = 'm add9'; } 
    else if (typeDisplay === 'Dominant 7sus4') { typeDisplay = '7sus4'; } 
    else if (typeDisplay === 'sus2' || typeDisplay === 'sus4') { typeDisplay = typeDisplay; }
    else {
         typeDisplay = typeDisplay.replace('Major 7', 'M7')
                                 .replace('Major 9', 'M9')
                                 .replace('Major 11', 'M11')
                                 .replace('Major 13', 'M13')
                                 .replace('minor ', 'm')
                                 .replace('Dominant ', '')
                                 .replace('Half-Diminished 7', 'ø7') 
                                 .replace('Diminished 7', 'dim7') 
                                 .replace('Half-Diminished 9', 'ø9')
                                 .replace('Half-Diminished 11', 'ø11')
                                 .replace('Half-Diminished 13', 'ø13')
                                 .replace('Triad', ''); 
    }
    
    const cleanRoot = root.replace(/x/g, '#').replace(/b/g, 'b');

    return `${cleanRoot}${typeDisplay}`;
}

function getBestBassNote(prevChordNotesInfo, currentChordNotesInfo) {
    const currentNotes = currentChordNotesInfo.notes;
    const currentIndices = currentChordNotesInfo.indices;

    const possibleBassNotes = currentNotes.slice(0, Math.min(currentNotes.length, 4));

    if (!prevChordNotesInfo || possibleBassNotes.length === 0) {
        return currentNotes[0]; 
    }

    const prevIndices = prevChordNotesInfo.indices;
    let bestBass = currentNotes[0];
    let minMovement = Infinity;

    for (let i = 0; i < possibleBassNotes.length; i++) {
        const bassNote = possibleBassNotes[i];
        const bassIndex = currentIndices[i];
        
        const prevRootIndex = prevIndices[0]; 
        
        let diff = Math.abs(prevRootIndex - bassIndex);
        let movement = Math.min(diff, 12 - diff); 
        
        if (movement < minMovement) {
            minMovement = movement;
            bestBass = bassNote;
        }
    }

    return bestBass;
}


// --- CHORD ANALYSIS LOGIC (Adhering to user's custom formatting rules) ---

function generateFullAnalysis(progression) {
    let analysisHTML = '<div class="analysis-section"><h2>Full Chord Analysis & Possibilities</h2>';

    for (const chord of progression) {
        const numeral = chord.numeral; 
        const root = getRootNote(numeral);
        
        if (root === 'Error') {
            analysisHTML += `<div class="chord-analysis"><h3>Numeral ${numeral} (Error)</h3><p>Could not generate scale/root note for analysis.</p></div>`;
            continue; 
        }

        const qualityData = (document.getElementById('keyQuality').value === 'Major') ? diatonicChordsMajor : diatonicChordsMinor;
        const chordQuality = qualityData[numeral].quality;
        const chordFunction = qualityData[numeral].func;

        analysisHTML += `<div class="chord-analysis">`;
        analysisHTML += `<h3>Numeral ${numeral} (${root} ${chordQuality}, Function: ${chordFunction})</h3>`;
        analysisHTML += `<ul>`;

        for (const type of ALL_CHORD_TYPES) {
            let notesInfo;
            try {
                notesInfo = getChordNotes(root, type, numeral);
            } catch (e) {
                continue;
            }
            
            if (notesInfo.raw.includes('Error')) continue;
            
            let isDiatonic = false;
            
            if (qualityData[numeral].structure.includes(type) ||
                (type === 'sus2' || type === 'sus4' || type === 'add9' || type === 'madd9' || type === 'Dominant 7sus4' || type === '6' || type === 'm6')) {
                isDiatonic = true;
            }

            if (numeral === '7' && qualityData[numeral].quality === 'Diminished' && (type.includes('Diminished') || type.includes('Half-Diminished'))) {
                isDiatonic = true;
            }
            if (numeral === '2' && document.getElementById('keyQuality').value === 'Minor' && (type.includes('Diminished') || type.includes('Half-Diminished'))) {
                isDiatonic = true;
            }
            
            if (!isDiatonic) continue;


            const chordSymbol = getChordSymbolShorthand(root, type);
            
            const notes = notesInfo.raw
                                     .replace(/x/g, '#') 
                                     .replace(/b/g, 'b')
                                     .replace(/#/g, '#'); 


            analysisHTML += `<li><strong>${chordSymbol} (${type})</strong>: ${notes}</li>`;
        }

        analysisHTML += `</ul></div>`;
    }

    analysisHTML += '</div>';
    return analysisHTML;
}

// --- UI AND INITIALIZATION FUNCTIONS (Retained for stability) ---

function populateKeys() {
    const keySelect = document.getElementById('keySelect');
    const keyQuality = document.getElementById('keyQuality').value;
    keySelect.innerHTML = ''; 
    
    const allKeys = ["C", "C#", "Db", "D", "Eb", "E", "F", "F#", "Gb", "G", "Ab", "A", "Bb", "B"];
    
    const uniqueKeys = [...new Set(allKeys)];

    uniqueKeys.forEach(note => {
        const option = document.createElement('option');
        option.value = note;
        option.textContent = note + ' ' + keyQuality;
        keySelect.appendChild(option);
    });
    document.getElementById('keySelect').value = 'C'; 
}


function getRandomType(numeral) {
    const keyQuality = document.getElementById('keyQuality').value;
    const harmonicStyle = document.getElementById('harmonicStyle').value;
    const diatonicChords = (keyQuality === 'Major') ? diatonicChordsMajor : diatonicChordsMinor;
    const numeralData = diatonicChords[numeral];
    
    const isMinorQuality = numeralData.quality.toLowerCase().includes('minor') || numeralData.quality.toLowerCase().includes('diminished');
    
    let availableTypes = [];
    
    if (harmonicStyle === 'Simple') {
        if (Math.random() < 0.7) { availableTypes.push(numeralData.structure[0]); }
        if (Math.random() < 0.3) { availableTypes.push(numeralData.structure[1]); }
    } else { 
        if (Math.random() < 0.4) { availableTypes.push(numeralData.structure[0]); }
        if (Math.random() < 0.6) { availableTypes.push(numeralData.structure[1]); }
        if (Math.random() < 0.5) { availableTypes.push(numeralData.structure[2]); }
        if (Math.random() < 0.3) { availableTypes.push(getRandomElement(numeralData.structure.slice(3))); }
    }

    if (numeral !== '7' && Math.random() < 0.2) { availableTypes.push(getRandomElement(['sus2', 'sus4'])); }
    if (numeral !== '7' && Math.random() < 0.15) { availableTypes.push(isMinorQuality ? 'madd9' : 'add9'); }
    if (numeral === '5' && Math.random() < 0.1) { availableTypes.push('Dominant 7sus4'); }
    if (numeral !== '7' && Math.random() < 0.05) { availableTypes.push(isMinorQuality ? 'm6' : '6'); }

    if (availableTypes.length === 0) {
        return numeralData.structure[0];
    }
    
    let result = getRandomElement(availableTypes);

    if ((numeral === '7' && keyQuality === 'Major' && result.includes('7')) || (numeral === '2' && keyQuality === 'Minor' && result.includes('7'))) {
        return 'Half-Diminished 7'; 
    }
    
    return result;
}

// ----------------------------------------------------------------------
// --- MAIN PROGRESSION LOGIC (Updated to support multiple progressions) ---
// ----------------------------------------------------------------------

function generateRuleBasedProgression(progressionLength, useDeceptiveCadence) {
    const tonicNumerals = ["1", "3", "6"];
    let progression = [];
    let currentNumeral = getRandomElement(tonicNumerals);
    
    if (currentNumeral) {
        progression.push({ numeral: currentNumeral });
    }

    while (progression.length < progressionLength) {
        let possibleNextNumerals = PROGRESSION_RULES[currentNumeral];
        
        if (!possibleNextNumerals || possibleNextNumerals.length === 0) {
            currentNumeral = "1";
        } else {
            let nextNumeral = getRandomElement(possibleNextNumerals);
            
            if (nextNumeral === currentNumeral) {
                 const filtered = possibleNextNumerals.filter(n => n !== currentNumeral);
                 if (filtered.length > 0) nextNumeral = getRandomElement(filtered);
            }
            
            // --- CADENCE LOGIC ---
            if (progression.length === progressionLength - 1) {
                const isDominant = ["5", "7"].includes(currentNumeral);
                
                if (isDominant && useDeceptiveCadence) {
                    nextNumeral = "6"; 
                } else if (isDominant) {
                    nextNumeral = "1";
                } else {
                    const resolutionOptions = ["1", "6"];
                    if (!resolutionOptions.includes(nextNumeral)) {
                        nextNumeral = getRandomElement(resolutionOptions);
                    }
                }
            }
            // --- END CADENCE LOGIC ---

            currentNumeral = nextNumeral;
        }
        
        progression.push({ numeral: currentNumeral });
    }
    
    return progression;
}


function suggestProgressions() {
    initializeAudio(); // Ensure sampler and MediaRecorder are initializing

    const key = document.getElementById('keySelect').value;
    const keyQuality = document.getElementById('keyQuality').value;
    const progLength = parseInt(document.getElementById('progressionLength').value); 
    const useDeceptiveCadence = document.getElementById('deceptiveCadence').checked; 
    const numExamples = parseInt(document.getElementById('numExamples').value); 
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = '';
    allGeneratedProgressions = []; 

    if (!key || getChromaticIndex(key) === -1) {
        resultsDiv.innerHTML = '<p>Please select a valid key and quality first.</p>';
        return;
    }
    
    if (!sampler || !sampler.loaded) {
        resultsDiv.innerHTML = `<p style="color:red;">**Warning:** Samples are still loading. Generation is complete, but playback may not work yet. Wait for "Samples Loaded! Ready."</p>`;
    }

    const diatonicChords = (keyQuality === 'Major') ? diatonicChordsMajor : diatonicChordsMinor;

    let suggestionsHTML = `<div class="suggestions-box"><h2>Suggested Progressions in ${key} ${keyQuality} (${progLength} Chords)</h2>`;
    if (useDeceptiveCadence) {
        suggestionsHTML += `<p><strong>Note:</strong> Deceptive Cadence (V $\\rightarrow$ vi) is active, forcing the final chord to **6** if the preceding chord is **5** or **7**.</p>`;
    }


    for (let i = 0; i < numExamples; i++) {
        
        const progressionNumerals = generateRuleBasedProgression(progLength, useDeceptiveCadence);
        let suggestedProgression = [];
        let prevChordNotesInfo = null;
        let errorDetected = false;
        
        for (let j = 0; j < progressionNumerals.length; j++) {
            const numeral = progressionNumerals[j].numeral;
            const chordType = getRandomType(numeral);
            const root = getRootNote(numeral); 
            
            if (root === 'Error') {
                errorDetected = true;
                break;
            }

            const notesInfo = getChordNotes(root, chordType, numeral); 
            
            if (notesInfo.raw.includes('Error')) {
                errorDetected = true;
                break;
            }
            
            const bestBassNote = getBestBassNote(prevChordNotesInfo, notesInfo);

            const chordData = {
                numeral: numeral,
                func: diatonicChords[numeral].func, 
                type: chordType,
                bass: bestBassNote, 
                notes: notesInfo.raw.replace(/x/g, '#').replace(/b/g, 'b') 
            };
            suggestedProgression.push(chordData);

            prevChordNotesInfo = notesInfo;
        }
        
        if (errorDetected) {
            suggestionsHTML += `<p style="color:red;"><strong>Example ${i + 1}:</strong> Generation Failed. Key/Spelling error detected.</p>`;
            continue;
        }

        allGeneratedProgressions.push(suggestedProgression);
        const currentIndex = allGeneratedProgressions.length - 1; 

        let chordBlockHTML = '';
        for (const chord of suggestedProgression) {
            const root = getRootNote(chord.numeral);
            const chordSymbol = getChordSymbolShorthand(root, chord.type);
            
            const cleanBass = chord.bass.replace(/x/g, '#').replace(/b/g, 'b');
            const slashChordDisplay = `${chordSymbol}/${cleanBass}`;
            
            chordBlockHTML += `
                <div class="chord-unit">
                    <span class="numeral">${chord.numeral}</span>
                    <span class="function">${chord.func}</span>
                    <span class="symbol">${slashChordDisplay}</span>
                    <span class="notes">${chord.notes}</span>
                </div>
            `;
        }

        suggestionsHTML += `
            <div class="progression-title">
                <p>Example ${i + 1}:</p>
                <button id="playBtn_${currentIndex}" class="play-specific-btn" onclick="playSpecificProgression(${currentIndex})">▶️ Play</button>
            </div>
            <div class="progression-container">
                ${chordBlockHTML}
            </div>
        `;
    }

    if (allGeneratedProgressions.length > 0) {
         const uniqueNumerals = allGeneratedProgressions[0].map(c => c.numeral);
         const analysisNumerals = [...new Set(uniqueNumerals)]; 
         const simplifiedProgressionForAnalysis = analysisNumerals.map(numeral => ({ numeral: numeral }));

         suggestionsHTML += generateFullAnalysis(simplifiedProgressionForAnalysis);
    } else if (resultsDiv.innerHTML === '') {
         resultsDiv.innerHTML = '<p>No progressions could be successfully generated.</p>';
    }

    suggestionsHTML += `</div>`;
    resultsDiv.innerHTML = suggestionsHTML;
}

document.addEventListener('DOMContentLoaded', populateKeys);
document.addEventListener('DOMContentLoaded', initializeAudio);
document.getElementById('bassDropToggle').addEventListener('change', (e) => {
    isBassDropEnabled = e.target.checked;
});