const keyNotes = {
    'a': 'C',
    'w': 'C#',
    's': 'D',
    'e': 'D#',
    'd': 'E',
    'f': 'F',
    't': 'F#',
    'g': 'G',
    'y': 'G#',
    'h': 'A',
    'u': 'A#',
    'j': 'B'
  };
  
  function playSound(note) {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = getFrequency(note);
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 1000);
    const box = document.querySelector(`[data-note="${note}"]`);
    box.classList.add('playing');
    setTimeout(() => box.classList.remove('playing'), 1000);
  }

  //add a comment
  
  function getFrequency(note) {
    const frequencies = {
      'C': 261.63,
      'C#': 277.18,
      'D': 293.66,
      'D#': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99,
      'G': 392.00,
      'G#': 415.30,
      'A': 440.00,
      'A#': 466.16,
      'B': 493.88
    };
    return frequencies[note];
  }
  
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    const key = Object.keys(keyNotes).find(k => keyNotes[k] === box.dataset.note);
    document.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === key) {
        playSound(box.dataset.note);
      }
    });
    box.addEventListener('mousedown', () => {
      playSound(box.dataset.note);
    });
  });
  
  const pianoKeys = document.querySelectorAll('.key');
  
  function playKey(event) {
    const key = event.target;
    const note = key.dataset.note;
    key.classList.add('playing');
    playSound(note);
  }
  
  function removePlayingClass(event) {
    const key = event.target;
    key.classList.remove('playing');
  }
  
  pianoKeys.forEach(key => {
    key.addEventListener('mousedown', playKey);
    key.addEventListener('mouseup', removePlayingClass);
    key.addEventListener('mouseleave', removePlayingClass);
  });
  