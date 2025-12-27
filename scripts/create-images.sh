#!/bin/bash
# Create portfolio images using ImageMagick

ASSETS_DIR="server/public/assets"

cd "$(dirname "$0")/.."

echo "Creating portfolio images..."

# ========== FinFlow Dashboard - Financial Analytics ==========
echo "Creating FinFlow images..."

# Thumbnail - Blue gradient with chart elements
convert -size 800x600 xc:'#1e3a8a' \
  -fill '#3b82f6' -draw "rectangle 100,100 700,300" \
  -fill '#60a5fa' -draw "rectangle 150,150 650,250" \
  -fill white -font Arial-Bold -pointsize 48 -gravity center -annotate 0 'FinFlow\nDashboard' \
  -fill '#93c5fd' -font Arial -pointsize 24 -gravity south -annotate +0+50 'Financial Analytics Platform' \
  "$ASSETS_DIR/finflow-thumb.jpg"

# Screenshot 1 - Dashboard view with charts
convert -size 1200x800 xc:'#0f172a' \
  -fill '#1e293b' -draw "rectangle 50,50 1150,750" \
  -fill '#334155' -draw "rectangle 100,100 500,400" \
  -fill '#334155' -draw "rectangle 550,100 1100,200" \
  -fill '#3b82f6' -draw "circle 200,200 250,250" \
  -fill '#60a5fa' -draw "circle 300,300 340,340" \
  -fill white -font Arial-Bold -pointsize 36 -gravity north -annotate +0+50 'Revenue Overview' \
  "$ASSETS_DIR/finflow-1.jpg"

# Screenshot 2 - Reports view
convert -size 1200x800 xc:'#0f172a' \
  -fill '#1e293b' -draw "rectangle 50,50 1150,750" \
  -fill '#334155' -draw "rectangle 100,100 1100,200" \
  -fill '#475569' -draw "rectangle 100,250 1100,300" \
  -fill '#475569' -draw "rectangle 100,350 1100,400" \
  -fill '#475569' -draw "rectangle 100,450 1100,500" \
  -fill white -font Arial-Bold -pointsize 36 -gravity north -annotate +0+50 'Financial Reports' \
  "$ASSETS_DIR/finflow-2.jpg"

# ========== Artistry Gallery - 3D Virtual Art ==========
echo "Creating Artistry images..."

# Thumbnail - Artistic gradient with gallery vibe
convert -size 800x600 -gradient:'Linear Gradient' '#7c3aed'-'#c026d3' \
  -fill white -font Arial-Bold -pointsize 48 -gravity center -annotate 0 'Artistry\nGallery' \
  -fill '#f5d0fe' -font Arial -pointsize 24 -gravity south -annotate +0+50 'Immersive 3D Art Experience' \
  "$ASSETS_DIR/artistry-thumb.jpg"

# Screenshot 1 - Gallery view with artwork frames
convert -size 1200x800 xc:'#1a1a2e' \
  -fill '#16213e' -draw "rectangle 50,50 1150,750" \
  -fill '#0f3460' -draw "rectangle 100,100 550,450" \
  -fill '#e94560' -draw "rectangle 120,120 350,400" \
  -fill '#0f3460' -draw "rectangle 600,100 1050,450" \
  -fill '#533483' -draw "rectangle 620,120 850,400" \
  -fill white -font Arial-Bold -pointsize 36 -gravity north -annotate +0+50 'Virtual Gallery' \
  "$ASSETS_DIR/artistry-1.jpg"

# Screenshot 2 - Artwork detail view
convert -size 1200x800 xc:'#0a0a0a' \
  -fill '#1a1a1a' -draw "rectangle 100,50 1100,700" \
  -fill '#7c3aed' -draw "rectangle 200,100 1000,600" \
  -fill '#c026d3' -draw "circle 400,250 450,300" \
  -fill '#f0abfc' -draw "circle 600,350 640,380" \
  -fill '#e879f9' -draw "circle 800,450 830,470" \
  -fill white -font Arial-Bold -pointsize 36 -gravity south -annotate +0+80 'Artwork Detail' \
  "$ASSETS_DIR/artistry-2.jpg"

# ========== Pulse Fitness - AI Training App ==========
echo "Creating Pulse images..."

# Thumbnail - Energetic green/orange gradient
convert -size 800x600 -gradient:'Linear Gradient' '#059669'-'#ea580c' \
  -fill white -font Arial-Bold -pointsize 48 -gravity center -annotate 0 'Pulse\nFitness' \
  -fill '#d97706' -font Arial -pointsize 24 -gravity south -annotate +0+50 'AI-Powered Personal Training' \
  "$ASSETS_DIR/pulse-thumb.jpg"

# Screenshot 1 - Workout screen with exercise
convert -size 1200x800 xc:'#18181b' \
  -fill '#27272a' -draw "rectangle 50,50 1150,750" \
  -fill '#3f3f46' -draw "ellipse 600,350 200,250" \
  -fill '#22c55e' -draw "circle 600,350 180,180" \
  -fill white -font Arial-Bold -pointsize 48 -gravity center -annotate +0-100 'Squat' \
  -fill white -font Arial -pointsize 24 -gravity center -annotate +0+100 'Form: Excellent' \
  -fill '#22c55e' -font Arial-Bold -pointsize 36 -gravity south -annotate +0+50 '✓ Good Form' \
  "$ASSETS_DIR/pulse-1.jpg"

# Screenshot 2 - Progress tracking
convert -size 1200x800 xc:'#18181b' \
  -fill '#27272a' -draw "rectangle 50,50 1150,750" \
  -fill '#3f3f46' -draw "rectangle 100,100 500,350" \
  -fill '#22c55e' -draw "rectangle 120,120 480,200" \
  -fill '#3f3f46' -draw "rectangle 550,100 1050,350" \
  -fill '#ea580c' -draw "rectangle 570,120 1030,200" \
  -fill white -font Arial-Bold -pointsize 36 -gravity north -annotate +0+50 'Your Progress' \
  "$ASSETS_DIR/pulse-2.jpg"

echo "All images created successfully!"
ls -la "$ASSETS_DIR"
