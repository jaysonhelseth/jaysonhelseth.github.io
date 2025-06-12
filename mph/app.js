class SpeedGauge {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.speed = 0;
        this.targetSpeed = 0;
        this.maxSpeed = 120; // Maximum speed to display
        this.animationId = null;
        
        // Set canvas size
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Start animation
        this.animate();
    }

    resize() {
        const size = Math.min(window.innerWidth * 0.8, 300);
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.centerX, this.centerY) * 0.8;
    }

    setSpeed(speed) {
        this.targetSpeed = Math.min(speed, this.maxSpeed);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Smooth speed transition
        this.speed += (this.targetSpeed - this.speed) * 0.1;
        
        this.drawGauge();
        this.drawSpeed();
        this.drawSegments();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawGauge() {
        // Draw outer ring
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#0ff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Draw inner ring
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius * 0.9, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Draw speed arc
        const speedPercentage = this.speed / this.maxSpeed;
        const startAngle = Math.PI * 0.75;
        const endAngle = startAngle + (Math.PI * 1.5 * speedPercentage);

        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius * 0.95, startAngle, endAngle);
        this.ctx.strokeStyle = '#0ff';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();

        // Add glow effect
        this.ctx.shadowColor = '#0ff';
        this.ctx.shadowBlur = 20;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }

    drawSpeed() {
        // Draw speed text
        this.ctx.font = `bold ${this.radius * 0.4}px 'Arial'`;
        this.ctx.fillStyle = '#0ff';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(Math.round(this.speed), this.centerX, this.centerY);

        // Add glow effect
        this.ctx.shadowColor = '#0ff';
        this.ctx.shadowBlur = 20;
        this.ctx.fillText(Math.round(this.speed), this.centerX, this.centerY);
        this.ctx.shadowBlur = 0;
    }

    drawSegments() {
        const segments = 12;
        const segmentAngle = (Math.PI * 1.5) / segments;
        const startAngle = Math.PI * 0.75;

        for (let i = 0; i <= segments; i++) {
            const angle = startAngle + (segmentAngle * i);
            const x1 = this.centerX + Math.cos(angle) * (this.radius * 0.85);
            const y1 = this.centerY + Math.sin(angle) * (this.radius * 0.85);
            const x2 = this.centerX + Math.cos(angle) * (this.radius * 0.95);
            const y2 = this.centerY + Math.sin(angle) * (this.radius * 0.95);

            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.strokeStyle = '#0ff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }
}

class SpeedTracker {
    constructor() {
        this.canvas = document.getElementById('speedGauge');
        this.gauge = new SpeedGauge(this.canvas);
        this.status = document.querySelector('.status');
        this.startButton = document.getElementById('startTracking');
        this.watchId = null;
        this.isTracking = false;

        this.startButton.addEventListener('click', () => this.toggleTracking());
    }

    toggleTracking() {
        if (this.isTracking) {
            this.stopTracking();
        } else {
            this.startTracking();
        }
    }

    startTracking() {
        if (!navigator.geolocation) {
            this.status.textContent = 'Geolocation is not supported by your browser';
            return;
        }

        this.status.textContent = 'Starting tracking...';
        this.startButton.textContent = 'Stop Tracking';
        this.isTracking = true;

        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handlePosition(position),
            (error) => this.handleError(error),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        );
    }

    stopTracking() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        this.isTracking = false;
        this.startButton.textContent = 'Start Tracking';
        this.status.textContent = 'Tracking stopped';
        this.gauge.setSpeed(0);
    }

    handlePosition(position) {
        if (position.coords.speed === null) {
            this.status.textContent = 'Speed data not available';
            return;
        }

        // Convert m/s to mph
        const speedMph = Math.round(position.coords.speed * 2.23694);
        this.gauge.setSpeed(speedMph);
        this.status.textContent = 'Tracking speed...';
    }

    handleError(error) {
        let message = 'Error getting location: ';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message += 'Please allow location access';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'Location information is unavailable';
                break;
            case error.TIMEOUT:
                message += 'Location request timed out';
                break;
            default:
                message += 'An unknown error occurred';
        }
        this.status.textContent = message;
        this.stopTracking();
    }
}

// Initialize the speed tracker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SpeedTracker();
}); 