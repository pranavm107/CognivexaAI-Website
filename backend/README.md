# Evolvex AI Backend

Production-ready Node.js backend for Evolvex AI SaaS website.

## Tech Stack
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Validation:** Zod
- **Email:** Nodemailer
- **Security:** Helmet, CORS, Express-Rate-Limit

## Getting Started

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables:**
   Update the `.env` file with your credentials:
   - `MONGO_URI`: Your MongoDB connection string
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail App Password
   - `ADMIN_EMAIL`: Email where you want to receive inquiries

3. **Run the Server:**
   - Development mode (with nodemon):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## API Endpoints

### Contact/Inquiry
- **POST** `/api/contact`
  - **Payload:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "message": "I'm interested in your services."
    }
    ```
  - **Success Response (201):**
    ```json
    { "success": true, "message": "Inquiry submitted successfully" }
    ```

## Security Features
- **Rate Limiting:** Prevents spam by limiting IPs to 5 inquiries per 15 minutes.
- **Helmet:** Sets various HTTP headers for security.
- **CORS:** Configured to only allow requests from your frontend URL.
- **Input Validation:** Strict validation using Zod to ensure data integrity.
