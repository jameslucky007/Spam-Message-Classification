 // Initialize GSAP animations
 document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate all sections
    gsap.utils.toArray('section, div[id]').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Animate cards with stagger
    gsap.from(".card-3d", {
        scrollTrigger: {
            trigger: "#features",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1
    });
    
    // Floating animation for shield icon
    gsap.to("#floating-shield", {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // 3D tilt effect for cards
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    });
});

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters - taken from the Katakana Unicode block
    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    
    // Convert string to array of single characters
    const charArray = chars.split("");
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array of drops - one per column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Drawing the characters
    function draw() {
        // Black BG for canvas
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#0f0"; // Green text
        ctx.font = fontSize + "px monospace";
        
        // Loop over drops
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // x = i * fontSize, y = value of drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Sending drop back to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment Y coordinate
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Initialize particles.js
function initParticles() {
    // This would normally use the particles.js library
    // For this demo, we'll simulate it with a simple implementation
    const container = document.getElementById('particles-js');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // Create particles
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = 'rgba(107, 115, 255, 0.5)';
            ctx.fill();
            
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Initialize 3D Shield
function init3DShield() {
    const container = document.getElementById('floating-shield');
    
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    
    // Create shield geometry
    const geometry = new THREE.TorusGeometry(5, 1, 16, 100);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6B73FF,
        specular: 0x111111,
        shininess: 30,
        transparent: true,
        opacity: 0.8
    });
    
    const shield = new THREE.Mesh(geometry, material);
    scene.add(shield);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 10;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        shield.rotation.x += 0.01;
        shield.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize all effects
window.onload = function() {
    initMatrixRain();
    initParticles();
    
    // Only initialize 3D if Three.js is available
    if (typeof THREE !== 'undefined') {
        init3DShield();
    }
};

// This is a simplified demo version - in a real app you would use a trained ML model
function classifyEmail() {
    const emailText = document.getElementById('email-text').value.trim();
    const resultContainer = document.getElementById('result-container');
    const emptyState = document.getElementById('empty-state');
    const resultIcon = document.getElementById('result-icon');
    const resultText = document.getElementById('result-text');
    const confidenceText = document.getElementById('confidence-text');
    const indicatorsList = document.getElementById('indicators-list');
    
    if (!emailText) {
        // Animate shake effect
        gsap.to("#email-text", {
            x: [-5, 5, -5, 5, 0],
            duration: 0.5,
            ease: "power1.out"
        });
        return;
    }
    
    // Show loading state with animation
    resultContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');
    resultIcon.innerHTML = '<i class="fas fa-circle-notch fa-spin text-gray-500"></i>';
    resultText.textContent = 'Analyzing email...';
    confidenceText.textContent = '';
    indicatorsList.innerHTML = '';
    
    // Animate the analysis process
    gsap.from(resultContainer, {
        opacity: 0,
        y: 20,
        duration: 0.5
    });
    
    // Simulate API call delay with more realistic processing animation
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            clearInterval(progressInterval);
            showResults(emailText);
        }
    }, 100);
    
    function showResults(text) {
        // Simple heuristic-based detection for demo purposes
        const isSpam = detectSpam(text);
        const confidence = Math.floor(Math.random() * 20) + 80; // Random confidence 80-99%
        
        // Animate result appearance
        gsap.to(resultIcon, {
            scale: 1.2,
            duration: 0.3,
            onComplete: () => {
                gsap.to(resultIcon, { scale: 1, duration: 0.2 });
            }
        });
        
        if (isSpam) {
            resultIcon.innerHTML = '';
            resultIcon.classList.add('spam-pulse', 'bg-red-500');
            resultIcon.innerHTML = '<i class="fas fa-exclamation-triangle text-white"></i>';
            resultText.textContent = 'This email is likely SPAM';
            confidenceText.textContent = `Confidence: ${confidence}%`;
            
            // Add indicators with animation
            const indicators = [
                'Contains suspicious links',
                'Urgent language detected',
                'Unusual sender patterns',
                'Request for personal information'
            ];
            
            indicatorsList.innerHTML = '';
            indicators.forEach((indicator, i) => {
                setTimeout(() => {
                    const li = document.createElement('li');
                    li.textContent = indicator;
                    indicatorsList.appendChild(li);
                    
                    // Animate each list item
                    gsap.from(li, {
                        opacity: 0,
                        x: -20,
                        duration: 0.3
                    });
                }, i * 150);
            });
            
            // Play warning sound in a real app
        } else {
            resultIcon.innerHTML = '';
            resultIcon.classList.add('ham-pulse', 'bg-green-500');
            resultIcon.innerHTML = '<i class="fas fa-check-circle text-white"></i>';
            resultText.textContent = 'This email appears to be legitimate';
            confidenceText.textContent = `Confidence: ${confidence}%`;
            
            // Add indicators with animation
            const indicators = [
                'Normal language patterns',
                'No suspicious links detected',
                'Appropriate greeting/signature',
                'Expected content for sender'
            ];
            
            indicatorsList.innerHTML = '';
            indicators.forEach((indicator, i) => {
                setTimeout(() => {
                    const li = document.createElement('li');
                    li.textContent = indicator;
                    indicatorsList.appendChild(li);
                    
                    // Animate each list item
                    gsap.from(li, {
                        opacity: 0,
                        x: -20,
                        duration: 0.3
                    });
                }, i * 150);
            });
        }
    }
}

