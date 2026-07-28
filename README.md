# Aarav Arya | EE + AI/ML Portfolio

Welcome to my interactive developer portfolio. I am an Electrical Engineering student at **IIT Mandi**, working at the intersection of hardware prototyping, deep learning, quantitative finance, and automated video generation.

👉 **[View Live Site](https://github.com/HypertextAssassin69/Portfolio)** *(or add your custom Vercel link here)*

---

## 🎨 Design & Interaction Details

*   **Interactive Spotlight Hero**: Peels back a dark base layer to reveal a glowing orange flame layer beneath, tracking cursor coordinates using passive touch/mouse listeners and high-performance `requestAnimationFrame` interpolation.
*   **Crisscross Skill Marquees**: Dual scrolling bands (Hardware & Software skills) physically intersecting at angles with upright counter-rotated Nether Portal frames acting as clipping boundaries.
*   **Featured Showcase**: Glassmorphic project grid with parallax background clouds, dynamic item breathing animations, and a staggered "View More" transition powered by Framer Motion.
*   **Spotlight Contact card**: A CTA contact card featuring a cursor-reactive gradient border glow, a floating llama mascot sitting on the frame, and responsive wrapping social media links.

---

## 🛠️ Technology Stack

*   **Frontend**: React (v19) + TypeScript + Vite
*   **Motion**: Framer Motion (for physics-based transitions, parallax transforms, and exit animations)
*   **Styling**: Vanilla CSS (CSS variables, responsive media queries, grid structures)
*   **Icons**: Lucide React
*   **Asset Processing**: Python (`rembg` background removal, image filters, and color keying pipelines)

---

## ⚙️ Local Development Setup

To run this project locally, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/HypertextAssassin69/Portfolio.git
    cd Portfolio
    ```

2.  **Install Node Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Vite Development Server**:
    ```bash
    npm run dev
    ```
    The site will start locally at `http://localhost:5173/`.

4.  **Verify & Build**:
    ```bash
    npm run build
    ```

---

## 📸 Mockups & Assets

*   All transparent visual assets (`enchanting-table-nobg.png`, `llama-nobg.png`, `nether-portal-nobg.png`, `cloud.png`, `enchantedbook.png`) are preloaded and served statically from the `/public` folder.
*   Background removal scripts are maintained under the python scripts for transparency edits.
