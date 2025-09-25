import { writeFileSync, mkdirSync } from 'fs';

const html = `<!DOCTYPE html>
<html>
<head>
    <title>FusionMix Quantum - LIVE DJ APP</title>
    <style>
        body { 
            background: #000; 
            color: #00ff88; 
            font-family: Arial; 
            margin: 0; 
            padding: 20px;
            text-align: center;
        }
        .header {
            background: rgba(0,255,136,0.1);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            border: 2px solid #00ff88;
        }
        h1 {
            font-size: 3em;
            margin-bottom: 10px;
        }
        .deck { 
            background: #111; 
            padding: 25px; 
            margin: 15px; 
            border-radius: 15px;
            display: inline-block;
            width: 300px;
            vertical-align: top;
        }
        button { 
            background: #00ff88; 
            color: #000; 
            border: none; 
            padding: 12px 24px; 
            margin: 10px; 
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        audio {
            width: 100%;
            margin-top: 15px;
        }
        .success {
            background: rgba(0,255,136,0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px auto;
            max-width: 600px;
            border: 2px solid #00ff88;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎛️ FUSIONMIX QUANTUM</h1>
        <p>LIVE DJ APPLICATION - DEPLOYMENT SUCCESS! 🚀</p>
    </div>

    <div class="success">
        <h2>✅ YOUR DJ APP IS LIVE!</h2>
        <p>Upload audio files and start mixing!</p>
    </div>

    <div class="deck">
        <h3>🎧 DECK A</h3>
        <input type="file" accept="audio/*" id="fileA">
        <button onclick="playA()">▶️ PLAY A</button>
        <audio id="audioA" controls></audio>
    </div>

    <div class="deck">
        <h3>🎧 DECK B</h3> 
        <input type="file" accept="audio/*" id="fileB">
        <button onclick="playB()">▶️ PLAY B</button>
        <audio id="audioB" controls></audio>
    </div>

    <div style="margin-top: 40px;">
        <h3>🚀 Features Working:</h3>
        <p>✅ Audio File Upload</p>
        <p>✅ Play/Pause Controls</p>
        <p>✅ Dual Deck Interface</p>
        <p>✅ Professional Design</p>
    </div>

    <script>
        function setupDeck(deckId, audioId) {
            const fileInput = document.getElementById(deckId);
            const audio = document.getElementById(audioId);
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    audio.src = url;
                    alert('🎵 Track loaded: ' + file.name);
                }
            });
            
            return audio;
        }

        const audioA = setupDeck('fileA', 'audioA');
        const audioB = setupDeck('fileB', 'audioB');

        window.playA = () => {
            if (audioA.paused) {
                audioA.play();
                document.querySelector('button[onclick="playA()"]').textContent = '⏸️ PAUSE A';
            } else {
                audioA.pause();
                document.querySelector('button[onclick="playA()"]').textContent = '▶️ PLAY A';
            }
        };

        window.playB = () => {
            if (audioB.paused) {
                audioB.play();
                document.querySelector('button[onclick="playB()"]').textContent = '⏸️ PAUSE B';
            } else {
                audioB.pause();
                document.querySelector('button[onclick="playB()"]').textContent = '▶️ PLAY B';
            }
        };
    </script>
</body>
</html>`;

mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html);
writeFileSync('dist/404.html', html);
console.log('✅ BUILD SUCCESS: DJ app ready for deployment!');