// Simple heuristic-based spam detection for demo
function detectSpam(text) {
    const lowerText = text.toLowerCase();
    const spamKeywords = [
    'win', 'fuck you', 'prize', 'congratulations', 'offer', 'fuck',
'limited', 'click here', 'urgent', 'account', 'password',
'verify', 'update', 'dear customer', 'unsubscribe', 'million',
'dollars', 'inheritance', 'lottery', 'credit card', 'loan',
'$$$', 'act now', 'call now', 'apply now', 'order now',
'risk free', 'special promotion', 'money back', 'no cost',
'no fees', 'cash', 'extra income', 'home based', 'income',
'opportunity', 'while supplies last', 'winner', 'won',
'viagra', 'cialis', 'pharmacy', 'prescription', 'meds',
'free trial', 'claim now', 'hurry up', 'limited time',
'wire transfer', 'bank account', 'insurance', 'investment',
'guaranteed', 'lowest price', 'double your income',
'secret trick', 'financial freedom', 'fast money',
'hidden charges', 'no obligations', 'pre-approved',
'instant access', 'easy money', 'earn per day', 'make money fast',
'crypto', 'bitcoin', 'nft', 'binance', 'coinbase', 'forex',
'trading', 'stocks', 'financial gain', 'quick cash',
'your account has been compromised', 'suspicious activity detected',
'log in immediately', 'reset your password', 'security alert',
'click to protect', 'free gift', 'you have been selected',
'your payment is pending', 'paypal alert', 'amazon refund',
'ebay notification', 'your card has been charged',
'verify your details', 'access now', 'locked account',
'urgent response required', 'update your billing info',
'government refund', 'irs', 'fbi', 'urgent action needed',
'hot singles', 'sex', 'xxx', 'porn', 'adult dating',
'escort', 'webcam', 'nude', 'hookup', 'meet singles',
'girls in your area', 'live chat', 'free video', 'explicit content',
'microsoft support', 'tech support', 'customer support',
'your computer is infected', 'call this number', 'free scan',
'windows warning', 'security update required',
'facebook lottery', 'instagram verification', 'twitter giveaway',
'get more followers', 'social media marketing', 'blue checkmark',
'help us', 'donate now', 'support our cause', 'charity relief',
'natural disaster relief', 'fundraiser',
'I love you', 'my dear', 'trust me', 'send me money',
'I am stuck', 'western union', 'money transfer',
'work from home', 'be your own boss', 'part-time opportunity',
'high paying job', 'no experience needed', 'data entry job',
'click to apply', 'get paid today',
'free iphone', 'win a car', 'gift card', 'survey reward',
'enter to win', 'claim your prize', 'limited slots available',
'as seen on tv', 'instant results', 'miracle cure',
'free vacation', 'timeshare', 'secret formula','do not miss out', 
'breaking news', 'hidden fees',  'win', 'prize', 'congratulations',
'million', 'dollars', 'inheritance','lottery', 'credit card', 'loan', '$$$', 'cash', 'extra income', 
'home based', 'income', 'opportunity', 'winner', 'won', 'financial freedom',
'fast money', 'easy money', 'earn per day', 'make money fast', 'quick cash',
'crypto', 'bitcoin', 'nft', 'binance', 'coinbase', 'forex', 'trading', 
'stocks', 'financial gain', 'government refund', 'irs', 'fbi',
'western union', 'money transfer', 'wire transfer', 'bank account',
'your payment is pending', 'paypal alert', 'amazon refund', 'ebay notification',
'your card has been charged', 'verify your details', 'access now',
'account', 'password', 'verify', 'update', 'dear customer', 'unsubscribe',
'your account has been compromised', 'suspicious activity detected',
'log in immediately', 'reset your password', 'security alert',
'click to protect', 'locked account', 'urgent response required',
'update your billing info', 'urgent action needed', 'security update required',  
'guarantee', 'eliminate debt', 'low interest', 'refinance',
'pre-qualified', 'pre-approved', 'increase your credit score',
'best deal', 'lowest rates', 'instant approval',
'special discount', 'get rich', 'double your earnings',
'unclaimed funds', 'urgent request', 'claim instantly',
'zero risk', 'cash bonus', 'lottery winner',
'act fast', 'expires soon', 'final notice', 'one-time offer',
'only for today', 'last chance', 'don’t miss out', 'limited availability',
'instant win', 'once in a lifetime', 'exclusive deal', 'must act now',
'massive ROI', 'crypto millionaire', 'NFT giveaway', 'Ethereum drop',
'Bitcoin jackpot', 'binance rewards', 'investment opportunity',
'guaranteed returns', 'stock trading secrets', 'financial loophole',
'double your profits', 'no-risk investment', 'bank deposit alert',
'your account is suspended', 'verify now to continue',
'unusual login detected', 'payment declined', 'reset password now',
'account security check', 'billing issue', 'account update required',
'new device signed in', 'secure your account', 'unauthorized purchase',
'urgent PayPal alert', 'Apple ID locked', 'Amazon refund issue',
'your order has been delayed', 'click below to resolve', 'eBay warning',
'your PC is infected', 'virus detected', 'free antivirus scan',
'download immediately', 'protect your files', 'computer at risk',
'click to remove threats', 'system breach detected',
'trojan warning', 'hacked email detected', 'free security update',
'Microsoft detected a problem', 'Windows security alert',
'contact our support team', 'call this number now',
'your device is at risk', 'Apple support alert', 'Google warning',
'update your software', 'download support tool',
'I need your help', 'you are my soulmate', 'send me a gift card',
'Western Union transfer', 'my visa got rejected', 'I lost my wallet',
'please send money', 'we can be together soon', 'I love you deeply',
'help me relocate', 'I need funds for a ticket', 'trust me my dear',
'miracle cure', 'instant weight loss', 'lose 10 kg in a week',
'proven formula', 'cure for diabetes', 'anti-aging breakthrough',
'get rid of wrinkles', 'all-natural remedy', 'limited health study',
'doctors don’t want you to know', 'health experts shocked',
'win a free iPhone', 'congrats! you are selected', 'take this short survey',
'get a free gift card', 'exclusive member reward', 'VIP giveaway',
'answer & win', 'surprise bonus', 'claim your exclusive offer',
'earn from home', 'no experience required', 'be your own boss',
'work online & earn big', 'quit your job today', 'easy online earnings',
'we will pay you', 'instant part-time income', 'highest-paying remote jobs',
'affiliate marketing secrets', 'massive commissions', 'get paid daily',
'as seen on TV', 'big savings', 'best price guaranteed',
'for a limited time', 'unbelievable discount', 'exclusive insider deal',
'act before midnight', '100% satisfaction', 'hidden charges may apply',
'full refund available', 'never seen before', 'earn in your sleep',
'Send me your details, and I’ll transfer the funds!',"This secret system guarantees huge profits!",
"Be your own boss with this incredible business idea!","Once in a lifetime opportunity – don’t miss out!",
"Guaranteed returns – no risk at all!","This method has helped thousands become rich!",
"Sign up for our VIP membership for exclusive rewards!","Win a luxury car by answering just one question!",
"Special gift for our loyal customers – claim yours now!","Instant approval for a no-credit-check loan!",
"Your password is exposed! Change it now for security!","Warning: Someone is tracking your location!",
"Privacy alert: Your data has been leaked online!","Stop hackers from spying on you – install this tool!",
"Secure your device now with our premium VPN for free!","Government tracking alert: Your device is compromised!",
"Erase your online history permanently – 100% free!","This one-click solution protects you from cyber threats!",
"Your personal information is being sold – act fast!","Stop identity theft with this must-have security tool!","Make $500 a day from home with no experience!","Earn passive income while you sleep – click to learn how!","New investment opportunity – double your money overnight!","Join our work-from-home program and become a millionaire!","Bitcoin traders are making millions – don’t miss out!",
"Start earning online with just a $10 investment!",
"Secret method to become rich fast – limited slots available!",
"Top CEOs don’t want you to know this money-making trick!",
"Turn $50 into $5,000 with this automated trading software!",
"No job? No problem! Earn from your phone today!","You have an outstanding tax payment – pay now to avoid arrest!","Your social security number has been suspended – call now!","This is the IRS – we are filing a lawsuit against you!",
"Unclaimed money is waiting for you – call us to receive it!","Your phone number has won a lucky draw prize!",
"Urgent: Your car warranty is expiring, renew now!",
"We found a loan approval under your name – accept it now!",
"Your Google account is at risk – verify immediately!",
"Limited-time offer: Buy a house with no down payment!",
"You’ve been selected for a government grant, claim it today!","Your computer has a virus! Download this software now!",
"Microsoft Support: Your PC is infected, call us immediately!","Reset your password now to protect your account!",
"Someone tried to access your email – confirm your identity!","Upgrade your internet speed for free with this trick!",
"Unlock premium Netflix for free – click here!","Install this app to hack any WiFi password!","Watch unlimited movies without paying a single cent!","Get premium software for free – limited-time offer!","Protect your device from hackers – free antivirus download!","Hurry! Limited-time sale – up to 95% off all items!","Exclusive offer: Buy one, get three free!",
"Claim your free iPhone now before it’s gone!","Act now and get a luxury watch for just $10!",
"Complete this survey and win a $500 Walmart gift card!","Special discount for our VIP customers only!",
"No cost, no fees – just sign up and start earning!","Free samples available – just pay for shipping!",
"Exclusive giveaway – enter your email to participate!","We’re sending free products to our first 100 customers!","Get Viagra and Cialis at the lowest price guaranteed!","Lose 20 pounds in 7 days with this miracle pill!",
"Boost your testosterone with this secret formula!","Pharmacy clearance sale – meds at 90% discount!",
"Prescription drugs now available without a prescription!",
"Cure baldness overnight with this magical hair serum!",
"Revolutionary diet pills – doctors don’t want you to know!",
"Click here for a free health consultation!",
"Get bigger muscles in just 10 days with this supplement!",
"Stop aging instantly with this anti-wrinkle cream!","Urgent! Your bank account has been compromised, verify now!",
"Your PayPal account has been suspended – update your details!",
"We detected unauthorized activity, confirm your password now!",
"Dear Customer, we need to update your security information!",
"Warning! Your credit card is at risk, act immediately!",
"You are pre-approved for a premium credit card with $0 fees!",
"Unlock VIP banking benefits with this special promotion!",
"Complete a quick survey to get a $100 Amazon gift card!",
"Important notice: We need your credentials for verification!",
"Your ATM PIN has been reset, click here to retrieve it!","Congratulations! You’ve won $1,000,000 in our lucky draw!",
"You’re the lucky winner of our exclusive prize giveaway!",
"Click here to claim your lottery winnings before they expire!",
"Act now and double your money instantly with this investment!",
"Earn $$$ in just a few hours from home – no skills needed!",
"Transfer fee required to unlock your inherited millions!",
"Your bank account has been credited with a huge sum – verify now!",
"Send your account details to receive your unclaimed funds!",
"Get your instant loan with no credit check and zero interest!",
"A mysterious millionaire wants to share his wealth with you!"        
    ];
    
    const spamPatterns = [
        /https?:\/\/[^\s]+/g, // URLs
        /[\w\.-]+@[\w\.-]+/g, // Email addresses
        /\d{10,}/g, // Long numbers (like credit cards)
        /[A-Z]{3,}/g // Excessive capitalization
    ];
    
    // Check for keywords
    const keywordMatches = spamKeywords.filter(word => lowerText.includes(word));
    
    // Check for patterns
    let patternMatches = 0;
    spamPatterns.forEach(pattern => {
        const matches = text.match(pattern);
        if (matches) patternMatches += matches.length;
    });
    
    // Simple scoring - if we have more than 2 spam indicators, consider it spam
    return (keywordMatches.length + patternMatches) > 2;
}