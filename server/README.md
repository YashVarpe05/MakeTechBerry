folder structure
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── ai.config.js
│   │
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Internship.model.js
│   │   ├── Project.model.js
│   │   ├── Testimonial.model.js
│   │   └── Contact.model.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── internship.controller.js
│   │   ├── project.controller.js
│   │   ├── chatbot.controller.js
│   │   ├── testimonial.controller.js
│   │   └── contact.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── internship.routes.js
│   │   ├── project.routes.js
│   │   ├── chatbot.routes.js
│   │   ├── testimonial.routes.js
│   │   └── contact.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── services/
│   │   ├── ai.service.js
│   │   ├── email.service.js
│   │   └── fileUpload.service.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── logger.js
│   │
│   ├── app.js
│   └── server.js
│
├── uploads/
│   ├── resumes/
│   └── documents/
│
├── .env
├── package.json
├── README.md
└── nodemon.json
